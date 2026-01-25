import React from 'react';
import './index.css';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { SSRDataProvider, SSRData } from './context/ssr-data-context';

import { usePageStore } from './store/editor/page';
import { useStoreSettingsStore } from './store/editor/store-settings';

// Get SSR data injected by server
const fullSSRData: SSRData = (window as any).__SSR_DATA__ || { products: [], categories: [], template: null };
const { templateConfig, ...ssrData } = fullSSRData;

// Hydrate stores immediately if config is present
if (templateConfig) {
    if (templateConfig.pages) {
        usePageStore.getState().setPages(templateConfig.pages);
        if (templateConfig.pages.length > 0) {
            usePageStore.getState().setCurrentPageId(templateConfig.pages[0].id);
        }
    }
    if (templateConfig.storeSettings) {
        useStoreSettingsStore.getState().setStoreSettings(templateConfig.storeSettings);
    }
}

// Remove SSR data from window after reading
delete (window as any).__SSR_DATA__;

hydrateRoot(
    document.getElementById('root')!,
    <React.StrictMode>
        <SSRDataProvider initialData={ssrData}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </SSRDataProvider>
    </React.StrictMode>
);
