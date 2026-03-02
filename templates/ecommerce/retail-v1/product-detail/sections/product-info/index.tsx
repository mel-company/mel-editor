import { useState } from "react";
import { ShoppingCart, Heart, Star, Minus, Plus, Truck, Shield, RefreshCw } from "lucide-react";
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
  const finalName = getContentValue('product_name') || product_name || 'Product Name';
  const finalPrice = getContentValue('product_price') || product_price || '99.99';
  const finalDescription = getContentValue('product_description') || product_description || 'Product description goes here';
  const finalRating = getContentValue('product_rating') || product_rating || '4.5';
  const finalReviewsCount = getContentValue('product_reviews_count') || product_reviews_count || '128';

  const mainImage = finalPhotos[selectedImage] || finalPhotos[0];

  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={mainImage?.url || "https://via.placeholder.com/600"}
              alt={finalName}
              className="w-full h-full object-cover"
              {...(isEditor && {
                "data-type": "image",
                "data-label": "الصورة الرئيسية",
                "data-name": "main_image"
              })}
            />
          </div>
          {finalPhotos.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {finalPhotos.slice(0, 4).map((photo: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 ${selectedImage === index ? 'border-blue-600' : 'border-transparent'
                    }`}
                >
                  <img
                    src={photo?.url || "https://via.placeholder.com/150"}
                    alt={`${finalName} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ color: styles?.headingColor || styles?.textColor }}
              {...(isEditor && {
                "data-type": "text",
                "data-label": "اسم المنتج",
                "data-name": "product_name"
              })}
            >
              {finalName}
            </h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(parseFloat(finalRating)) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                  />
                ))}
              </div>
              <span
                className="text-gray-600"
                {...(isEditor && {
                  "data-type": "text",
                  "data-label": "عدد التقييمات",
                  "data-name": "product_reviews_count"
                })}
              >
                ({finalReviewsCount} reviews)
              </span>
            </div>

            <p
              className="text-3xl font-bold text-blue-600 mb-6"
              {...(isEditor && {
                "data-type": "text",
                "data-label": "السعر",
                "data-name": "product_price"
              })}
            >
              ${finalPrice}
            </p>
          </div>

          <p
            className="text-gray-600 leading-relaxed"
            style={{ color: styles?.textColor }}
            {...(isEditor && {
              "data-type": "textarea",
              "data-label": "وصف المنتج",
              "data-name": "product_description"
            })}
          >
            {finalDescription}
          </p>

          {/* Quantity Selector */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-semibold">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-6 py-2 border-x">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <Heart className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="border-t pt-6 space-y-3">
            <div className="flex items-center gap-3 text-gray-600">
              <Truck className="w-5 h-5" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Shield className="w-5 h-5" />
              <span>2 year warranty</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <RefreshCw className="w-5 h-5" />
              <span>30-day return policy</span>
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

  const finalPhotos = isEditor ? editorPhotos : photos || [];
  const finalName = getContentValue('product_name') || product_name || 'Product Name';
  const finalPrice = getContentValue('product_price') || product_price || '99.99';
  const finalDescription = getContentValue('product_description') || product_description || 'Product description goes here';
  const finalRating = getContentValue('product_rating') || product_rating || '4.5';
  const finalReviewsCount = getContentValue('product_reviews_count') || product_reviews_count || '128';

  const mainImage = finalPhotos[0];

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-gray-600">
            <span>Home</span> / <span>Products</span> / <span className="text-gray-900">{finalName}</span>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left: Image */}
            <div className="sticky top-8 h-fit">
              <div className="rounded-2xl overflow-hidden bg-gray-50 shadow-lg">
                <img
                  src={mainImage?.url || "https://via.placeholder.com/800"}
                  alt={finalName}
                  className="w-full aspect-square object-cover"
                  {...(isEditor && {
                    "data-type": "image",
                    "data-label": "صورة المنتج",
                    "data-name": "main_image"
                  })}
                />
              </div>
              {finalPhotos.length > 1 && (
                <div className="grid grid-cols-4 gap-3 mt-4">
                  {finalPhotos.slice(1, 5).map((photo: any, index: number) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-50">
                      <img
                        src={photo?.url || "https://via.placeholder.com/200"}
                        alt={`${finalName} ${index + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Info */}
            <div className="space-y-8">
              <div>
                <h1
                  className="text-4xl md:text-5xl font-bold mb-4"
                  style={{ color: styles?.headingColor || styles?.textColor }}
                  {...(isEditor && {
                    "data-type": "text",
                    "data-label": "اسم المنتج",
                    "data-name": "product_name"
                  })}
                >
                  {finalName}
                </h1>

                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(parseFloat(finalRating)) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                      />
                    ))}
                  </div>
                  <span
                    className="text-lg font-semibold"
                    {...(isEditor && {
                      "data-type": "text",
                      "data-label": "التقييم",
                      "data-name": "product_rating"
                    })}
                  >
                    {finalRating}
                  </span>
                  <span className="text-gray-500">|</span>
                  <span
                    className="text-gray-600"
                    {...(isEditor && {
                      "data-type": "text",
                      "data-label": "عدد التقييمات",
                      "data-name": "product_reviews_count"
                    })}
                  >
                    {finalReviewsCount} reviews
                  </span>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-6">
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
                  <p className="text-sm text-gray-600 mt-1">Tax included. Shipping calculated at checkout.</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p
                  className="text-gray-600 leading-relaxed"
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

              {/* Quantity and Add to Cart */}
              <div className="space-y-4 pt-6 border-t">
                <div className="flex items-center gap-6">
                  <label className="font-semibold text-lg">Quantity:</label>
                  <div className="flex items-center bg-gray-100 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-200 rounded-l-lg"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="px-8 py-3 font-semibold text-lg">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-gray-200 rounded-r-lg"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-4 px-8 rounded-lg font-bold text-lg hover:bg-blue-700 transition flex items-center justify-center gap-3 shadow-lg">
                  <ShoppingCart className="w-6 h-6" />
                  Add to Cart
                </button>

                <button className="w-full border-2 border-gray-300 py-4 px-8 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-3">
                  <Heart className="w-6 h-6" />
                  Add to Wishlist
                </button>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Truck className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm font-semibold">Free Shipping</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm font-semibold">2 Year Warranty</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <RefreshCw className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm font-semibold">Easy Returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
