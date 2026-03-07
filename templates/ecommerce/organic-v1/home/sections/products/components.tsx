// Organic Products Components - Natural Skincare Product Grids (Matching Reference)
// Uses data-type, data-name, data-title attributes for inline editing

import { ShoppingBag, Star } from "lucide-react";
import { FadeIn } from "../animations/FadeIn";

interface ProductsOrganicProps {
  isEditor?: boolean;
}

// Sample organic products data with real images
const organicProducts = [
  { id: 1, name: "سيروم الوجه العضوي", price: 45, rating: 4.8, badge: "الأكثر مبيعاً", image: "/mock/organic/product-CHICORI.png" },
  { id: 2, name: "مرطب طبيعي", price: 38, rating: 4.9, badge: "جديد", image: "/mock/organic/product-CLASSWING.png" },
  { id: 3, name: "منظف عشبي", price: 32, rating: 4.7, badge: null, image: "/mock/organic/product-HOLOCENA.png" },
  { id: 4, name: "زيت فيتامين سي", price: 52, rating: 4.9, badge: "شائع", image: "/mock/organic/product-INAMORATA.png" },
];

// Products 1: Showcases 3 products in circles (matching reference)
export const ProductsOrganic1 = ({ isEditor = false }: ProductsOrganicProps) => {
  const showcaseProducts = [
    { id: 1, name: "سيروم", subtitle: "ORGANIC", image: "/mock/organic/product-LIGHTCOOL.png" },
    { id: 2, name: "كريم", subtitle: "NATURAL", image: "/mock/organic/product-NOTORIOUS.png" },
    { id: 3, name: "زيت", subtitle: "PURE", image: "/mock/organic/product-HOLOCENA.png" },
  ];

  return (
    <section className="py-20 bg-[#f8faf7]" dir="rtl">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Title - Above products */}
        <FadeIn direction="up" delay={0} className="text-center max-w-2xl mx-auto mb-16">
          <p
            className="text-[#5a6b4e] text-sm tracking-widest mb-2"
            {...(isEditor && { "data-type": "text", "data-name": "tagline", "data-title": "العنوان الفرعي" })}
          >
            LACIANT
          </p>
          <h2
            className="text-2xl lg:text-3xl font-light text-[#2d3a2d]"
            {...(isEditor && { "data-type": "text", "data-name": "title", "data-title": "العنوان" })}
          >
            عناية طبيعية للبشرة معتمدة وعضوية
          </h2>
        </FadeIn>

        {/* Products - 3 in circles like reference */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
          {showcaseProducts.map((product, index) => (
            <FadeIn key={product.id} direction="up" delay={index * 200} className="text-center">
              {/* Product in circle */}
              <div className="w-48 h-48 lg:w-56 lg:h-56 bg-[#e8ebe3] rounded-full flex items-center justify-center mb-4 relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-auto object-contain"
                />
              </div>
              {/* Product name below */}
              <h3
                className="text-[#2d3a2d] font-medium text-lg"
                {...(isEditor && { "data-type": "text", "data-name": `product${product.id}_name`, "data-title": "اسم المنتج" })}
              >
                {product.name}
              </h3>
              <p
                className="text-[#5a6b4e] text-xs tracking-wider"
                {...(isEditor && { "data-type": "text", "data-name": `product${product.id}_subtitle`, "data-title": "العنوان الفرعي" })}
              >
                {product.subtitle}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// Products 2: Grid layout for skincare routine - title on left, products on right
export const ProductsOrganic2 = ({ isEditor = false }: ProductsOrganicProps) => {
  return (
    <section className="py-20 bg-white" dir="rtl">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left - Section Header (takes 3 columns) */}
          <FadeIn direction="right" delay={0} className="lg:col-span-3 text-center lg:text-right">
            <p
              className="text-[#5a6b4e] text-sm tracking-widest mb-2"
              {...(isEditor && { "data-type": "text", "data-name": "tagline", "data-title": "العنوان الفرعي" })}
            >
              LACIANT
            </p>
            <h2
              className="text-2xl lg:text-3xl font-light text-[#2d3a2d] mb-4 leading-relaxed"
              {...(isEditor && { "data-type": "text", "data-name": "title", "data-title": "العنوان" })}
            >
              روتين العناية ببشرتك ووجهك
            </h2>
          </FadeIn>

          {/* Right - Products Grid (takes 9 columns) */}
          <div className="lg:col-span-9">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {organicProducts.map((product, index) => (
                <FadeIn key={product.id} direction="up" delay={index * 100} className="group">
                  {/* Product Image - circle style */}
                  <div className="relative w-full aspect-square bg-[#f5f5f0] rounded-full overflow-hidden mb-4 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-auto object-contain"
                    />

                    {/* Badge */}
                    {product.badge && (
                      <span className="absolute top-4 right-4 bg-[#5a6b4e] text-white text-xs px-3 py-1 rounded-full">
                        {product.badge}
                      </span>
                    )}

                    {/* Quick Add Button */}
                    <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ShoppingBag className="w-5 h-5 text-[#5a6b4e]" />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="text-center">
                    <h3 className="font-medium text-[#2d3a2d] mb-1">{product.name}</h3>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-[#5a6b4e] text-[#5a6b4e]" />
                        <span className="text-sm text-[#5a6b4e]">{product.rating}</span>
                      </div>
                    </div>
                    <p className="text-[#5a6b4e] font-semibold">${product.price}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
