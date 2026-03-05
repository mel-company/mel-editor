import { CategoryType } from "@/shared/types";
import { useState, useEffect } from "react";
import { fetchCategories } from "@shared-data";
import { imageLink } from "@/shared/api/imageLink";

// Extended type to handle both old template structure and new API structure
type ExtendedCategoryType = CategoryType & {
    thumbnail?: {
        url?: string;
        base64Content?: string;
    };
    image?: string;
    _count?: {
        products: number;
    };
};

// Custom hook for fetching categories
const useCategories = (shouldFetch = true) => {
    const [categories, setCategories] = useState<ExtendedCategoryType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!shouldFetch) {
            setLoading(false);
            return;
        }

        const loadCategories = async () => {
            try {
                setLoading(true);
                const data = await fetchCategories();
                setCategories(data || []);
            } catch (err) {
                setError('Failed to fetch categories');
                console.error('Error fetching categories:', err);
            } finally {
                setLoading(false);
            }
        };

        loadCategories();
    }, [shouldFetch]);

    return { categories, loading, error };
};

// Categories 1: Grid
export const CategoriesSection = ({
    categories: passedCategories,
    isEditor = false
}: {
    categories?: CategoryType[];
    isEditor?: boolean;
}) => {
    const { categories: fetchedCategories, loading, error } = useCategories(!isEditor);

    // Use passed categories in editor mode, fetched categories in production
    const categories = isEditor ? (passedCategories || []) : fetchedCategories;

    if (loading && !isEditor) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                    {[...Array(8)].map((_, index) => (
                        <div key={index} className="group flex flex-col items-center gap-3 p-6 bg-white border border-slate-200 rounded-xl animate-pulse">
                            <div className="w-20 h-20 rounded-full bg-slate-200"></div>
                            <div className="h-4 bg-slate-200 rounded w-12"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error || !categories || categories.length === 0) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="text-center text-slate-500 py-12">
                    لا توجد تصنيفات لعرضها
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {categories.map((category, index) => {
                    // Handle both old thumbnail structure and new image structure
                    const imageUrl = imageLink(category.image as string)

                    return (
                        <div
                            key={category.id || index}
                            className="group flex flex-col items-center gap-3 p-6 bg-white border border-slate-200 rounded-xl hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer"
                        >
                            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center">
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={category.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                                        <span className="text-2xl">📦</span>
                                    </div>
                                )}
                            </div>
                            <p className="text-center text-xs sm:text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                                {category.name}
                            </p>
                            {category._count && (
                                <p className="text-center text-xs text-slate-500">
                                    {category._count?.products || 0} منتج
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Categories 2: Grid with Title
export const CategoriesSection2 = ({
    categories: passedCategories,
    content,
    isEditor = false
}: {
    categories?: CategoryType[];
    content?: { title?: string };
    isEditor?: boolean;
}) => {
    const { categories: fetchedCategories, loading, error } = useCategories(!isEditor);

    // Use passed categories in editor mode, fetched categories in production
    const categories = isEditor ? (passedCategories || []) : fetchedCategories;

    if (loading && !isEditor) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {content?.title && (
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center" data-type="text" data-name="title" data-title="العنوان">{content.title}</h2>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                    {[...Array(8)].map((_, index) => (
                        <div key={index} className="group flex flex-col items-center gap-2 p-4 bg-linear-to-br from-slate-50 to-white border border-slate-200 rounded-lg animate-pulse">
                            <div className="w-16 h-16 rounded-lg bg-slate-200"></div>
                            <div className="h-3 bg-slate-200 rounded w-12"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error || !categories || categories.length === 0) {
        return (
            <div className="container mx-auto px-4 py-12">
                {content?.title && (
                    <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center" data-type="text" data-name="title" data-title="العنوان">{content.title}</h2>
                )}
                <div className="text-center text-slate-500 py-12">
                    لا توجد تصنيفات لعرضها
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {content?.title && (
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center" data-type="text" data-name="title" data-title="العنوان">{content.title}</h2>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                {categories.map((category, index) => {
                    const imageUrl = (category as ExtendedCategoryType).thumbnail?.base64Content ||
                        (category as ExtendedCategoryType).thumbnail?.url ||
                        (category as ExtendedCategoryType).image ||
                        "";

                    return (
                        <div
                            key={category.id || index}
                            className="group flex flex-col items-center gap-2 p-4 bg-linear-to-br from-slate-50 to-white border border-slate-200 rounded-lg hover:shadow-md hover:border-blue-400 transition-all duration-300 cursor-pointer"
                        >
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center">
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={category.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                                        <span className="text-xl">📦</span>
                                    </div>
                                )}
                            </div>
                            <p className="text-center text-xs font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                                {category.name}
                            </p>
                            {(category as ExtendedCategoryType)._count && (
                                <p className="text-center text-xs text-slate-500">
                                    {(category as ExtendedCategoryType)._count?.products || 0} منتج
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Categories 3: Horizontal Scroll
export const CategoriesSection3 = ({
    categories: passedCategories,
    content,
    isEditor = false
}: {
    categories?: CategoryType[];
    content?: { title?: string };
    isEditor?: boolean;
}) => {
    const { categories: fetchedCategories, loading, error } = useCategories(!isEditor);

    // Use passed categories in editor mode, fetched categories in production
    const categories = isEditor ? (passedCategories || []) : fetchedCategories;

    if (loading && !isEditor) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {content?.title && (
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8" data-type="text" data-name="title" data-title="العنوان">{content.title}</h2>
                )}
                <div className="overflow-x-auto pb-4 -mx-4 sm:mx-0 px-4 sm:px-0">
                    <div className="flex gap-3 sm:gap-4 w-max">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="group flex flex-col items-center gap-3 p-5 bg-white border border-slate-200 rounded-xl animate-pulse shrink-0 w-32">
                                <div className="w-20 h-20 rounded-full bg-slate-200"></div>
                                <div className="h-4 bg-slate-200 rounded w-16"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error || !categories || categories.length === 0) {
        return (
            <div className="container mx-auto px-4 py-12">
                {content?.title && (
                    <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center" data-type="text" data-name="title" data-title="العنوان">{content.title}</h2>
                )}
                <div className="text-center text-slate-500 py-12">
                    لا توجد تصنيفات لعرضها
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {content?.title && (
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8" data-type="text" data-name="title" data-title="العنوان">{content.title}</h2>
            )}
            <div className="overflow-x-auto pb-4 -mx-4 sm:mx-0 px-4 sm:px-0">
                <div className="flex gap-3 sm:gap-4 w-max">
                    {categories.map((category, index) => {
                        const imageUrl = (category as ExtendedCategoryType).thumbnail?.base64Content ||
                            (category as ExtendedCategoryType).thumbnail?.url ||
                            (category as ExtendedCategoryType).image ||
                            "";

                        return (
                            <div
                                key={category.id || index}
                                className="group flex flex-col items-center gap-3 p-5 bg-white border border-slate-200 rounded-xl hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer shrink-0 w-32"
                            >
                                <div className="relative w-20 h-20 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center">
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt={category.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                                            <span className="text-2xl">📦</span>
                                        </div>
                                    )}
                                </div>
                                <p className="text-center text-xs sm:text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                                    {category.name}
                                </p>
                                {(category as ExtendedCategoryType)._count && (
                                    <p className="text-center text-xs text-slate-500">
                                        {(category as ExtendedCategoryType)._count?.products || 0} منتج
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// Categories 4: Large Cards
export const CategoriesSection4 = ({
    categories: passedCategories,
    content,
    isEditor = false
}: {
    categories?: CategoryType[];
    content?: { title?: string };
    isEditor?: boolean;
}) => {
    const { categories: fetchedCategories, loading, error } = useCategories(!isEditor);

    // Use passed categories in editor mode, fetched categories in production
    const categories = isEditor ? (passedCategories || []) : fetchedCategories;

    if (loading && !isEditor) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {content?.title && (
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center" data-type="text" data-name="title" data-title="العنوان">{content.title}</h2>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="group relative overflow-hidden bg-linear-to-br from-slate-100 to-slate-200 rounded-2xl animate-pulse">
                            <div className="aspect-square flex items-center justify-center p-8">
                                <div className="w-full h-full bg-slate-300 rounded-xl"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error || !categories || categories.length === 0) {
        return (
            <div className="container mx-auto px-4 py-12">
                {content?.title && (
                    <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center" data-type="text" data-name="title" data-title="العنوان">{content.title}</h2>
                )}
                <div className="text-center text-slate-500 py-12">
                    لا توجد تصنيفات لعرضها
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {content?.title && (
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center" data-type="text" data-name="title" data-title="العنوان">{content.title}</h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {categories.map((category, index) => {
                    const imageUrl = (category as ExtendedCategoryType).thumbnail?.base64Content ||
                        (category as ExtendedCategoryType).thumbnail?.url ||
                        (category as ExtendedCategoryType).image ||
                        "";

                    return (
                        <div
                            key={category.id || index}
                            className="group relative overflow-hidden bg-linear-to-br from-slate-100 to-slate-200 rounded-2xl hover:shadow-xl transition-all duration-300 cursor-pointer"
                        >
                            <div className="aspect-square flex items-center justify-center p-8">
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={category.name}
                                        className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                                        <span className="text-4xl">📦</span>
                                    </div>
                                )}
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-4">
                                <p className="text-white font-bold text-lg">{category.name}</p>
                                {(category as ExtendedCategoryType)._count && (
                                    <p className="text-white/80 text-sm">
                                        {(category as ExtendedCategoryType)._count?.products || 0} منتج
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Categories 5: List Style
export const CategoriesSection5 = ({
    categories: passedCategories,
    content,
    isEditor = false
}: {
    categories?: CategoryType[];
    content?: { title?: string };
    isEditor?: boolean;
}) => {
    const { categories: fetchedCategories, loading, error } = useCategories(!isEditor);

    // Use passed categories in editor mode, fetched categories in production
    const categories = isEditor ? (passedCategories || []) : fetchedCategories;

    if (loading && !isEditor) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {content?.title && (
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8" data-type="text" data-name="title" data-title="العنوان">{content.title}</h2>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="group flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-lg animate-pulse">
                            <div className="w-16 h-16 rounded-lg bg-slate-200 shrink-0"></div>
                            <div className="flex-1">
                                <div className="h-4 bg-slate-200 rounded w-24 mb-2"></div>
                                <div className="h-3 bg-slate-200 rounded w-16"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error || !categories || categories.length === 0) {
        return (
            <div className="container mx-auto px-4 py-12">
                {content?.title && (
                    <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center" data-type="text" data-name="title" data-title="العنوان">{content.title}</h2>
                )}
                <div className="text-center text-slate-500 py-12">
                    لا توجد تصنيفات لعرضها
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {content?.title && (
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8" data-type="text" data-name="title" data-title="العنوان">{content.title}</h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {categories.map((category, index) => {
                    const imageUrl = (category as ExtendedCategoryType).thumbnail?.base64Content ||
                        (category as ExtendedCategoryType).thumbnail?.url ||
                        (category as ExtendedCategoryType).image ||
                        "";

                    return (
                        <div
                            key={category.id || index}
                            className="group flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-lg hover:shadow-md hover:border-blue-400 transition-all duration-300 cursor-pointer"
                        >
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center shrink-0">
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={category.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                                        <span className="text-xl">📦</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-base font-medium text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                                    {category.name}
                                </p>
                                {(category as ExtendedCategoryType)._count && (
                                    <p className="text-sm text-slate-500">
                                        {(category as ExtendedCategoryType)._count?.products || 0} منتج
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
