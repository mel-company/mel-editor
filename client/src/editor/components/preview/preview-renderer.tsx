import React from "react";
import { useTemplateStructure } from "../../../shared/hooks/use-template-structure";

interface PreviewRendererProps {
    pages: any[];
    storeSettings: any;
}

const PreviewRenderer = (_props: PreviewRendererProps) => {
    const { navigation, sections, footer, globalStyles, isLoading, storeSettings } = useTemplateStructure(true);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="w-full h-full flex items-center justify-center cursor-default min-h-screen bg-white">
            <div className="w-full h-full flex flex-col" style={globalStyles}>
                {/* Navigation Bar */}
                {navigation && (
                    <div
                        style={{
                            backgroundColor: storeSettings.header?.styles?.backgroundColor,
                            color: storeSettings.header?.styles?.textColor,
                        }}
                    >
                        <navigation.Component {...navigation.props} />
                    </div>
                )}

                {/* Page Content */}
                <div className="flex-1">
                    {sections.length === 0 ? (
                        <div className="p-8 text-center text-slate-500">
                            لا توجد أقسام في هذه الصفحة
                        </div>
                    ) : (
                        sections.map((section: any) => {
                            const sectionStyles = section.originalSection?.styles || {};
                            const sectionStyle: React.CSSProperties = {
                                backgroundColor: sectionStyles.backgroundColor,
                                color: sectionStyles.textColor,
                                padding: sectionStyles.padding,
                                paddingTop: sectionStyles.paddingTop || sectionStyles.padding,
                                paddingBottom: sectionStyles.paddingBottom || sectionStyles.padding,
                                paddingLeft: sectionStyles.paddingLeft || sectionStyles.padding,
                                paddingRight: sectionStyles.paddingRight || sectionStyles.padding,
                                margin: sectionStyles.margin,
                                marginTop: sectionStyles.marginTop || sectionStyles.margin,
                                marginBottom: sectionStyles.marginBottom || sectionStyles.margin,
                                marginLeft: sectionStyles.marginLeft || sectionStyles.margin,
                                marginRight: sectionStyles.marginRight || sectionStyles.margin,
                                borderWidth: sectionStyles.borderWidth,
                                borderStyle: sectionStyles.borderStyle as any,
                                borderColor: sectionStyles.borderColor,
                                borderRadius: sectionStyles.borderRadius,
                                boxShadow: sectionStyles.boxShadow,
                                opacity: sectionStyles.opacity ? parseFloat(sectionStyles.opacity) : undefined,
                            };

                            return (
                                <div
                                    key={section.id}
                                    style={{
                                        ...sectionStyle,
                                        "--section-heading-color": sectionStyles.headingColor || sectionStyles.textColor || "#1D293D",
                                        "--section-text-color": sectionStyles.textColor || "#1D293D",
                                        "--section-button-color": sectionStyles.buttonColor || "#4272FF",
                                        "--section-button-text-color": sectionStyles.buttonTextColor || "#FFFFFF",
                                        "--section-heading-font-size": sectionStyles.headingFontSize || "2rem",
                                        "--section-text-font-size": sectionStyles.textFontSize || "1rem",
                                        "--section-heading-font-weight": sectionStyles.headingFontWeight || "bold",
                                        "--section-text-font-weight": sectionStyles.textFontWeight || "normal",
                                    } as React.CSSProperties}
                                >
                                    <section.Component {...section.props} />
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer */}
                {footer && (
                    <div
                        className="mt-auto"
                        style={{
                            backgroundColor: storeSettings.footer?.styles?.backgroundColor || "#1e293b",
                            color: storeSettings.footer?.styles?.textColor || "#ffffff",
                            padding: storeSettings.footer?.styles?.padding,
                            margin: storeSettings.footer?.styles?.margin,
                        }}
                    >
                        <footer.Component {...footer.props} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PreviewRenderer;
