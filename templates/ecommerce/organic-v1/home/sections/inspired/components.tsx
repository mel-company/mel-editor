// Organic Inspired By Component - Traditional Knowledge Section (Matching Reference)
// Uses data-type, data-name, data-title attributes for inline editing

import { FadeIn } from "../animations/FadeIn";

interface InspiredByOrganic1Props {
  isEditor?: boolean;
}

export const InspiredByOrganic1 = ({ isEditor = false }: InspiredByOrganic1Props) => {
  return (
    <section className="py-20 bg-white" dir="rtl">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Right - Text Content */}
          <FadeIn direction="right" delay={200} className="order-1 lg:order-2 text-center lg:text-right">
            <h2
              className="text-2xl lg:text-3xl font-light text-[#2d3a2d] leading-relaxed mb-4"
              {...(isEditor && { "data-type": "text", "data-name": "title", "data-title": "العنوان" })}
            >
              مستوحى من المعرفة التقليدية والطبيعة
            </h2>
          </FadeIn>

          {/* Left - Green Bowl Image */}
          <FadeIn direction="left" delay={400} className="order-2 lg:order-1 flex justify-center">
            <img
              src="/mock/organic/plate.png"
              alt="Natural ingredients bowl"
              className="w-64 h-auto object-contain"
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
