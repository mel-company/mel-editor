import { SectionOptionType } from "../types";

export const generateSchemaFromHtml = (html: string, liveElement?: HTMLElement | null): any[] => {
    // Safety check for SSR or non-browser environments
    if (typeof document === "undefined") {
        return [];
    }

    const schema: any[] = [];
    const root = document.createElement("div");
    root.innerHTML = html;
    
    // If liveElement is provided, use it to get actual textContent from rendered DOM
    const getLiveValue = (dataName: string, dataType: string): string => {
        if (liveElement) {
            const liveEl = liveElement.querySelector(`[data-name="${dataName}"]`);
            if (liveEl) {
                if (dataType === "image") {
                    return liveEl.getAttribute("src") || "";
                } else if (dataType === "link") {
                    return liveEl.getAttribute("href") || "";
                } else {
                    return liveEl.textContent?.trim() || "";
                }
            }
        }
        return "";
    };

    // Counters for auto-generated IDs
    const counters = {
        heading: 0,
        paragraph: 0,
        image: 0,
        link: 0,
        custom: 0,
    };

    // Helper to get attribute case-insensitively or via variations
    const getAttribute = (el: Element, ...names: string[]) => {
        for (const name of names) {
            if (el.hasAttribute(name)) return el.getAttribute(name);
        }
        return null;
    };

    // Iterate over all elements to preserve order
    const allElements = root.querySelectorAll("*");

    allElements.forEach((el) => {
        const tagName = el.tagName.toLowerCase();

        // 1. Check for Explicit Attributes
        const dataType = getAttribute(el, "data-type", "datatype");

        if (dataType) {
            const dataTitle = getAttribute(el, "data-title", "datatitle", "title") || "Custom Field";
            const dataName = getAttribute(el, "data-name", "dataname", "name", "id");

            // Generate a name/id if not provided
            counters.custom++;
            const fieldId = dataName || `custom_${dataType}_${counters.custom}`;

            // Determine value based on type
            // Try to get from live DOM first, then fall back to parsed HTML
            let value = getLiveValue(fieldId, dataType);
            if (!value) {
                if (dataType === "image") {
                    value = el.getAttribute("src") || "";
                } else if (dataType === "link") {
                    value = el.getAttribute("href") || "";
                } else {
                    value = el.textContent?.trim() || "";
                }
            }

            schema.push({
                id: fieldId,
                label: dataTitle,
                name: fieldId,
                type: dataType === "paragraph" ? "textarea" : dataType, // Map paragraph to textarea if needed
                value
            });
            return; // Skip implicit check for this element
        }


    });

    return schema;
};
