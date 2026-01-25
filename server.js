import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.argv.includes('--production');

async function createServer() {
    const app = express();

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

    // --- Data Access Layer ---
    async function getMockData() {
        if (!isProduction) {
            // In dev, load fresh mocks via Vite to get HMR updates if mocks change
            const mockModule = await vite.ssrLoadModule('/src/mock/server-export.ts');
            return mockModule;
        } else {
            // Production fallback (would ideally load from DB or built JSON)
            // For now, return empty structures or static require if we built them
            return { mockProducts: [], mockCategories: [], mockTemplate: null };
        }
    }

    // --- API Routes ---
    app.get('/api/v1/products', async (req, res) => {
        try {
            const { mockProducts } = await getMockData();
            res.json({ data: mockProducts });
        } catch (e) {
            console.error('API Error:', e);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.get('/api/v1/categories', async (req, res) => {
        try {
            const { mockCategories } = await getMockData();
            res.json({ data: mockCategories });
        } catch (e) {
            console.error('API Error:', e);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.get('/api/v1/template', async (req, res) => {
        try {
            const { mockTemplate } = await getMockData();
            res.json({ data: mockTemplate });
        } catch (e) {
            console.error('API Error:', e);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // --- SSR Handler ---
    // Handle all routes for SSR (Express 5 compatible pattern)
    app.get('/{*path}', async (req, res, next) => {
        const url = req.originalUrl;

        // Skip API requests if they slip through (though app.get above should catch them)
        if (url.startsWith('/api')) {
            return next();
        }

        try {
            // 1. Fetch SSR data (products, categories, AND template)
            const { mockProducts, mockCategories, mockTemplate } = await getMockData();

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
