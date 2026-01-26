import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import 'dotenv/config';
import db from './database.js'; // Import database connection

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.argv.includes('--production');

async function createServer() {
    const app = express();
    app.use(express.json({ limit: '50mb' })); // Parse JSON bodies with increased limit for large store data

    let vite;
    if (!isProduction) {
        // Create Vite server in middleware mode
        vite = await createViteServer({
            server: { middlewareMode: true },
            appType: 'custom',
        });
        // Use vite's connect instance as middleware
        app.use(vite.middlewares);
    } else {
        // Serve static files in production
        app.use(express.static(path.resolve(__dirname, 'dist/client')));
    }

    // --- Domain Resolution Layer ---
    function resolveStore(host) {
        // Simple mapping for dev verification
        // localhost:5173 -> store-1 (default)
        // store2.localhost -> store-2
        if (host.includes('store2')) {
            return 'store-2';
        }
        return 'store-1'; // Default store
    }

    // --- Data Access Layer ---
    async function getMockData(storeId) {
        if (!isProduction) {
            // In dev, load fresh mocks via Vite to get HMR updates if mocks change
            const mockModule = await vite.ssrLoadModule('/src/mock/server-export.ts');

            // In a real scenario, we would filter mockModule data by storeId here
            // For now, we return the same mocks but logged the storeId access
            console.log(`[Server] Fetching data for store: ${storeId}`);

            return mockModule;
        } else {
            // Production fallback
            return { mockProducts: [], mockCategories: [], mockTemplate: null };
        }
    }

    // --- API Routes ---
    app.get('/api/v1/products', async (req, res) => {
        try {
            const host = req.headers.host;
            const storeId = resolveStore(host);
            const { mockProducts } = await getMockData(storeId);
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
            const { mockCategories } = await getMockData(storeId);
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
            const { mockTemplate } = await getMockData(storeId);
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

    // --- SSR Handler ---
    // Handle all routes for SSR (Express 5 compatible pattern)
    app.get('/{*path}', async (req, res, next) => {
        const url = req.originalUrl;
        const host = req.headers.host;

        // Skip API requests if they slip through (though app.get above should catch them)
        if (url.startsWith('/api')) {
            return next();
        }

        try {
            // 1. Resolve Store from Domain
            const storeId = resolveStore(host);
            console.log(`[SSR] Resolving request for ${host} -> ${storeId}`);

            // 2. Fetch SSR data for this specific store
            const { mockProducts, mockCategories, mockTemplate } = await getMockData(storeId);

            // Construct the SSR payload directly from data source
            // In a real app, we might call our own API functions here or service layer
            const ssrData = {
                products: mockProducts || [],
                categories: mockCategories || [],
                template: mockTemplate || null
            };

            // 2. Read index.html
            let template;
            if (!isProduction) {
                template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
                // Apply Vite HTML transforms
                template = await vite.transformIndexHtml(url, template);
            } else {
                template = fs.readFileSync(path.resolve(__dirname, 'dist/client/index.html'), 'utf-8');
            }

            // 3. Load server entry
            let render;
            if (!isProduction) {
                const entryModule = await vite.ssrLoadModule('/src/entry-server.tsx');
                render = entryModule.render;
            } else {
                const entryModule = await import('./dist/server/entry-server.js');
                render = entryModule.render;
            }

            // 4. Render the app HTML
            const { html: appHtml } = render(url, ssrData);

            // 5. Inject the app-rendered HTML into the template
            const ssrDataScript = `<script>window.__SSR_DATA__ = ${JSON.stringify(ssrData)};</script>`;
            let html = template
                .replace('<!--ssr-outlet-->', appHtml)
                .replace('<!--ssr-data-->', ssrDataScript);

            // 6. Send the rendered HTML
            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        } catch (e) {
            // If an error is caught, let Vite fix the stack trace
            if (!isProduction && vite) {
                vite.ssrFixStacktrace(e);
            }
            console.error('SSR Error:', e);
            next(e);
        }
    });

    const port = process.env.PORT || 5173;
    app.listen(port, () => {
        console.log(`🚀 Unified Server running at http://localhost:${port}`);
        console.log(`   - SSR: http://localhost:${port}`);
        console.log(`   - API: http://localhost:${port}/api/v1/products`);
    });
}

createServer();
