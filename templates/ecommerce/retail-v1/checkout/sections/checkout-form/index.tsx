import { useState } from "react";
import { CreditCard, Lock, ShoppingBag, Truck, MapPin, User, Mail, Phone, Check, ChevronRight, Shield, Clock } from "lucide-react";
import { usePageStore } from "@/shared/store/editor/page";

const useEditorData = (id?: string) => {
  if (!id) return { sectionData: null, sectionContent: {}, photos: [], getContentValue: (name: string) => '' };

  const sectionData = usePageStore((state) => {
    const page = state.pages.find((p) => p.id === state.currentPageId);
    return page?.sections.find((s) => s.id === id || s.section_id === id);
  });

  const sectionContent = sectionData?.content || {};
  const photos = sectionData?.photos || [];

  const getContentValue = (name: string) => {
    if (Array.isArray(sectionContent)) {
      const item = sectionContent.find((item: any) => item.name === name);
      return item?.value || '';
    }
    return sectionContent[name] || '';
  };

  return {
    sectionData,
    sectionContent,
    photos,
    getContentValue
  };
};

// Checkout 1: Classic Two-Column Layout
export const CheckoutForm1 = ({
  id,
  page_title,
  shipping_title,
  payment_title,
  order_summary_title,
  styles,
  isEditor = false
}: {
  id?: string;
  page_title?: string;
  shipping_title?: string;
  payment_title?: string;
  order_summary_title?: string;
  styles?: any;
  isEditor?: boolean;
}) => {
  const { getContentValue } = useEditorData(isEditor ? id : undefined);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const finalPageTitle = getContentValue('page_title') || page_title || 'إتمام الدفع';
  const finalShippingTitle = getContentValue('shipping_title') || shipping_title || 'معلومات الشحن';
  const finalPaymentTitle = getContentValue('payment_title') || payment_title || 'طريقة الدفع';
  const finalOrderSummaryTitle = getContentValue('order_summary_title') || order_summary_title || 'ملخص الطلب';

  const cartItems = [
    { id: 1, name: 'سماعات لاسلكية فاخرة', price: 299.99, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop' },
    { id: 2, name: 'كابل USB-C (2م)', price: 19.99, quantity: 2, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=200&h=200&fit=crop' },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 10.00;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100 mb-4">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span className="text-sm text-slate-600 font-medium">دفع آمن مشفر بـ SSL</span>
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-2"
            style={{ color: styles?.headingColor || styles?.textColor }}
            {...(isEditor && {
              "data-type": "text",
              "data-label": "عنوان الصفحة",
              "data-name": "page_title"
            })}
          >
            {finalPageTitle}
          </h1>
          <p className="text-slate-500">أكمل عملية الشراء في خطوات بسيطة</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <h2
                  className="text-lg font-semibold text-white flex items-center gap-2"
                  {...(isEditor && {
                    "data-type": "text",
                    "data-label": "عنوان معلومات الشحن",
                    "data-name": "shipping_title"
                  })}
                >
                  <Truck className="w-5 h-5" />
                  {finalShippingTitle}
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      الاسم الأول
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none"
                        placeholder="محمد"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">الاسم الأخير</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none"
                      placeholder="أحمد"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      البريد الإلكتروني
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none"
                        placeholder="بريد@مثال.com"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      رقم الهاتف
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="tel"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none"
                        placeholder="+966 50 000 0000"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      عنوان الشارع
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none"
                        placeholder="شارع الملك فهد، حي العليا"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">المدينة</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none"
                      placeholder="الرياض"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">الرمز البريدي</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none"
                      placeholder="11564"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4">
                <h2
                  className="text-lg font-semibold text-white flex items-center gap-2"
                  {...(isEditor && {
                    "data-type": "text",
                    "data-label": "عنوان طريقة الدفع",
                    "data-name": "payment_title"
                  })}
                >
                  <CreditCard className="w-5 h-5" />
                  {finalPaymentTitle}
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`relative p-5 border-2 rounded-xl transition-all duration-200 flex flex-col items-center gap-3 ${paymentMethod === 'card'
                      ? 'border-blue-600 bg-blue-50/50 shadow-md'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                  >
                    {paymentMethod === 'card' && (
                      <div className="absolute top-3 right-3 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <CreditCard className={`w-8 h-8 ${paymentMethod === 'card' ? 'text-blue-600' : 'text-slate-500'}`} />
                    <span className={`font-semibold ${paymentMethod === 'card' ? 'text-blue-900' : 'text-slate-700'}`}>بطاقة ائتمان</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('paypal')}
                    className={`relative p-5 border-2 rounded-xl transition-all duration-200 flex flex-col items-center gap-3 ${paymentMethod === 'paypal'
                      ? 'border-blue-600 bg-blue-50/50 shadow-md'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                  >
                    {paymentMethod === 'paypal' && (
                      <div className="absolute top-3 right-3 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${paymentMethod === 'paypal' ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-600'}`}>باي</div>
                    <span className={`font-semibold ${paymentMethod === 'paypal' ? 'text-blue-900' : 'text-slate-700'}`}>باي بال</span>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 bg-slate-50 rounded-xl p-5">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">رقم البطاقة</label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none font-mono"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">تاريخ الانتهاء</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none font-mono"
                          placeholder="MM / YY"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">رمز الأمان</label>
                        <div className="relative">
                          <input
                            type="text"
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none font-mono"
                            placeholder="123"
                          />
                          <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 sticky top-8 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4">
                <h2
                  className="text-lg font-semibold text-white flex items-center gap-2"
                  {...(isEditor && {
                    "data-type": "text",
                    "data-label": "عنوان ملخص الطلب",
                    "data-name": "order_summary_title"
                  })}
                >
                  <ShoppingBag className="w-5 h-5" />
                  {finalOrderSummaryTitle}
                </h2>
              </div>

              <div className="p-6">
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 bg-slate-50 rounded-xl">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg shadow-sm"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 text-sm truncate">{item.name}</p>
                        <p className="text-xs text-slate-500 mt-1">الكمية: {item.quantity}</p>
                        <p className="font-bold text-slate-900 mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-3 mb-6">
                  <div className="flex justify-between text-slate-600">
                    <span className="text-sm">المجموع الفرعي</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span className="text-sm flex items-center gap-1">
                      <Truck className="w-4 h-4" />
                      الشحن
                    </span>
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span className="text-sm">الضريبة (10%)</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-3 border-t-2 border-slate-100">
                    <span className="text-slate-900">الإجمالي</span>
                    <span className="text-blue-600">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5">
                  <Lock className="w-5 h-5" />
                  تقديم الطلب
                  <ChevronRight className="w-5 h-5" />
                </button>

                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-500">
                  <Clock className="w-3 h-3" />
                  <span>التوصيل المتوقع: 3-5 أيام عمل</span>
                </div>

                <div className="flex items-center justify-center gap-2 mt-3 text-xs text-slate-400">
                  <Shield className="w-3 h-3" />
                  <span>دفع آمن مشفر 256-bit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Checkout 2: Modern Single Column with Steps
export const CheckoutForm2 = ({
  id,
  page_title,
  shipping_title,
  payment_title,
  order_summary_title,
  styles,
  isEditor = false
}: {
  id?: string;
  page_title?: string;
  shipping_title?: string;
  payment_title?: string;
  order_summary_title?: string;
  styles?: any;
  isEditor?: boolean;
}) => {
  const { getContentValue } = useEditorData(isEditor ? id : undefined);
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const finalPageTitle = getContentValue('page_title') || page_title || 'إتمام الدفع الآمن';
  const finalShippingTitle = getContentValue('shipping_title') || shipping_title || 'تفاصيل الشحن';
  const finalPaymentTitle = getContentValue('payment_title') || payment_title || 'معلومات الدفع';
  const finalOrderSummaryTitle = getContentValue('order_summary_title') || order_summary_title || 'مراجعة الطلب';

  const cartItems = [
    { id: 1, name: 'سماعات لاسلكية فاخرة', price: 299.99, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop' },
    { id: 2, name: 'كابل USB-C (2م)', price: 19.99, quantity: 2, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=200&h=200&fit=crop' },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 10.00;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const steps = [
    { number: 1, title: 'الشحن', subtitle: finalShippingTitle, icon: Truck },
    { number: 2, title: 'الدفع', subtitle: finalPaymentTitle, icon: CreditCard },
    { number: 3, title: 'المراجعة', subtitle: finalOrderSummaryTitle, icon: ShoppingBag },
  ];

  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50/50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100 mb-4">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span className="text-sm text-slate-600 font-medium">دفع آمن مشفر بـ SSL</span>
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold text-slate-900"
            style={{ color: styles?.headingColor || styles?.textColor }}
            {...(isEditor && {
              "data-type": "text",
              "data-label": "عنوان الصفحة",
              "data-name": "page_title"
            })}
          >
            {finalPageTitle}
          </h1>
        </div>

        {/* Progress Steps - Modern Design */}
        <div className="mb-10">
          <div className="flex items-center">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep >= step.number;
              const isCompleted = currentStep > step.number;
              const isCurrent = currentStep === step.number;

              return (
                <div key={step.number} className="flex-1 flex items-center">
                  <div className="flex flex-col items-center flex-1">
                    {/* Step Circle */}
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${isCompleted
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                        : isCurrent
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-110'
                          : 'bg-white text-slate-400 border-2 border-slate-200'
                        }`}
                    >
                      {isCompleted ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    {/* Step Text */}
                    <div className="mt-3 text-center">
                      <p className={`text-sm font-bold ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5 hidden md:block">{step.subtitle}</p>
                    </div>
                  </div>
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="flex-1 mx-4 mb-6">
                      <div
                        className={`h-1 rounded-full transition-all duration-500 ${isCompleted ? 'bg-emerald-500' : 'bg-slate-200'
                          }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-slate-50 to-white px-8 py-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              {currentStep === 1 && <Truck className="w-6 h-6 text-blue-600" />}
              {currentStep === 2 && <CreditCard className="w-6 h-6 text-violet-600" />}
              {currentStep === 3 && <ShoppingBag className="w-6 h-6 text-emerald-600" />}
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {currentStep === 1 && finalShippingTitle}
                  {currentStep === 2 && finalPaymentTitle}
                  {currentStep === 3 && finalOrderSummaryTitle}
                </h2>
                <p className="text-sm text-slate-500">
                  {currentStep === 1 && 'أدخل تفاصيل عنوان الشحن'}
                  {currentStep === 2 && 'اختر طريقة الدفع المفضلة'}
                  {currentStep === 3 && 'راجع وأكد طلبك'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Step 1: Shipping */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">الاسم الأول</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none"
                        placeholder="الاسم الأول"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">الاسم الأخير</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none"
                      placeholder="الاسم الأخير"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">البريد الإلكتروني</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none"
                        placeholder="البريد الإلكتروني"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">رقم الهاتف</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="tel"
                        className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none"
                        placeholder="رقم الهاتف"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">عنوان الشارع</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none"
                        placeholder="عنوان الشارع"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">المدينة</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none"
                      placeholder="المدينة"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">الرمز البريدي</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none"
                      placeholder="الرمز البريدي"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5 mt-8"
                >
                  متابعة الدفع
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`relative p-6 border-2 rounded-xl transition-all duration-200 flex flex-col items-center gap-3 ${paymentMethod === 'card'
                      ? 'border-blue-600 bg-blue-50/50 shadow-md'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                  >
                    {paymentMethod === 'card' && (
                      <div className="absolute top-3 right-3 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <CreditCard className={`w-8 h-8 ${paymentMethod === 'card' ? 'text-blue-600' : 'text-slate-500'}`} />
                    <span className={`font-semibold ${paymentMethod === 'card' ? 'text-blue-900' : 'text-slate-700'}`}>بطاقة الائتمان</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('paypal')}
                    className={`relative p-6 border-2 rounded-xl transition-all duration-200 flex flex-col items-center gap-3 ${paymentMethod === 'paypal'
                      ? 'border-blue-600 bg-blue-50/50 shadow-md'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                  >
                    {paymentMethod === 'paypal' && (
                      <div className="absolute top-3 right-3 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${paymentMethod === 'paypal' ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-600'}`}>باي بال</div>
                    <span className={`font-semibold ${paymentMethod === 'paypal' ? 'text-blue-900' : 'text-slate-700'}`}>باي بال</span>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 bg-slate-50 rounded-xl p-5">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">رقم البطاقة</label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none font-mono"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">تاريخ الانتهاء</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none font-mono"
                          placeholder="MM / YY"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">رمز الأمان</label>
                        <div className="relative">
                          <input
                            type="text"
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none font-mono"
                            placeholder="123"
                          />
                          <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 border-2 border-slate-200 text-slate-700 py-4 px-8 rounded-xl font-bold text-lg hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
                  >
                    رجوع
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5"
                  >
                    مراجعة الطلب
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <div className="space-y-6">
                {/* Order Items */}
                <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b border-slate-200 last:border-b-0 last:pb-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-xl shadow-sm"
                      />
                      <div className="flex-1">
                        <p className="font-bold text-slate-900">{item.name}</p>
                        <p className="text-sm text-slate-500 mt-1">الكمية: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-lg text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 space-y-3 border-l-4 border-blue-600">
                  <div className="flex justify-between text-slate-700">
                    <span className="text-sm">المجموع الفرعي</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span className="text-sm flex items-center gap-1">
                      <Truck className="w-4 h-4" />
                      الشحن
                    </span>
                    <span className="font-semibold">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span className="text-sm">الضريبة (10%)</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-2xl font-bold pt-3 border-t-2 border-blue-200">
                    <span className="text-slate-900">الإجمالي</span>
                    <span className="text-blue-600">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Trust Note */}
                <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  <span>دفعك آمن ومشفر بـ 256-bit SSL</span>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="flex-1 border-2 border-slate-200 text-slate-700 py-4 px-8 rounded-xl font-bold text-lg hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
                  >
                    رجوع
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5">
                    <Lock className="w-5 h-5" />
                    إتمام الطلب
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="flex items-center justify-center gap-2 mt-8 text-sm text-slate-500">
          <Clock className="w-4 h-4" />
          <span>التوصيل المتوقع: 3-5 أيام عمل بعد تأكيد الطلب</span>
        </div>
      </div>
    </section>
  );
};
