// Organic Hero Components - Natural Skincare Design (Matching Reference)
// Uses data-type, data-name, data-title attributes for inline editing

import { FadeIn } from "../animations/FadeIn";

interface HeroOrganic1Props {
  isEditor?: boolean;
}

// Hero 1: Main Hero - Dark green background with bottle LEFT, text RIGHT (matches reference)
export const HeroOrganic1 = ({ isEditor = false }: HeroOrganic1Props) => {
  return (
    <section className="relative min-h-screen bg-[#5a6b4e] overflow-hidden" dir="rtl">
      {/* Background leaf decoration - positioned like reference */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/mock/organic/hero-leaf.png"
          alt=""
          className="absolute top-0 right-0 w-[65%] h-full object-cover opacity-90"
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 h-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-screen py-16">
          {/* Left Side - Product Bottle (in LTR, becomes right in RTL) */}
          <FadeIn direction="left" delay={200} className="relative flex items-center justify-center order-2 lg:order-1">
            <img
              src="/mock/organic/bottol.png"
              alt="Organic Product"
              className="w-40 lg:w-48 h-auto object-contain drop-shadow-2xl"
            />
          </FadeIn>

          {/* Right Side - Text Content (in LTR, becomes left in RTL) */}
          <FadeIn direction="right" delay={400} className="text-white text-center lg:text-right order-1 lg:order-2">
            <h1
              className="text-4xl lg:text-5xl font-light leading-relaxed mb-8"
              style={{ fontFamily: 'var(--heading-font)' }}
              {...(isEditor && { "data-type": "text", "data-name": "title", "data-title": "العنوان" })}
            >
              دع الطبيعة<br />تهتم بجسدك<br />وروحك
            </h1>

            <button
              className="px-10 py-3 bg-white text-[#5a6b4e] rounded-full text-sm font-medium hover:bg-white/90 transition-colors"
              style={{ fontFamily: 'var(--body-font)' }}
              {...(isEditor && { "data-type": "text", "data-name": "cta_text", "data-title": "نص الزر" })}
            >
              تسوق الآن
            </button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

// Hero 2: Secondary Hero - Clean minimal design
export const HeroOrganic2 = ({ isEditor = false }: HeroOrganic1Props) => {
  return (
    <section className="relative py-20 bg-[#f8faf7]" dir="rtl">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto">
          <p
            className="text-[#5a6b4e] text-sm tracking-widest mb-4"
            style={{ fontFamily: 'var(--body-font)' }}
            {...(isEditor && { "data-type": "text", "data-name": "tagline", "data-title": "العنوان الفرعي" })}
          >
            نقي وعضوي
          </p>
          <h2
            className="text-3xl lg:text-4xl text-[#2d3a2d] leading-relaxed mb-6"
            style={{ fontFamily: 'var(--heading-font)' }}
            {...(isEditor && { "data-type": "text", "data-name": "title", "data-title": "العنوان" })}
          >
            جمال نقي مستوحى من الطبيعة
          </h2>
          <button
            className="px-8 py-3 border-2 border-[#5a6b4e] text-[#5a6b4e] rounded-full text-sm hover:bg-[#5a6b4e] hover:text-white transition-colors"
            style={{ fontFamily: 'var(--body-font)' }}
            {...(isEditor && { "data-type": "text", "data-name": "cta_text", "data-title": "نص الزر" })}
          >
            اكتشف المزيد
          </button>
        </div>
      </div>
    </section>
  );
};
