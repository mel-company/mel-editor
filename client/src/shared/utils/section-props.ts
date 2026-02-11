import { SectionType } from "../types";
import { usePageStore } from "../store/editor/page";

// Helper function to extract props for a section
export const getSectionProps = (
    section: SectionType,
    storeSettings: any,
    isEditor = false
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
        id: section.id || section.section_id, // Pass ID for store connection
        styles: section.styles, // Pass styles to component
        isEditor, // Pass editor context flag
    };

    // Handle content (title, description, etc.)
    if (restOptions.content) {
        if (Array.isArray(restOptions.content)) {
            const contentProps = restOptions.content.reduce((acc: any, item: any) => {
                const key = item.name || item.id;
                if (key) acc[key] = item.value;
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
                props.email = contentProps.email;
                props.phone = contentProps.phone;
                props.address = contentProps.address;
                props.hours = contentProps.hours;
            } else {
                props.content = contentProps;
                // Auto-flatten content props for compatibility with components expecting top-level props
                Object.assign(props, contentProps);
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
                props.email = restOptions.content.email;
                props.phone = restOptions.content.phone;
                props.address = restOptions.content.address;
                props.hours = restOptions.content.hours;
            } else {
                props.content = restOptions.content;
                // Auto-flatten for object-based content as well
                Object.assign(props, restOptions.content);
            }
        }
    }

    // Handle user overrides from section.content
    if (section.content) {
        const contentOverrides = Array.isArray(section.content)
            ? section.content.reduce((acc: any, item: any) => {
                const key = item.name || item.id;
                if (key) acc[key] = item.value;
                return acc;
            }, {})
            : section.content;

        props = { ...props, ...contentOverrides };

        if (section.type === "hero" || section.type === "ourStory") {
            if (contentOverrides.title !== undefined) props.title = contentOverrides.title;
            if (contentOverrides.description !== undefined) props.description = contentOverrides.description;
        } else if (section.type === "footer") {
            if (contentOverrides.text !== undefined) props.text = contentOverrides.text;
        } else if (section.type === "contact") {
            if (contentOverrides.title !== undefined) props.title = contentOverrides.title;
            if (contentOverrides.description !== undefined) props.description = contentOverrides.description;
            if (contentOverrides.email !== undefined) props.email = contentOverrides.email;
            if (contentOverrides.phone !== undefined) props.phone = contentOverrides.phone;
            if (contentOverrides.address !== undefined) props.address = contentOverrides.address;
            if (contentOverrides.hours !== undefined) props.hours = contentOverrides.hours;
            // Generic fallback for any other scanned fields
            Object.assign(props, contentOverrides);
        } else {
            // Generic fallback for non-specific sections
            Object.assign(props, contentOverrides);
        }
    }

    // Handle photos
    // Prioritize section.photos (user uploads) over restOptions.photos (mock defaults)
    const photos = section.photos || restOptions.photos;

    if (photos && !Array.isArray(photos)) {
        props = { ...props, ...photos };
    } else if (photos) {
        props.photos = photos;
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

    if (section.type === 'contact') {

    }
    return props;
};
