import { ProductType } from "@/shared/types";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStoreSettingsStore } from "@/shared/store/editor/store-settings";
import { useCartStore } from "@/shared/store/cart";
import { useState, useEffect } from "react";
import { fetchProducts } from "@shared-data";
import { imageLink } from "@/shared/api/imageLink";

// Custom hook for fetching products
const useProducts = (shouldFetch = true) => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!shouldFetch) {
            setLoading(false);
            return;
        }

        const loadProducts = async () => {
            try {
                setLoading(true);
                const data = await fetchProducts();
                setProducts(data || []);
            } catch (err) {
                setError('Failed to fetch products');
                console.error('Error fetching products:', err);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [shouldFetch]);

    return { products, loading, error };
};

// Common components
const ProductCard = ({
    product,
    variant = "default",
    onClick,
    cartItem,
    isRestaurant,
    onAddToCart,
}: {
    product: ProductType;
    index: number;
    variant?: "default" | "carousel" | "large" | "compact" | "list";
    onClick: () => void;
    cartItem?: { quantity: number };
    isRestaurant: boolean;
    onAddToCart: (e: React.MouseEvent) => void;
}) => {
    const imageUrl = imageLink(product.image);
    const finalPrice = product.price;

    const baseClasses = {
        default: "bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer",
        carousel: "bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 w-64 shrink-0 flex flex-col cursor-pointer",
        large: "bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer",
        compact: "bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer",
        list: "flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
    };

    const imageSizes = {
        default: "w-12 h-12",
        carousel: "w-12 h-12",
        large: "w-16 h-16",
        compact: "w-8 h-8",
        list: "w-8 h-8"
    };

    const titleSizes = {
        default: "text-sm sm:text-base font-semibold text-slate-900 mb-2 line-clamp-2",
        carousel: "text-sm sm:text-base font-semibold text-slate-900 mb-2 line-clamp-2",
        large: "text-xl font-bold text-slate-900 mb-3",
        compact: "text-xs font-semibold text-slate-900 mb-1 line-clamp-2",
        list: "text-base font-semibold text-slate-900 mb-1"
    };

    const priceSizes = {
        default: "text-base sm:text-lg font-bold text-green-600",
        carousel: "text-base sm:text-lg font-bold text-green-600",
        large: "text-2xl font-bold text-green-600",
        compact: "text-sm font-bold text-green-600",
        list: "text-lg font-bold text-green-600"
    };

    const buttonSizes = {
        default: "bg-blue-600 text-white p-1.5 sm:p-2 rounded-lg hover:bg-blue-700 transition-colors shrink-0",
        carousel: "bg-blue-600 text-white p-1.5 sm:p-2 rounded-lg hover:bg-blue-700 transition-colors shrink-0",
        large: "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shrink-0",
        compact: "bg-blue-600 text-white p-1 rounded hover:bg-blue-700 transition-colors shrink-0",
        list: "bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors shrink-0"
    };

    const iconSizes = {
        default: "w-3 h-3 sm:w-4 sm:h-4",
        carousel: "w-3 h-3 sm:w-4 sm:h-4",
        large: "w-5 h-5",
        compact: "w-3 h-3",
        list: "w-4 h-4"
    };

    if (variant === "list") {
        return (
            <div className={baseClasses[variant]} onClick={onClick}>
                <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = "none";
                            }}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <ShoppingCart className={imageSizes[variant]} />
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className={titleSizes[variant]}>{product.name}</h3>
                    {product.description && (
                        <p className="text-sm text-slate-600 line-clamp-2 mb-2">
                            {product.description}
                        </p>
                    )}
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className={priceSizes[variant]}>{finalPrice} ر.س</span>
                        </div>
                        {!isRestaurant && (
                            <button
                                onClick={onAddToCart}
                                className={buttonSizes[variant]}
                                title={cartItem ? `في السلة (${cartItem.quantity})` : "أضف للسلة"}
                            >
                                <ShoppingCart className={iconSizes[variant]} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={baseClasses[variant]} onClick={onClick}>
            <div className="relative overflow-hidden bg-slate-100 aspect-square">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                        }}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <ShoppingCart className={imageSizes[variant]} />
                    </div>
                )}
            </div>
            <div className={`p-${variant === "compact" ? "2" : variant === "large" ? "6" : "3 sm:p-4"} flex-1 flex flex-col`}>
                <h3 className={titleSizes[variant]}>{product.name}</h3>
                {product.description && (
                    <p className={`text-xs sm:text-sm text-slate-600 mb-${variant === "large" ? "4" : "3"} line-clamp-${variant === "large" ? "3" : "2"} flex-1`}>
                        {product.description}
                    </p>
                )}
                <div className={`flex items-center justify-between mt-auto gap-${variant === "large" ? "3" : "2"}`}>
                    <div className="flex flex-col min-w-0 flex-1">
                        <span className={priceSizes[variant]}>{finalPrice} ر.س</span>
                    </div>
                    {!isRestaurant && (
                        <button
                            onClick={onAddToCart}
                            className={buttonSizes[variant]}
                            title={cartItem ? `في السلة (${cartItem.quantity})` : "أضف للسلة"}
                        >
                            <ShoppingCart className={iconSizes[variant]} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const SectionHeader = ({ title, viewAllLink, titleSize = "text-3xl" }: {
    title: string;
    viewAllLink?: string;
    titleSize?: string;
}) => (
    <div className="flex items-center justify-between mb-8">
        <h2
            className={`${titleSize} font-bold`}
            data-type="text"
            data-name="title"
            data-title="العنوان"
        >
            {title}
        </h2>
        {viewAllLink && (
            <a
                href={viewAllLink}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
                مشاهدة الكل →
            </a>
        )}
    </div>
);

const EmptyState = ({ title }: { title: string }) => (
    <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
        <div className="text-center text-slate-500 py-12">
            لا توجد منتجات لعرضها
        </div>
    </div>
);

// Products 1: Grid
export const RecentProducts = ({
    content,
    products: passedProducts,
    view_all_link,
    isEditor = false,
}: {
    content: { title: string };
    products?: ProductType[];
    view_all_link: string;
    isEditor?: boolean;
}) => {
    const { products: fetchedProducts, loading, error } = useProducts(!isEditor);
    const navigate = useNavigate();
    const { storeSettings } = useStoreSettingsStore();
    const { addItem, items } = useCartStore();
    const isRestaurant = storeSettings.type === "restaurant";

    // Use passed products in editor mode, fetched products in production
    const products = isEditor ? (passedProducts || []) : fetchedProducts;

    if (loading && !isEditor) {
        return (
            <div className="container mx-auto px-4 py-12">
                <SectionHeader title={content.title} viewAllLink={view_all_link} />
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {[...Array(8)].map((_, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
                            <div className="aspect-square bg-slate-200"></div>
                            <div className="p-3 sm:p-4">
                                <div className="h-4 bg-slate-200 rounded mb-2"></div>
                                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error || !products || products.length === 0) {
        return <EmptyState title={content.title} />;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <SectionHeader title={content.title} viewAllLink={view_all_link} />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product, index) => {
                    const cartItem = items.find((item) => item.product.id === product.id);

                    return (
                        <ProductCard
                            key={product.id || index}
                            product={product}
                            index={index}
                            variant="default"
                            onClick={() => {
                                if (product.id) {
                                    navigate(`/product/${product.id}`);
                                }
                            }}
                            cartItem={cartItem}
                            isRestaurant={isRestaurant}
                            onAddToCart={(e) => {
                                e.stopPropagation();
                                addItem(product, 1);
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

// Products 2: Carousel
export const RecentProductsCarousel = ({
    content,
    products: passedProducts,
    view_all_link,
    isEditor = false,
}: {
    content: { title: string };
    products?: ProductType[];
    view_all_link: string;
    isEditor?: boolean;
}) => {
    const { products: fetchedProducts, loading, error } = useProducts(!isEditor);
    const navigate = useNavigate();
    const { storeSettings } = useStoreSettingsStore();
    const { addItem, items } = useCartStore();
    const isRestaurant = storeSettings.type === "restaurant";

    // Use passed products in editor mode, fetched products in production
    const products = isEditor ? (passedProducts || []) : fetchedProducts;

    if (loading && !isEditor) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
                    <SectionHeader title={content.title} viewAllLink={view_all_link} titleSize="text-2xl sm:text-3xl" />
                </div>
                <div className="overflow-x-auto pb-4 -mx-4 sm:mx-0 px-4 sm:px-0">
                    <div className="flex gap-3 sm:gap-4 w-max">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden w-64 shrink-0 animate-pulse">
                                <div className="aspect-square bg-slate-200"></div>
                                <div className="p-3 sm:p-4">
                                    <div className="h-4 bg-slate-200 rounded mb-2"></div>
                                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error || !products || products.length === 0) {
        return <EmptyState title={content.title} />;
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
                <SectionHeader title={content.title} viewAllLink={view_all_link} titleSize="text-2xl sm:text-3xl" />
            </div>
            <div className="overflow-x-auto pb-4 -mx-4 sm:mx-0 px-4 sm:px-0">
                <div className="flex gap-3 sm:gap-4 w-max">
                    {products.map((product, index) => {
                        const cartItem = items.find(
                            (item) => item.product.id === product.id
                        );

                        return (
                            <ProductCard
                                key={product.id || index}
                                product={product}
                                index={index}
                                variant="carousel"
                                onClick={() => {
                                    if (product.id) {
                                        navigate(`/product/${product.id}`);
                                    }
                                }}
                                cartItem={cartItem}
                                isRestaurant={isRestaurant}
                                onAddToCart={(e) => {
                                    e.stopPropagation();
                                    addItem(product, 1);
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// Products 3: Large Cards
export const RecentProductsLarge = ({
    content,
    products: passedProducts,
    view_all_link,
    isEditor = false,
}: {
    content: { title: string };
    products?: ProductType[];
    view_all_link: string;
    isEditor?: boolean;
}) => {
    const { products: fetchedProducts, loading, error } = useProducts(!isEditor);
    const navigate = useNavigate();
    const { storeSettings } = useStoreSettingsStore();
    const { addItem, items } = useCartStore();
    const isRestaurant = storeSettings.type === "restaurant";

    // Use passed products in editor mode, fetched products in production
    const products = isEditor ? (passedProducts || []) : fetchedProducts;

    if (loading && !isEditor) {
        return (
            <div className="container mx-auto px-4 py-12">
                <SectionHeader title={content.title} viewAllLink={view_all_link} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                            <div className="aspect-square bg-slate-200"></div>
                            <div className="p-6">
                                <div className="h-6 bg-slate-200 rounded mb-3"></div>
                                <div className="h-4 bg-slate-200 rounded mb-4"></div>
                                <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error || !products || products.length === 0) {
        return <EmptyState title={content.title} />;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <SectionHeader title={content.title} viewAllLink={view_all_link} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => {
                    const cartItem = items.find((item) => item.product.id === product.id);

                    return (
                        <ProductCard
                            key={product.id || index}
                            product={product}
                            index={index}
                            variant="large"
                            onClick={() => {
                                if (product.id) {
                                    navigate(`/product/${product.id}`);
                                }
                            }}
                            cartItem={cartItem}
                            isRestaurant={isRestaurant}
                            onAddToCart={(e) => {
                                e.stopPropagation();
                                addItem(product, 1);
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

// Products 4: Compact Grid
export const RecentProductsCompact = ({
    content,
    products: passedProducts,
    view_all_link,
    isEditor = false,
}: {
    content: { title: string };
    products?: ProductType[];
    view_all_link: string;
    isEditor?: boolean;
}) => {
    const { products: fetchedProducts, loading, error } = useProducts(!isEditor);
    const navigate = useNavigate();
    const { storeSettings } = useStoreSettingsStore();
    const { addItem, items } = useCartStore();
    const isRestaurant = storeSettings.type === "restaurant";

    // Use passed products in editor mode, fetched products in production
    const products = isEditor ? (passedProducts || []) : fetchedProducts;

    if (loading && !isEditor) {
        return (
            <div className="container mx-auto px-4 py-8">
                <SectionHeader title={content.title} viewAllLink={view_all_link} titleSize="text-2xl" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {[...Array(10)].map((_, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
                            <div className="aspect-square bg-slate-200"></div>
                            <div className="p-2">
                                <div className="h-3 bg-slate-200 rounded mb-1"></div>
                                <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error || !products || products.length === 0) {
        return <EmptyState title={content.title} />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <SectionHeader title={content.title} viewAllLink={view_all_link} titleSize="text-2xl" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {products.map((product, index) => {
                    const cartItem = items.find((item) => item.product.id === product.id);

                    return (
                        <ProductCard
                            key={product.id || index}
                            product={product}
                            index={index}
                            variant="compact"
                            onClick={() => {
                                if (product.id) {
                                    navigate(`/product/${product.id}`);
                                }
                            }}
                            cartItem={cartItem}
                            isRestaurant={isRestaurant}
                            onAddToCart={(e) => {
                                e.stopPropagation();
                                addItem(product, 1);
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

// Products 5: List View
export const RecentProductsList = ({
    content,
    products: passedProducts,
    view_all_link,
    isEditor = false,
}: {
    content: { title: string };
    products?: ProductType[];
    view_all_link: string;
    isEditor?: boolean;
}) => {
    const { products: fetchedProducts, loading, error } = useProducts(!isEditor);
    const navigate = useNavigate();
    const { storeSettings } = useStoreSettingsStore();
    const { addItem, items } = useCartStore();
    const isRestaurant = storeSettings.type === "restaurant";

    // Use passed products in editor mode, fetched products in production
    const products = isEditor ? (passedProducts || []) : fetchedProducts;

    if (loading && !isEditor) {
        return (
            <div className="container mx-auto px-4 py-8">
                <SectionHeader title={content.title} viewAllLink={view_all_link} titleSize="text-2xl" />
                <div className="space-y-3">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm animate-pulse">
                            <div className="w-24 h-24 rounded-lg bg-slate-200 shrink-0"></div>
                            <div className="flex-1 min-w-0">
                                <div className="h-5 bg-slate-200 rounded mb-2 w-3/4"></div>
                                <div className="h-4 bg-slate-200 rounded mb-2"></div>
                                <div className="h-5 bg-slate-200 rounded w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error || !products || products.length === 0) {
        return <EmptyState title={content.title} />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <SectionHeader title={content.title} viewAllLink={view_all_link} titleSize="text-2xl" />
            <div className="space-y-3">
                {products.map((product, index) => {
                    const cartItem = items.find((item) => item.product.id === product.id);

                    return (
                        <ProductCard
                            key={product.id || index}
                            product={product}
                            index={index}
                            variant="list"
                            onClick={() => {
                                if (product.id) {
                                    navigate(`/product/${product.id}`);
                                }
                            }}
                            cartItem={cartItem}
                            isRestaurant={isRestaurant}
                            onAddToCart={(e) => {
                                e.stopPropagation();
                                addItem(product, 1);
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};
