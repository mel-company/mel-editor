// Organic Footer Component - Natural Footer Section (Matching Reference)
// Uses data-type, data-name, data-title attributes for inline editing

import { Leaf } from "lucide-react";

interface FooterOrganic1Props {
  isEditor?: boolean;
}

export const FooterOrganic1 = ({ isEditor = false }: FooterOrganic1Props) => {
  const footerLinks = {
    shop: ["جميع المنتجات", "الأكثر مبيعاً", "وصل حديثاً", "مجموعات هدايا"],
    about: ["قصتنا", "المكونات", "الاستدامة", "المدونة"],
    help: ["اتصل بنا", "الأسئلة الشائعة", "الشحن", "الإرجاع"]
  };

  const pressLogos = [
    { name: "Vogue", src: "/mock/organic/logo-vogou.png" },
    { name: "Forbes", src: "/mock/organic/logo-forbes.png" },
    { name: "Thought Catalog", src: "/mock/organic/logo-thought catalog.png" },
    { name: "WWD", src: "/mock/organic/logo-wwd.png" },
    { name: "Womens Health", src: "/mock/organic/logo-womenshealth.png" },
  ];

  return (
    <footer className="bg-[#2d3a2d] text-white">
      {/* Press Mentions Bar */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-6 lg:px-12 py-8">
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            {pressLogos.map((logo) => (
              <img
                key={logo.name}
                src={logo.src}
                alt={logo.name}
                className="h-6 w-auto opacity-60 hover:opacity-100 transition-opacity"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#5a6b4e] rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-serif">Nature Care</span>
            </div>
            <p className="text-white/70 mb-6 max-w-sm">
              عناية نقية وعضوية بالبشرة. نحافظ على بشرتك بأرقى المكونات الطبيعية منذ 2016.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#5a6b4e] transition-colors">
                <img src="/mock/organic/icon-instagram.svg" alt="Instagram" className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#5a6b4e] transition-colors">
                <img src="/mock/organic/icon-facebook.svg" alt="Facebook" className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#5a6b4e] transition-colors">
                <img src="/mock/organic/icon-twitter.svg" alt="Twitter" className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold mb-4">المتجر</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h4 className="font-semibold mb-4">من نحن</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="font-semibold mb-4">المساعدة</h4>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">© 2026 Nature Care. جميع الحقوق محفوظة.</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-white/60 hover:text-white transition-colors">سياسة الخصوصية</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">شروط الخدمة</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
