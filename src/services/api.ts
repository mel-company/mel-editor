// Get API base URL from environment or use default
const getApiBaseUrl = (): string => {
    try {
        const envUrl = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:3000';
        return envUrl;
    } catch {
        return 'http://localhost:3000';
    }
};

const API_BASE_URL = getApiBaseUrl();

export interface ApiTemplateResponse {
    data: Array<{
        id: string;
        image: string | null;
        name: string;
        description: string;
        body: {
            ui: {
                footer: any;
                header: any;
            };
            api: any;
            seo: any;
            meta: any;
            pages: any[];
            store: any;
            design: any;
            features: any;
            analytics: any;
            notifications: any;
        };
        is_active: boolean;
        is_deleted: boolean;
        deleted_at: string | null;
        createdAt: string;
        updatedAt: string;
    }>;
    total: number;
    page: number;
    limit: number;
}

/**
 * Fetch active templates from the backend
 */
export const getActiveTemplates = async (): Promise<ApiTemplateResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}/template/active`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Failed to fetch templates:', {
                status: response.status,
                statusText: response.statusText,
                error: errorText,
            });
            throw new Error(`Failed to fetch templates: ${response.status} ${response.statusText}`);
        }

        const data: ApiTemplateResponse = await response.json();
        return data;
    } catch (error: any) {
        console.error('Error fetching active templates:', error);
        // Re-throw with more context
        if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
            throw new Error('لا يمكن الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت أو إعدادات الخادم.');
        }
        throw error;
    }
};

/**
 * Get template by ID to fetch current data
 */
export const getTemplateById = async (templateId: string): Promise<ApiTemplateResponse["data"][0] | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/template/${templateId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            console.warn(`Could not fetch template ${templateId}: ${response.status} ${response.statusText}`);
            return null;
        }

        const data = await response.json();
        return data.data || data;
    } catch (error: any) {
        // Silently fail - we'll use defaults
        console.warn('Error fetching template (using defaults):', error.message);
        return null;
    }
};

/**
 * Update template with edited data
 * Format: { image, name, description, body, is_active }
 */
export const updateTemplate = async (
    templateId: string,
    templateData: {
        image?: string | null;
        name?: string;
        description?: string;
        body: any;
        is_active?: boolean;
    }
): Promise<any> => {
    try {
        // Try to get current template data with timeout (don't wait too long)
        // If it fails or takes too long, use defaults (don't block the update)
        let currentTemplate: ApiTemplateResponse["data"][0] | null = null;

        // Use Promise.race to timeout after 2 seconds
        try {
            const timeoutPromise = new Promise<null>((resolve) => {
                setTimeout(() => resolve(null), 2000);
            });

            currentTemplate = await Promise.race([
                getTemplateById(templateId),
                timeoutPromise,
            ]) as ApiTemplateResponse["data"][0] | null;

            if (!currentTemplate) {
                console.warn('Template fetch timed out or failed, using defaults');
            }
        } catch (err) {
            console.warn('Could not fetch current template, using defaults:', err);
        }

        // Prepare the update payload according to API spec
        const payload = {
            image: templateData.image ?? currentTemplate?.image ?? null,
            name: templateData.name ?? currentTemplate?.name ?? "Template",
            description: templateData.description ?? currentTemplate?.description ?? "",
            body: templateData.body,
            is_active: templateData.is_active ?? currentTemplate?.is_active ?? true,
        };

        console.log(`🔄 Updating template: PATCH ${API_BASE_URL}/template/${templateId}`, {
            name: payload.name,
            hasBody: !!payload.body,
            is_active: payload.is_active,
        });

        const response = await fetch(`${API_BASE_URL}/template/${templateId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Update template error:', {
                status: response.status,
                statusText: response.statusText,
                error: errorText,
            });

            // Provide more helpful error messages
            if (response.status === 500) {
                throw new Error('خطأ في الخادم. يرجى التحقق من اتصال قاعدة البيانات أو المحاولة لاحقاً.');
            } else if (response.status === 404) {
                throw new Error('القالب غير موجود. يرجى التحقق من معرف القالب.');
            } else {
                throw new Error(`فشل تحديث القالب: ${response.status} ${response.statusText}`);
            }
        }

        const data = await response.json();
        console.log(`✅ Successfully updated template`);
        return data;
    } catch (error: any) {
        console.error('Error updating template:', error);

        // Provide user-friendly error messages
        if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
            throw new Error('لا يمكن الاتصال بالخادم. يرجى التحقق من:\n1. اتصال الإنترنت\n2. إعدادات الخادم\n3. اتصال قاعدة البيانات');
        }

        throw error;
    }
};

/**
 * Save template as new version
 */
export const saveTemplate = async (templateData: {
    name: string;
    description: string;
    body: any;
}): Promise<any> => {
    try {
        const response = await fetch(`${API_BASE_URL}/template`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(templateData),
        });

        if (!response.ok) {
            throw new Error(`Failed to save template: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error saving template:', error);
        throw error;
    }
};

// Import mock data for fallback
import { mockProducts } from '../mock/products';
import { mockCategories } from '../mock/categories';
import { ProductType, CategoryType } from '../types';

export interface ProductsResponse {
    data: ProductType[];
    total?: number;
    page?: number;
    limit?: number;
}

export interface CategoriesResponse {
    data: CategoryType[];
    total?: number;
    page?: number;
    limit?: number;
}

/**
 * Fetch products from the backend API
 * Falls back to mock data if API is unavailable
 */
export const fetchProducts = async (): Promise<ProductType[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            console.warn(`Products API returned ${response.status}, using mock data`);
            return mockProducts;
        }

        const data: ProductsResponse = await response.json();
        return data.data || data || mockProducts;
    } catch (error: any) {
        console.warn('⚠️ Could not fetch products from API, using mock data:', error.message);
        return mockProducts;
    }
};

/**
 * Fetch categories from the backend API
 * Falls back to mock data if API is unavailable
 */
export const fetchCategories = async (): Promise<CategoryType[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            console.warn(`Categories API returned ${response.status}, using mock data`);
            return mockCategories;
        }

        const data: CategoriesResponse = await response.json();
        return data.data || data || mockCategories;
    } catch (error: any) {
        console.warn('⚠️ Could not fetch categories from API, using mock data:', error.message);
        return mockCategories;
    }
};
