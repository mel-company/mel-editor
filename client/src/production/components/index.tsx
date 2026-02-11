import React from "react";

import { PageType, SectionType, StoreType, ProductType, CategoryType } from "../../shared/types";
import { Navigation1 } from "@templates/sections/navbar/components";
import { footer_sections } from "@templates/data/template/sections/footer";

interface StoreViewProps {
  pages: PageType[];
  currentPageId: string;
  storeSettings: StoreType;
  products: ProductType[];
  categories: CategoryType[];
  onPageChange?: (pageId: string) => void;
  hideFooter?: boolean;
}

const StoreView = ({
  pages,
  currentPageId,
  storeSettings,
  products,
  categories,
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
          className="sticky top-0 z-40"
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
              id={section.target_id || section.id}
              data-section-instance-id={section.target_id || section.id}
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
              <Section
                section={section}
                products={products}
                categories={categories}
              />
            </div>
          );
        })}
      </main>

      {/* Debug Drawer */}
      {/* <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 text-xs h-40 overflow-auto opacity-80 z-50 ltr" dir="ltr">
        <h3 className="font-bold border-b pb-1 mb-1">Debug Info</h3>
        <div>Pages Count: {pages.length}</div>
        <div>Current Page ID: {currentPageId}</div>
        <div>Sections Count: {sections.length}</div>
        <div>
          {sections.map((s, i) => {
            const selected = s.options?.find(o => o.id === s.section_id);
            return (
              <div key={i} className="mb-1">
                [{i}] Type: {s.type}, ID: {s.section_id},
                HasOptions: {s.options?.length ? 'Yes' : 'No'},
                SelectedOption: {selected ? selected.id : 'None'},
                HasComponent: {selected?.component ? 'YES' : 'NO'},
                ComponentType: {selected?.component ? typeof selected.component : 'N/A'}
              </div>
            )
          })}
        </div>
      </div> */}

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

const Section = ({
  section,
  products,
  categories
}: {
  section: SectionType;
  products: ProductType[];
  categories: CategoryType[];
}) => {
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

  // Handle photos - prioritize section.photos (user uploads) over restOptions.photos (mock defaults)
  const photos = section.photos || restOptions.photos;
  if (photos && !Array.isArray(photos)) {
    props = { ...props, ...photos };
  } else if (photos) {
    props.photos = photos;
  }

  // Merge user overrides from section.content
  // Merge user overrides from section.content
  if (section.content) {
    const contentOverrides = Array.isArray(section.content)
      ? section.content.reduce((acc: any, item: any) => {
        acc[item.name] = item.value;
        return acc;
      }, {})
      : section.content;

    props = { ...props, ...contentOverrides };

    // Ensure specific fields expected by components are updated
    if (section.type === "hero" || section.type === "ourStory") {
      if (contentOverrides.title) props.title = contentOverrides.title;
      if (contentOverrides.description) props.description = contentOverrides.description;
    } else if (section.type === "footer") {
      if (contentOverrides.text) props.text = contentOverrides.text;
    } else if (section.type === "contact") {
      if (contentOverrides.title) props.title = contentOverrides.title;
      if (contentOverrides.description) props.description = contentOverrides.description;
      // Merge nested content for contact if it exists
      if (props.content) {
        props.content = { ...props.content, ...contentOverrides };
      }
    }
  }

  // Inject global products/categories based on section type ONLY IF empty
  if ((section.type === "recent-products" || section.type === "recentProducts" || section.type === "products") && (!props.products || props.products.length === 0)) {
    props.products = products;
  }
  if ((section.type === "categories" || section.type === "categoryGrid") && (!props.categories || props.categories.length === 0)) {
    props.categories = categories;
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
