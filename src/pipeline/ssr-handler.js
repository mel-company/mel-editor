import fs from 'node:fs';
import path from 'node:path';
import { resolveStore, getMockData } from './utils.js';
import { getStoreById } from './database.js';

export function setupSSR(app, vite, isProduction, rootDir) {
    // Handle all routes for SSR
    // Note: The path pattern might depend on Express version, keeping original
    app.get(/(.*)/, async (req, res, next) => {
        const url = req.originalUrl;
        const host = req.headers.host;

        // Skip API requests if they slip through
        if (url.startsWith('/api')) {
            return next();
        }

        try {
            // 1. Resolve Store from Domain
            const storeId = resolveStore(host);
            console.log(`[SSR] Resolving request for ${host} -> ${storeId}`);

            // 2. Fetch SSR data
            let products = [];
            let categories = [];
            let templateData = null;
            let templateConfig = undefined;

            try {
                const storeData = await getStoreById(storeId);
                if (storeData) {
                    products = storeData.products || [];
                    categories = storeData.categories || [];
                    templateData = storeData.template || null;
                    templateConfig = {
                        pages: storeData.pages || [],
                        storeSettings: storeData.storeSettings || {}
                    };
                    console.log(`[SSR] Loaded data from DB for ${storeId}`);
                } else {
                    console.log(`[SSR] No DB data for ${storeId}, using mocks`);
                    const mocks = await getMockData(storeId, vite, isProduction);
                    products = mocks.mockProducts || [];
                    categories = mocks.mockCategories || [];
                    templateData = mocks.mockTemplate || null;
                }
            } catch (err) {
                console.error('[SSR] Data fetch error:', err);
                // Fallback to mocks on error? or just empty
                const mocks = await getMockData(storeId, vite, isProduction);
                products = mocks.mockProducts || [];
                categories = mocks.mockCategories || [];
                templateData = mocks.mockTemplate || null;
            }

            // Construct the SSR payload
            const ssrData = {
                products,
                categories,
                template: templateData,
                templateConfig
            };

            // 2. Read index.html
            let template;
            if (!isProduction) {
                template = fs.readFileSync(path.resolve(rootDir, 'index.html'), 'utf-8');
                // Apply Vite HTML transforms
                template = await vite.transformIndexHtml(url, template);
            } else {
                template = fs.readFileSync(path.resolve(rootDir, 'dist/client/index.html'), 'utf-8');
            }

            // 3. Load server entry
            let render;
            if (!isProduction) {
                const entryModule = await vite.ssrLoadModule('/src/entry-server.tsx');
                render = entryModule.render;
            } else {
                // Use dynamic import for production build
                const entryPath = path.resolve(rootDir, 'dist/server/entry-server.js');
                const entryModule = await import(entryPath);
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
}
