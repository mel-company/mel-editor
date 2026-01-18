import { SectionType } from "../types";
import { usePageStore } from "../store/editor/page";

// Helper function to extract props for a section
export const getSectionProps = (
    section: SectionType,
    storeSettings: any
) => {
    const { setCurrentPageId } = usePageStore.getState();

    const selected_options = section.options?.find(
        (option) => option.id === section.section_id
    );

    if (!selected_options) {
        return null;
    }

    const { component: _Component, ...restOptions } = selected_options as any;

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
                props.title = contentProps.title;
                props.description = contentProps.description;
            } else if (section.type === "contact") {
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
            if (section.type === "hero") {
                props.title = restOptions.content.title;
                props.description = restOptions.content.description;
            } else if (section.type === "footer") {
                props.text = restOptions.content.text;
            } else if (section.type === "ourStory") {
                props.title = restOptions.content.title;
                props.description = restOptions.content.description;
            } else if (section.type === "contact") {
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

    // Handle photos
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
                // We'll use the store hook inside the component usually, but this is a callback prop
                // so it's fine to reference the store implementation where this prop is used
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

    return props;
};
