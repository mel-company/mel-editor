import React from 'react';
import './index.css';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { SSRDataProvider, SSRData } from './shared/context/ssr-data-context';

import { usePageStore } from './shared/store/editor/page';
import { useStoreSettingsStore } from './shared/store/editor/store-settings';

// Get SSR data injected by server
const fullSSRData: SSRData = (window as any).__SSR_DATA__ || { products: [], categories: [], template: null };
console.log("=== ENTRY CLIENT INITIALIZATION ===");
console.log("Full SSR Data:", fullSSRData);

const { templateConfig, ...ssrData } = fullSSRData;
console.log("Template Config:", templateConfig);
console.log("SSR Data (without templateConfig):", ssrData);

// Hydrate stores immediately if config is present
if (templateConfig) {
    console.log("Template config exists, hydrating stores...");
    if (templateConfig.pages) {
        console.log("Setting pages:", templateConfig.pages);
        usePageStore.getState().setPages(templateConfig.pages);

        if (templateConfig.pages.length > 0) {
            const searchParams = new URLSearchParams(window.location.search);
            const urlPageId = searchParams.get('pageId');
            const isValidUrlPageId = urlPageId && templateConfig.pages.some((p: any) => p.id === urlPageId);

            if (isValidUrlPageId && urlPageId) {
                console.log("Setting current page ID from URL:", urlPageId);
                usePageStore.getState().setCurrentPageId(urlPageId);
            } else {
                const firstPageId = templateConfig.pages[0].id;
                console.log("Setting current page ID to first page:", firstPageId);
                usePageStore.getState().setCurrentPageId(firstPageId);
            }
        }

        // Verify the store was updated
        const storeState = usePageStore.getState();
        console.log("Page store after hydration:");
        console.log("- Pages count:", storeState.pages.length);
        console.log("- Current page ID:", storeState.currentPageId);
        console.log("- Current page:", storeState.getCurrentPage());
    } else {
        console.warn("Template config exists but no pages found");
    }
    if (templateConfig.storeSettings) {
        console.log("Setting store settings:", templateConfig.storeSettings);
        useStoreSettingsStore.getState().setStoreSettings(templateConfig.storeSettings);
    }
} else {
    console.warn("No template config found in SSR data");
}

console.log("=== END ENTRY CLIENT INITIALIZATION ===");

// Remove SSR data from window after reading
delete (window as any).__SSR_DATA__;

hydrateRoot(
    document.getElementById('root')!,
    <React.StrictMode>
        <SSRDataProvider initialData={ssrData} isSSR={false}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </SSRDataProvider>
    </React.StrictMode>
);
