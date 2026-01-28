import db from './database.js';
import { resolveStore, getMockData } from './utils.js';

export function setupApiRoutes(app, vite, isProduction) {
    // --- API Routes ---
    app.get('/api/v1/products', async (req, res) => {
        try {
            const host = req.headers.host;
            const storeId = resolveStore(host);
            const { mockProducts } = await getMockData(storeId, vite, isProduction);
            res.json({ data: mockProducts });
        } catch (e) {
            console.error('API Error:', e);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.get('/api/v1/categories', async (req, res) => {
        try {
            const host = req.headers.host;
            const storeId = resolveStore(host);
            const { mockCategories } = await getMockData(storeId, vite, isProduction);
            res.json({ data: mockCategories });
        } catch (e) {
            console.error('API Error:', e);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.get('/api/v1/template', async (req, res) => {
        try {
            const host = req.headers.host;
            const storeId = resolveStore(host);
            const { mockTemplate } = await getMockData(storeId, vite, isProduction);
            res.json({ data: mockTemplate });
        } catch (e) {
            console.error('API Error:', e);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // --- Persistence Layer ---
    app.get('/api/v1/store/:key', (req, res) => {
        const host = req.headers.host;
        const subdomain = resolveStore(host); // Returns subdomain string
        const key = req.params.key;

        db.get(`SELECT json FROM stores WHERE subdomain = ?`, [subdomain], (err, row) => {
            if (err) {
                console.error('Database Error:', err);
                return res.status(500).json({ error: 'Database Error' });
            }
            if (!row || !row.json) {
                return res.json({ data: null });
            }
            try {
                const storeData = JSON.parse(row.json);
                res.json({ data: storeData[key] || null });
            } catch (parseErr) {
                console.error('JSON Parse Error:', parseErr);
                res.status(500).json({ error: 'Data Corruption' });
            }
        });
    });

    // NEW: Get Published Data
    app.get('/api/v1/published/store/:key', (req, res) => {
        const host = req.headers.host;
        const subdomain = resolveStore(host);
        const key = req.params.key;

        db.get(`SELECT published_json FROM stores WHERE subdomain = ?`, [subdomain], (err, row) => {
            if (err) {
                console.error('Database Error:', err);
                return res.status(500).json({ error: 'Database Error' });
            }
            if (!row || !row.published_json) {
                return res.json({ data: null });
            }
            try {
                const storeData = JSON.parse(row.published_json);
                res.json({ data: storeData[key] || null });
            } catch (parseErr) {
                console.error('JSON Parse Error:', parseErr);
                res.status(500).json({ error: 'Data Corruption' });
            }
        });
    });

    app.post('/api/v1/store/:key', (req, res) => {
        const host = req.headers.host;
        const subdomain = resolveStore(host);
        const key = req.params.key;
        const value = req.body.value;

        // First, get current data to merge (using subdomain)
        db.get(`SELECT store_id, json FROM stores WHERE subdomain = ?`, [subdomain], (err, row) => {
            if (err) {
                console.error('Database Read Error:', err);
                return res.status(500).json({ error: 'Database Error' });
            }

            // Create new record if not exists
            let storeId = row ? row.store_id : crypto.randomUUID();
            let storeData = {};

            if (row && row.json) {
                try {
                    storeData = JSON.parse(row.json);
                } catch (e) {
                    console.error('Existing data corrupt, resetting', e);
                }
            }

            // Update the specific key
            storeData[key] = value;
            const newJson = JSON.stringify(storeData);

            // Upsert the row logic needs to change slightly for sqlite upsert or manual check
            if (row) {
                db.run(`UPDATE stores SET json = ? WHERE store_id = ?`, [newJson, storeId], (updateErr) => {
                    if (updateErr) return res.status(500).json({ error: 'Database Update Error' });
                    res.json({ success: true });
                });
            } else {
                // For new stores, we need a way to assign the subdomain if it's new
                // But wait, if they accessed via a subdomain that doesn't exist, should we auto-create? 
                // For now, auto-create if it's 'demo' or 'localhost' alias, otherwise error?
                // Let's allow auto-create for now to be flexible
                db.run(`INSERT INTO stores (store_id, template_id, json, subdomain) VALUES (?, ?, ?, ?)`,
                    [storeId, 'temp-01', newJson, subdomain],
                    (insertErr) => {
                        if (insertErr) return res.status(500).json({ error: 'Database Insert Error' });
                        res.json({ success: true });
                    }
                );
            }
        });
    });

    // NEW: Publish Endpoint
    app.post('/api/v1/publish', (req, res) => {
        const host = req.headers.host;
        const subdomain = resolveStore(host);

        db.run(`UPDATE stores SET published_json = json WHERE subdomain = ?`,
            [subdomain],
            (err) => {
                if (err) {
                    console.error('Publish Error:', err);
                    return res.status(500).json({ error: 'Publishing Failed' });
                }
                res.json({ success: true, message: 'Store published successfully' });
            }
        );
    });


    // NEW: Debug List Stores
    app.get('/api/v1/debug/stores', (req, res) => {
        db.all(`SELECT store_id, subdomain, length(json) as json_len, length(published_json) as pub_len FROM stores`, (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ data: rows });
        });
    });
}
