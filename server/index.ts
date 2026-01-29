import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express, { Express } from 'express';
import { createServer as createViteServer, ViteDevServer } from 'vite';
import 'dotenv/config';

// Pipeline Imports
import { setupApiRoutes } from './api-routes';
import { setupSSR } from './ssr-handler';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.argv.includes('--production');

async function createServer() {
    const app: Express = express();
    app.use(express.json({ limit: '50mb' })); // Parse JSON bodies with increased limit for large store data

    let vite: ViteDevServer | undefined;
    if (!isProduction) {
        // Create Vite server in middleware mode
        vite = await createViteServer({
            server: { middlewareMode: true },
            appType: 'custom',
            root: path.resolve(__dirname, '../client'),
            configFile: path.resolve(__dirname, '../client/vite.config.ts'),
        });
        // Use vite's connect instance as middleware
        app.use(vite.middlewares);
    } else {
        // Serve static files in production
        app.use(express.static(path.resolve(__dirname, '../dist/client')));
    }

    // Setup Pipeline
    setupApiRoutes(app, vite, isProduction);
    setupSSR(app, vite, isProduction, path.resolve(__dirname, '..'));

    const port = process.env.PORT || 5173;
    app.listen(port, () => {
        console.log(`🚀 Unified Server running at http://localhost:${port}`);
        console.log(`   - SSR: http://localhost:${port}`);
        console.log(`   - API: http://localhost:${port}/api/v1/products`);
    });
}

createServer();
