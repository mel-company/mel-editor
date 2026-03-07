// Organic Skin Quiz Component - 3 Minutes Quiz Section (Matching Reference)
// Uses data-type, data-name, data-title attributes for inline editing

interface SkinQuizOrganic1Props {
  isEditor?: boolean;
}

export const SkinQuizOrganic1 = ({ isEditor = false }: SkinQuizOrganic1Props) => {
  return (
    <section className="py-20 bg-[#f8faf7]" dir="rtl">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Right - Text Content */}
          <div className="order-1 lg:order-2 text-center lg:text-right">
            <h2
              className="text-2xl lg:text-3xl font-light text-[#2d3a2d] leading-relaxed mb-4"
              {...(isEditor && { "data-type": "text", "data-name": "title", "data-title": "العنوان" })}
            >
              تحليل بشرتك في 3 دقائق
            </h2>
            <p
              className="text-[#5a6b4e]/80 mb-6"
              {...(isEditor && { "data-type": "textarea", "data-name": "subtitle", "data-title": "الوصف" })}
            >
              اكتشف روتين العناية بالبشرة المثالي لك
            </p>
            <button
              className="px-8 py-3 bg-[#5a6b4e] text-white rounded-full text-sm hover:bg-[#4a5b3e] transition-colors"
              {...(isEditor && { "data-type": "text", "data-name": "cta_text", "data-title": "نص الزر" })}
            >
              ابدأ الاختبار
            </button>
          </div>

          {/* Left - Face Illustration */}
          <div className="order-2 lg:order-1 flex justify-center">
            <img
              src="/mock/organic/services-face-illustration.png"
              alt="Skin analysis illustration"
              className="w-64 h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
