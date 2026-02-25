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
                const [pagesResult, settingsResult, productsResult, categoriesResult] = await Promise.all([
                    fetchPublishedStoreData("editor-pages-storage"),
                    fetchPublishedStoreData("editor-store-settings-storage"),
                    fetch(`${url}/products`).then(res => res.json()),
                    fetch(`${url}/categories`).then(res => res.json())
                ]);

                // Parse the Zustand persist structure
                // structure is { state: { pages: [...] }, version: 0 }
                let pagesData = null;
                if (pagesResult && typeof pagesResult === 'string') {
                    try {
                        const parsed = JSON.parse(pagesResult);
                        pagesData = parsed.state?.pages;
                    } catch (e) {
                        console.error("Failed to parse pages", e);
                    }
                } else if (pagesResult && pagesResult.state) {
                    pagesData = pagesResult.state.pages;
                }

                let settingsData = null;
                if (settingsResult && typeof settingsResult === 'string') {
                    try {
                        const parsed = JSON.parse(settingsResult);
                        settingsData = parsed.state?.storeSettings;
                    } catch (e) {
                        console.error("Failed to parse settings", e);
                    }
                } else if (settingsResult && settingsResult.state) {
                    settingsData = settingsResult.state.storeSettings;
                }

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
