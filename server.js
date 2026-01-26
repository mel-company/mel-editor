import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import 'dotenv/config';

// Pipeline Imports
import { setupApiRoutes } from './src/pipeline/api-routes.js';
import { setupSSR } from './src/pipeline/ssr-handler.js';

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

    // Setup Pipeline
    setupApiRoutes(app, vite, isProduction);
    setupSSR(app, vite, isProduction, __dirname);

    const port = process.env.PORT || 5173;
    app.listen(port, () => {
        console.log(`🚀 Unified Server running at http://localhost:${port}`);
        console.log(`   - SSR: http://localhost:${port}`);
        console.log(`   - API: http://localhost:${port}/api/v1/products`);
    });
}

createServer();
