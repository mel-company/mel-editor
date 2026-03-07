// Organic Newsletter Component - Subscribe Section
// Uses data-type, data-name, data-title attributes for inline editing

import { Mail, ArrowRight } from "lucide-react";
import { FadeIn } from "../animations/FadeIn";

interface NewsletterOrganic1Props {
  isEditor?: boolean;
}

export const NewsletterOrganic1 = ({ isEditor = false }: NewsletterOrganic1Props) => {
  return (
    <section className="py-20 bg-[#5a6b4e]">
      <div className="container mx-auto px-6 lg:px-12">
        <FadeIn direction="up" delay={0} className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>

          {/* Title */}
          <h2
            className="text-3xl lg:text-4xl font-serif text-white mb-4"
            {...(isEditor && { "data-type": "text", "data-name": "title", "data-title": "العنوان" })}
          >
            اشترك واحصل على خصم 10% لطلبك الأول
          </h2>

          {/* Subtitle */}
          <p
            className="text-white/80 mb-8"
            {...(isEditor && { "data-type": "textarea", "data-name": "subtitle", "data-title": "الوصف" })}
          >
            انضم لمجتمعنا للحصول على عروض حصرية ونصائح للعناية بالبشرة
          </p>

          {/* Form */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40"
            />
            <button
              className="px-8 py-4 bg-white text-[#5a6b4e] rounded-full font-medium hover:bg-[#f5f5f0] transition-colors flex items-center justify-center gap-2"
              {...(isEditor && { "data-type": "text", "data-name": "button_text", "data-title": "نص الزر" })}
            >
              اشترك
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Trust note */}
          <p className="text-white/60 text-sm mt-4">
            نحن نحترم خصوصيتك. يمكنك إلغاء الاشتراك في أي وقت.
          </p>
        </FadeIn>
      </div>
    </section>
  );
};
