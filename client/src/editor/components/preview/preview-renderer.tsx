import { useEffect, useState } from "react";
import React from "react";
import { SectionType, StoreType, PageType } from "../../../shared/types";
import { Navigation1 } from "@templates/sections/page/home/production/navbar/components";
import { footer_sections } from "@templates/data/template/sections/footer";
import { mockTemplate } from "@templates/data/template";
import { getSectionProps } from "../../../shared/utils/section-props";

interface PreviewRendererProps {
    pages: PageType[];
    storeSettings: StoreType;
}

const PreviewRenderer = ({ pages, storeSettings }: PreviewRendererProps) => {
    const [currentPageId, setCurrentPageId] = useState<string>("");
    const [activeSectionId, setActiveSectionId] = useState<string>("");

    useEffect(() => {
        if (pages.length > 0 && !currentPageId) {
            setCurrentPageId(pages[0].id);
        }
    }, [pages]);

    const page = pages.find((p) => p.id === currentPageId);
    // Merge with mockTemplate to ensure structure (just like RenderTemplate)
    const currentPage = page ? { ...page, ...mockTemplate } : undefined;

    const sections =
        currentPage?.sections.filter(
            (s: SectionType) => s.type !== "navigation" && s.type !== "footer"
        ) || [];


    // Apply fonts and colors from store settings
    const fonts = storeSettings.fonts || { heading: "Arial", body: "Arial" };
    const colors = storeSettings.colors || {
        primary: "#4272FF",
        secondary: "#ACBA12",
        text: "#1D293D",
    };

    if (!currentPage) return <div>Loading...</div>;

    return (
        <div
            className="w-full h-full flex items-center justify-center cursor-default min-h-screen bg-white"
        >
            <div
                className="w-full h-full flex flex-col"
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
                {/* Navigation Bar */}
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
                                if (pageId) {
                                    setCurrentPageId(pageId);
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                }
                            }}
                        />
                    </div>
                )}

                {/* Page Content */}
                <div className="flex-1">
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
                                padding: sectionStyles.padding,
                                paddingTop: sectionStyles.paddingTop || sectionStyles.padding,
                                paddingBottom:
                                    sectionStyles.paddingBottom || sectionStyles.padding,
                                paddingLeft: sectionStyles.paddingLeft || sectionStyles.padding,
                                paddingRight:
                                    sectionStyles.paddingRight || sectionStyles.padding,
                                margin: sectionStyles.margin,
                                marginTop: sectionStyles.marginTop || sectionStyles.margin,
                                marginBottom:
                                    sectionStyles.marginBottom || sectionStyles.margin,
                                marginLeft: sectionStyles.marginLeft || sectionStyles.margin,
                                marginRight: sectionStyles.marginRight || sectionStyles.margin,
                                borderWidth: sectionStyles.borderWidth,
                                borderStyle: sectionStyles.borderStyle as any,
                                borderColor: sectionStyles.borderColor,
                                borderRadius: sectionStyles.borderRadius,
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
                                    <Section section={section} storeSettings={storeSettings} />
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer */}
                {storeSettings.type !== "restaurant" &&
                    storeSettings.footer?.showFooter !== false && (
                        <div
                            className="mt-auto"
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
    footer: any;
    logo: any;
    navigationLinks?: any[];
    footerVariant?: string;
}) => {
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
            styles={footer?.styles}
        />
    );
};

const Section = ({ section, storeSettings }: { section: SectionType, storeSettings: StoreType }) => {
    const selected_options = section.options?.find(
        (option) => option.id === section.section_id
    );

    if (!selected_options) {
        return null;
    }

    const Component = selected_options.component as any;

    if (!Component) {
        return null;
    }

    const props = getSectionProps(section, storeSettings);

    return <Component {...props} />;
};

export default PreviewRenderer;
