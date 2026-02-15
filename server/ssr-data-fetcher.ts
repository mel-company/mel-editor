import { ViteDevServer } from 'vite';
import { getMockData } from './utils';
import { getStore } from './database';

export interface SSRData {
    products: any[];
    categories: any[];
    template: any;
    templateConfig: {
        pages: any[];
        storeSettings: any;
    };
}

export async function fetchSSRData(
    storeId: string,
    vite: ViteDevServer | undefined,
    isProduction: boolean,
    restoreSectionComponents: any
): Promise<SSRData> {
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

    return {
        products,
        categories,
        template: templateData,
        templateConfig
    };
}
