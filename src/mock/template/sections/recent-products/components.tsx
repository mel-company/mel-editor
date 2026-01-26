import { ProductType } from "../../../../types";
import React from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStoreSettingsStore } from "../../../../store/editor/store-settings";
import { useCartStore } from "../../../../store/cart";

// Products 1: Grid
export const RecentProducts = ({
    content,
    products,
    view_all_link,
}: {
    content: { title: string };
    products: ProductType[];
    view_all_link: string;
}) => {
    const navigate = useNavigate();
    const { storeSettings } = useStoreSettingsStore();
    const { addItem, items } = useCartStore();
    const isRestaurant = storeSettings.type === "restaurant";
    if (!products || products.length === 0) {
        return (
            <div className="container mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold mb-8 text-center">{content.title}</h2>
                <div className="text-center text-slate-500 py-12">
                    لا توجد منتجات لعرضها
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">{content.title}</h2>
                {view_all_link && (
                    <a
                        href={view_all_link}
                        className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                        مشاهدة الكل →
                    </a>
                )}
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product, index) => {
                    const imageUrl =
                        product.thumbnail?.base64Content || product.thumbnail?.url || "";
                    const finalPrice =
                        product.discount > 0
                            ? product.price - product.discount
                            : product.price;

                    const cartItem = items.find((item) => item.product.id === product.id);

                    return (
                        <div
                            key={product.id || index}
                            className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
                            onClick={() => {
                                if (product.id) {
                                    navigate(`/product/${product.id}`);
                                }
                            }}
                        >
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
                                        <ShoppingCart className="w-12 h-12" />
                                    </div>
                                )}
                                {product.discount > 0 && (
                                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                        -{product.discount}%
                                    </span>
                                )}
                            </div>
                            <div className="p-3 sm:p-4 flex-1 flex flex-col">
                                <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-2 line-clamp-2">
                                    {product.name}
                                </h3>
                                {product.description && (
                                    <p className="text-xs sm:text-sm text-slate-600 mb-3 line-clamp-2 flex-1">
                                        {product.description}
                                    </p>
                                )}
                                <div className="flex items-center justify-between mt-auto gap-2">
                                    <div className="flex flex-col min-w-0 flex-1">
                                        <span className="text-base sm:text-lg font-bold text-green-600">
                                            {finalPrice} ر.س
                                        </span>
                                        <span className="text-xs text-slate-500 mt-0.5">
                                            متوفر: {product.stock} قطعة
                                        </span>
                                        {product.discount > 0 && (
                                            <span className="text-xs text-slate-400 line-through">
                                                {product.price} ر.س
                                            </span>
                                        )}
                                    </div>
                                    {!isRestaurant && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addItem(product, 1);
                                            }}
                                            className="bg-blue-600 text-white p-1.5 sm:p-2 rounded-lg hover:bg-blue-700 transition-colors shrink-0"
                                            title={
                                                cartItem
                                                    ? `في السلة (${cartItem.quantity})`
                                                    : "أضف للسلة"
                                            }
                                        >
                                            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Products 2: Carousel
export const RecentProductsCarousel = ({
    content,
    products,
    view_all_link,
}: {
    content: { title: string };
    products: ProductType[];
    view_all_link: string;
}) => {
    const navigate = useNavigate();
    const { storeSettings } = useStoreSettingsStore();
    const { addItem, items } = useCartStore();
    const isRestaurant = storeSettings.type === "restaurant";

    if (!products || products.length === 0) {
        return (
            <div className="container mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold mb-8 text-center">{content.title}</h2>
                <div className="text-center text-slate-500 py-12">
                    لا توجد منتجات لعرضها
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold">{content.title}</h2>
                {view_all_link && (
                    <a
                        href={view_all_link}
                        className="text-sm sm:text-base text-blue-600 hover:text-blue-700 font-medium transition-colors whitespace-nowrap"
                    >
                        مشاهدة الكل →
                    </a>
                )}
            </div>
            <div className="overflow-x-auto pb-4 -mx-4 sm:mx-0 px-4 sm:px-0">
                <div className="flex gap-3 sm:gap-4 w-max">
                    {products.map((product, index) => {
                        const imageUrl =
                            product.thumbnail?.base64Content || product.thumbnail?.url || "";
                        const finalPrice =
                            product.discount > 0
                                ? product.price - product.discount
                                : product.price;

                        const cartItem = items.find(
                            (item) => item.product.id === product.id
                        );

                        return (
                            <div
                                key={product.id || index}
                                className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 w-64 shrink-0 flex flex-col cursor-pointer"
                                onClick={() => {
                                    if (product.id) {
                                        navigate(`/product/${product.id}`);
                                    }
                                }}
                            >
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
                                            <ShoppingCart className="w-12 h-12" />
                                        </div>
                                    )}
                                    {product.discount > 0 && (
                                        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                            -{product.discount}%
                                        </span>
                                    )}
                                </div>
                                <div className="p-3 sm:p-4 flex-1 flex flex-col">
                                    <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-2 line-clamp-2">
                                        {product.name}
                                    </h3>
                                    {product.description && (
                                        <p className="text-xs sm:text-sm text-slate-600 mb-3 line-clamp-2 flex-1">
                                            {product.description}
                                        </p>
                                    )}
                                    <div className="flex items-center justify-between mt-auto gap-2">
                                        <div className="flex flex-col min-w-0 flex-1">
                                            <span className="text-base sm:text-lg font-bold text-green-600">
                                                {finalPrice} ر.س
                                            </span>
                                            {product.discount > 0 && (
                                                <span className="text-xs text-slate-400 line-through">
                                                    {product.price} ر.س
                                                </span>
                                            )}
                                            <span className="text-xs text-slate-500 mt-0.5">
                                                متوفر: {product.stock} قطعة
                                            </span>
                                        </div>
                                        {!isRestaurant && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addItem(product, 1);
                                                }}
                                                className="bg-blue-600 text-white p-1.5 sm:p-2 rounded-lg hover:bg-blue-700 transition-colors shrink-0"
                                                title={
                                                    cartItem
                                                        ? `في السلة (${cartItem.quantity})`
                                                        : "أضف للسلة"
                                                }
                                            >
                                                <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
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
    products,
    view_all_link,
}: {
    content: { title: string };
    products: ProductType[];
    view_all_link: string;
}) => {
    const navigate = useNavigate();
    const { storeSettings } = useStoreSettingsStore();
    const { addItem, items } = useCartStore();
    const isRestaurant = storeSettings.type === "restaurant";

    if (!products || products.length === 0) {
        return (
            <div className="container mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold mb-8 text-center">{content.title}</h2>
                <div className="text-center text-slate-500 py-12">
                    لا توجد منتجات لعرضها
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">{content.title}</h2>
                {view_all_link && (
                    <a
                        href={view_all_link}
                        className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                        مشاهدة الكل →
                    </a>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => {
                    const imageUrl =
                        product.thumbnail?.base64Content || product.thumbnail?.url || "";
                    const finalPrice =
                        product.discount > 0
                            ? product.price - product.discount
                            : product.price;

                    const cartItem = items.find((item) => item.product.id === product.id);

                    return (
                        <div
                            key={product.id || index}
                            className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
                            onClick={() => {
                                if (product.id) {
                                    navigate(`/product/${product.id}`);
                                }
                            }}
                        >
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
                                        <ShoppingCart className="w-16 h-16" />
                                    </div>
                                )}
                                {product.discount > 0 && (
                                    <span className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-lg">
                                        -{product.discount}%
                                    </span>
                                )}
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-slate-900 mb-3">
                                    {product.name}
                                </h3>
                                {product.description && (
                                    <p className="text-sm text-slate-600 mb-4 line-clamp-3 flex-1">
                                        {product.description}
                                    </p>
                                )}
                                <div className="flex items-center justify-between mt-auto gap-3">
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-bold text-green-600">
                                            {finalPrice} ر.س
                                        </span>
                                        {product.discount > 0 && (
                                            <span className="text-sm text-slate-400 line-through">
                                                {product.price} ر.س
                                            </span>
                                        )}
                                        <span className="text-xs text-slate-500 mt-0.5">
                                            متوفر: {product.stock} قطعة
                                        </span>
                                    </div>
                                    {!isRestaurant && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addItem(product, 1);
                                            }}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shrink-0"
                                        >
                                            <ShoppingCart className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Products 4: Compact Grid
export const RecentProductsCompact = ({
    content,
    products,
    view_all_link,
}: {
    content: { title: string };
    products: ProductType[];
    view_all_link: string;
}) => {
    const navigate = useNavigate();
    const { storeSettings } = useStoreSettingsStore();
    const { addItem, items } = useCartStore();
    const isRestaurant = storeSettings.type === "restaurant";

    if (!products || products.length === 0) {
        return (
            <div className="container mx-auto px-4 py-12">
                <h2 className="text-2xl font-bold mb-6 text-center">{content.title}</h2>
                <div className="text-center text-slate-500 py-12">
                    لا توجد منتجات لعرضها
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{content.title}</h2>
                {view_all_link && (
                    <a
                        href={view_all_link}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                        مشاهدة الكل →
                    </a>
                )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {products.map((product, index) => {
                    const imageUrl =
                        product.thumbnail?.base64Content || product.thumbnail?.url || "";
                    const finalPrice =
                        product.discount > 0
                            ? product.price - product.discount
                            : product.price;

                    const cartItem = items.find((item) => item.product.id === product.id);

                    return (
                        <div
                            key={product.id || index}
                            className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
                            onClick={() => {
                                if (product.id) {
                                    navigate(`/product/${product.id}`);
                                }
                            }}
                        >
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
                                        <ShoppingCart className="w-8 h-8" />
                                    </div>
                                )}
                                {product.discount > 0 && (
                                    <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                                        -{product.discount}%
                                    </span>
                                )}
                            </div>
                            <div className="p-2 flex-1 flex flex-col">
                                <h3 className="text-xs font-semibold text-slate-900 mb-1 line-clamp-2">
                                    {product.name}
                                </h3>
                                <div className="flex items-center justify-between mt-auto gap-1">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-green-600">
                                            {finalPrice} ر.س
                                        </span>
                                        <span className="text-xs text-slate-500 mt-0.5">
                                            متوفر: {product.stock} قطعة
                                        </span>
                                    </div>
                                    {!isRestaurant && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addItem(product, 1);
                                            }}
                                            className="bg-blue-600 text-white p-1 rounded hover:bg-blue-700 transition-colors shrink-0"
                                        >
                                            <ShoppingCart className="w-3 h-3" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Products 5: List View
export const RecentProductsList = ({
    content,
    products,
    view_all_link,
}: {
    content: { title: string };
    products: ProductType[];
    view_all_link: string;
}) => {
    const navigate = useNavigate();
    const { storeSettings } = useStoreSettingsStore();
    const { addItem, items } = useCartStore();
    const isRestaurant = storeSettings.type === "restaurant";

    if (!products || products.length === 0) {
        return (
            <div className="container mx-auto px-4 py-12">
                <h2 className="text-2xl font-bold mb-6 text-center">{content.title}</h2>
                <div className="text-center text-slate-500 py-12">
                    لا توجد منتجات لعرضها
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{content.title}</h2>
                {view_all_link && (
                    <a
                        href={view_all_link}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                        مشاهدة الكل →
                    </a>
                )}
            </div>
            <div className="space-y-3">
                {products.map((product, index) => {
                    const imageUrl =
                        product.thumbnail?.base64Content || product.thumbnail?.url || "";
                    const finalPrice =
                        product.discount > 0
                            ? product.price - product.discount
                            : product.price;

                    const cartItem = items.find((item) => item.product.id === product.id);

                    return (
                        <div
                            key={product.id || index}
                            className="group flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                            onClick={() => {
                                if (product.id) {
                                    navigate(`/product/${product.id}`);
                                }
                            }}
                        >
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
                                        <ShoppingCart className="w-8 h-8" />
                                    </div>
                                )}
                                {product.discount > 0 && (
                                    <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                                        -{product.discount}%
                                    </span>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-base font-semibold text-slate-900 mb-1">
                                    {product.name}
                                </h3>
                                {product.description && (
                                    <p className="text-sm text-slate-600 line-clamp-2 mb-2">
                                        {product.description}
                                    </p>
                                )}
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-lg font-bold text-green-600">
                                            {finalPrice} ر.س
                                        </span>
                                        <span className="text-xs text-slate-500 mt-0.5">
                                            متوفر: {product.stock} قطعة
                                        </span>
                                    </div>
                                    {!isRestaurant && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addItem(product, 1);
                                            }}
                                            className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors shrink-0"
                                        >
                                            <ShoppingCart className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
