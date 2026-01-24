import React from 'react';
import './index.css';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { SSRDataProvider, SSRData } from './context/ssr-data-context';

// Get SSR data injected by server
const ssrData: SSRData = (window as any).__SSR_DATA__ || { products: [], categories: [] };

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
