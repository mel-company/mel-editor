import React from "react";
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
        />
      )}
    </div>
  );
};

export default StoreView;

const Footer = ({
  footer,
  logo,
}: {
  footer: { logo?: any; text?: string; links?: any[] };
  logo: any;
}) => {
  // Logo takes automatically from store logo (same as navbar)
  const logoUrl = logo?.base64Content || logo?.url;

  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Logo Section - Always show */}
          <div>
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Logo"
                className="h-8 sm:h-10 w-auto max-w-[200px]"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
            ) : (
              <div className="h-8 sm:h-10 w-24 sm:w-32 bg-slate-200 rounded flex items-center justify-center">
                <span className="text-slate-400 text-xs sm:text-sm">Logo</span>
              </div>
            )}
          </div>

          {/* Text Section */}
          {footer?.text && (
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              {footer.text}
            </p>
          )}

          {/* Quick Links Section */}
          {footer?.links && footer.links.length > 0 && (
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-slate-800 mb-2 sm:mb-3">
                روابط سريعة
              </h3>
              <nav className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                {footer.links.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    className="text-xs sm:text-sm text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>
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
