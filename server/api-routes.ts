import { Express, Request, Response } from 'express';
import { ViteDevServer } from 'vite';
import db from './database';
import { resolveStore, getMockData } from './utils';
import crypto from 'node:crypto';
import { generateStyles } from './services/style-generator';
import { uploadFile } from './services/storage';

export function setupApiRoutes(app: Express, vite: ViteDevServer | undefined, isProduction: boolean) {
    // --- API Routes ---
    app.get('/api/v1/products', async (req: Request, res: Response) => {
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

    app.get('/api/v1/categories', async (req: Request, res: Response) => {
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

    app.get('/api/v1/template', async (req: Request, res: Response) => {
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

    // NEW: List Templates Endpoint
    app.get('/api/v1/templates/list', (_req: Request, res: Response) => {
        db.all('SELECT * FROM templates', (err, rows) => {
            if (err) {
                console.error('Database Error:', err);
                return res.status(500).json({ error: 'Database Error' });
            }
            res.json({ data: rows });
        });
    });

    // --- Persistence Layer ---
    app.get('/api/v1/store/:key', (req: Request, res: Response) => {
        const host = req.headers.host;
        const subdomain = resolveStore(host); // Returns subdomain string
        const key = req.params.key as string;

        db.get(`SELECT json FROM stores WHERE subdomain = ?`, [subdomain], (err, row: any) => {
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
    app.get('/api/v1/published/store/:key', (req: Request, res: Response) => {
        const host = req.headers.host;
        const subdomain = resolveStore(host);
        const key = req.params.key as string;

        db.get(`SELECT published_json FROM stores WHERE subdomain = ?`, [subdomain], (err, row: any) => {
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

    app.post('/api/v1/store/:key', (req: Request, res: Response) => {
        const host = req.headers.host;
        const subdomain = resolveStore(host);
        const key = req.params.key as string;
        const value = req.body.value;

        // First, get current data to merge (using subdomain)
        db.get(`SELECT store_id, json FROM stores WHERE subdomain = ?`, [subdomain], async (err, row: any) => {
            if (err) {
                console.error('Database Read Error:', err);
                return res.status(500).json({ error: 'Database Error' });
            }

            // Create new record if not exists
            let storeId = row ? row.store_id : crypto.randomUUID();
            let storeData: any = {};

            if (row && row.json) {
                try {
                    storeData = JSON.parse(row.json);
                } catch (e) {
                    console.error('Existing data corrupt, resetting', e);
                }
            }

            // Update the specific key
            storeData[key] = value;

            // If settings changed, regenerate styles
            if (key === 'storeSettings') {
                try {
                    const css = await generateStyles(value);
                    const fileName = `store-${storeId}-${Date.now()}.css`;
                    const styleUrl = await uploadFile(fileName, css, 'text/css');
                    storeData.styleUrl = styleUrl;
                    console.log(styleUrl)
                } catch (styleErr) {
                    console.error('Style Generation Error:', styleErr);
                    // Don't fail the save, but maybe log it
                }
            }

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

    // NEW: Manual Style Generation Endpoint
    app.post('/api/v1/generate-styles', (req: Request, res: Response) => {
        const host = req.headers.host;
        const subdomain = resolveStore(host);

        db.get(`SELECT store_id, json FROM stores WHERE subdomain = ?`, [subdomain], async (err, row: any) => {
            if (err) return res.status(500).json({ error: 'Database Error' });
            if (!row || !row.json) return res.status(404).json({ error: 'Store not found' });

            let storeData: any = {};
            try {
                storeData = JSON.parse(row.json);
            } catch (e) {
                return res.status(500).json({ error: 'Data Corruption' });
            }

            if (storeData.storeSettings) {
                try {
                    const css = await generateStyles(storeData.storeSettings);
                    const fileName = `store-${row.store_id}-${Date.now()}.css`;
                    const styleUrl = await uploadFile(fileName, css, 'text/css');
                    storeData.storeSettings.styleUrl = styleUrl;

                    // Update DB with new styleUrl
                    const newJson = JSON.stringify(storeData);
                    db.run(`UPDATE stores SET json = ? WHERE store_id = ?`, [newJson, row.store_id], (updateErr) => {
                        if (updateErr) return res.status(500).json({ error: 'Update Error' });
                        res.json({ success: true, styleUrl });
                    });
                } catch (styleErr) {
                    res.status(500).json({ error: 'Style Generation Failed' });
                }
            } else {
                res.json({ success: true, message: 'No settings to generate styles from' });
            }
        });
    });

    // NEW: Publish Endpoint
    app.post('/api/v1/publish', (req: Request, res: Response) => {
        const host = req.headers.host;
        const subdomain = resolveStore(host);

        // Fetch current data first to regenerate styles
        db.get(`SELECT store_id, json FROM stores WHERE subdomain = ?`, [subdomain], async (err, row: any) => {
            if (err) {
                console.error('Database Read Error:', err);
                return res.status(500).json({ error: 'Database Error' });
            }
            if (!row || !row.json) {
                return res.status(404).json({ error: 'Store not found' });
            }

            let storeData: any = {};
            try {
                storeData = JSON.parse(row.json);
            } catch (e) {
                return res.status(500).json({ error: 'Data Corruption' });
            }

            // Regenerate Styles
            if (storeData.storeSettings) {
                try {
                    const css = await generateStyles(storeData.storeSettings);
                    const fileName = `store-${row.store_id}-${Date.now()}.css`;
                    const styleUrl = await uploadFile(fileName, css, 'text/css');
                    storeData.styleUrl = styleUrl; // Deprecated: keep for back-compat if needed
                    storeData.storeSettings.styleUrl = styleUrl; // Store inside settings
                } catch (styleErr) {
                    console.error('Style Generation Error during Publish:', styleErr);
                }
            }

            const newJson = JSON.stringify(storeData);

            // Update json AND published_json
            db.run(`UPDATE stores SET json = ?, published_json = ? WHERE subdomain = ?`,
                [newJson, newJson, subdomain],
                (updateErr) => {
                    if (updateErr) {
                        console.error('Publish Error:', updateErr);
                        return res.status(500).json({ error: 'Publishing Failed' });
                    }
                    res.json({ success: true, message: 'Store published successfully' });
                }
            );
        });
    });


    // NEW: Debug List Stores
    app.get('/api/v1/debug/stores', (_req: Request, res: Response) => {
        db.all(`SELECT store_id, subdomain, length(json) as json_len, length(published_json) as pub_len FROM stores`, (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ data: rows });
        });
    });
}
