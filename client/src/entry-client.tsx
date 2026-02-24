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

const { templateConfig, ...ssrData } = fullSSRData;

// Hydrate stores immediately if config is present
if (templateConfig) {
    if (templateConfig.pages) {
        usePageStore.getState().setPages(templateConfig.pages);

        if (templateConfig.pages.length > 0) {
            // Set current page based on URL or default to first page
            const urlPageId = window.location.pathname.split('/').pop();
            const isValidUrlPageId = urlPageId && templateConfig.pages.some((p: any) => p.id === urlPageId);

            if (isValidUrlPageId && urlPageId) {
                usePageStore.getState().setCurrentPageId(urlPageId);
            } else {
                const firstPageId = templateConfig.pages[0].id;
                usePageStore.getState().setCurrentPageId(firstPageId);
            }
        }
    } else {
        console.warn("Template config exists but no pages found");
    }
    if (templateConfig.storeSettings) {
        useStoreSettingsStore.getState().setStoreSettings(templateConfig.storeSettings);
    }
} else {
    console.warn("No template config found in SSR data");
}

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
