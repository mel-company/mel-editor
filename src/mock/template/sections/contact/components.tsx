import React from "react";
import { Mail, Phone, MapPin, Clock, Send, } from "lucide-react";
import { usePageStore } from "../../../../store/editor/page";

// Contact 1: Form with Info
export const ContactSection1 = ({ id }: { id?: string }) => {
    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
            <div className="max-w-6xl mx-auto">
                <h2
                    className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4"
                    data-type="text"
                    data-title="العنوان"
                    data-name="title"
                >
                    اتصل بنا
                </h2>
                <p
                    className="text-lg text-slate-600 max-w-2xl mx-auto"
                    data-type="textarea"
                    data-title="الوصف"
                    data-name="description"
                >
                    نحن هنا لمساعدتك. تواصل معنا عبر أي من الطرق التالية.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-6">
                            معلومات الاتصال
                        </h3>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                                <Mail className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-600 mb-1">البريد الإلكتروني</p>
                                <a
                                    href="mailto:info@example.com"
                                    className="text-base text-slate-900 hover:text-blue-600 transition-colors"
                                    data-type="text"
                                    data-title="البريد الإلكتروني"
                                    data-name="email"
                                >
                                    info@example.com
                                </a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                                <Phone className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-600 mb-1">رقم الهاتف</p>
                                <a
                                    href="tel:+966501234567"
                                    className="text-base text-slate-900 hover:text-green-600 transition-colors"
                                    dir="ltr"
                                    data-type="text"
                                    data-title="رقم الهاتف"
                                    data-name="phone"
                                >
                                    +966 50 123 4567
                                </a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                                <MapPin className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-600 mb-1">العنوان</p>
                                <p
                                    className="text-base text-slate-900"
                                    data-type="textarea"
                                    data-title="العنوان"
                                    data-name="address"
                                >
                                    الرياض، المملكة العربية السعودية
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                                <Clock className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-600 mb-1">ساعات العمل</p>
                                <p
                                    className="text-base text-slate-900"
                                    data-type="text"
                                    data-title="ساعات العمل"
                                    data-name="hours"
                                >
                                    الأحد - الخميس: 9 صباحاً - 6 مساءً
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-slate-50 rounded-2xl p-6 sm:p-8">
                        <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-6">
                            أرسل لنا رسالة
                        </h3>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    الاسم
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="اسمك الكامل"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    البريد الإلكتروني
                                </label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="example@email.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    الرسالة
                                </label>
                                <textarea
                                    rows={4}
                                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    placeholder="اكتب رسالتك هنا..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <Send className="w-4 h-4" />
                                <span>إرسال الرسالة</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const ContactSection2 = ({ id }: { id?: string }) => {
    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
            <div className="max-w-5xl mx-auto">
                <h2
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 sm:mb-6 text-center"
                    data-type="text"
                    data-title="العنوان"
                    data-name="heading"
                >
                    اتصل بنا
                </h2>
                <p
                    className="text-base sm:text-lg text-slate-600 mb-12 text-center max-w-2xl mx-auto"
                    data-type="textarea"
                    data-title="الوصف"
                    data-name="subtext"
                >
                    تواصل معنا عبر أي من الطرق التالية
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white border border-slate-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail className="w-7 h-7 text-blue-600" />
                        </div>
                        <h3 className="text-sm font-semibold text-slate-700 mb-2">البريد الإلكتروني</h3>
                        <a
                            href="mailto:info@example.com"
                            className="text-sm text-slate-600 hover:text-blue-600 transition-colors break-all"
                            data-type="text"
                            data-title="البريد الإلكتروني"
                            data-name="email"
                        >
                            info@example.com
                        </a>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Phone className="w-7 h-7 text-green-600" />
                        </div>
                        <h3 className="text-sm font-semibold text-slate-700 mb-2">رقم الهاتف</h3>
                        <a
                            href="tel:+966501234567"
                            className="text-sm text-slate-600 hover:text-green-600 transition-colors"
                            dir="ltr"
                            data-type="text"
                            data-title="رقم الهاتف"
                            data-name="phone"
                        >
                            +966 50 123 4567
                        </a>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                        <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MapPin className="w-7 h-7 text-purple-600" />
                        </div>
                        <h3 className="text-sm font-semibold text-slate-700 mb-2">العنوان</h3>
                        <p
                            className="text-sm text-slate-600"
                            data-type="textarea"
                            data-title="العنوان"
                            data-name="address"
                        >
                            الرياض، المملكة العربية السعودية
                        </p>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                        <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock className="w-7 h-7 text-orange-600" />
                        </div>
                        <h3 className="text-sm font-semibold text-slate-700 mb-2">ساعات العمل</h3>
                        <p
                            className="text-sm text-slate-600"
                            data-type="text"
                            data-title="ساعات العمل"
                            data-name="hours"
                        >
                            الأحد - الخميس: 9 صباحاً - 6 مساءً
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
// Contact 3: Map Style (unchanged)
export const ContactSection3 = ({ id }: { id?: string }) => {
    // Read photos from store (for images tab editing)
    const sectionData = usePageStore((state) => {
        const page = state.pages.find((p) => p.id === state.currentPageId);
        return page?.sections.find((s) => s.id === id || s.section_id === id);
    });
    const photos = sectionData?.photos;
    const mapUrl = photos?.[0]?.url || photos?.[0]?.base64Content || "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=400";

    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
            <div className="max-w-6xl mx-auto">
                <h2
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 sm:mb-6 text-center"
                    data-type="text"
                    data-title="العنوان"
                    data-name="title"
                >
                    اتصل بنا
                </h2>
                <p
                    className="text-base sm:text-lg text-slate-600 mb-12 text-center max-w-2xl mx-auto"
                    data-type="textarea"
                    data-title="الوصف"
                    data-name="description"
                >
                    نحن هنا لمساعدتك. تواصل معنا عبر أي من الطرق التالية.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {mapUrl && (
                        <div className="rounded-xl overflow-hidden shadow-lg">
                            <img
                                src={mapUrl}
                                alt="الموقع"
                                className="w-full h-full object-cover"
                                style={{ minHeight: "400px" }}
                                data-type="image"
                                data-title="خريطة الموقع"
                                data-name="map"
                            />
                        </div>
                    )}
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                                <MapPin className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-600 mb-1">العنوان</p>
                                <p
                                    className="text-base text-slate-900"
                                    data-type="textarea"
                                    data-title="العنوان"
                                    data-name="address"
                                >
                                    الرياض، المملكة العربية السعودية
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                                <Phone className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-600 mb-1">رقم الهاتف</p>
                                <a
                                    href="tel:+966501234567"
                                    className="text-base text-slate-900 hover:text-green-600 transition-colors"
                                    dir="ltr"
                                    data-type="text"
                                    data-title="رقم الهاتف"
                                    data-name="phone"
                                >
                                    +966 50 123 4567
                                </a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                                <Mail className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-600 mb-1">البريد الإلكتروني</p>
                                <a
                                    href="mailto:info@example.com"
                                    className="text-base text-slate-900 hover:text-blue-600 transition-colors"
                                    data-type="text"
                                    data-title="البريد الإلكتروني"
                                    data-name="email"
                                >
                                    info@example.com
                                </a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                                <Clock className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-600 mb-1">ساعات العمل</p>
                                <p className="text-base text-slate-900">الأحد - الخميس: 9 صباحاً - 6 مساءً</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
// ... (ContactSection4, 5, 6 skipped for brevity in replacement) ...

export const ContactSection4 = ({ id }: { id?: string }) => {
    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 sm:mb-6 text-center">
                    اتصل بنا
                </h2>
                <p className="text-base sm:text-lg text-slate-600 mb-12 text-center max-w-2xl mx-auto">
                    تواصل معنا عبر أي من الطرق التالية
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="group relative bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                                <Mail className="w-7 h-7" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">البريد الإلكتروني</h3>
                            <a
                                href="mailto:info@example.com"
                                className="text-sm text-blue-100 hover:text-white transition-colors break-all"
                                data-type="text"
                                data-title="البريد الإلكتروني"
                                data-name="email"
                            >
                                info@example.com
                            </a>
                        </div>
                    </div>
                    <div className="group relative bg-linear-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                                <Phone className="w-7 h-7" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">رقم الهاتف</h3>
                            <a
                                href="tel:+966501234567"
                                className="text-sm text-green-100 hover:text-white transition-colors"
                                dir="ltr"
                                data-type="text"
                                data-title="رقم الهاتف"
                                data-name="phone"
                            >
                                +966 50 123 4567
                            </a>
                        </div>
                    </div>
                    <div className="group relative bg-linear-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                                <MapPin className="w-7 h-7" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">العنوان</h3>
                            <p
                                className="text-sm text-purple-100"
                                data-type="textarea"
                                data-title="العنوان"
                                data-name="address"
                            >
                                الرياض، المملكة العربية السعودية
                            </p>
                        </div>
                    </div>
                    <div className="group relative bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                                <Clock className="w-7 h-7" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">ساعات العمل</h3>
                            <p
                                className="text-sm text-orange-100"
                                data-type="text"
                                data-title="ساعات العمل"
                                data-name="hours"
                            >
                                الأحد - الخميس: 9 صباحاً - 6 مساءً
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Contact 5: Elegant Form with Background
export const ContactSection5 = ({ id }: { id?: string }) => {
    // Read photos from store (for images tab editing)
    const sectionData = usePageStore((state) => {
        const page = state.pages.find((p) => p.id === state.currentPageId);
        return page?.sections.find((s) => s.id === id || s.section_id === id);
    });
    const photos = sectionData?.photos;
    const bgImage = photos?.[0]?.url || photos?.[0]?.base64Content || "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=400";

    return (
        <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
            {bgImage && (
                <div className="absolute inset-0 z-0">
                    <img
                        src={bgImage}
                        alt="Background"
                        className="w-full h-full object-cover opacity-20"
                        data-type="image"
                        data-title="صورة الخلفية"
                        data-name="background"
                    />
                    <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-purple-50"></div>
                </div>
            )}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <h2
                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 sm:mb-6 text-center"
                        data-type="text"
                        data-title="العنوان"
                        data-name="heading"
                    >
                        اتصل بنا
                    </h2>
                    <p
                        className="text-base sm:text-lg text-slate-600 mb-12 text-center max-w-2xl mx-auto"
                        data-type="textarea"
                        data-title="الوصف"
                        data-name="subtext"
                    >
                        نحن هنا لمساعدتك. أرسل لنا رسالة وسنرد عليك في أقرب وقت ممكن.
                    </p>
                    <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        الاسم الكامل
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="أدخل اسمك"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        البريد الإلكتروني
                                    </label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="example@email.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    الموضوع
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="موضوع الرسالة"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    الرسالة
                                </label>
                                <textarea
                                    rows={5}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                    placeholder="اكتب رسالتك هنا..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                            >
                                <Send className="w-5 h-5" />
                                <span>إرسال الرسالة</span>
                            </button>
                        </form>
                        <div className="mt-8 pt-8 border-t border-slate-200">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                                <div>
                                    <Mail className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                                    <a
                                        href="mailto:info@example.com"
                                        className="text-sm text-slate-600 hover:text-blue-600"
                                        data-type="text"
                                        data-title="البريد الإلكتروني"
                                        data-name="email"
                                    >
                                        info@example.com
                                    </a>
                                </div>
                                <div>
                                    <Phone className="w-5 h-5 text-green-600 mx-auto mb-2" />
                                    <a
                                        href="tel:+966501234567"
                                        className="text-sm text-slate-600 hover:text-green-600"
                                        dir="ltr"
                                        data-type="text"
                                        data-title="رقم الهاتف"
                                        data-name="phone"
                                    >
                                        +966 50 123 4567
                                    </a>
                                </div>
                                <div>
                                    <MapPin className="w-5 h-5 text-purple-600 mx-auto mb-2" />
                                    <p
                                        className="text-sm text-slate-600"
                                        data-type="textarea"
                                        data-title="العنوان"
                                        data-name="address"
                                    >
                                        الرياض، المملكة العربية السعودية
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const ContactSection6 = ({ id }: { id?: string }) => {
    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
            <div className="max-w-6xl mx-auto">
                <h2
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 sm:mb-6 text-center"
                    data-type="text"
                    data-title="العنوان"
                    data-name="heading"
                >
                    اتصل بنا
                </h2>
                <p
                    className="text-base sm:text-lg text-slate-600 mb-12 text-center max-w-2xl mx-auto"
                    data-type="textarea"
                    data-title="الوصف"
                    data-name="subtext"
                >
                    نحن هنا لمساعدتك. تواصل معنا عبر أي من الطرق التالية أو أرسل لنا رسالة.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="flex items-center gap-6 group">
                            <div className="w-20 h-20 bg-linear-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <Mail className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1">البريد الإلكتروني</h3>
                                <a
                                    href="mailto:info@example.com"
                                    className="text-base text-slate-600 hover:text-blue-600 transition-colors"
                                    data-type="text"
                                    data-title="البريد الإلكتروني"
                                    data-name="email"
                                >
                                    info@example.com
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 group">
                            <div className="w-20 h-20 bg-linear-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <Phone className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1">رقم الهاتف</h3>
                                <a
                                    href="tel:+966501234567"
                                    className="text-base text-slate-600 hover:text-green-600 transition-colors"
                                    dir="ltr"
                                    data-type="text"
                                    data-title="رقم الهاتف"
                                    data-name="phone"
                                >
                                    +966 50 123 4567
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 group">
                            <div className="w-20 h-20 bg-linear-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <MapPin className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1">العنوان</h3>
                                <p
                                    className="text-base text-slate-600"
                                    data-type="textarea"
                                    data-title="العنوان"
                                    data-name="address"
                                >
                                    الرياض، المملكة العربية السعودية
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 group">
                            <div className="w-20 h-20 bg-linear-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <Clock className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1">ساعات العمل</h3>
                                <p
                                    className="text-base text-slate-600"
                                    data-type="text"
                                    data-title="ساعات العمل"
                                    data-name="hours"
                                >
                                    الأحد - الخميس: 9 صباحاً - 6 مساءً
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-linear-to-br from-slate-50 to-slate-100 rounded-3xl p-8 sm:p-12">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">أرسل لنا رسالة</h3>
                        <form className="space-y-5">
                            <div>
                                <input
                                    type="text"
                                    placeholder="الاسم"
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder="البريد الإلكتروني"
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <textarea
                                    rows={4}
                                    placeholder="الرسالة"
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg"
                            >
                                <Send className="w-5 h-5" />
                                <span>إرسال</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
