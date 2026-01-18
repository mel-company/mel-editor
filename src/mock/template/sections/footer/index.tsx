import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import { FileType } from "../../../../types";

interface FooterProps {
  logo?: FileType;
  text?: string;
  title?: string;
  description?: string;
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  navigationLinks?: Array<{
    id: string;
    label: string;
    url: string;
    pageId?: string;
  }>;
  socialLinks?: Array<{ id: string; platform: string; url: string }>;
  onLinkClick?: (pageId?: string) => void;
  styles?: {
    backgroundColor?: string;
    textColor?: string;
    padding?: string;
    margin?: string;
  };
}

// Footer 1: Simple with Links
export const Footer1 = ({
  logo,
  text,
  title,
  description,
  contactInfo,
  navigationLinks,
  socialLinks,
  onLinkClick,
  styles,
}: FooterProps) => {
  const logoUrl = (() => {
    if (!logo) return null;
    const base64 = logo.base64Content?.trim();
    const url = logo.url?.trim();
    const isEmpty = !logo.id && !logo.name && !base64 && !url;
    if (isEmpty) return null;
    return base64 || url || null;
  })();

  const platformIconMap: Record<string, any> = {
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
    YouTube: Linkedin,
    TikTok: Linkedin,
    Snapchat: Linkedin,
  };

  const platformLabelMap: Record<string, string> = {
    Facebook: "فيسبوك",
    Instagram: "انستغرام",
    Twitter: "تويتر",
    Linkedin: "لينكد إن",
    YouTube: "يوتيوب",
    TikTok: "تيك توك",
    Snapchat: "سناب شات",
  };

  const socialLinksList =
    socialLinks?.map((social) => ({
      icon: platformIconMap[social.platform] || Facebook,
      href: social.url || "#",
      label: platformLabelMap[social.platform] || social.platform,
    })) || [];

  return (
    <footer
      className="w-full text-white mt-auto"
      dir="rtl"
      style={{
        backgroundColor: styles?.backgroundColor || "#1e293b",
        color: styles?.textColor || "#ffffff",
        padding: styles?.padding,
        margin: styles?.margin,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8">
          <div className="lg:col-span-2">
            {logoUrl && (
              <div className="mb-4 sm:mb-6">
                <img
                  src={logoUrl}
                  alt="Logo"
                  className="h-8 sm:h-10 md:h-12 w-auto max-w-[200px] object-contain"
                />
              </div>
            )}
            {title && (
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-3 sm:mb-4 max-w-md">
                {description}
              </p>
            )}
            {text && (
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4 sm:mb-6 max-w-md">
                {text}
              </p>
            )}
            {socialLinksList.length > 0 && (
              <div className="flex gap-2 sm:gap-3">
                {socialLinksList.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative w-9 h-9 sm:w-10 sm:h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-white transition-colors" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-4 sm:mt-0">
            <h3 className="text-sm sm:text-base md:text-lg font-bold mb-2 sm:mb-3 md:mb-4 relative inline-block">
              روابط سريعة
            </h3>
            <nav className="flex flex-col gap-1.5 sm:gap-2 md:gap-3">
              {navigationLinks && navigationLinks.length > 0 ? (
                navigationLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    onClick={(e) => {
                      if (link.pageId && onLinkClick) {
                        e.preventDefault();
                        onLinkClick(link.pageId);
                      }
                    }}
                    className="group flex items-center gap-2 text-sm sm:text-base text-slate-300 hover:text-blue-400 transition-all duration-300"
                  >
                    <span className="w-0 h-0.5 bg-blue-400 group-hover:w-4 transition-all duration-300"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                  </a>
                ))
              ) : (
                <p className="text-xs sm:text-sm text-slate-400">
                  لا توجد روابط متاحة
                </p>
              )}
            </nav>
          </div>

          <div className="mt-4 sm:mt-0">
            <h3 className="text-sm sm:text-base md:text-lg font-bold mb-2 sm:mb-3 md:mb-4 relative inline-block">
              تواصل معنا
            </h3>
            <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
              {contactInfo?.email && (
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="group flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-slate-300 hover:text-blue-400 transition-colors"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-blue-600/20 transition-colors shrink-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-xs sm:text-sm">
                    {contactInfo.email}
                  </span>
                </a>
              )}
              {contactInfo?.phone && (
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="group flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-slate-300 hover:text-blue-400 transition-colors"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-blue-600/20 transition-colors shrink-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-xs sm:text-sm" dir="ltr">
                    {contactInfo.phone}
                  </span>
                </a>
              )}
              {contactInfo?.address && (
                <div className="group flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-slate-300">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-xs sm:text-sm">
                    {contactInfo.address}
                  </span>
                </div>
              )}
              {!contactInfo?.email &&
                !contactInfo?.phone &&
                !contactInfo?.address && (
                  <>
                    <a
                      href="mailto:info@example.com"
                      className="group flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-slate-300 hover:text-blue-400 transition-colors"
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-blue-600/20 transition-colors shrink-0">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <span className="text-xs sm:text-sm">
                        info@example.com
                      </span>
                    </a>
                    <a
                      href="tel:+1234567890"
                      className="group flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-slate-300 hover:text-blue-400 transition-colors"
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-blue-600/20 transition-colors shrink-0">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <span className="text-xs sm:text-sm" dir="ltr">
                        +123 456 7890
                      </span>
                    </a>
                  </>
                )}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 my-6 sm:my-8"></div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3 md:gap-4">
          <p className="text-xs sm:text-sm text-slate-400 text-center sm:text-right">
            © {new Date().getFullYear()} جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
};

// Footer 2: Light Background
const FooterSection2 = ({
  logo,
  text,
  title,
  description,
  contactInfo,
  navigationLinks,
  socialLinks,
  onLinkClick,
  styles,
}: FooterProps) => {
  const logoUrl = (() => {
    if (!logo) return null;
    const base64 = logo.base64Content?.trim();
    const url = logo.url?.trim();
    const isEmpty = !logo.id && !logo.name && !base64 && !url;
    if (isEmpty) return null;
    return base64 || url || null;
  })();

  const platformIconMap: Record<string, any> = {
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
  };

  const socialLinksList =
    socialLinks?.map((social) => ({
      icon: platformIconMap[social.platform] || Facebook,
      href: social.url || "#",
      label: social.platform,
    })) || [];

  return (
    <footer
      className="w-full bg-slate-50 border-t border-slate-200 mt-auto"
      dir="rtl"
      style={{
        backgroundColor: styles?.backgroundColor || "#f8fafc",
        color: styles?.textColor || "#1e293b",
        padding: styles?.padding,
        margin: styles?.margin,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="lg:col-span-2">
            {logoUrl && (
              <div className="mb-4">
                <img
                  src={logoUrl}
                  alt="Logo"
                  className="h-10 w-auto max-w-[200px] object-contain"
                />
              </div>
            )}
            {title && (
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-slate-800">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-slate-600 leading-relaxed mb-3 max-w-md">
                {description}
              </p>
            )}
            {text && (
              <p className="text-sm text-slate-600 leading-relaxed mb-4 max-w-md">
                {text}
              </p>
            )}
            {socialLinksList.length > 0 && (
              <div className="flex gap-2">
                {socialLinksList.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5 text-slate-600 hover:text-white transition-colors" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-3">
              روابط سريعة
            </h3>
            <nav className="flex flex-col gap-2">
              {navigationLinks && navigationLinks.length > 0 ? (
                navigationLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    onClick={(e) => {
                      if (link.pageId && onLinkClick) {
                        e.preventDefault();
                        onLinkClick(link.pageId);
                      }
                    }}
                    className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    {link.label}
                  </a>
                ))
              ) : (
                <p className="text-xs text-slate-400">لا توجد روابط</p>
              )}
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-3">
              تواصل معنا
            </h3>
            <div className="flex flex-col gap-3">
              {contactInfo?.email && (
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>{contactInfo.email}</span>
                </a>
              )}
              {contactInfo?.phone && (
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span dir="ltr">{contactInfo.phone}</span>
                </a>
              )}
              {contactInfo?.address && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="w-4 h-4" />
                  <span>{contactInfo.address}</span>
                </div>
              )}
              {!contactInfo?.email &&
                !contactInfo?.phone &&
                !contactInfo?.address && (
                  <>
                    <a
                      href="mailto:info@example.com"
                      className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>info@example.com</span>
                    </a>
                    <a
                      href="tel:+1234567890"
                      className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span dir="ltr">+123 456 7890</span>
                    </a>
                  </>
                )}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <p className="text-xs text-slate-400 text-center">
            © {new Date().getFullYear()} جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
};

// Footer 3: Minimal
const FooterSection3 = ({
  logo,
  text,
  title,
  description,
  contactInfo,
  navigationLinks,
  onLinkClick,
  styles,
}: FooterProps) => {
  const logoUrl = (() => {
    if (!logo) return null;
    const base64 = logo.base64Content?.trim();
    const url = logo.url?.trim();
    const isEmpty = !logo.id && !logo.name && !base64 && !url;
    if (isEmpty) return null;
    return base64 || url || null;
  })();

  return (
    <footer
      className="w-full border-t border-slate-200 mt-auto"
      dir="rtl"
      style={{
        backgroundColor: styles?.backgroundColor || "#ffffff",
        color: styles?.textColor || "#1e293b",
        padding: styles?.padding,
        margin: styles?.margin,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col gap-2">
            {logoUrl && <img src={logoUrl} alt="Logo" className="h-8 w-auto" />}
            {title && (
              <h3 className="text-base font-bold text-slate-800">{title}</h3>
            )}
            {description && (
              <p className="text-sm text-slate-600">{description}</p>
            )}
            {text && (
              <p className="text-sm text-slate-600 text-center sm:text-right">
                {text}
              </p>
            )}
          </div>
          {navigationLinks && navigationLinks.length > 0 && (
            <nav className="flex flex-wrap gap-4 text-sm">
              {navigationLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  onClick={(e) => {
                    if (link.pageId && onLinkClick) {
                      e.preventDefault();
                      onLinkClick(link.pageId);
                    }
                  }}
                  className="text-slate-600 hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}
        </div>
        <div className="mt-6 pt-6 border-t border-slate-200">
          <p className="text-xs text-slate-400 text-center">
            © {new Date().getFullYear()} جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
};

export const footer_sections = [
  {
    id: "1",
    title: "Footer - Dark Gradient",
    description: "تصميم داكن مع تدرج لوني",
    component: Footer1,
    thumbnail: {
      url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300&vertical=center",
    },
    content: [
      {
        id: "text",
        label: "نص الفوتر",
        name: "text",
        type: "textarea",
        value: "وصف المتجر أو الشركة",
      },
    ],
  },
  {
    id: "2",
    title: "Footer - Light",
    description: "تصميم فاتح بسيط",
    component: FooterSection2,
    thumbnail: {
      url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300&vertical=center",
    },
    content: [
      {
        id: "text",
        label: "نص الفوتر",
        name: "text",
        type: "textarea",
        value: "وصف المتجر أو الشركة",
      },
    ],
  },
  {
    id: "3",
    title: "Footer - Minimal",
    description: "تصميم بسيط ومختصر",
    component: FooterSection3,
    thumbnail: {
      url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300&vertical=center",
    },
    content: [
      {
        id: "text",
        label: "نص الفوتر",
        name: "text",
        type: "textarea",
        value: "وصف المتجر أو الشركة",
      },
    ],
  },
];
