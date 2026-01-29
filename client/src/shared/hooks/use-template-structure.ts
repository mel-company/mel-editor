import { useMemo, useState, useEffect } from "react";
import { usePageStore, restoreSectionComponents } from "../store/editor/page";
import { useStoreSettingsStore } from "../store/editor/store-settings";
import { mockTemplate } from "@templates/data/template";
// import { Navigation1 } from "@templates/data/template/sections/navigation";
// import { footer_sections } from "@templates/data/template/sections/footer";
import { getSectionProps } from "../utils/section-props";
import { SectionType, NavigationFooterType, HydratedSection } from "../types";
import { resolveComponent } from "../utils/component-registry";
import { useSSRProducts, useSSRCategories, useSSRData } from "../context/ssr-data-context";



export const useTemplateStructure = () => {
    const { pages: storePages, currentPageId: storeCurrentPageId } = usePageStore();
    const { storeSettings: storeStoreSettings } = useStoreSettingsStore();

    // Get SSR data
    const { isSSR, templateConfig } = useSSRData();
    const ssrProductsFromContext = useSSRProducts();
    const ssrCategoriesFromContext = useSSRCategories();

    const [clientProducts, setClientProducts] = useState<any[]>([]);
    const [clientCategories, setClientCategories] = useState<any[]>([]);

    useEffect(() => {
        if (!isSSR) {
            const fetchGlobalData = async () => {
                try {
                    const [pRes, cRes] = await Promise.all([
                        fetch("/api/v1/products").then(res => res.json()),
                        fetch("/api/v1/categories").then(res => res.json())
                    ]);
                    if (pRes?.data) setClientProducts(pRes.data);
                    if (cRes?.data) setClientCategories(cRes.data);
                } catch (e) {
                    console.error("Hook fetch error", e);
                }
            };
            fetchGlobalData();
        }
    }, [isSSR]);

    const ssrProducts = (ssrProductsFromContext && ssrProductsFromContext.length > 0) ? ssrProductsFromContext : clientProducts;
    const ssrCategories = (ssrCategoriesFromContext && ssrCategoriesFromContext.length > 0) ? ssrCategoriesFromContext : clientCategories;

    // Hydration state
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkHydration = () => {
            const isPagesHydrated = usePageStore.persist.hasHydrated();
            const isSettingsHydrated = useStoreSettingsStore.persist.hasHydrated();
            if (isPagesHydrated && isSettingsHydrated) {
                setIsLoading(false);
            }
        };

        checkHydration();

        const unsubPages = usePageStore.persist.onFinishHydration(() => checkHydration());
        const unsubSettings = useStoreSettingsStore.persist.onFinishHydration(() => checkHydration());

        return () => {
            // Depending on Zustand version, onFinishHydration usually returns unsubscribe
            if (typeof unsubPages === 'function') unsubPages();
            if (typeof unsubSettings === 'function') unsubSettings();
        };
    }, []);



    // Determine source of truth: SSR/injected config vs Client Store
    const rawPages = (isSSR && templateConfig?.pages) ? templateConfig.pages : storePages;

    // Hydrate pages with components if coming from SSR
    const pages = useMemo(() => {
        if (isSSR && templateConfig?.pages) {
            return restoreSectionComponents(rawPages);
        }
        return rawPages;
    }, [rawPages, isSSR, templateConfig]);

    const storeSettings = (isSSR && templateConfig?.storeSettings) ? templateConfig.storeSettings : storeStoreSettings;

    // For SSR or if store ID is invalid, default to the first available page
    const currentPageId = useMemo(() => {
        if (isSSR && pages.length > 0) return pages[0].id;

        const pageExists = pages.some(p => p.id === storeCurrentPageId);
        if (!pageExists && pages.length > 0) {
            return pages[0].id;
        }

        return storeCurrentPageId;
    }, [isSSR, pages, storeCurrentPageId]);

    const structure = useMemo(() => {
        const page = pages.find((p) => p.id === currentPageId);

        // Use SSR template if available, otherwise fallback to mock/page merge
        const templateSource = (isSSR && templateConfig) ? { sections: pages.find(p => p.id === currentPageId)?.sections || [] } : mockTemplate;

        const currentPage = { ...templateSource, ...page };

        // 1. Navigation
        let navigation: NavigationFooterType | null = null;
        // Prioritize SSR settings if available
        const activeSettings = (isSSR && templateConfig?.storeSettings) ? templateConfig.storeSettings : storeSettings;

        if (activeSettings.type !== "restaurant") {
            const navEntry = resolveComponent("navigation", "1");
            if (navEntry) {
                navigation = {
                    Component: navEntry.component,
                    props: {
                        logo: activeSettings.logo,
                        navigationLinks: activeSettings.header?.navigationLinks,
                        primaryColor: activeSettings.colors?.primary,
                    },
                };
            }
        }

        // 2. Sections
        const rawSections =
            currentPage?.sections.filter(
                (s: SectionType) => s.type !== "navigation" && s.type !== "footer"
            ) || [];

        const sections = rawSections
            .map((section: SectionType) => {
                // 1. Try standard options-based resolution
                // 1. Try standard options-based resolution
                // 1. Try standard options-based resolution
                // Hydrate options using the Registry/Mock directly.
                let hydratedOptions = section.options;

                // Strategy: Use fresh section definition as the source of truth for WHICH options exist.
                // This ensures that even if the stored section is missing a variant (e.g. "Hero 2"), 
                // it becomes available because we iterate over the FRESH list.
                const freshSection = mockTemplate.sections.find(
                    (s) => s.id === section.id || (s.type === section.type && s.section_id === section.section_id)
                );


                if (freshSection && freshSection.options) {
                    hydratedOptions = freshSection.options.map((freshOption: any) => {
                        const storedOption = section.options?.find((so: any) => so.id === freshOption.id);

                        // Always try to resolve the component fresh from registry
                        // This ensures we get the correct lazy-loaded component even if mockTemplate lacks it
                        const registryEntry = resolveComponent(section.type, freshOption.id);
                        const resolvedComponent = registryEntry?.component;

                        if (storedOption) {
                            // Merge: Fresh structure (has photos etc) + Stored values, ensure component is preserved/updated
                            return {
                                ...freshOption,
                                ...storedOption,
                                component: resolvedComponent || storedOption.component
                            };
                        }
                        // If no stored option exists for this variant, return the fresh default with component attached
                        return {
                            ...freshOption,
                            component: resolvedComponent
                        };
                    });
                } else if (section.options) {
                    // Fallback for Custom Sections (not in mockTemplate):
                    // We can only iterate over what we have stored, but we try to hydrate structure from registry
                    hydratedOptions = section.options.map((storedOption: any) => {
                        const registryEntry = resolveComponent(section.type, storedOption.id);
                        if (registryEntry) {
                            const { component, defaultOptions } = registryEntry;
                            return { ...defaultOptions, ...storedOption, component };
                        }
                        return storedOption;
                    });
                }

                const selected_options = hydratedOptions?.find(
                    (option: any) => option.id === section.section_id
                );

                if (selected_options && selected_options.component) {
                    const Component = selected_options.component as any;
                    const props = getSectionProps(section, storeSettings);

                    if (!props) return null;

                    // Inject SSR data for sections that need products or categories ONLY IF empty
                    if ((section.type === "recent-products" || section.type === "recentProducts" || section.type === "products") && (!props.products || props.products.length === 0)) {
                        if (ssrProducts && ssrProducts.length > 0) {
                            props.products = ssrProducts;
                        }
                    }
                    if ((section.type === "categories" || section.type === "categoryGrid") && (!props.categories || props.categories.length === 0)) {
                        if (ssrCategories && ssrCategories.length > 0) {
                            props.categories = ssrCategories;
                        }
                    }

                    return {
                        id: section.target_id || section.id || section.section_id,
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
                                    ? defaultOptions.content.map((item: any) => {
                                        const savedValue = (section as any).content?.[item.name];
                                        return savedValue !== undefined ? { ...item, value: savedValue } : item;
                                    })
                                    : { ...defaultOptions?.content, ...(section as any).content }
                            }
                        ]
                    };

                    // Use getSectionProps to resolve the final props including content
                    // We must trick getSectionProps into finding the option we just created
                    const props = getSectionProps(virtualSection as any, storeSettings);

                    return {
                        id: section.target_id || section.id || section.section_id,
                        type: section.type,
                        Component,
                        props: props || { id: section.target_id || section.id || section.section_id },
                        originalSection: section,
                    };
                }

                return null;
            })
            .filter((s: HydratedSection | null): s is HydratedSection => s !== null);

        // 3. Footer
        let footer: NavigationFooterType | null = null;

        // 3.1. PROPOSED FIX: Check for explicit footer section in the current page first
        // This ensures that what is seen in the section list is what is rendered
        const footerSection = currentPage?.sections.find((s: any) => s.type === "footer");

        if (footerSection) {
            const footerVariant = footerSection.section_id || "1";
            const registryEntry = resolveComponent("footer", footerVariant);

            if (registryEntry) {
                // hydration logic for footer section content
                // Merge stored content into props
                const selectedOption = footerSection.options?.find((o: any) => o.id === footerVariant);
                const extractedProps: any = {};

                if (selectedOption?.content && Array.isArray(selectedOption.content)) {
                    selectedOption.content.forEach((item: any) => {
                        if (item.value) extractedProps[item.name] = item.value;
                    });
                }

                footer = {
                    Component: registryEntry.component,
                    props: {
                        logo: storeSettings.logo,
                        text: extractedProps.text || storeSettings.footer?.text,
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
        // 3.2. Fallback to storeSettings if no footer section is present (Legacy/Global behavior)
        else if (
            storeSettings.type !== "restaurant" &&
            storeSettings.footer?.showFooter !== false
        ) {
            const footerVariant = storeSettings.footer?.footerVariant || "1";
            // const variantIndex = footerVariant ? parseInt(footerVariant) - 1 : 0;
            // Use resolveComponent instead of array index
            const registryEntry = resolveComponent("footer", footerVariant);

            if (registryEntry) {
                footer = {
                    Component: registryEntry.component,
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
            pages,
        };
    }, [pages, currentPageId, storeSettings, ssrProducts, ssrCategories]);

    return { ...structure, isLoading };
};
