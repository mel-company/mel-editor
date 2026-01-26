import React, { useEffect, useState } from "react";
import PreviewRenderer from "../../components/preview/preview-renderer";
import createDbStorage from "../../../shared/utils/db-storage";
import { defaultStoreSettings } from "../../../shared/store/editor/store-settings";

const PreviewPage = () => {
    const [data, setData] = useState<{ pages: any; storeSettings: any } | null>(
        null
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const storage = createDbStorage();

                // Fetch raw strings from DB
                const [pagesRaw, settingsRaw] = await Promise.all([
                    storage.getItem("editor-pages-storage"),
                    storage.getItem("editor-store-settings-storage")
                ]);

                let foundData = false;

                if (pagesRaw || settingsRaw) {
                    let pagesData = null;
                    let settingsData = null;

                    try { if (pagesRaw) pagesData = JSON.parse(pagesRaw); } catch (e) { console.error("Error parsing pages", e); }
                    try { if (settingsRaw) settingsData = JSON.parse(settingsRaw); } catch (e) { console.error("Error parsing settings", e); }

                    const pages = pagesData?.state?.pages || [];
                    const settings = settingsData?.state?.storeSettings || defaultStoreSettings;

                    // Only consider it found if we have at least one valid source or defaulted safely
                    // We need at least one page usually, but if pagesRaw was present but empty, it's valid empty state.
                    // If everything is missing, we fall through.

                    if (pagesData || settingsData) {
                        setData({
                            pages: pages,
                            storeSettings: settings
                        });
                        foundData = true;
                    }
                }

                // Fallback to localStorage if DB empty
                if (!foundData) {
                    console.log("No DB data found, trying localStorage fallbacks...");

                    // Try legacy "built" data
                    const legacyBuild = localStorage.getItem("built-template-data");
                    if (legacyBuild) {
                        setData(JSON.parse(legacyBuild));
                        foundData = true;
                    } else {
                        // Try legacy persist keys
                        const legacyPages = localStorage.getItem("editor-pages-storage");
                        const legacySettings = localStorage.getItem("editor-store-settings-storage");

                        if (legacyPages && legacySettings) {
                            const pData = JSON.parse(legacyPages);
                            const sData = JSON.parse(legacySettings);
                            if (pData?.state?.pages && sData?.state?.storeSettings) {
                                setData({
                                    pages: pData.state.pages,
                                    storeSettings: sData.state.storeSettings
                                });
                                foundData = true;
                            }
                        }
                    }
                }
            } catch (e) {
                console.error("Failed to load build data", e);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <p className="text-lg text-gray-500">Loading build...</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        No Data Found
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Could not load editor data. Please check if your changes are saved.
                    </p>
                    <a
                        href="/editor"
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Return to Editor
                    </a>
                </div>
            </div>
        );
    }

    return (
        <PreviewRenderer pages={data.pages} storeSettings={data.storeSettings} />
    );
};

export default PreviewPage;
