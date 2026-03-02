import { useState } from "react";
import { CreditCard, Lock, ShoppingBag, Truck, MapPin, User, Mail, Phone } from "lucide-react";
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

  const finalPageTitle = getContentValue('page_title') || page_title || 'Checkout';
  const finalShippingTitle = getContentValue('shipping_title') || shipping_title || 'Shipping Information';
  const finalPaymentTitle = getContentValue('payment_title') || payment_title || 'Payment Method';
  const finalOrderSummaryTitle = getContentValue('order_summary_title') || order_summary_title || 'Order Summary';

  // Mock cart items
  const cartItems = [
    { id: 1, name: 'Premium Wireless Headphones', price: 299.99, quantity: 1, image: 'https://via.placeholder.com/80' },
    { id: 2, name: 'USB-C Cable', price: 19.99, quantity: 2, image: 'https://via.placeholder.com/80' },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 10.00;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <section className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1
          className="text-3xl md:text-4xl font-bold mb-8"
          style={{ color: styles?.headingColor || styles?.textColor }}
          {...(isEditor && {
            "data-type": "text",
            "data-label": "عنوان الصفحة",
            "data-name": "page_title"
          })}
        >
          {finalPageTitle}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2
                className="text-xl font-semibold mb-6 flex items-center gap-2"
                {...(isEditor && {
                  "data-type": "text",
                  "data-label": "عنوان معلومات الشحن",
                  "data-name": "shipping_title"
                })}
              >
                <Truck className="w-5 h-5" />
                {finalShippingTitle}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Doe"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Address
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="123 Main St"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="New York"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="10001"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2
                className="text-xl font-semibold mb-6 flex items-center gap-2"
                {...(isEditor && {
                  "data-type": "text",
                  "data-label": "عنوان طريقة الدفع",
                  "data-name": "payment_title"
                })}
              >
                <CreditCard className="w-5 h-5" />
                {finalPaymentTitle}
              </h2>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`flex-1 p-4 border-2 rounded-lg transition ${
                      paymentMethod === 'card' ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 mx-auto mb-2" />
                    <p className="font-semibold">Credit Card</p>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('paypal')}
                    className={`flex-1 p-4 border-2 rounded-lg transition ${
                      paymentMethod === 'paypal' ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                    }`}
                  >
                    <div className="w-6 h-6 mx-auto mb-2 bg-blue-600 rounded" />
                    <p className="font-semibold">PayPal</p>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 pt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2
                className="text-xl font-semibold mb-6 flex items-center gap-2"
                {...(isEditor && {
                  "data-type": "text",
                  "data-label": "عنوان ملخص الطلب",
                  "data-name": "order_summary_title"
                })}
              >
                <ShoppingBag className="w-5 h-5" />
                {finalOrderSummaryTitle}
              </h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-2 border-t">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                <Lock className="w-5 h-5" />
                Place Order
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Your payment information is secure and encrypted
              </p>
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

  const finalPageTitle = getContentValue('page_title') || page_title || 'Secure Checkout';
  const finalShippingTitle = getContentValue('shipping_title') || shipping_title || 'Shipping Details';
  const finalPaymentTitle = getContentValue('payment_title') || payment_title || 'Payment Information';
  const finalOrderSummaryTitle = getContentValue('order_summary_title') || order_summary_title || 'Review Order';

  const cartItems = [
    { id: 1, name: 'Premium Wireless Headphones', price: 299.99, quantity: 1, image: 'https://via.placeholder.com/80' },
    { id: 2, name: 'USB-C Cable', price: 19.99, quantity: 2, image: 'https://via.placeholder.com/80' },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 10.00;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const steps = [
    { number: 1, title: finalShippingTitle, icon: Truck },
    { number: 2, title: finalPaymentTitle, icon: CreditCard },
    { number: 3, title: finalOrderSummaryTitle, icon: ShoppingBag },
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1
          className="text-4xl md:text-5xl font-bold text-center mb-12"
          style={{ color: styles?.headingColor || styles?.textColor }}
          {...(isEditor && {
            "data-type": "text",
            "data-label": "عنوان الصفحة",
            "data-name": "page_title"
          })}
        >
          {finalPageTitle}
        </h1>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={step.number} className="flex-1 flex items-center">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition ${
                      currentStep >= step.number
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {currentStep > step.number ? '✓' : step.number}
                  </div>
                  <p className={`mt-2 text-sm font-semibold ${currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'}`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 ${currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Step 1: Shipping */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2
                className="text-2xl font-bold mb-6"
                {...(isEditor && {
                  "data-type": "text",
                  "data-label": "عنوان معلومات الشحن",
                  "data-name": "shipping_title"
                })}
              >
                {finalShippingTitle}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Doe"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Street Address</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="123 Main Street"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="New York"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ZIP Code</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="10001"
                  />
                </div>
              </div>

              <button
                onClick={() => setCurrentStep(2)}
                className="w-full bg-blue-600 text-white py-4 px-8 rounded-lg font-bold text-lg hover:bg-blue-700 transition mt-8"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {/* Step 2: Payment */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2
                className="text-2xl font-bold mb-6"
                {...(isEditor && {
                  "data-type": "text",
                  "data-label": "عنوان طريقة الدفع",
                  "data-name": "payment_title"
                })}
              >
                {finalPaymentTitle}
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-6 border-2 rounded-xl transition ${
                    paymentMethod === 'card' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <CreditCard className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-bold">Credit Card</p>
                </button>
                <button
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-6 border-2 rounded-xl transition ${
                    paymentMethod === 'paypal' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className="w-8 h-8 mx-auto mb-2 bg-blue-600 rounded" />
                  <p className="font-bold">PayPal</p>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 border-2 border-gray-300 py-4 px-8 rounded-lg font-bold text-lg hover:bg-gray-50 transition"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex-1 bg-blue-600 text-white py-4 px-8 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
                >
                  Review Order
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2
                className="text-2xl font-bold mb-6"
                {...(isEditor && {
                  "data-type": "text",
                  "data-label": "عنوان ملخص الطلب",
                  "data-name": "order_summary_title"
                })}
              >
                {finalOrderSummaryTitle}
              </h2>

              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b last:border-b-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-bold">{item.name}</p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-xl p-6 space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-2xl font-bold pt-3 border-t-2 border-blue-200">
                  <span>Total</span>
                  <span className="text-blue-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex-1 border-2 border-gray-300 py-4 px-8 rounded-lg font-bold text-lg hover:bg-gray-50 transition"
                >
                  Back
                </button>
                <button className="flex-1 bg-green-600 text-white py-4 px-8 rounded-lg font-bold text-lg hover:bg-green-700 transition flex items-center justify-center gap-2">
                  <Lock className="w-5 h-5" />
                  Complete Order
                </button>
              </div>

              <p className="text-sm text-gray-500 text-center mt-4">
                🔒 Your payment is secure and encrypted
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
