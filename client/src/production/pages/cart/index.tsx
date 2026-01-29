import React from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../../shared/store/cart";
import { useStoreSettingsStore } from "../../../shared/store/editor/store-settings";
import { usePageStore } from "../../../shared/store/editor/page";
import { Navigation1 } from "@templates/data/template/sections/navigation";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  CreditCard,
} from "lucide-react";

const CartPage = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, clearCart, getTotal } =
    useCartStore();
  const { storeSettings } = useStoreSettingsStore();
  const { setCurrentPageId } = usePageStore();
  const [showPayment, setShowPayment] = React.useState(false);
  const [paymentData, setPaymentData] = React.useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "card",
  });

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
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            السلة فارغة
          </h2>
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
      className="min-h-screen bg-white flex flex-col"
      dir="rtl"
      style={
        {
          fontFamily: fonts.body,
          color: colors.text,
          "--heading-font": fonts.heading,
          "--body-font": fonts.body,
          "--primary-color": colors.primary,
          "--secondary-color": colors.secondary,
          "--text-color": colors.text,
        } as React.CSSProperties
      }
    >
      {/* Navigation Bar (only for e-commerce) */}
      {storeSettings.type !== "restaurant" && (
        <div
          style={{
            backgroundColor: storeSettings.header?.styles?.backgroundColor,
            color: storeSettings.header?.styles?.textColor,
          }}
        >
          <Navigation1
            logo={storeSettings.logo}
            navigationLinks={storeSettings.header?.navigationLinks}
            primaryColor={storeSettings.colors?.primary}
            onLinkClick={(pageId) => {
              // Navigate back to store view with page
              if (pageId) {
                navigate(`/store-view`);
                // Use setTimeout to ensure navigation happens
                setTimeout(() => {
                  setCurrentPageId(pageId);
                }, 100);
              }
            }}
          />
        </div>
      )}

      <div className="container mx-auto px-4 py-8 flex-1">
        {/* Back Button */}
        <button
          onClick={() => navigate("/store-view")}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>العودة للمتجر</span>
        </button>

        <div className="flex items-center justify-between mb-8">
          <h1
            className="text-3xl font-bold"
            style={{ fontFamily: fonts.heading }}
          >
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
                    <h3 className="font-bold text-lg mb-2">
                      {item.product.name}
                    </h3>
                    {item.product.description && (
                      <p className="text-sm text-slate-600 mb-2 line-clamp-2">
                        {item.product.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 border border-slate-300 rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id || "",
                              item.quantity - 1
                            )
                          }
                          className="p-1.5 hover:bg-slate-100 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 py-1 min-w-[40px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id || "",
                              item.quantity + 1
                            )
                          }
                          className="p-1.5 hover:bg-slate-100 transition-colors"
                          disabled={
                            item.quantity >= (item.product.stock || 999)
                          }
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-left">
                        <div
                          className="font-bold text-lg"
                          style={{ color: colors.primary }}
                        >
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
              <h2
                className="text-xl font-bold mb-4"
                style={{ fontFamily: fonts.heading }}
              >
                ملخص الطلب
              </h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>عدد المنتجات:</span>
                  <span className="font-medium">
                    {items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>الإجمالي:</span>
                  <span style={{ color: colors.primary }}>
                    {getTotal()} ر.س
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowPayment(true)}
                className="w-full py-4 rounded-lg font-bold text-lg text-white transition-colors flex items-center justify-center gap-2 hover:opacity-90"
                style={{ backgroundColor: colors.primary }}
              >
                <span>إتمام الطلب</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Payment Gateway Modal */}
        {showPayment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              dir="rtl"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2
                    className="text-2xl font-bold"
                    style={{ fontFamily: fonts.heading }}
                  >
                    معلومات الدفع
                  </h2>
                  <button
                    onClick={() => setShowPayment(false)}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    ✕
                  </button>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    // Handle payment submission
                    alert("تم إرسال الطلب بنجاح!");
                    clearCart();
                    setShowPayment(false);
                    navigate("/store-view");
                  }}
                  className="space-y-4"
                >
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        الاسم الكامل *
                      </label>
                      <input
                        type="text"
                        required
                        value={paymentData.name}
                        onChange={(e) =>
                          setPaymentData({
                            ...paymentData,
                            name: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="أدخل اسمك الكامل"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        البريد الإلكتروني *
                      </label>
                      <input
                        type="email"
                        required
                        value={paymentData.email}
                        onChange={(e) =>
                          setPaymentData({
                            ...paymentData,
                            email: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="example@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        رقم الهاتف *
                      </label>
                      <input
                        type="tel"
                        required
                        value={paymentData.phone}
                        onChange={(e) =>
                          setPaymentData({
                            ...paymentData,
                            phone: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="05xxxxxxxx"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        طريقة الدفع *
                      </label>
                      <select
                        required
                        value={paymentData.paymentMethod}
                        onChange={(e) =>
                          setPaymentData({
                            ...paymentData,
                            paymentMethod: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="card">بطاقة ائتمانية</option>
                        <option value="cash">الدفع عند الاستلام</option>
                        <option value="bank">تحويل بنكي</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      العنوان *
                    </label>
                    <textarea
                      required
                      value={paymentData.address}
                      onChange={(e) =>
                        setPaymentData({
                          ...paymentData,
                          address: e.target.value,
                        })
                      }
                      className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      placeholder="أدخل عنوانك الكامل"
                    />
                  </div>

                  {/* Payment Summary */}
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-600">عدد المنتجات:</span>
                      <span className="font-medium">
                        {items.reduce((sum, item) => sum + item.quantity, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>الإجمالي:</span>
                      <span style={{ color: colors.primary }}>
                        {getTotal()} ر.س
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowPayment(false)}
                      className="flex-1 py-3 rounded-lg font-medium border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 rounded-lg font-bold text-white transition-colors flex items-center justify-center gap-2 hover:opacity-90"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <CreditCard className="w-5 h-5" />
                      <span>تأكيد الطلب</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
