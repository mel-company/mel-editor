import React from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Globe, Instagram, Facebook, Twitter } from "lucide-react";
import { SectionOptionType } from "../../../../types";

// Contact 1: Form with Info
const ContactSection1 = ({
  title,
  description,
  content,
}: {
  title?: string;
  description?: string;
  content?: {
    email?: string;
    phone?: string;
    address?: string;
    hours?: string;
  };
}) => {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        {title && (
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 sm:mb-6 text-center">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-base sm:text-lg text-slate-600 mb-8 sm:mb-12 text-center max-w-2xl mx-auto">
            {description}
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-6">
              معلومات الاتصال
            </h3>
            {content?.email && (
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">البريد الإلكتروني</p>
                  <a
                    href={`mailto:${content.email}`}
                    className="text-base text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    {content.email}
                  </a>
                </div>
              </div>
            )}
            {content?.phone && (
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">رقم الهاتف</p>
                  <a
                    href={`tel:${content.phone}`}
                    className="text-base text-slate-900 hover:text-green-600 transition-colors"
                    dir="ltr"
                  >
                    {content.phone}
                  </a>
                </div>
              </div>
            )}
            {content?.address && (
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">العنوان</p>
                  <p className="text-base text-slate-900">{content.address}</p>
                </div>
              </div>
            )}
            {content?.hours && (
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">ساعات العمل</p>
                  <p className="text-base text-slate-900">{content.hours}</p>
                </div>
              </div>
            )}
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

// Contact 2: Simple Info Cards
const ContactSection2 = ({
  title,
  description,
  content,
}: {
  title?: string;
  description?: string;
  content?: {
    email?: string;
    phone?: string;
    address?: string;
    hours?: string;
  };
}) => {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
      <div className="max-w-5xl mx-auto">
        {title && (
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 sm:mb-6 text-center">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-base sm:text-lg text-slate-600 mb-12 text-center max-w-2xl mx-auto">
            {description}
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content?.email && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-sm font-semibold text-slate-700 mb-2">البريد الإلكتروني</h3>
              <a
                href={`mailto:${content.email}`}
                className="text-sm text-slate-600 hover:text-blue-600 transition-colors break-all"
              >
                {content.email}
              </a>
            </div>
          )}
          {content?.phone && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-sm font-semibold text-slate-700 mb-2">رقم الهاتف</h3>
              <a
                href={`tel:${content.phone}`}
                className="text-sm text-slate-600 hover:text-green-600 transition-colors"
                dir="ltr"
              >
                {content.phone}
              </a>
            </div>
          )}
          {content?.address && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-sm font-semibold text-slate-700 mb-2">العنوان</h3>
              <p className="text-sm text-slate-600">{content.address}</p>
            </div>
          )}
          {content?.hours && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="text-sm font-semibold text-slate-700 mb-2">ساعات العمل</h3>
              <p className="text-sm text-slate-600">{content.hours}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Contact 3: Map Style
const ContactSection3 = ({
  title,
  description,
  content,
  photos,
}: {
  title?: string;
  description?: string;
  content?: {
    email?: string;
    phone?: string;
    address?: string;
    hours?: string;
  };
  photos?: any[];
}) => {
  const mapUrl = photos?.[0]?.url || photos?.[0]?.base64Content;

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        {title && (
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 sm:mb-6 text-center">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-base sm:text-lg text-slate-600 mb-12 text-center max-w-2xl mx-auto">
            {description}
          </p>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mapUrl && (
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={mapUrl}
                alt="الموقع"
                className="w-full h-full object-cover"
                style={{ minHeight: "400px" }}
              />
            </div>
          )}
          <div className="space-y-6">
            {content?.address && (
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">العنوان</p>
                  <p className="text-base text-slate-900">{content.address}</p>
                </div>
              </div>
            )}
            {content?.phone && (
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">رقم الهاتف</p>
                  <a
                    href={`tel:${content.phone}`}
                    className="text-base text-slate-900 hover:text-green-600 transition-colors"
                    dir="ltr"
                  >
                    {content.phone}
                  </a>
                </div>
              </div>
            )}
            {content?.email && (
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">البريد الإلكتروني</p>
                  <a
                    href={`mailto:${content.email}`}
                    className="text-base text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    {content.email}
                  </a>
                </div>
              </div>
            )}
            {content?.hours && (
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">ساعات العمل</p>
                  <p className="text-base text-slate-900">{content.hours}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact 4: Modern Gradient Cards
const ContactSection4 = ({
  title,
  description,
  content,
}: {
  title?: string;
  description?: string;
  content?: {
    email?: string;
    phone?: string;
    address?: string;
    hours?: string;
  };
}) => {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        {title && (
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 sm:mb-6 text-center">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-base sm:text-lg text-slate-600 mb-12 text-center max-w-2xl mx-auto">
            {description}
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content?.email && (
            <div className="group relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                  <Mail className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold mb-2">البريد الإلكتروني</h3>
                <a
                  href={`mailto:${content.email}`}
                  className="text-sm text-blue-100 hover:text-white transition-colors break-all"
                >
                  {content.email}
                </a>
              </div>
            </div>
          )}
          {content?.phone && (
            <div className="group relative bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                  <Phone className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold mb-2">رقم الهاتف</h3>
                <a
                  href={`tel:${content.phone}`}
                  className="text-sm text-green-100 hover:text-white transition-colors"
                  dir="ltr"
                >
                  {content.phone}
                </a>
              </div>
            </div>
          )}
          {content?.address && (
            <div className="group relative bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                  <MapPin className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold mb-2">العنوان</h3>
                <p className="text-sm text-purple-100">{content.address}</p>
              </div>
            </div>
          )}
          {content?.hours && (
            <div className="group relative bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                  <Clock className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold mb-2">ساعات العمل</h3>
                <p className="text-sm text-orange-100">{content.hours}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Contact 5: Elegant Form with Background
const ContactSection5 = ({
  title,
  description,
  content,
  photos,
}: {
  title?: string;
  description?: string;
  content?: {
    email?: string;
    phone?: string;
    address?: string;
    hours?: string;
  };
  photos?: any[];
}) => {
  const bgImage = photos?.[0]?.url || photos?.[0]?.base64Content;

  return (
    <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={bgImage}
            alt="Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50"></div>
        </div>
      )}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {title && (
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 sm:mb-6 text-center">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-base sm:text-lg text-slate-600 mb-12 text-center max-w-2xl mx-auto">
              {description}
            </p>
          )}
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
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                <span>إرسال الرسالة</span>
              </button>
            </form>
            <div className="mt-8 pt-8 border-t border-slate-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                {content?.email && (
                  <div>
                    <Mail className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                    <a href={`mailto:${content.email}`} className="text-sm text-slate-600 hover:text-blue-600">
                      {content.email}
                    </a>
                  </div>
                )}
                {content?.phone && (
                  <div>
                    <Phone className="w-5 h-5 text-green-600 mx-auto mb-2" />
                    <a href={`tel:${content.phone}`} className="text-sm text-slate-600 hover:text-green-600" dir="ltr">
                      {content.phone}
                    </a>
                  </div>
                )}
                {content?.address && (
                  <div>
                    <MapPin className="w-5 h-5 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">{content.address}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact 6: Split Design with Icons
const ContactSection6 = ({
  title,
  description,
  content,
}: {
  title?: string;
  description?: string;
  content?: {
    email?: string;
    phone?: string;
    address?: string;
    hours?: string;
  };
}) => {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        {title && (
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 sm:mb-6 text-center">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-base sm:text-lg text-slate-600 mb-12 text-center max-w-2xl mx-auto">
            {description}
          </p>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {content?.email && (
              <div className="flex items-center gap-6 group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Mail className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">البريد الإلكتروني</h3>
                  <a
                    href={`mailto:${content.email}`}
                    className="text-base text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    {content.email}
                  </a>
                </div>
              </div>
            )}
            {content?.phone && (
              <div className="flex items-center gap-6 group">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Phone className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">رقم الهاتف</h3>
                  <a
                    href={`tel:${content.phone}`}
                    className="text-base text-slate-600 hover:text-green-600 transition-colors"
                    dir="ltr"
                  >
                    {content.phone}
                  </a>
                </div>
              </div>
            )}
            {content?.address && (
              <div className="flex items-center gap-6 group">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">العنوان</h3>
                  <p className="text-base text-slate-600">{content.address}</p>
                </div>
              </div>
            )}
            {content?.hours && (
              <div className="flex items-center gap-6 group">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Clock className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">ساعات العمل</h3>
                  <p className="text-base text-slate-600">{content.hours}</p>
                </div>
              </div>
            )}
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 sm:p-12">
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

export const contact_sections: SectionOptionType[] = [
  {
    id: "1",
    title: "نموذج اتصال",
    component: ContactSection1,
    thumbnail: {
      url: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=400",
    },
    content: [
      {
        id: "title",
        label: "العنوان",
        name: "title",
        type: "text",
        value: "اتصل بنا",
      },
      {
        id: "description",
        label: "الوصف",
        name: "description",
        type: "textarea",
        value: "نحن هنا لمساعدتك. تواصل معنا عبر أي من الطرق التالية.",
      },
      {
        id: "email",
        label: "البريد الإلكتروني",
        name: "email",
        type: "text",
        value: "info@example.com",
      },
      {
        id: "phone",
        label: "رقم الهاتف",
        name: "phone",
        type: "text",
        value: "+966 50 123 4567",
      },
      {
        id: "address",
        label: "العنوان",
        name: "address",
        type: "textarea",
        value: "الرياض، المملكة العربية السعودية",
      },
      {
        id: "hours",
        label: "ساعات العمل",
        name: "hours",
        type: "text",
        value: "الأحد - الخميس: 9 صباحاً - 6 مساءً",
      },
    ],
  },
  {
    id: "2",
    title: "بطاقات معلومات",
    component: ContactSection2,
    thumbnail: {
      url: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=400",
    },
    content: [
      {
        id: "title",
        label: "العنوان",
        name: "title",
        type: "text",
        value: "اتصل بنا",
      },
      {
        id: "description",
        label: "الوصف",
        name: "description",
        type: "textarea",
        value: "تواصل معنا عبر أي من الطرق التالية",
      },
      {
        id: "email",
        label: "البريد الإلكتروني",
        name: "email",
        type: "text",
        value: "info@example.com",
      },
      {
        id: "phone",
        label: "رقم الهاتف",
        name: "phone",
        type: "text",
        value: "+966 50 123 4567",
      },
      {
        id: "address",
        label: "العنوان",
        name: "address",
        type: "textarea",
        value: "الرياض، المملكة العربية السعودية",
      },
      {
        id: "hours",
        label: "ساعات العمل",
        name: "hours",
        type: "text",
        value: "الأحد - الخميس: 9 صباحاً - 6 مساءً",
      },
    ],
  },
  {
    id: "3",
    title: "خريطة واتصال",
    component: ContactSection3,
    thumbnail: {
      url: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=400",
    },
    content: [
      {
        id: "title",
        label: "العنوان",
        name: "title",
        type: "text",
        value: "اتصل بنا",
      },
      {
        id: "description",
        label: "الوصف",
        name: "description",
        type: "textarea",
        value: "نحن هنا لمساعدتك. تواصل معنا عبر أي من الطرق التالية.",
      },
      {
        id: "email",
        label: "البريد الإلكتروني",
        name: "email",
        type: "text",
        value: "info@example.com",
      },
      {
        id: "phone",
        label: "رقم الهاتف",
        name: "phone",
        type: "text",
        value: "+966 50 123 4567",
      },
      {
        id: "address",
        label: "العنوان",
        name: "address",
        type: "textarea",
        value: "الرياض، المملكة العربية السعودية",
      },
      {
        id: "hours",
        label: "ساعات العمل",
        name: "hours",
        type: "text",
        value: "الأحد - الخميس: 9 صباحاً - 6 مساءً",
      },
    ],
    photos: [{}],
  },
  {
    id: "4",
    title: "بطاقات متدرجة",
    component: ContactSection4,
    thumbnail: {
      url: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=400",
    },
    content: [
      {
        id: "title",
        label: "العنوان",
        name: "title",
        type: "text",
        value: "اتصل بنا",
      },
      {
        id: "description",
        label: "الوصف",
        name: "description",
        type: "textarea",
        value: "تواصل معنا عبر أي من الطرق التالية",
      },
      {
        id: "email",
        label: "البريد الإلكتروني",
        name: "email",
        type: "text",
        value: "info@example.com",
      },
      {
        id: "phone",
        label: "رقم الهاتف",
        name: "phone",
        type: "text",
        value: "+966 50 123 4567",
      },
      {
        id: "address",
        label: "العنوان",
        name: "address",
        type: "textarea",
        value: "الرياض، المملكة العربية السعودية",
      },
      {
        id: "hours",
        label: "ساعات العمل",
        name: "hours",
        type: "text",
        value: "الأحد - الخميس: 9 صباحاً - 6 مساءً",
      },
    ],
  },
  {
    id: "5",
    title: "نموذج أنيق",
    component: ContactSection5,
    thumbnail: {
      url: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=400",
    },
    content: [
      {
        id: "title",
        label: "العنوان",
        name: "title",
        type: "text",
        value: "اتصل بنا",
      },
      {
        id: "description",
        label: "الوصف",
        name: "description",
        type: "textarea",
        value: "نحن هنا لمساعدتك. أرسل لنا رسالة وسنرد عليك في أقرب وقت ممكن.",
      },
      {
        id: "email",
        label: "البريد الإلكتروني",
        name: "email",
        type: "text",
        value: "info@example.com",
      },
      {
        id: "phone",
        label: "رقم الهاتف",
        name: "phone",
        type: "text",
        value: "+966 50 123 4567",
      },
      {
        id: "address",
        label: "العنوان",
        name: "address",
        type: "textarea",
        value: "الرياض، المملكة العربية السعودية",
      },
      {
        id: "hours",
        label: "ساعات العمل",
        name: "hours",
        type: "text",
        value: "الأحد - الخميس: 9 صباحاً - 6 مساءً",
      },
    ],
    photos: [{}],
  },
  {
    id: "6",
    title: "تصميم منقسم",
    component: ContactSection6,
    thumbnail: {
      url: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=400",
    },
    content: [
      {
        id: "title",
        label: "العنوان",
        name: "title",
        type: "text",
        value: "اتصل بنا",
      },
      {
        id: "description",
        label: "الوصف",
        name: "description",
        type: "textarea",
        value: "نحن هنا لمساعدتك. تواصل معنا عبر أي من الطرق التالية أو أرسل لنا رسالة.",
      },
      {
        id: "email",
        label: "البريد الإلكتروني",
        name: "email",
        type: "text",
        value: "info@example.com",
      },
      {
        id: "phone",
        label: "رقم الهاتف",
        name: "phone",
        type: "text",
        value: "+966 50 123 4567",
      },
      {
        id: "address",
        label: "العنوان",
        name: "address",
        type: "textarea",
        value: "الرياض، المملكة العربية السعودية",
      },
      {
        id: "hours",
        label: "ساعات العمل",
        name: "hours",
        type: "text",
        value: "الأحد - الخميس: 9 صباحاً - 6 مساءً",
      },
    ],
  },
];

