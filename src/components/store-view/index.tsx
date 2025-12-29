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
import { PageType, SectionType, StoreType } from "../../types";
import { Navigation1 } from "../../mock/template/sections/navigation";

interface StoreViewProps {
  pages: PageType[];
  currentPageId: string;
  storeSettings: StoreType;
  onPageChange?: (pageId: string) => void;
  hideFooter?: boolean;
}

const StoreView = ({
  pages,
  currentPageId,
  storeSettings,
  onPageChange,
  hideFooter = false,
}: StoreViewProps) => {
  const currentPage = pages.find((p) => p.id === currentPageId);
  // Filter out navigation sections as they're rendered separately as header
  const sections =
    currentPage?.sections.filter((s) => s.type !== "navigation") || [];

  // Apply fonts and colors from store settings
  const fonts = storeSettings.fonts || { heading: "Arial", body: "Arial" };
  const colors = storeSettings.colors || {
    primary: "#4272FF",
    secondary: "#ACBA12",
    text: "#1D293D",
  };

  return (
    <div
      className="min-h-screen bg-white flex flex-col"
      dir="rtl"
      style={
        {
          fontFamily: fonts.body,
          color: colors.text,
          "--heading-font": fonts.heading,
          "--body-font": fonts.body,
          "--primary-color": colors.primary,
          "--secondary-color": colors.secondary,
          "--text-color": colors.text,
        } as React.CSSProperties
      }
    >
      {/* Navigation Bar - Main Header (only for e-commerce) */}
      {storeSettings.type !== "restaurant" && (
        <div
          style={{
            backgroundColor: storeSettings.header?.styles?.backgroundColor,
            color: storeSettings.header?.styles?.textColor,
          }}
        >
          <Navigation1
            logo={storeSettings.logo}
            navigationLinks={storeSettings.header?.navigationLinks}
            primaryColor={storeSettings.colors?.primary}
            onLinkClick={(pageId) => {
              if (pageId && onPageChange) {
                onPageChange(pageId);
                // Scroll to top
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          />
        </div>
      )}

      {/* Page Content */}
      <main className="flex-1">
        {sections.map((section) => {
          const sectionStyles = section.styles || {};
          return (
            <div
              key={section.target_id}
              style={{
                backgroundColor: sectionStyles.backgroundColor,
                color: sectionStyles.textColor,
                padding: sectionStyles.padding,
                margin: sectionStyles.margin,
              }}
            >
              <Section section={section} />
            </div>
          );
        })}
      </main>

      {/* Footer (only for e-commerce, and not hidden) */}
      {storeSettings.type !== "restaurant" && !hideFooter && (
        <Footer
          footer={storeSettings.footer || { text: "", links: [] }}
          logo={storeSettings.logo}
          navigationLinks={storeSettings.header?.navigationLinks}
          onLinkClick={(pageId) => {
            if (pageId && onPageChange) {
              onPageChange(pageId);
            }
          }}
        />
      )}
    </div>
  );
};

export default StoreView;

const Footer = ({
  footer,
  logo,
  navigationLinks,
  onLinkClick,
}: {
  footer: {
    logo?: any;
    text?: string;
    links?: any[];
    socialLinks?: Array<{ id: string; platform: string; url: string }>;
  };
  logo: any;
  navigationLinks?: Array<{
    id: string;
    label: string;
    url: string;
    pageId?: string;
  }>;
  onLinkClick?: (pageId?: string) => void;
}) => {
  // Logo takes automatically from store logo (same as navbar)
  // Check if logo exists and has valid content
  const logoUrl = (() => {
    if (!logo) return null;

    const base64 = logo.base64Content?.trim();
    const url = logo.url?.trim();

    // Check if logo object is empty (no id, name, base64Content, or url)
    const isEmpty = !logo.id && !logo.name && !base64 && !url;

    if (isEmpty) return null;

    return base64 || url || null;
  })();

  // Map platform names to icons
  const platformIconMap: Record<string, any> = {
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
    YouTube: Linkedin, // You can add YouTube icon if available
    TikTok: Linkedin, // You can add TikTok icon if available
    Snapchat: Linkedin, // You can add Snapchat icon if available
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

  // Use social links from footer settings, or show empty if none
  const socialLinks =
    footer?.socialLinks?.map((social) => ({
      icon: platformIconMap[social.platform] || Facebook,
      href: social.url || "#",
      label: platformLabelMap[social.platform] || social.platform,
    })) || [];

  return (
    <footer
      className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white mt-auto"
      dir="rtl"
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8">
          {/* Logo and Description Section */}
          <div className="lg:col-span-2">
            {logoUrl ? (
              <div className="mb-4 sm:mb-6">
                <img
                  src={logoUrl}
                  alt="Logo"
                  className="h-8 sm:h-10 md:h-12 w-auto max-w-[200px] object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                  onLoad={(e) => {
                    // Ensure image is visible
                    const target = e.target as HTMLImageElement;
                    target.style.display = "block";
                    target.style.opacity = "1";
                  }}
                />
              </div>
            ) : null}
            {footer?.text && (
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4 sm:mb-6 max-w-md">
                {footer.text}
              </p>
            )}

            {/* Social Media Links */}
            {socialLinks.length > 0 && (
              <div className="flex gap-2 sm:gap-3">
                {socialLinks.map((social, index) => {
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
                      <div className="absolute inset-0 rounded-lg bg-blue-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Links Section - Same as Navbar */}
          {navigationLinks && navigationLinks.length > 0 && (
            <div className="mt-4 sm:mt-0">
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-2 sm:mb-3 md:mb-4 relative inline-block">
                روابط سريعة
                <span className="absolute bottom-0 right-0 w-8 sm:w-10 md:w-12 h-0.5 bg-gradient-to-l from-blue-600 to-purple-600"></span>
              </h3>
              <nav className="flex flex-col gap-1.5 sm:gap-2 md:gap-3">
                {navigationLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    onClick={(e) => {
                      if (link.pageId && onLinkClick) {
                        e.preventDefault();
                        onLinkClick(link.pageId);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    className="group flex items-center gap-2 text-sm sm:text-base text-slate-300 hover:text-blue-400 transition-all duration-300"
                  >
                    <span className="w-0 h-0.5 bg-blue-400 group-hover:w-4 transition-all duration-300"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                  </a>
                ))}
              </nav>
            </div>
          )}

          {/* Contact Information Section */}
          <div className="mt-4 sm:mt-0">
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-2 sm:mb-3 md:mb-4 relative inline-block">
              تواصل معنا
              <span className="absolute bottom-0 right-0 w-8 sm:w-10 md:w-12 h-0.5 bg-gradient-to-l from-blue-600 to-purple-600"></span>
            </h3>
            <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
              <a
                href="mailto:info@example.com"
                className="group flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-slate-300 hover:text-blue-400 transition-colors"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-blue-600/20 transition-colors shrink-0">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-xs sm:text-sm">info@example.com</span>
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

              <div className="group flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-slate-300">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-xs sm:text-sm">
                  الرياض، المملكة العربية السعودية
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 my-6 sm:my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3 md:gap-4">
          <p className="text-xs sm:text-sm text-slate-400 text-center sm:text-right">
            © {new Date().getFullYear()} جميع الحقوق محفوظة
          </p>

          <div className="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-4 md:gap-6 text-xs sm:text-sm">
            <a
              href="#"
              className="text-slate-400 hover:text-blue-400 transition-colors"
            >
              سياسة الخصوصية
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-blue-400 transition-colors"
            >
              الشروط والأحكام
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-blue-400 transition-colors"
            >
              سياسة الاسترجاع
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
    </footer>
  );
};

const Section = ({ section }: { section: SectionType }) => {
  const selected_options = section.options?.find(
    (option) => option.id === section.section_id
  );
  const Component = selected_options?.component as any;

  if (!Component) return null;

  const { component: _Component, ...restOptions } = (selected_options ||
    {}) as any;

  let props = { ...restOptions };

  if (restOptions.content) {
    if (Array.isArray(restOptions.content)) {
      const contentProps = restOptions.content.reduce((acc: any, item: any) => {
        acc[item.name] = item.value;
        return acc;
      }, {});
      props = { ...props, ...contentProps };
    } else {
      props = { ...props, ...restOptions.content };
    }
  }

  if (restOptions.photos && !Array.isArray(restOptions.photos)) {
    props = { ...props, ...restOptions.photos };
  }

  return <Component {...props} />;
};
