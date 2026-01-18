import React from "react";

import { PageType, SectionType, StoreType } from "../../types";
import { Navigation1 } from "../../mock/template/sections/navigation";
import { footer_sections } from "../../mock/template/sections/footer";

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
  // Filter out navigation and footer sections as they're rendered separately
  const sections =
    currentPage?.sections.filter(
      (s) => s.type !== "navigation" && s.type !== "footer"
    ) || [];

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
          // Build comprehensive style object
          const sectionStyle: React.CSSProperties = {
            backgroundColor: sectionStyles.backgroundColor,
            color: sectionStyles.textColor,
            // Padding - support both shorthand and individual values
            padding: sectionStyles.padding,
            paddingTop: sectionStyles.paddingTop || sectionStyles.padding,
            paddingBottom: sectionStyles.paddingBottom || sectionStyles.padding,
            paddingLeft: sectionStyles.paddingLeft || sectionStyles.padding,
            paddingRight: sectionStyles.paddingRight || sectionStyles.padding,
            // Margin - support both shorthand and individual values
            margin: sectionStyles.margin,
            marginTop: sectionStyles.marginTop || sectionStyles.margin,
            marginBottom: sectionStyles.marginBottom || sectionStyles.margin,
            marginLeft: sectionStyles.marginLeft || sectionStyles.margin,
            marginRight: sectionStyles.marginRight || sectionStyles.margin,
            // Borders
            borderWidth: sectionStyles.borderWidth,
            borderStyle: sectionStyles.borderStyle as any,
            borderColor: sectionStyles.borderColor,
            borderRadius: sectionStyles.borderRadius,
            // Effects
            boxShadow: sectionStyles.boxShadow,
            opacity: sectionStyles.opacity
              ? parseFloat(sectionStyles.opacity)
              : undefined,
          };
          return (
            <div
              key={section.target_id}
              style={
                {
                  ...sectionStyle,
                  // CSS Variables for use inside section components
                  "--section-heading-color":
                    sectionStyles.headingColor ||
                    sectionStyles.textColor ||
                    "#1D293D",
                  "--section-text-color": sectionStyles.textColor || "#1D293D",
                  "--section-button-color":
                    sectionStyles.buttonColor || "#4272FF",
                  "--section-button-text-color":
                    sectionStyles.buttonTextColor || "#FFFFFF",
                  "--section-heading-font-size":
                    sectionStyles.headingFontSize || "2rem",
                  "--section-text-font-size":
                    sectionStyles.textFontSize || "1rem",
                  "--section-heading-font-weight":
                    sectionStyles.headingFontWeight || "bold",
                  "--section-text-font-weight":
                    sectionStyles.textFontWeight || "normal",
                } as React.CSSProperties
              }
            >
              <Section section={section} />
            </div>
          );
        })}
      </main>

      {/* Footer - Single footer for all pages */}
      {storeSettings.type !== "restaurant" && !hideFooter && (
        <Footer
          footer={storeSettings.footer || { text: "", links: [] }}
          logo={storeSettings.logo}
          navigationLinks={storeSettings.header?.navigationLinks}
          footerVariant={storeSettings.footer?.footerVariant || "1"}
          onLinkClick={(pageId) => {
            if (pageId && onPageChange) {
              onPageChange(pageId);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        />
      )}
    </div>
  );
};

export default StoreView;

const Section = ({ section }: { section: SectionType }) => {
  const selected_options = section.options?.find(
    (option) => option.id === section.section_id
  );
  const Component = selected_options?.component as any;

  if (!Component) return null;

  const { component: _Component, ...restOptions } = (selected_options ||
    {}) as any;

  let props = { ...restOptions, styles: section.styles };

  if (restOptions.content) {
    if (Array.isArray(restOptions.content)) {
      const contentProps = restOptions.content.reduce((acc: any, item: any) => {
        acc[item.name] = item.value;
        return acc;
      }, {});
      if (section.type === "hero") {
        props.title = contentProps.title;
        props.description = contentProps.description;
      } else if (section.type === "footer") {
        props.text = contentProps.text;
      } else if (section.type === "ourStory") {
        // For our story sections
        props.title = contentProps.title;
        props.description = contentProps.description;
      } else if (section.type === "contact") {
        // For contact sections
        props.title = contentProps.title;
        props.description = contentProps.description;
        props.content = {
          email: contentProps.email,
          phone: contentProps.phone,
          address: contentProps.address,
          hours: contentProps.hours,
        };
      } else {
        props = { ...props, ...contentProps };
      }
    } else {
      if (section.type === "hero") {
        props.title = restOptions.content.title;
        props.description = restOptions.content.description;
      } else if (section.type === "footer") {
        props.text = restOptions.content.text;
      } else if (section.type === "ourStory") {
        // For our story sections
        props.title = restOptions.content.title;
        props.description = restOptions.content.description;
      } else if (section.type === "contact") {
        // For contact sections
        props.title = restOptions.content.title;
        props.description = restOptions.content.description;
        props.content = {
          email: restOptions.content.email,
          phone: restOptions.content.phone,
          address: restOptions.content.address,
          hours: restOptions.content.hours,
        };
      } else {
        props = { ...props, ...restOptions.content };
      }
    }
  }

  if (restOptions.photos && !Array.isArray(restOptions.photos)) {
    props = { ...props, ...restOptions.photos };
  }

  return <Component {...props} />;
};

const Footer = ({
  footer,
  logo,
  navigationLinks,
  footerVariant,
  onLinkClick,
}: {
  footer: {
    logo?: any;
    text?: string;
    title?: string;
    description?: string;
    contactInfo?: {
      email?: string;
      phone?: string;
      address?: string;
    };
    links?: any[];
    socialLinks?: Array<{ id: string; platform: string; url: string }>;
    styles?: {
      backgroundColor?: string;
      textColor?: string;
      padding?: string;
      margin?: string;
    };
  };
  logo: any;
  navigationLinks?: Array<{
    id: string;
    label: string;
    url: string;
    pageId?: string;
  }>;
  footerVariant?: string;
  onLinkClick?: (pageId?: string) => void;
}) => {
  // Use selected footer variant component
  const variantIndex = footerVariant ? parseInt(footerVariant) - 1 : 0;
  const FooterComponent =
    footer_sections[variantIndex]?.component || footer_sections[0]?.component;

  if (!FooterComponent) {
    return null;
  }

  return (
    <FooterComponent
      logo={logo}
      text={footer?.text}
      title={footer?.title}
      description={footer?.description}
      contactInfo={footer?.contactInfo}
      navigationLinks={navigationLinks}
      socialLinks={footer?.socialLinks}
      onLinkClick={onLinkClick}
      styles={footer?.styles}
    />
  );
};
