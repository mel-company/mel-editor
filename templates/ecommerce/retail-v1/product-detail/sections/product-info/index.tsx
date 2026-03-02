import { useState } from "react";
import { ShoppingCart, Heart, Star, Minus, Plus, Truck, Shield, RefreshCw, Zap, Award, ChevronLeft, ChevronRight, Share2, Eye } from "lucide-react";
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

// Product Info 1: Classic Layout - تصميم كلاسيكي
export const ProductInfo1 = ({
  id,
  product_name,
  product_price,
  product_description,
  product_rating,
  product_reviews_count,
  photos,
  styles,
  isEditor = false
}: {
  id?: string;
  product_name?: string;
  product_price?: string;
  product_description?: string;
  product_rating?: string;
  product_reviews_count?: string;
  photos?: any[];
  styles?: any;
  isEditor?: boolean;
}) => {
  const { getContentValue, photos: editorPhotos } = useEditorData(isEditor ? id : undefined);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const finalPhotos = isEditor ? editorPhotos : photos || [];
  // Use high-quality sample images if no photos provided
  const displayPhotos = finalPhotos.length > 0 ? finalPhotos : [
    { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop' },
    { url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop' },
    { url: 'https://images.unsplash.com/photo-1524678606372-56527bb42c43?w=800&h=800&fit=crop' },
    { url: 'https://images.unsplash.com/photo-1572569028738-411a197b8367?w=800&h=800&fit=crop' },
  ];
  const finalName = getContentValue('product_name') || product_name || 'اسم المنتج';
  const finalPrice = getContentValue('product_price') || product_price || '99.99';
  const finalDescription = getContentValue('product_description') || product_description || 'وصف المنتج يظهر هنا';
  const finalRating = getContentValue('product_rating') || product_rating || '4.5';
  const finalReviewsCount = getContentValue('product_reviews_count') || product_reviews_count || '128';

  const mainImage = displayPhotos[selectedImage] || displayPhotos[0];

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? displayPhotos.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === displayPhotos.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <span className="hover:text-slate-700 cursor-pointer transition">الرئيسية</span>
          <ChevronLeft className="w-4 h-4 rotate-180" />
          <span className="hover:text-slate-700 cursor-pointer transition">المنتجات</span>
          <ChevronLeft className="w-4 h-4 rotate-180" />
          <span className="text-slate-900 font-medium truncate max-w-[200px]">{finalName}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg border border-slate-100 group">
              <img
                src={mainImage?.url || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop"}
                alt={finalName}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                {...(isEditor && {
                  "data-type": "image",
                  "data-label": "الصورة الرئيسية",
                  "data-name": "main_image"
                })}
              />
              {/* Image Navigation Arrows */}
              {displayPhotos.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white hover:scale-110"
                  >
                    <ChevronLeft className="w-6 h-6 text-slate-700" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white hover:scale-110"
                  >
                    <ChevronRight className="w-6 h-6 text-slate-700" />
                  </button>
                </>
              )}
              {/* Image Counter */}
              {displayPhotos.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                  {selectedImage + 1} / {displayPhotos.length}
                </div>
              )}
            </div>

            {/* Thumbnail Grid */}
            {displayPhotos.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {displayPhotos.slice(0, 4).map((photo: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-xl overflow-hidden bg-white border-2 transition-all duration-200 ${selectedImage === index
                      ? 'border-blue-600 shadow-md ring-2 ring-blue-600/20'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                      }`}
                  >
                    <img
                      src={photo?.url}
                      alt={`${finalName} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6 lg:pt-4">
            {/* Title & Rating */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1
                  className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight"
                  style={{ color: styles?.headingColor || styles?.textColor }}
                  {...(isEditor && {
                    "data-type": "text",
                    "data-label": "اسم المنتج",
                    "data-name": "product_name"
                  })}
                >
                  {finalName}
                </h1>
                <div className="flex gap-2">
                  <button className="p-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 group">
                    <Share2 className="w-5 h-5 text-slate-500 group-hover:text-slate-700" />
                  </button>
                  <button className="p-3 rounded-xl border border-slate-200 hover:border-rose-300 hover:bg-rose-50 transition-all duration-200 group">
                    <Heart className="w-5 h-5 text-slate-500 group-hover:text-rose-500" />
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-lg">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(parseFloat(finalRating)) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'
                        }`}
                    />
                  ))}
                  <span className="font-bold text-slate-900 ml-1">{finalRating}</span>
                </div>
                <span className="text-slate-500">|</span>
                <span
                  className="text-slate-600 hover:text-slate-900 cursor-pointer transition"
                  {...(isEditor && {
                    "data-type": "text",
                    "data-label": "عدد التقييمات",
                    "data-name": "product_reviews_count"
                  })}
                >
                  ({finalReviewsCount} تقييم)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <p
                  className="text-4xl font-bold text-blue-600"
                  {...(isEditor && {
                    "data-type": "text",
                    "data-label": "السعر",
                    "data-name": "product_price"
                  })}
                >
                  ${finalPrice}
                </p>
                <span className="text-lg text-slate-400 line-through">${(parseFloat(finalPrice) * 1.2).toFixed(2)}</span>
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                  توفير 20%
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-slate-50 rounded-xl p-5">
              <p
                className="text-slate-600 leading-relaxed"
                style={{ color: styles?.textColor }}
                {...(isEditor && {
                  "data-type": "textarea",
                  "data-label": "وصف المنتج",
                  "data-name": "product_description"
                })}
              >
                {finalDescription}
              </p>
            </div>

            {/* Features - Horizontal */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
                <Truck className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">شحن مجاني</span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-lg">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-900">ضمان سنتين</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-lg">
                <RefreshCw className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">إرجاع خلال 30 يوم</span>
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <label className="font-semibold text-slate-900">الكمية:</label>
                <div className="flex items-center bg-white border border-slate-200 rounded-xl shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-slate-50 rounded-l-xl transition-colors border-r border-slate-200"
                  >
                    <Minus className="w-5 h-5 text-slate-600" />
                  </button>
                  <span className="px-6 py-3 font-semibold text-slate-900 min-w-[60px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-slate-50 rounded-r-xl transition-colors border-l border-slate-200"
                  >
                    <Plus className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5">
                  <ShoppingCart className="w-5 h-5" />
                  أضف للسلة
                </button>
                <button className="flex-1 border-2 border-slate-200 text-slate-700 py-4 px-6 rounded-xl font-bold hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  اشتر الآن
                </button>
              </div>

              <p className="text-center text-sm text-slate-500 flex items-center justify-center gap-2">
                <Eye className="w-4 h-4" />
                <span>245 شخص يشاهد هذا المنتج الآن</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Product Info 2: Modern Layout - تصميم حديث
export const ProductInfo2 = ({
  id,
  product_name,
  product_price,
  product_description,
  product_rating,
  product_reviews_count,
  photos,
  styles,
  isEditor = false
}: {
  id?: string;
  product_name?: string;
  product_price?: string;
  product_description?: string;
  product_rating?: string;
  product_reviews_count?: string;
  photos?: any[];
  styles?: any;
  isEditor?: boolean;
}) => {
  const { getContentValue, photos: editorPhotos } = useEditorData(isEditor ? id : undefined);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  const finalPhotos = isEditor ? editorPhotos : photos || [];
  const displayPhotos = finalPhotos.length > 0 ? finalPhotos : [
    { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop' },
    { url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop' },
    { url: 'https://images.unsplash.com/photo-1524678606372-56527bb42c43?w=800&h=800&fit=crop' },
  ];
  const finalName = getContentValue('product_name') || product_name || 'سماعات لاسلكية فاخرة';
  const finalPrice = getContentValue('product_price') || product_price || '299.99';
  const finalDescription = getContentValue('product_description') || product_description || 'استمتع بصوت نقي وعالي الجودة مع سماعاتنا اللاسلكية الفاخرة. تتميز بخاصية إلغاء الضوضاء النشطة، وبطارية تدوم 30 ساعة، ومقاعد أذن مريحة للاستخدام طوال اليوم.';
  const finalRating = getContentValue('product_rating') || product_rating || '4.8';
  const finalReviewsCount = getContentValue('product_reviews_count') || product_reviews_count || '2,847';

  const mainImage = displayPhotos[selectedImage] || displayPhotos[0];

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-10">
            <span className="hover:text-slate-700 cursor-pointer transition">الرئيسية</span>
            <ChevronLeft className="w-4 h-4 rotate-180" />
            <span className="hover:text-slate-700 cursor-pointer transition">إلكترونيات</span>
            <ChevronLeft className="w-4 h-4 rotate-180" />
            <span className="hover:text-slate-700 cursor-pointer transition">صوتيات</span>
            <ChevronLeft className="w-4 h-4 rotate-180" />
            <span className="text-slate-900 font-medium">{finalName}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Image Gallery - takes 7 columns */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50 shadow-xl">
                <img
                  src={mainImage?.url}
                  alt={finalName}
                  className="w-full h-full object-cover"
                  {...(isEditor && {
                    "data-type": "image",
                    "data-label": "صورة المنتج",
                    "data-name": "main_image"
                  })}
                />
                {/* Sale Badge */}
                <div className="absolute top-6 left-6 bg-gradient-to-r from-rose-500 to-pink-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                  خصم 20%
                </div>
                {/* Zoom Hint */}
                <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-slate-700 flex items-center gap-2 shadow-lg">
                  <Eye className="w-4 h-4" />
                  مرر للتكبير
                </div>
              </div>
              {displayPhotos.length > 1 && (
                <div className="grid grid-cols-5 gap-3">
                  {displayPhotos.map((photo: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-xl overflow-hidden bg-slate-100 border-2 transition-all duration-200 ${selectedImage === index
                        ? 'border-blue-600 shadow-md'
                        : 'border-transparent hover:border-slate-300'
                        }`}
                    >
                      <img
                        src={photo?.url}
                        alt={`${finalName} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Info - takes 5 columns */}
            <div className="lg:col-span-5 space-y-6">
              {/* Brand & Title */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">المتجر الرسمي</span>
                </div>
                <h1
                  className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight"
                  style={{ color: styles?.headingColor || styles?.textColor }}
                  {...(isEditor && {
                    "data-type": "text",
                    "data-label": "اسم المنتج",
                    "data-name": "product_name"
                  })}
                >
                  {finalName}
                </h1>

                {/* Enhanced Rating */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(parseFloat(finalRating)) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'
                          }`}
                      />
                    ))}
                  </div>
                  <span
                    className="text-lg font-bold text-slate-900"
                    {...(isEditor && {
                      "data-type": "text",
                      "data-label": "التقييم",
                      "data-name": "product_rating"
                    })}
                  >
                    {finalRating}
                  </span>
                  <span className="text-slate-400">|</span>
                  <span
                    className="text-slate-600 hover:text-slate-900 cursor-pointer transition underline underline-offset-4"
                    {...(isEditor && {
                      "data-type": "text",
                      "data-label": "عدد التقييمات",
                      "data-name": "product_reviews_count"
                    })}
                  >
                    {finalReviewsCount} تقييم موثق
                  </span>
                </div>

                {/* Price Box */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 p-6 rounded-r-2xl mb-6">
                  <div className="flex items-baseline gap-3 mb-2">
                    <p
                      className="text-4xl font-bold text-blue-600"
                      {...(isEditor && {
                        "data-type": "text",
                        "data-label": "السعر",
                        "data-name": "product_price"
                      })}
                    >
                      ${finalPrice}
                    </p>
                    <span className="text-xl text-slate-400 line-through">${(parseFloat(finalPrice) * 1.25).toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-slate-600 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-emerald-500" />
                    شامل جميع الضرائب والشحن السريع المجاني
                  </p>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-slate-200">
                <div className="flex gap-6">
                  {['description', 'specs', 'shipping'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 text-sm font-semibold capitalize transition-all ${activeTab === tab
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                      {tab === 'description' ? 'الوصف' : tab === 'specs' ? 'المواصفات' : 'الشحن'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="py-4">
                {activeTab === 'description' && (
                  <p
                    className="text-slate-600 leading-relaxed"
                    style={{ color: styles?.textColor }}
                    {...(isEditor && {
                      "data-type": "textarea",
                      "data-label": "وصف المنتج",
                      "data-name": "product_description"
                    })}
                  >
                    {finalDescription}
                  </p>
                )}
                {activeTab === 'specs' && (
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500">عمر البطارية</span>
                      <span className="font-medium text-slate-900">30 ساعة</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500">الاتصال</span>
                      <span className="font-medium text-slate-900">بلوتوث 5.2</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500">الوزن</span>
                      <span className="font-medium text-slate-900">250 غرام</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500">الضمان</span>
                      <span className="font-medium text-slate-900">سنتان</span>
                    </div>
                  </div>
                )}
                {activeTab === 'shipping' && (
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Truck className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-900">شحن سريع مجاني</p>
                        <p className="text-sm text-slate-500">التوصيل خلال 1-3 أيام عمل</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <RefreshCw className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-900">إرجاع سهل</p>
                        <p className="text-sm text-slate-500">ضمان استرداد المال خلال 30 يوم</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-4">
                  <label className="font-semibold text-slate-900">الكمية:</label>
                  <div className="flex items-center bg-slate-100 rounded-xl">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-slate-200 rounded-l-xl transition-colors"
                    >
                      <Minus className="w-5 h-5 text-slate-700" />
                    </button>
                    <span className="px-8 py-3 font-bold text-lg text-slate-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-slate-200 rounded-r-xl transition-colors"
                    >
                      <Plus className="w-5 h-5 text-slate-700" />
                    </button>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-3 shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5">
                  <ShoppingCart className="w-6 h-6" />
                  أضف للسلة - ${(parseFloat(finalPrice) * quantity).toFixed(2)}
                </button>

                <div className="flex gap-3">
                  <button className="flex-1 border-2 border-slate-200 py-3 px-6 rounded-xl font-semibold hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 transition-all duration-200 flex items-center justify-center gap-2 group">
                    <Heart className="w-5 h-5 group-hover:fill-rose-100" />
                    أضف للمفضلة
                  </button>
                  <button className="flex-1 border-2 border-slate-200 py-3 px-6 rounded-xl font-semibold hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 flex items-center justify-center gap-2">
                    <Share2 className="w-5 h-5" />
                    مشاركة
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100">
                <div className="text-center p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <Truck className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-xs font-semibold text-slate-700">شحن سريع مجاني</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                  <p className="text-xs font-semibold text-slate-700">ضمان سنتان</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <RefreshCw className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <p className="text-xs font-semibold text-slate-700">إرجاع خلال 30 يوم</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
