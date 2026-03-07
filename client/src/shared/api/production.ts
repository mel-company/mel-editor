
export const generateStyles = async () => {
    const url = import.meta.env.VITE_EDITOR_API_URL || 'http://localhost:4000/api/v1'

    try {
        const response = await fetch(`${url}/generate-styles`, {
            method: 'POST',
        });
        if (!response.ok) {
            throw new Error('Failed to generate styles');
        }
        return await response.json();
    } catch (error) {
        console.error('Error generating styles:', error);
        throw error;
    }
};

export const fetchPublishedStoreData = async (key: string) => {
    const url = import.meta.env.VITE_EDITOR_API_URL || 'http://localhost:4000/api/v1'

    try {
        // Use existing /store/:key endpoint (no separate published store yet)
        const response = await fetch(`${url}/store/${key}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${key}`);
        }
        const json = await response.json();
        return json.data;
    } catch (error) {
        console.error(`Error fetching published ${key}:`, error);
        return null;
    }
};

export const publishStore = async (pages: any, storeSettings: any) => {
    const url = import.meta.env.VITE_EDITOR_API_URL || 'http://localhost:4000/api/v1'

    try {
        console.log('📤 Starting publish process...');
        console.log('API URL:', url);

        if (!pages || !storeSettings) {
            throw new Error('No store data found to publish');
        }

        const payload = {
            pages,
            storeSettings,
        };

        console.log('Publishing payload:', {
            pagesCount: Array.isArray(payload.pages) ? payload.pages.length : 'not an array',
            hasSettings: !!payload.storeSettings,
            settingsKeys: payload.storeSettings ? Object.keys(payload.storeSettings) : 'none',
            fonts: payload.storeSettings?.fonts,
            storeSettings: payload.storeSettings,
            // Log first few pages to see what's being published
            firstPage: payload.pages?.[0],
            firstPageSections: payload.pages?.[0]?.sections?.slice(0, 3),
            allPageIds: payload.pages?.map(p => ({ id: p.id, name: p.name, sectionsCount: p.sections?.length || 0 }))
        });

        const response = await fetch(`${url}/publish`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            throw new Error('Failed to publish store');
        }

        const result = await response.json();
        console.log('✅ Publish successful:', result);
        return result;
    } catch (error) {
        console.error('❌ Error publishing store:', error);
        throw error;
    }
};
