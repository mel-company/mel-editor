export function resolveStore(host) {
    // Simple mapping for dev verification
    // localhost:5173 -> store-1 (default)
    // store2.localhost -> store-2
    if (host && host.includes('store2')) {
        return 'store-2';
    }
    return 'store-1'; // Default store
}

export async function getMockData(storeId, vite, isProduction) {
    if (!isProduction && vite) {
        // In dev, load fresh mocks via Vite to get HMR updates if mocks change
        // Path relative to root of vite project?
        // Original was '/src/mock/server-export.ts'
        // New path '/src/templates/data/server-export.ts'
        const mockModule = await vite.ssrLoadModule('/src/templates/data/server-export.ts');

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
