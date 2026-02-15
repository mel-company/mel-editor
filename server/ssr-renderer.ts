import * as path from 'node:path';
import { Response } from 'express';
import { SSRData } from './ssr-data-fetcher';
import { loadHtmlTemplate, processHtmlTemplate, TemplateProcessorOptions } from './ssr-template-processor';

export interface SSRRendererOptions extends TemplateProcessorOptions {
    ssrData: SSRData;
}

export async function loadServerEntry(options: TemplateProcessorOptions): Promise<any> {
    let render: any;
    if (!options.isProduction && options.vite) {
        const entryPath = path.resolve(options.rootDir, 'client/src/entry-server.tsx');
        const entryModule = await options.vite.ssrLoadModule(entryPath);
        render = entryModule.render;
    } else {
        // Use dynamic import for production build
        const entryPath = path.resolve(options.rootDir, 'dist/server/entry-server.js');
        const entryModule = await import(entryPath);
        render = entryModule.render;
    }
    return render;
}

export async function renderSSRPage(options: SSRRendererOptions): Promise<string> {
    // Load HTML template
    const template = await loadHtmlTemplate(options);

    // Load server entry
    const render = await loadServerEntry(options);

    // Render the app HTML
    const { html: appHtml } = render(options.url, options.ssrData);

    // Process the HTML template with app content and SSR data
    return processHtmlTemplate(template, appHtml, options.ssrData);
}

export function sendSSRResponse(res: Response, html: string): void {
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
}
