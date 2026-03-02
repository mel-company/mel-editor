import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStoreSettingsStore } from "../../../shared/store/editor/store-settings";
import { useCartStore } from "../../../shared/store/cart";
import { ProductType } from "../../types";
import { ArrowLeft, ShoppingCart, Plus, Minus } from "lucide-react";
import { mockProducts } from "@templates/home/sections/products";

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { storeSettings } = useStoreSettingsStore();
  const { addItem, items } = useCartStore();
  const [quantity, setQuantity] = React.useState(1);

  // Find product from mock data (in real app, this would come from API/store)
  const product: ProductType | undefined = mockProducts.find(
    (p) => p.id === productId
  );

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100" dir="rtl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">
            المنتج غير موجود
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            العودة
          </button>
        </div>
      </div>
    );
  }

  const imageUrl = product?.photos?.[0]?.base64Content || product?.photos?.[0]?.url || product?.thumbnail?.base64Content || product?.thumbnail?.url || "";
  const finalPrice = (product?.discount ?? 0) > 0 ? product?.price - (product?.discount ?? 0) : product?.price;
  const isRestaurant = storeSettings.type === "restaurant";
  const cartItem = items.find((item) => item.product?.id === product?.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const fonts = storeSettings.fonts || { heading: "Arial", body: "Arial" };
  const colors = storeSettings.colors || {
    primary: "#4272FF",
    secondary: "#ACBA12",
    text: "#1D293D",
  };

  return (
    <div
      className="min-h-screen bg-white"
      dir="rtl"
      style={{
        fontFamily: fonts.body,
        color: colors.text,
        "--heading-font": fonts.heading,
        "--body-font": fonts.body,
        "--primary-color": colors.primary,
        "--secondary-color": colors.secondary,
        "--text-color": colors.text,
      } as React.CSSProperties}
    >
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>العودة</span>
        </button>
      </div>

      {/* Product Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-slate-50 rounded-lg overflow-hidden aspect-square">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={product?.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                <ShoppingCart className="w-24 h-24" />
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: fonts.heading }}>
                {product?.name}
              </h1>
              {product?.description && (
                <p className="text-lg text-slate-600 leading-relaxed">
                  {product?.description}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold" style={{ color: colors.primary }}>
                {finalPrice} ر.س
              </span>
              {(product?.discount ?? 0) > 0 && (
                <>
                  <span className="text-xl text-slate-400 line-through">
                    {product?.price} ر.س
                  </span>
                  <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded">
                    خصم {product?.discount ?? 0}%
                  </span>
                </>
              )}
            </div>

            {/* Category */}
            {product?.category && (
              <div>
                <span className="text-sm text-slate-500">الفئة: </span>
                <span className="text-sm font-medium">{product?.category}</span>
              </div>
            )}

            {/* Stock */}
            {!isRestaurant && (
              <div>
                <span className="text-sm text-slate-500">المخزون: </span>
                <span className={`text-sm font-medium ${(product?.stock ?? 0) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {(product?.stock ?? 0) > 0 ? `متوفر (${product?.stock})` : 'غير متوفر'}
                </span>
              </div>
            )}

            {/* Quantity Selector (only for e-commerce) */}
            {!isRestaurant && (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">الكمية:</span>
                <div className="flex items-center gap-2 border border-slate-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-slate-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product?.stock ?? 1, quantity + 1))}
                    className="p-2 hover:bg-slate-100 transition-colors"
                    disabled={quantity >= (product?.stock ?? 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Add to Cart Button (only for e-commerce) */}
            {!isRestaurant && (
              <button
                onClick={handleAddToCart}
                disabled={(product?.stock ?? 0) === 0}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2 ${(product?.stock ?? 0) > 0
                  ? 'text-white hover:opacity-90'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  }`}
                style={(product?.stock ?? 0) > 0 ? { backgroundColor: colors.primary } : {}}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>
                  {cartItem ? `أضيف للسلة (${cartItem.quantity})` : 'أضف للسلة'}
                </span>
              </button>
            )}

            {/* Cart Item Info */}
            {!isRestaurant && cartItem && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  هذا المنتج موجود في السلة ({cartItem.quantity} قطعة)
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

