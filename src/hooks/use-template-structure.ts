import { useMemo } from "react";
import { usePageStore } from "../store/editor/page";
import { useStoreSettingsStore } from "../store/editor/store-settings";
import { mockTemplate } from "../mock/template";
import { Navigation1 } from "../mock/template/sections/navigation";
import { footer_sections } from "../mock/template/sections/footer";
import { getSectionProps } from "../utils/section-props";
import { SectionType } from "../types";
import { resolveComponent } from "../utils/component-registry";

export const useTemplateStructure = () => {
    const { pages, currentPageId } = usePageStore();
    const { storeSettings } = useStoreSettingsStore();

    const structure = useMemo(() => {
        const page = pages.find((p) => p.id === currentPageId);
        // Merge proper page data with mock template default structure if needed
        // Assuming mockTemplate provides fallbacks or structure
        const currentPage = { ...page, ...mockTemplate };

        // 1. Navigation
        let navigation = null;
        if (storeSettings.type !== "restaurant") {
            navigation = {
                Component: Navigation1,
                props: {
                    logo: storeSettings.logo,
                    navigationLinks: storeSettings.header?.navigationLinks,
                    primaryColor: storeSettings.colors?.primary,
                },
            };
        }

        // 2. Sections
        const rawSections =
            currentPage?.sections.filter(
                (s) => s.type !== "navigation" && s.type !== "footer"
            ) || [];

        const sections = rawSections
            .map((section) => {
                // 1. Try standard options-based resolution
                const selected_options = section.options?.find(
                    (option) => option.id === section.section_id
                );

                if (selected_options && selected_options.component) {
                    const Component = selected_options.component as any;
                    const props = getSectionProps(section, storeSettings);

                    if (!props) return null;

                    return {
                        id: section.id || section.section_id,
                        type: section.type,
                        Component,
                        props,
                        originalSection: section,
                    };
                }

                // 2. Try Registry resolution (Custom/Static Sections)
                const registryEntry = resolveComponent(section.type, section.section_id);
                if (registryEntry) {
                    const { component: Component, defaultOptions } = registryEntry;

                    // Create a virtual section that includes the default options 
                    // disguised as the expected structure for getSectionProps
                    const virtualSection = {
                        ...section,
                        options: [
                            {
                                ...defaultOptions,
                                id: section.section_id,
                                // Merge content: default content + section overrides
                                content: Array.isArray(defaultOptions?.content)
                                    ? defaultOptions.content // Merge logic for arrays is complex, using default for now
                                    : { ...defaultOptions?.content, ...(section as any).content }
                            }
                        ]
                    };

                    // Use getSectionProps to resolve the final props including content
                    // We must trick getSectionProps into finding the option we just created
                    const props = getSectionProps(virtualSection as any, storeSettings);

                    return {
                        id: section.id || section.section_id,
                        type: section.type,
                        Component,
                        props: props || { id: section.id || section.section_id },
                        originalSection: section,
                    };
                }

                return null;
            })
            .filter((s): s is NonNullable<typeof s> => s !== null);

        // 3. Footer
        let footer = null;
        if (
            storeSettings.type !== "restaurant" &&
            storeSettings.footer?.showFooter !== false
        ) {
            const footerVariant = storeSettings.footer?.footerVariant || "1";
            const variantIndex = footerVariant ? parseInt(footerVariant) - 1 : 0;
            const FooterComponent =
                footer_sections[variantIndex]?.component || footer_sections[0]?.component;

            if (FooterComponent) {
                footer = {
                    Component: FooterComponent,
                    props: {
                        logo: storeSettings.logo,
                        text: storeSettings.footer?.text,
                        title: storeSettings.footer?.title,
                        description: storeSettings.footer?.description,
                        contactInfo: storeSettings.footer?.contactInfo,
                        navigationLinks: storeSettings.header?.navigationLinks,
                        socialLinks: storeSettings.footer?.socialLinks,
                        styles: storeSettings.footer?.styles,
                    },
                };
            }
        }

        // Styles
        const fonts = storeSettings.fonts || { heading: "Arial", body: "Arial" };
        const colors = storeSettings.colors || {
            primary: "#4272FF",
            secondary: "#ACBA12",
            text: "#1D293D",
        };

        const globalStyles = {
            fontFamily: fonts.body,
            color: colors.text,
            "--heading-font": fonts.heading,
            "--body-font": fonts.body,
            "--primary-color": colors.primary,
            "--secondary-color": colors.secondary,
            "--text-color": colors.text,
        } as React.CSSProperties;

        return {
            navigation,
            sections,
            footer,
            globalStyles,
            storeSettings,
            currentPageId,
        };
    }, [pages, currentPageId, storeSettings]);

    return structure;
};
