import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createServer as createViteServer } from 'vite';

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
    // Handle all routes for SSR (Express 5 compatible pattern)
    app.get('/{*path}', async (req, res, next) => {
        const url = req.originalUrl;

        // Skip API requests
        if (url.startsWith('/api')) {
            return next();
        }

        try {
            // 1. Fetch SSR data (products and categories)
            const ssrData = await fetchSSRData();

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
        console.log(`🚀 SSR server running at http://localhost:${port}`);
    });
}

/**
 * Fetch SSR data (products and categories) from API
 * Falls back to mock data if API is unavailable
 */
async function fetchSSRData() {
    const apiBaseUrl = process.env.VITE_API_BASE_URL || 'http://localhost:3000';

    let products = [];
    let categories = [];

    try {
        // Fetch products
        const productsRes = await fetch(`${apiBaseUrl}/api/v1/products`);
        if (productsRes.ok) {
            const data = await productsRes.json();
            products = data.data || data || [];
        }
    } catch (err) {
        console.warn('⚠️ Could not fetch products from API, using empty array');
    }

    try {
        // Fetch categories
        const categoriesRes = await fetch(`${apiBaseUrl}/api/v1/categories`);
        if (categoriesRes.ok) {
            const data = await categoriesRes.json();
            categories = data.data || data || [];
        }
    } catch (err) {
        console.warn('⚠️ Could not fetch categories from API, using empty array');
    }

    return { products, categories };
}

createServer();
