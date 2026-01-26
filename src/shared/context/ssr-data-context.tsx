import { createContext, useContext, ReactNode } from 'react';
import { ProductType, CategoryType, TemplateType } from '../types';

export interface SSRData {
    products: ProductType[];
    categories: CategoryType[];
    template: TemplateType | null;
    templateConfig?: {
        pages: any[];
        storeSettings: any;
    };
}

interface SSRDataContextValue {
    products: ProductType[];
    categories: CategoryType[];
    template: TemplateType | null;
    templateConfig?: {
        pages: any[];
        storeSettings: any;
    };
    isSSR: boolean;
}

const SSRDataContext = createContext<SSRDataContextValue>({
    products: [],
    categories: [],
    template: null,
    templateConfig: undefined,
    isSSR: false,
});

export function SSRDataProvider({
    children,
    initialData,
    isSSR = true,
}: {
    children: ReactNode;
    initialData: SSRData;
    isSSR?: boolean;
}) {
    const value: SSRDataContextValue = {
        products: initialData.products || [],
        categories: initialData.categories || [],
        template: initialData.template || null,
        templateConfig: initialData.templateConfig,
        isSSR: isSSR,
    };

    return (
        <SSRDataContext.Provider value={value}>
            {children}
        </SSRDataContext.Provider>
    );
}

/**
 * Hook to access SSR products
 * Returns products from SSR context if available
 */
export function useSSRProducts(): ProductType[] {
    const context = useContext(SSRDataContext);
    return context.products;
}

/**
 * Hook to access SSR categories
 * Returns categories from SSR context if available
 */
export function useSSRCategories(): CategoryType[] {
    const context = useContext(SSRDataContext);
    return context.categories;
}

/**
 * Hook to access SSR template
 * Returns template from SSR context if available
 */
export function useSSRTemplate(): TemplateType | null {
    const context = useContext(SSRDataContext);
    return context.template;
}

/**
 * Hook to check if running in SSR context
 */
export function useIsSSR(): boolean {
    const context = useContext(SSRDataContext);
    return context.isSSR;
}

/**
 * Hook to access all SSR data
 */
export function useSSRData(): SSRDataContextValue {
    return useContext(SSRDataContext);
}
