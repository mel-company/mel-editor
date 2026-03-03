
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

export const publishStore = async () => {
    const url = import.meta.env.VITE_EDITOR_API_URL || 'http://localhost:4000/api/v1'

    try {
        const response = await fetch(`${url}/publish`, {
            method: 'POST',
        });
        if (!response.ok) {
            throw new Error('Failed to publish store');
        }
        return await response.json();
    } catch (error) {
        console.error('Error publishing store:', error);
        throw error;
    }
};
