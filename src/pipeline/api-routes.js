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
        const storeId = resolveStore(host);
        const key = req.params.key;

        db.get(`SELECT json FROM stores WHERE store_id = ?`, [storeId], (err, row) => {
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

    app.post('/api/v1/store/:key', (req, res) => {
        const host = req.headers.host;
        const storeId = resolveStore(host);
        const key = req.params.key;
        const value = req.body.value;

        // First, get current data to merge
        db.get(`SELECT json FROM stores WHERE store_id = ?`, [storeId], (err, row) => {
            if (err) {
                console.error('Database Read Error:', err);
                return res.status(500).json({ error: 'Database Error' });
            }

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

            // Upsert the row
            db.run(`INSERT INTO stores (store_id, template_id, json) VALUES (?, ?, ?)
                    ON CONFLICT(store_id) DO UPDATE SET json = ?`,
                [storeId, 'temp-01', newJson, newJson],
                (updateErr) => {
                    if (updateErr) {
                        console.error('Database Write Error:', updateErr);
                        return res.status(500).json({ error: 'Database Write Error' });
                    }
                    res.json({ success: true });
                }
            );
        });
    });
}
