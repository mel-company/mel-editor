import React, { useState, useEffect } from "react";
import StoreView from "../../components";
import { fetchPublishedStoreData } from "../../../shared/api/production";
import { PageType, StoreType, ProductType, CategoryType } from "../../../shared/types";
import { restoreSectionComponents } from "../../../shared/store/editor/page";

const ProductionPage = () => {
    const [pages, setPages] = useState<PageType[]>([]);
    const [storeSettings, setStoreSettings] = useState<StoreType | null>(null);
    const [products, setProducts] = useState<ProductType[]>([]);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPageId, setCurrentPageId] = useState<string>("");

    useEffect(() => {
        const url = import.meta.env.VITE_EDITOR_API_URL || 'http://localhost:4000/api/v1'

        const fetchData = async () => {
            try {
                console.log('🔍 Fetching published store data...');
                const [pagesResult, settingsResult, productsResult, categoriesResult] = await Promise.all([
                    fetchPublishedStoreData("editor-pages-storage"),
                    fetchPublishedStoreData("editor-store-settings-storage"),
                    fetch(`${url}/products`).then(res => res.json()),
                    fetch(`${url}/categories`).then(res => res.json())
                ]);

                console.log('📦 Raw fetch results:', {
                    pagesResult: pagesResult ? 'exists' : 'null',
                    pagesType: typeof pagesResult,
                    pagesValue: pagesResult,
                    settingsResult: settingsResult ? 'exists' : 'null',
                    settingsType: typeof settingsResult,
                    settingsValue: settingsResult,
                    // Log parsed pages data
                    parsedPages: pagesResult ? (typeof pagesResult === 'string' ? JSON.parse(pagesResult) : pagesResult) : null,
                    firstPageSections: pagesResult ? (typeof pagesResult === 'string' ? JSON.parse(pagesResult) : pagesResult)?.pages?.[0]?.sections?.slice(0, 3) : null
                });

                // Parse the data - handle both raw format (from publish) and Zustand persist format
                let pagesData = null;
                if (pagesResult) {
                    if (typeof pagesResult === 'string') {
                        try {
                            const parsed = JSON.parse(pagesResult);
                            pagesData = parsed.state?.pages || parsed;
                        } catch (e) {
                            console.error("Failed to parse pages", e);
                        }
                    } else if (Array.isArray(pagesResult)) {
                        // Raw array format from publish endpoint
                        console.log('✅ Using raw array format for pages');
                        pagesData = pagesResult;
                    } else if (pagesResult.state) {
                        // Zustand persist format
                        console.log('✅ Using Zustand persist format for pages');
                        pagesData = pagesResult.state.pages;
                    }
                }

                let settingsData = null;
                if (settingsResult) {
                    if (typeof settingsResult === 'string') {
                        try {
                            const parsed = JSON.parse(settingsResult);
                            settingsData = parsed.state?.storeSettings || parsed;
                        } catch (e) {
                            console.error("Failed to parse settings", e);
                        }
                    } else if (settingsResult.name || settingsResult.colors) {
                        // Raw settings object format from publish endpoint
                        console.log('✅ Using raw object format for settings');
                        settingsData = settingsResult;
                    } else if (settingsResult.state) {
                        // Zustand persist format
                        console.log('✅ Using Zustand persist format for settings');
                        settingsData = settingsResult.state.storeSettings;
                    }
                }

                console.log('📊 Parsed data:', {
                    pagesData: pagesData ? `${Array.isArray(pagesData) ? pagesData.length : 'not array'} pages` : 'null',
                    settingsData: settingsData ? 'exists' : 'null',
                });

                console.log('🔍 Store settings footer:', {
                    hasFooter: !!settingsData?.footer,
                    showFooter: settingsData?.footer?.showFooter,
                    footerData: settingsData?.footer,
                });

                if (pagesData && Array.isArray(pagesData)) {
                    // Restore components (hydrate) just like in the editor but with published data
                    const hydratedPages = restoreSectionComponents(pagesData);
                    setPages(hydratedPages);
                    if (hydratedPages.length > 0) {
                        setCurrentPageId(hydratedPages[0].id);
                    }
                }

                if (settingsData) {
                    setStoreSettings(settingsData);
                }

                if (productsResult && productsResult.data) {
                    setProducts(productsResult.data);
                }

                if (categoriesResult && categoriesResult.data) {
                    setCategories(categoriesResult.data);
                }

            } catch (err) {
                console.error("Failed to load production data", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handlePageChange = (pageId: string) => {
        setCurrentPageId(pageId);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white" dir="rtl">
                <div className="flex flex-col items-center">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                </div>
            </div>
        );
    }

    // Graceful fallback if no published data exists yet
    if (!pages || pages.length === 0 || !storeSettings) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50" dir="rtl">
                <div className="text-center p-8">
                    <h1 className="text-2xl font-bold text-slate-800 mb-2">المتجر غير منشور بعد</h1>
                    <p className="text-slate-600">يرجى نشر المتجر من لوحة التحكم ليظهر هنا.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white" dir="rtl">
            {/* Production View - No Top Bar */}
            <StoreView
                pages={pages}
                currentPageId={currentPageId}
                storeSettings={storeSettings}
                products={products}
                categories={categories}
                onPageChange={handlePageChange}
                hideFooter={false}
            />
        </div>
    );
};

export default ProductionPage;
