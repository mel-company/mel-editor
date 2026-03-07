// Organic About Component - Brand Story Section (Matching Reference)
// Uses data-type, data-name, data-title attributes for inline editing

import { ArrowRight } from "lucide-react";
import { FadeIn } from "../animations/FadeIn";

interface AboutOrganic1Props {
  isEditor?: boolean;
}

export const AboutOrganic1 = ({ isEditor = false }: AboutOrganic1Props) => {
  return (
    <section className="py-20 bg-white" dir="rtl">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <FadeIn direction="right" delay={200} className="order-1">
            <h2
              className="text-2xl lg:text-3xl font-light text-[#2d3a2d] mb-6 leading-relaxed"
              {...(isEditor && { "data-type": "text", "data-name": "title", "data-title": "العنوان" })}
            >
              شركة محلية متخصصة في العناية بالبشرة
            </h2>
            <div
              className="space-y-4 text-[#5a6b4e]/80 mb-8 text-sm leading-relaxed"
              {...(isEditor && { "data-type": "textarea", "data-name": "description", "data-title": "الوصف" })}
            >
              <p>
                نؤمن بقوة الطبيعة في التغذية والتجديد. منتجاتنا مصنوعة بعناية باستخدام أرقى المكونات العضوية، والمُحصَّلة بشكل مستدام من المجتمعات المحلية.
              </p>
              <p>
                كل منتج يحكي قصة من الحكمة التقليدية تلتقي بالعلم الحديث، مما يخلق عناية بالبشرة تحترم بشرتك والبيئة.
              </p>
            </div>
            <button
              className="inline-flex items-center gap-2 text-[#5a6b4e] text-sm font-medium hover:gap-4 transition-all"
              {...(isEditor && { "data-type": "text", "data-name": "cta_text", "data-title": "نص الزر" })}
            >
              اكتشف قصتنا
              <ArrowRight className="w-4 h-4" />
            </button>
          </FadeIn>

          {/* Right - Product Image */}
          <FadeIn direction="left" delay={400} className="order-2 flex justify-center">
            <img
              src="/mock/organic/product-NOTORIOUS.png"
              alt="Organic skincare product"
              className="w-64 h-auto object-contain"
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
