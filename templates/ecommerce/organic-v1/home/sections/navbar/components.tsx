// Organic Navigation Components
// Components use data-type, data-name, data-title attributes for inline editing

import { Menu, X } from "lucide-react";
import { useState } from "react";

interface NavigationOrganic1Props {
  isEditor?: boolean;
}

export const NavigationOrganic1 = ({ isEditor = false }: NavigationOrganic1Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50" dir="rtl">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div
              className="text-2xl font-light text-[#2d3a2d]"
              style={{ fontFamily: 'var(--heading-font)' }}
              {...(isEditor && { "data-type": "text", "data-name": "logo", "data-title": "الشعار" })}
            >
              Organic Beauty
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 space-y-reverse space-x-reverse">
            {["الرئيسية", "المنتجات", "من نحن", "اتصل بنا"].map((item, index) => (
              <a
                key={index}
                href="#"
                className="text-[#2d3a2d] hover:text-[#5a6b4e] transition-colors font-light"
                style={{ fontFamily: 'var(--body-font)' }}
                {...(isEditor && { "data-type": "text", "data-name": `nav-${index}`, "data-title": `قائمة ${index + 1}` })}
              >
                {item}
              </a>
            ))}
            <button
              className="bg-[#5a6b4e] text-white px-4 py-2 rounded-sm hover:bg-[#4a5b3e] transition-colors"
              style={{ fontFamily: 'var(--body-font)' }}
              {...(isEditor && { "data-type": "text", "data-name": "cta-button", "data-title": "زر الدعوة" })}
            >
              تسوق الآن
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#2d3a2d] hover:text-[#5a6b4e]"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            {["الرئيسية", "المنتجات", "من نحن", "اتصل بنا"].map((item, index) => (
              <a
                key={index}
                href="#"
                className="block py-2 text-[#2d3a2d] hover:text-[#5a6b4e] transition-colors font-light"
                style={{ fontFamily: 'var(--body-font)' }}
                {...(isEditor && { "data-type": "text", "data-name": `mobile-nav-${index}`, "data-title": `قائمة موبايل ${index + 1}` })}
              >
                {item}
              </a>
            ))}
            <button
              className="mt-4 w-full bg-[#5a6b4e] text-white px-4 py-2 rounded-sm hover:bg-[#4a5b3e] transition-colors"
              style={{ fontFamily: 'var(--body-font)' }}
              {...(isEditor && { "data-type": "text", "data-name": "mobile-cta", "data-title": "زر دعوة موبايل" })}
            >
              تسوق الآن
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
