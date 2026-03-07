// Organic Testimonials Component - Customer Reviews Section (Matching Reference)
// Uses data-type, data-name, data-title attributes for inline editing

import { Star } from "lucide-react";
import { FadeIn } from "../animations/FadeIn";

interface TestimonialsOrganic1Props {
  isEditor?: boolean;
}

export const TestimonialsOrganic1 = ({ isEditor = false }: TestimonialsOrganic1Props) => {
  return (
    <section className="py-20 bg-[#f8faf7]" dir="rtl">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Product Image */}
          <FadeIn direction="left" delay={200} className="flex justify-center order-2 lg:order-1">
            <img
              src="/mock/organic/bottol.png"
              alt="Organic product"
              className="w-40 lg:w-48 h-auto object-contain"
            />
          </FadeIn>

          {/* Right - Testimonial Content */}
          <FadeIn direction="right" delay={400} className="order-1 lg:order-2 text-center lg:text-right">
            {/* 5 Stars */}
            <div className="flex gap-1 mb-4 justify-center lg:justify-start">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#5a6b4e] text-[#5a6b4e]" />
              ))}
            </div>

            {/* Testimonial Text */}
            <p
              className="text-[#5a6b4e]/80 text-lg leading-relaxed mb-6"
              {...(isEditor && { "data-type": "textarea", "data-name": "testimonial_text", "data-title": "نص التقييم" })}
            >
              كنت أشعر بالتوتر بشأن بشرتي مؤخراً، واشتريت مجموعة من هذه المنتجات. يا إلهي أنا مبهورة. بشرتي أصبحت ناعمة ومظهرها أفضل.
            </p>

            {/* Author */}
            <p
              className="font-medium text-[#2d3a2d]"
              {...(isEditor && { "data-type": "text", "data-name": "testimonial_author", "data-title": "مؤلف التقييم" })}
            >
              سارة م.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
