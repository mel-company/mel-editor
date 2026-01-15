import { useEffect } from "react";
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
import { useSectionStore } from "../../../store/editor/section";
import { usePageStore } from "../../../store/editor/page";
import { useStoreSettingsStore } from "../../../store/editor/store-settings";
import { SectionType, PageType } from "../../../types";
import { Navigation1 } from "../../../mock/template/sections/navigation";
import { footer_sections } from "../../../mock/template/sections/footer";

const RenderTemplate = () => {
  const {
    activeSectionId,
    activeElementType,
    setActiveSectionId,
    setActiveElementType,
  } = useSectionStore();
  const { pages, currentPageId, setCurrentPageId } = usePageStore();
  const { storeSettings } = useStoreSettingsStore();
  const currentPage = pages.find((p) => p.id === currentPageId);
  // Get sections directly from currentPage - they're already stored there
  // Filter out navigation and footer sections as they're rendered separately
  const sections =
    currentPage?.sections.filter(
      (s) => s.type !== "navigation" && s.type !== "footer"
    ) || [];

  // Debug: Log sections for troubleshooting
  useEffect(() => {
    if (currentPage) {
      console.log("📄 Current page sections:", {
        pageName: currentPage.name,
        totalSections: currentPage.sections.length,
        filteredSections: sections.length,
        sections: currentPage.sections.map((s) => ({
          type: s.type,
          section_id: s.section_id,
          hasOptions: !!s.options,
          optionsCount: s.options?.length || 0,
          selectedOption: s.options?.find((o) => o.id === s.section_id),
          hasComponent: !!s.options?.find((o) => o.id === s.section_id)?.component,
        })),
      });
    }
  }, [currentPage, sections]);

  // Clear active section when page changes
  useEffect(() => {
    setActiveSectionId(""); // Clear active section when switching pages
    setActiveElementType(""); // Clear active element type
  }, [currentPageId, setActiveSectionId, setActiveElementType]);

  // Apply fonts and colors from store settings
  const fonts = storeSettings.fonts || { heading: "Arial", body: "Arial" };
  const colors = storeSettings.colors || {
    primary: "#4272FF",
    secondary: "#ACBA12",
    text: "#1D293D",
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setActiveSectionId("");
        }
      }}
      className="w-full h-full flex items-center justify-center cursor-default"
    >
      <div
        className="w-full h-full max-h-[90vh] max-w-11/12 overflow-y-auto overflow-x-hidden bg-white rounded-2xl flex flex-col"
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
            onClick={(e) => {
              e.stopPropagation();
              setActiveElementType("navigation");
              setActiveSectionId("");
            }}
            className={`
              cursor-pointer transition-all duration-200 relative
              ${
                activeElementType === "navigation"
                  ? "outline-2 outline-blue-500 outline-offset-2"
                  : ""
              }
            `}
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
                if (pageId) {
                  setCurrentPageId(pageId);
                  // Scroll to top of page content
                  setTimeout(() => {
                    const pageContent = document.querySelector(
                      "[data-page-content]"
                    );
                    if (pageContent) {
                      pageContent.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }, 100);
                }
              }}
            />
          </div>
        )}

        {/* Page Content */}
        <div className="flex-1" data-page-content>
          {sections.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              لا توجد أقسام في هذه الصفحة
            </div>
          ) : (
            sections.map((section) => {
              const sectionStyles = section.styles || {};
              // Build comprehensive style object
              const sectionStyle: React.CSSProperties = {
                backgroundColor: sectionStyles.backgroundColor,
                color: sectionStyles.textColor,
                // Padding - support both shorthand and individual values
                padding: sectionStyles.padding,
                paddingTop: sectionStyles.paddingTop || sectionStyles.padding,
                paddingBottom:
                  sectionStyles.paddingBottom || sectionStyles.padding,
                paddingLeft: sectionStyles.paddingLeft || sectionStyles.padding,
                paddingRight:
                  sectionStyles.paddingRight || sectionStyles.padding,
                // Margin - support both shorthand and individual values
                margin: sectionStyles.margin,
                marginTop: sectionStyles.marginTop || sectionStyles.margin,
                marginBottom:
                  sectionStyles.marginBottom || sectionStyles.margin,
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveElementType("section");
                    setActiveSectionId(section.target_id || "");
                  }}
                  className={`
                    cursor-pointer transition-all duration-200
                    ${
                      section.target_id === activeSectionId &&
                      activeElementType === "section"
                        ? "outline-2 outline-blue-500 outline-offset-2"
                        : ""
                    }
                  `}
                  style={
                    {
                      ...sectionStyle,
                      // CSS Variables for use inside section components
                      "--section-heading-color":
                        sectionStyles.headingColor ||
                        sectionStyles.textColor ||
                        "#1D293D",
                      "--section-text-color":
                        sectionStyles.textColor || "#1D293D",
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
            })
          )}
        </div>

        {/* Footer - Single footer for all pages (controlled by showFooter) */}
        {storeSettings.type !== "restaurant" &&
          storeSettings.footer?.showFooter !== false && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setActiveElementType("footer");
                setActiveSectionId("footer");
              }}
              className={`
                cursor-pointer transition-all duration-200 mt-auto
                ${
                  activeSectionId === "footer" && activeElementType === "footer"
                    ? "outline-2 outline-blue-500 outline-offset-2"
                    : ""
                }
              `}
              style={{
                backgroundColor:
                  storeSettings.footer?.styles?.backgroundColor || "#1e293b",
                color: storeSettings.footer?.styles?.textColor || "#ffffff",
                padding: storeSettings.footer?.styles?.padding,
                margin: storeSettings.footer?.styles?.margin,
              }}
            >
              <Footer
                footer={storeSettings.footer || { text: "", links: [] }}
                logo={storeSettings.logo}
                navigationLinks={storeSettings.header?.navigationLinks}
                footerVariant={storeSettings.footer?.footerVariant || "1"}
              />
            </div>
          )}
      </div>
    </div>
  );
};

const Footer = ({
  footer,
  logo,
  navigationLinks,
  footerVariant,
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
      onLinkClick={(pageId?: string) => {
        if (pageId) {
          const { setCurrentPageId } = usePageStore.getState();
          setCurrentPageId(pageId);
        }
      }}
      styles={footer?.styles}
    />
  );
};

const Section = ({ section }: { section: SectionType }) => {
  const { storeSettings } = useStoreSettingsStore();
  const { setCurrentPageId } = usePageStore();

  const selected_options = section.options?.find(
    (option) => option.id === section.section_id
  );

  // Debug: check what's in selected_options
  if (!selected_options) {
    console.warn("Option not found:", {
      section_id: section.section_id,
      section_type: section.type,
      options_count: section.options?.length,
      options_ids: section.options?.map((o) => o.id),
    });
    return null;
  }

  const Component = selected_options.component as any;

  if (!Component) {
    console.warn("Section component not found:", {
      section_id: section.section_id,
      section_type: section.type,
      selected_option: selected_options,
      has_component: !!selected_options.component,
      component_type: typeof selected_options.component,
    });
    return null;
  }

  const { component: _Component, ...restOptions } = (selected_options ||
    {}) as any;

  let props: any = {
    styles: section.styles, // Pass styles to component
  };

  // Handle content (title, description, etc.)
  if (restOptions.content) {
    if (Array.isArray(restOptions.content)) {
      const contentProps = restOptions.content.reduce((acc: any, item: any) => {
        acc[item.name] = item.value;
        return acc;
      }, {});
      // For hero sections, pass title and description directly
      if (section.type === "hero") {
        props.title = contentProps.title;
        props.description = contentProps.description;
      } else if (section.type === "footer") {
        // For footer, pass text
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
        props.content = contentProps;
      }
    } else {
      // For hero sections, pass title and description directly
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
        props.content = restOptions.content;
      }
    }
  }

  // Handle photos (logo, images, etc.)
  if (restOptions.photos && !Array.isArray(restOptions.photos)) {
    props = { ...props, ...restOptions.photos };
  } else if (restOptions.photos) {
    props.photos = restOptions.photos;
  }

  // Handle products, categories, and view_all_link
  if (restOptions.products !== undefined) {
    props.products = restOptions.products;
  }
  if (restOptions.categories !== undefined) {
    props.categories = restOptions.categories;
  }
  if (restOptions.view_all_link !== undefined || section.view_all_link) {
    props.view_all_link =
      restOptions.view_all_link || section.view_all_link || "";
  }

  // For footer sections, add footer-specific props
  if (section.type === "footer") {
    props.logo = storeSettings.logo;
    props.navigationLinks = storeSettings.header?.navigationLinks;
    props.socialLinks = storeSettings.footer?.socialLinks;
    props.onLinkClick = (pageId?: string) => {
      if (pageId) {
        setCurrentPageId(pageId);
        setTimeout(() => {
          const pageContent = document.querySelector("[data-page-content]");
          if (pageContent) {
            pageContent.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 100);
      }
    };
  }

  return <Component {...props} />;
};

export default RenderTemplate;
