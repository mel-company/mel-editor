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
                // Use published data for production SSR
                const storeData = await getStore(storeId, true);
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

                    // Merge styleUrl from publish (stored at storeData.storeSettings.styleUrl)
                    if (storeData.storeSettings?.styleUrl && !storeSettings.styleUrl) {
                        storeSettings.styleUrl = storeData.storeSettings.styleUrl;
                    }
                    if (storeData.styleUrl && !storeSettings.styleUrl) {
                        storeSettings.styleUrl = storeData.styleUrl;
                    }

                    // Restore section components (add options with components)
                    if (pages && pages.length > 0) {
                        console.log(`[SSR] Before restore: Page has ${pages[0].sections?.length || 0} sections`);
                        console.log(`[SSR] First section has options:`, !!pages[0].sections?.[0]?.options);
                        pages = restoreSectionComponents(pages);
                        console.log(`[SSR] After restore: Page has ${pages[0].sections?.length || 0} sections`);
                        console.log(`[SSR] First section now has options:`, !!pages[0].sections?.[0]?.options);
                        console.log(`[SSR] First section options count:`, pages[0].sections?.[0]?.options?.length || 0);
                    }

                    // If no pages in database OR mockTemplate has more pages, prefer mockTemplate.pages
                    const mocks = await getMockData(storeId, vite, isProduction);
                    const mockPages = mocks.mockTemplate?.pages || [];

                    if (!pages || pages.length === 0 || (mockPages.length > 0 && mockPages.length > pages.length)) {
                        console.log(`[SSR] Using mockTemplate pages for ${storeId} (DB: ${pages?.length || 0}, Mock: ${mockPages.length})`);

                        if (mockPages.length > 0) {
                            // Use mockTemplate.pages directly
                            pages = restoreSectionComponents(mockPages);
                        } else if (mocks.mockTemplate?.sections) {
                            // Fallback: Create a default home page from the template sections
                            pages = [{
                                id: 'home',
                                name: 'الصفحة الرئيسية',
                                type: 'home' as const,
                                sections: mocks.mockTemplate.sections.map((section: any) => ({
                                    ...section,
                                    target_id: section.id || section.section_id
                                }))
                            }];
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
                    console.log(`[SSR] storeSettings.styleUrl:`, storeSettings?.styleUrl);
                    console.log(`[SSR] storeData.styleUrl:`, storeData?.styleUrl);
                    console.log(`[SSR] storeData.storeSettings?.styleUrl:`, storeData?.storeSettings?.styleUrl);
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

            // Inject SEO meta tags from store settings
            const storeSettings = templateConfig?.storeSettings || {};
            const storeName = storeSettings.name || 'متجر';
            const storeDescription = storeSettings.description || '';
            const storeLogo = storeSettings.logo?.url || storeSettings.logo?.publicUrl || '';

            // Escape HTML entities in meta content
            const escapeHtml = (text: string) => {
                return text
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#039;');
            };

            // Build SEO meta tags
            let seoTags = '';

            // Open Graph tags for social media
            seoTags += `<meta property="og:title" content="${escapeHtml(storeName)}" />\n    `;
            if (storeDescription) {
                seoTags += `<meta property="og:description" content="${escapeHtml(storeDescription)}" />\n    `;
            }
            if (storeLogo) {
                seoTags += `<meta property="og:image" content="${escapeHtml(storeLogo)}" />\n    `;
            }
            seoTags += `<meta property="og:type" content="website" />\n    `;

            // Twitter Card tags
            seoTags += `<meta name="twitter:card" content="summary_large_image" />\n    `;
            seoTags += `<meta name="twitter:title" content="${escapeHtml(storeName)}" />\n    `;
            if (storeDescription) {
                seoTags += `<meta name="twitter:description" content="${escapeHtml(storeDescription)}" />\n    `;
            }
            if (storeLogo) {
                seoTags += `<meta name="twitter:image" content="${escapeHtml(storeLogo)}" />\n    `;
            }

            // Favicon/Icon
            if (storeLogo) {
                seoTags += `<link rel="icon" type="image/png" href="${escapeHtml(storeLogo)}" />`;
            }

            // Replace default title and description with store settings
            html = html.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(storeName)}</title>`);
            if (storeDescription) {
                html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${escapeHtml(storeDescription)}" />`);
            }

            // Inject additional SEO tags at placeholder
            html = html.replace('<!--seo-tags-->', seoTags);

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
