
export const fetchPublishedStoreData = async (key: string) => {
    try {
        const response = await fetch(`/api/v1/published/store/${key}`);
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
    try {
        const response = await fetch(`/api/v1/publish`, {
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
