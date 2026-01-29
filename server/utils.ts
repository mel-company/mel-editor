import { ViteDevServer } from 'vite';

export function resolveStore(host: string | undefined): string {
    if (!host) return 'store-1';
    if (!host) return 'demo';

    // Remove port number if present
    const cleanHost = host.split(':')[0];

    // Check if localhost or IP
    if (cleanHost === 'localhost' || cleanHost === '127.0.0.1') {
        return 'demo';
    }

    // Split by dot to find subdomain
    const parts = cleanHost.split('.');

    // Scenario: subdomain.domain.com (parts.length >= 3)
    // Scenario: subdomain.localhost (parts.length >= 2) - typically for dev

    if (parts.length > 2 || (parts.length === 2 && parts[1] === 'localhost')) {
        const subdomain = parts[0];
        // Reserved subdomains or www could be filtered here if needed
        if (subdomain === 'www') return 'demo';

        return subdomain;
    }

    return 'demo'; // Default store (root domain)
}

export async function getMockData(storeId: string, vite: ViteDevServer | undefined, isProduction: boolean) {
    if (!isProduction && vite) {
        // In dev, load fresh mocks via Vite to get HMR updates if mocks change
        // Path relative to root of vite project?
        // Original was '/src/mock/server-export.ts'
        // New path '/src/templates/data/server-export.ts'
        const mockPath = '../templates/ecommerce/retail-v1/data/server-export.ts';
        const mockModule = await vite.ssrLoadModule(mockPath);

        // In a real scenario, we would filter mockModule data by storeId here
        // For now, we return the same mocks but logged the storeId access
        console.log(`[Server] Fetching data for store: ${storeId}`);

        return mockModule;
    } else {
        // Production fallback (should load from built files or DB?)
        // Original was empty fallback basically
        return { mockProducts: [], mockCategories: [], mockTemplate: null };
    }
}
