// Organic Features Component - Natural Values Section (Matching Reference)
// Uses data-type, data-name, data-title attributes for inline editing

import { FadeIn } from "../animations/FadeIn";

interface FeaturesOrganic1Props {
  isEditor?: boolean;
}

export const FeaturesOrganic1 = ({ isEditor = false }: FeaturesOrganic1Props) => {
  const features = [
    { icon: "/mock/organic/icon-organic.png", title: "100% عضوي" },
    { icon: "/mock/organic/icon-skin 1.png", title: "عناية بالبشرة" },
    { icon: "/mock/organic/icon-serum 3.png", title: "سيروم طبيعي" },
  ];

  return (
    <section className="py-16 bg-[#f8faf7]" dir="rtl">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Title - Above the icons */}
        <FadeIn direction="up" delay={0} className="text-center mb-12">
          <p
            className="text-[#5a6b4e] text-sm tracking-widest mb-2"
            {...(isEditor && { "data-type": "text", "data-name": "tagline", "data-title": "العنوان الفرعي" })}
          >
            لماذا تختارنا
          </p>
          <h2
            className="text-2xl lg:text-3xl font-light text-[#2d3a2d]"
            {...(isEditor && { "data-type": "text", "data-name": "title", "data-title": "العنوان" })}
          >
            عناية طبيعية للبشرة معتمدة وعضوية
          </h2>
        </FadeIn>

        {/* Features - Simple row of 3 icons like in reference */}
        <div className="flex flex-wrap justify-center gap-12 lg:gap-20">
          {features.map((feature, index) => (
            <FadeIn key={index} direction="up" delay={index * 150} className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3
                className="text-[#2d3a2d] font-medium"
                {...(isEditor && { "data-type": "text", "data-name": `feature${index + 1}_title`, "data-title": "عنوان الميزة" })}
              >
                {feature.title}
              </h3>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
