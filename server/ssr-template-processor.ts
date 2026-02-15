import * as fs from 'node:fs';
import * as path from 'node:path';
import { ViteDevServer } from 'vite';
import { SSRData } from './ssr-data-fetcher';

export interface TemplateProcessorOptions {
    url: string;
    rootDir: string;
    isProduction: boolean;
    vite?: ViteDevServer;
}

export async function loadHtmlTemplate(options: TemplateProcessorOptions): Promise<string> {
    let template: string;
    if (!options.isProduction && options.vite) {
        template = fs.readFileSync(path.resolve(options.rootDir, 'client/index.html'), 'utf-8');
        // Apply Vite HTML transforms with error handling
        try {
            template = await options.vite.transformIndexHtml(options.url, template);
        } catch (transformError) {
            console.warn('SSR transform warning:', transformError);
            // Continue with original template if transform fails
        }
    } else {
        template = fs.readFileSync(path.resolve(options.rootDir, 'dist/client/index.html'), 'utf-8');
    }
    return template;
}

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

export function generateSEOMetaTags(storeSettings: any): string {
    const storeName = storeSettings.name || 'متجر';
    const storeDescription = storeSettings.description || '';
    const storeLogo = storeSettings.logo?.url || storeSettings.logo?.publicUrl || '';

    let seoTags = '';

    // Open Graph tags for social media
    seoTags += `<meta property="og:title" content="${escapeHtml(storeName)}" />\n    `;
    if (storeDescription) {
        seoTags += `<meta property="og:description" content="${escapeHtml(storeDescription)}" />\n    `;
    }
    if (storeLogo) {
        seoTags += `<meta property="og:image" content="${escapeHtml(storeLogo)}" />\n    `;
    }
    seoTags += `<meta property="og:type" content="website" />\n    `;

    // Twitter Card tags
    seoTags += `<meta name="twitter:card" content="summary_large_image" />\n    `;
    seoTags += `<meta name="twitter:title" content="${escapeHtml(storeName)}" />\n    `;
    if (storeDescription) {
        seoTags += `<meta name="twitter:description" content="${escapeHtml(storeDescription)}" />\n    `;
    }
    if (storeLogo) {
        seoTags += `<meta name="twitter:image" content="${escapeHtml(storeLogo)}" />\n    `;
    }

    // Favicon/Icon
    if (storeLogo) {
        seoTags += `<link rel="icon" type="image/png" href="${escapeHtml(storeLogo)}" />`;
    }

    return seoTags;
}

export function processHtmlTemplate(
    template: string,
    appHtml: string,
    ssrData: SSRData
): string {
    // Inject the app-rendered HTML into the template
    const ssrDataScript = `<script>window.__SSR_DATA__ = ${JSON.stringify(ssrData)};</script>`;
    let html = template
        .replace('<!--ssr-outlet-->', appHtml)
        .replace('<!--ssr-data-->', ssrDataScript);

    // Inject generated styles if available
    if (ssrData.templateConfig?.storeSettings?.styleUrl) {
        html = html.replace('</head>', `<link rel="stylesheet" href="${ssrData.templateConfig.storeSettings.styleUrl}"></head>`);
    }

    // Inject SEO meta tags from store settings
    const storeSettings = ssrData.templateConfig?.storeSettings || {};
    const storeName = storeSettings.name || 'متجر';
    const storeDescription = storeSettings.description || '';

    // Generate SEO meta tags
    const seoTags = generateSEOMetaTags(storeSettings);

    // Replace default title and description with store settings
    html = html.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(storeName)}</title>`);
    if (storeDescription) {
        html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${escapeHtml(storeDescription)}" />`);
    }

    // Inject additional SEO tags at placeholder
    html = html.replace('<!--seo-tags-->', seoTags);

    return html;
}
