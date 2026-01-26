import { useEffect } from "react";
import React from "react";

import { useSectionStore } from "../../../shared/store/editor/section";
import { usePageStore } from "../../../shared/store/editor/page";
import { useTemplateStructure } from "../../../shared/hooks/use-template-structure";
import { HydratedSection } from "../../../types";

const RenderTemplate = () => {
  const {
    activeSectionId,
    activeElementType,
    setActiveSectionId,
    setActiveElementType,
  } = useSectionStore();
  const { setCurrentPageId } = usePageStore();

  const {
    navigation,
    sections,
    footer,
    globalStyles,
    storeSettings,
    currentPageId
  } = useTemplateStructure();

  // Debug: Log sections for troubleshooting
  useEffect(() => {
    if (sections) {

    }
  }, [sections]);

  // Clear active section when page changes
  useEffect(() => {
    setActiveSectionId(""); // Clear active section when switching pages
    setActiveElementType(""); // Clear active element type
  }, [currentPageId, setActiveSectionId, setActiveElementType]);

  // Restore saved values from store to DOM after sections render
  useEffect(() => {
    if (!sections || sections.length === 0) return;

    // Small delay to ensure DOM is fully rendered
    const timeoutId = setTimeout(() => {
      sections.forEach((sectionData: HydratedSection) => {
        const { id, originalSection } = sectionData;
        const sectionElement =
          (document.querySelector(
            `[data-section-instance-id="${id}"]`
          ) as HTMLElement | null) || document.getElementById(id || "");

        if (sectionElement && originalSection?.content) {
          // Update all elements with data-name attributes using saved values
          Object.entries(originalSection.content).forEach(([name, value]) => {
            if (value && typeof value === "string") {
              const targetElement = sectionElement.querySelector(`[data-name="${name}"]`);
              if (targetElement) {
                const dataType = targetElement.getAttribute("data-type");
                if (dataType === "link") {
                  targetElement.setAttribute("href", value);
                } else if (dataType === "image") {
                  targetElement.setAttribute("src", value);
                } else {
                  targetElement.textContent = value;
                }
              }
            }
          });
        }
      });
    }, 150);

    return () => clearTimeout(timeoutId);
  }, [sections, currentPageId]);

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
        style={globalStyles}
      >
        {/* Navigation Bar */}
        {navigation && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setActiveElementType("navigation");
              setActiveSectionId("");
            }}
            className={`
              cursor-pointer transition-all duration-200 relative
              ${activeElementType === "navigation"
                ? "outline-2 outline-blue-500 outline-offset-2"
                : ""
              }
            `}
            style={{
              backgroundColor: storeSettings.header?.styles?.backgroundColor,
              color: storeSettings.header?.styles?.textColor,
            }}
          >
            <navigation.Component
              {...navigation.props}
              onLinkClick={(pageId?: string) => {
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
            sections.map((sectionData: HydratedSection) => {
              const { Component, props, id, originalSection } = sectionData;
              const sectionStyles = originalSection.styles || {};

              // Build comprehensive style object for the WRAPPER
              const sectionStyle: React.CSSProperties = {
                backgroundColor: sectionStyles.backgroundColor,
                color: sectionStyles.textColor,
                // Padding
                padding: sectionStyles.padding,
                paddingTop: sectionStyles.paddingTop || sectionStyles.padding,
                paddingBottom:
                  sectionStyles.paddingBottom || sectionStyles.padding,
                paddingLeft: sectionStyles.paddingLeft || sectionStyles.padding,
                paddingRight:
                  sectionStyles.paddingRight || sectionStyles.padding,
                // Margin
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
                  // Keep the DOM id for backwards compatibility, but rely on a virtual id for editor logic.
                  id={id}
                  data-section-instance-id={id}
                  key={id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveElementType("section");
                    // Use target_id (primary identifier) to match how sections are stored and deleted
                    setActiveSectionId(originalSection.target_id || id || "");
                  }}
                  className={`
                    cursor-pointer transition-all duration-200
                    ${(originalSection.target_id === activeSectionId || id === activeSectionId) &&
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
                  <React.Suspense fallback={<div className="p-8 text-center text-slate-400 bg-slate-50 animate-pulse rounded-lg">Loading Section...</div>}>
                    <Component {...props} />
                  </React.Suspense>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {footer && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setActiveElementType("footer");
              setActiveSectionId("footer");
            }}
            className={`
                cursor-pointer transition-all duration-200 mt-auto
                ${activeSectionId === "footer" && activeElementType === "footer"
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
            <footer.Component
              {...footer.props}
            // onLinkClick is already handled in getSectionProps for Footer
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RenderTemplate;
