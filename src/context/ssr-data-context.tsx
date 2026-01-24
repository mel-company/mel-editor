import { createContext, useContext, ReactNode } from 'react';
import { ProductType, CategoryType } from '../types';

export interface SSRData {
    products: ProductType[];
    categories: CategoryType[];
}

interface SSRDataContextValue {
    products: ProductType[];
    categories: CategoryType[];
    isSSR: boolean;
}

const SSRDataContext = createContext<SSRDataContextValue>({
    products: [],
    categories: [],
    isSSR: false,
});

export function SSRDataProvider({
    children,
    initialData,
}: {
    children: ReactNode;
    initialData: SSRData;
}) {
    const value: SSRDataContextValue = {
        products: initialData.products || [],
        categories: initialData.categories || [],
        isSSR: true,
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
