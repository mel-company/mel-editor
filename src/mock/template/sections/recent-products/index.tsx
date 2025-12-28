import { ProductType } from "../../../../types";
import React from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStoreSettingsStore } from "../../../../store/editor/store-settings";
import { useCartStore } from "../../../../store/cart";

const RecentProducts = ({
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
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                {product.description && (
                  <p className="text-sm text-slate-600 mb-3 line-clamp-2 flex-1">
                    {product.description}
                  </p>
                )}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-green-600">
                      {finalPrice} ر.س
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
                      className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                      title={
                        cartItem
                          ? `في السلة (${cartItem.quantity})`
                          : "أضف للسلة"
                      }
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

const RecentProductsCarousel = ({
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
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 w-max">
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
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-sm text-slate-600 mb-3 line-clamp-2 flex-1">
                      {product.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-green-600">
                        {finalPrice} ر.س
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
                        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                        title={
                          cartItem
                            ? `في السلة (${cartItem.quantity})`
                            : "أضف للسلة"
                        }
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
    </div>
  );
};

export const recent_products_sections = [
  {
    id: "1",
    title: "Recent Products",
    component: RecentProducts,
    thumbnail: {
      url: "https://cdn.dribbble.com/userupload/43792476/file/original-2dc4c0056ba1870f72cc179f989655b4.jpg?resize=400x0",
    },
    content: [
      {
        id: "title",
        label: "Title",
        name: "title",
        type: "text",
        value: "Recent Products",
      },
    ],
    products: [],
    view_all_link: "",
  },
  {
    id: "2",
    title: "Recent Products",
    thumbnail: {
      url: "https://cdn.dribbble.com/userupload/43792476/file/original-2dc4c0056ba1870f72cc179f989655b4.jpg?resize=400x0",
    },
    component: RecentProductsCarousel,
    content: [
      {
        id: "title",
        label: "Title",
        name: "title",
        type: "text",
        value: "Recent Products",
      },
    ],
    products: [],
    view_all_link: "",
  },
];
