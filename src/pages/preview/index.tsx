import React, { useEffect, useState } from "react";
import PreviewRenderer from "../../components/preview/preview-renderer";

const PreviewPage = () => {
    const [data, setData] = useState<{ pages: any; storeSettings: any } | null>(
        null
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedData = localStorage.getItem("built-template-data");
            if (storedData) {
                setData(JSON.parse(storedData));
            }
        } catch (e) {
            console.error("Failed to load build data", e);
        } finally {
            setLoading(false);
        }
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
                        No Build Found
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Please go back to the editor and click the <strong>"Build"</strong>{" "}
                        button to generate a new preview.
                    </p>
                    <a
                        href="/"
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Go to Editor
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
