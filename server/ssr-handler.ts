import { Express, Request, Response, NextFunction } from 'express';
import { ViteDevServer } from 'vite';
import { resolveStore } from './utils';
import { fetchSSRData } from './ssr-data-fetcher';
import { renderSSRPage, sendSSRResponse } from './ssr-renderer';
export function setupSSR(app: Express, vite: ViteDevServer | undefined, isProduction: boolean, rootDir: string) {
    // Import restoreSectionComponents from client code
    let restoreSectionComponents: any;

    // Handle all routes for SSR
    // Note: The path pattern might depend on Express version, keeping original
    app.get(/(.*)/, async (req: Request, res: Response, next: NextFunction) => {
        const url = req.originalUrl;
        const host = req.headers.host;

        // Skip API requests if they slip through
        if (url.startsWith('/api')) {
            return next();
        }

        try {
            // Import restoreSectionComponents if not already loaded
            if (!restoreSectionComponents) {
                const module = await import('../client/src/shared/store/editor/page/index');
                restoreSectionComponents = module.restoreSectionComponents;
            }

            // 1. Resolve Store from Domain
            const storeId = resolveStore(host);
            console.log(`[SSR] Resolving request for ${host} -> ${storeId}`);

            // 2. Fetch SSR data
            const ssrData = await fetchSSRData(storeId, vite, isProduction, restoreSectionComponents);

            // 3. Render the SSR page
            const html = await renderSSRPage({
                url,
                rootDir,
                isProduction,
                vite,
                ssrData
            });

            // 4. Send the response
            sendSSRResponse(res, html);
        } catch (e: any) {
            // If an error is caught, let Vite fix the stack trace
            if (!isProduction && vite) {
                vite.ssrFixStacktrace(e);
            }
            console.error('SSR Error:', e);
            next(e);
        }
    });
}
