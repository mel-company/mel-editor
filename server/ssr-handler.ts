import fs from 'node:fs';
import path from 'node:path';
import { Express, Request, Response, NextFunction } from 'express';
import { ViteDevServer } from 'vite';
import { resolveStore, getMockData } from './utils';
import { getStore } from './database';
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
                const module = await import('../client/src/shared/store/editor/page/index.tsx');
                restoreSectionComponents = module.restoreSectionComponents;
            }
            
            // 1. Resolve Store from Domain
            const storeId = resolveStore(host);
            console.log(`[SSR] Resolving request for ${host} -> ${storeId}`);

            // 2. Fetch SSR data
            let products: any[] = [];
            let categories: any[] = [];
            let templateData: any = null;
            let templateConfig: any = undefined;

            try {
                const storeData = await getStore(storeId);
                if (storeData) {
                    products = storeData.products || [];
                    categories = storeData.categories || [];
                    templateData = storeData.template || null;

                    // Extract pages and settings from Zustand persist format
                    // The database stores data as: { 'editor-pages-storage': '{"state":{...}}', ... }
                    // Need to double-parse because Zustand persist stores as JSON string
                    let pagesStorage = storeData['editor-pages-storage'];
                    let settingsStorage = storeData['editor-store-settings-storage'];

                    // Parse if they're strings (double-stringified)
                    if (typeof pagesStorage === 'string') {
                        try {
                            pagesStorage = JSON.parse(pagesStorage);
                        } catch (e) {
                            console.error('[SSR] Error parsing pagesStorage:', e);
                            pagesStorage = null;
                        }
                    }
                    if (typeof settingsStorage === 'string') {
                        try {
                            settingsStorage = JSON.parse(settingsStorage);
                        } catch (e) {
                            console.error('[SSR] Error parsing settingsStorage:', e);
                            settingsStorage = null;
                        }
                    }

                    // Zustand persist wraps the state in a 'state' property
                    let pages = pagesStorage?.state?.pages || storeData.pages || [];
                    const storeSettings = settingsStorage?.state?.storeSettings || storeData.storeSettings || {};

                    // Restore section components (add options with components)
                    if (pages && pages.length > 0) {
                        console.log(`[SSR] Before restore: Page has ${pages[0].sections?.length || 0} sections`);
                        console.log(`[SSR] First section has options:`, !!pages[0].sections?.[0]?.options);
                        pages = restoreSectionComponents(pages);
                        console.log(`[SSR] After restore: Page has ${pages[0].sections?.length || 0} sections`);
                        console.log(`[SSR] First section now has options:`, !!pages[0].sections?.[0]?.options);
                        console.log(`[SSR] First section options count:`, pages[0].sections?.[0]?.options?.length || 0);
                    }

                    // If no pages in database, load from mock template as fallback
                    if (!pages || pages.length === 0) {
                        console.log(`[SSR] No pages in DB for ${storeId}, loading from mock template`);
                        const mocks = await getMockData(storeId, vite, isProduction);

                        // mockTemplate has sections, but we need pages
                        // Create a default home page from the template sections
                        if (mocks.mockTemplate?.sections) {
                            pages = [{
                                id: 'home',
                                name: 'الصفحة الرئيسية',
                                type: 'home' as const,
                                sections: mocks.mockTemplate.sections.map((section: any) => ({
                                    ...section,
                                    target_id: section.id || section.section_id
                                }))
                            }];
                            // Restore components for mock template pages too
                            pages = restoreSectionComponents(pages);
                        } else {
                            pages = [];
                        }
                    }

                    templateConfig = {
                        pages,
                        storeSettings
                    };
                    console.log(`[SSR] Loaded data from DB for ${storeId}: ${pages.length} pages found`);
                } else {
                    console.log(`[SSR] No DB data for ${storeId}, using mocks`);
                    const mocks = await getMockData(storeId, vite, isProduction);
                    products = mocks.mockProducts || [];
                    categories = mocks.mockCategories || [];
                    templateData = mocks.mockTemplate || null;
                    
                    let noDbPages = mocks.mockTemplate?.pages || [];
                    // Restore components for no DB data pages too
                    if (noDbPages.length > 0) {
                        noDbPages = restoreSectionComponents(noDbPages);
                    }
                    
                    templateConfig = {
                        pages: noDbPages,
                        storeSettings: {}
                    };
                }
            } catch (err) {
                console.error('[SSR] Data fetch error:', err);
                // Fallback to mocks on error
                const mocks = await getMockData(storeId, vite, isProduction);
                products = mocks.mockProducts || [];
                categories = mocks.mockCategories || [];
                templateData = mocks.mockTemplate || null;
                
                let fallbackPages = mocks.mockTemplate?.pages || [];
                // Restore components for fallback pages too
                if (fallbackPages.length > 0) {
                    fallbackPages = restoreSectionComponents(fallbackPages);
                }
                
                templateConfig = {
                    pages: fallbackPages,
                    storeSettings: {}
                };
            }

            // Construct the SSR payload
            const ssrData = {
                products,
                categories,
                template: templateData,
                templateConfig
            };

            // 2. Read index.html
            let template: string;
            if (!isProduction && vite) {
                template = fs.readFileSync(path.resolve(rootDir, 'client/index.html'), 'utf-8');
                // Apply Vite HTML transforms
                template = await vite.transformIndexHtml(url, template);
            } else {
                template = fs.readFileSync(path.resolve(rootDir, 'dist/client/index.html'), 'utf-8');
            }

            // 3. Load server entry
            let render: any;
            if (!isProduction && vite) {
                const entryPath = path.resolve(rootDir, 'client/src/entry-server.tsx');
                const entryModule = await vite.ssrLoadModule(entryPath);
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

            // Inject generated styles if available
            if (templateConfig?.storeSettings?.styleUrl) {
                html = html.replace('</head>', `<link rel="stylesheet" href="${templateConfig.storeSettings.styleUrl}"></head>`);
            }

            // 6. Send the rendered HTML
            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
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
