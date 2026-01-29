import React from 'react';
import './index.css';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { SSRDataProvider, SSRData } from './shared/context/ssr-data-context';

export function render(url: string, ssrData: SSRData) {
    const html = renderToString(
        <React.StrictMode>
            <SSRDataProvider initialData={ssrData}>
                <StaticRouter location={url}>
                    <App />
                </StaticRouter>
            </SSRDataProvider>
        </React.StrictMode>
    );

    return { html };
}
