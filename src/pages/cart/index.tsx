import React from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/cart";
import { useStoreSettingsStore } from "../../store/editor/store-settings";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react";

const CartPage = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCartStore();
  const { storeSettings } = useStoreSettingsStore();

  const fonts = storeSettings.fonts || { heading: "Arial", body: "Arial" };
  const colors = storeSettings.colors || {
    primary: "#4272FF",
    secondary: "#ACBA12",
    text: "#1D293D",
  };

  if (items.length === 0) {
    return (
      <div
        className="min-h-screen bg-white flex items-center justify-center"
        dir="rtl"
        style={{
          fontFamily: fonts.body,
          color: colors.text,
        }}
      >
        <div className="text-center">
          <ShoppingCart className="w-24 h-24 text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">السلة فارغة</h2>
          <p className="text-slate-600 mb-6">لا توجد منتجات في السلة</p>
          <button
            onClick={() => navigate("/store-view")}
            className="px-6 py-3 rounded-lg text-white font-medium transition-colors"
            style={{ backgroundColor: colors.primary }}
          >
            متابعة التسوق
          </button>
        </div>
      </div>
    );
  }

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
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold" style={{ fontFamily: fonts.heading }}>
            سلة التسوق
          </h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
          >
            مسح السلة
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const imageUrl =
                item.product.thumbnail?.base64Content ||
                item.product.thumbnail?.url ||
                item.product.photos?.[0]?.base64Content ||
                item.product.photos?.[0]?.url ||
                "";
              const finalPrice =
                item.product.discount > 0
                  ? item.product.price - item.product.discount
                  : item.product.price;

              return (
                <div
                  key={item.product.id}
                  className="bg-white border border-slate-200 rounded-lg p-4 flex gap-4"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <ShoppingCart className="w-8 h-8" />
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{item.product.name}</h3>
                    {item.product.description && (
                      <p className="text-sm text-slate-600 mb-2 line-clamp-2">
                        {item.product.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 border border-slate-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id || "", item.quantity - 1)}
                          className="p-1.5 hover:bg-slate-100 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 py-1 min-w-[40px] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id || "", item.quantity + 1)}
                          className="p-1.5 hover:bg-slate-100 transition-colors"
                          disabled={item.quantity >= (item.product.stock || 999)}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-left">
                        <div className="font-bold text-lg" style={{ color: colors.primary }}>
                          {finalPrice * item.quantity} ر.س
                        </div>
                        <div className="text-sm text-slate-500">
                          {finalPrice} ر.س للقطعة
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.product.id || "")}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-50 rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4" style={{ fontFamily: fonts.heading }}>
                ملخص الطلب
              </h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>عدد المنتجات:</span>
                  <span className="font-medium">{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>الإجمالي:</span>
                  <span style={{ color: colors.primary }}>{getTotal()} ر.س</span>
                </div>
              </div>
              <button
                className="w-full py-4 rounded-lg font-bold text-lg text-white transition-colors flex items-center justify-center gap-2"
                style={{ backgroundColor: colors.primary }}
              >
                <span>إتمام الطلب</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

