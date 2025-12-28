import React from "react";
import { PageType, SectionType, StoreType } from "../../types";
import { Navigation1 } from "../../mock/template/sections/navigation";

interface StoreViewProps {
  pages: PageType[];
  currentPageId: string;
  storeSettings: StoreType;
  onPageChange?: (pageId: string) => void;
}

const StoreView = ({
  pages,
  currentPageId,
  storeSettings,
  onPageChange,
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

      {/* Footer (only for e-commerce) */}
      {storeSettings.type !== "restaurant" && (
        <Footer
          footer={storeSettings.footer || { text: "", links: [] }}
          logo={storeSettings.footer?.logo || storeSettings.logo}
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
  // Logo takes automatically from store logo
  const logoUrl = logo?.base64Content || logo?.url;

  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200 p-8 mt-auto">
      <div className="container mx-auto flex flex-col gap-4">
        {logoUrl && (
          <img
            src={logoUrl}
            alt="Logo"
            className="h-8 w-auto"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
        )}
        {footer.text && <p className="text-sm text-slate-600">{footer.text}</p>}
        {footer.links && footer.links.length > 0 && (
          <nav className="flex gap-4 flex-wrap">
            {footer.links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
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
