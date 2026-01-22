import { SectionOptionType } from "../types";

/**
 * Scans an HTML string (or Component source) to identify potential editable fields.
 * Returns a schema (SectionOptionType['content']) that can be used to populate the sidebar.
 */
export const generateSchemaFromHtml = (html: string): any[] => {
    const schema: any[] = [];

    // Counters for unique IDs
    const counters = {
        heading: 0,
        paragraph: 0,
        image: 0,
        link: 0
    };

    // 1. Headings (h1-h6) -> Text Input
    // Regex captures: <h[1-6] ...>CONTENT</h[1-6]>
    const headingRegex = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi;
    let headingMatch;
    while ((headingMatch = headingRegex.exec(html)) !== null) {
        const level = headingMatch[1];
        const content = headingMatch[2].replace(/<\/?[^>]+(>|$)/g, "").trim(); // Strip internal tags

        if (content) {
            counters.heading++;
            schema.push({
                id: `heading_${counters.heading}`,
                label: `العنوان ${counters.heading} (H${level})`,
                name: `heading_${counters.heading}`,
                type: "text",
                value: content
            });
        }
    }

    // 2. Paragraphs (p) -> Textarea
    const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
    let pMatch;
    while ((pMatch = pRegex.exec(html)) !== null) {
        const content = pMatch[1].replace(/<\/?[^>]+(>|$)/g, "").trim();

        if (content) {
            counters.paragraph++;
            schema.push({
                id: `paragraph_${counters.paragraph}`,
                label: `النص ${counters.paragraph}`,
                name: `paragraph_${counters.paragraph}`,
                type: "textarea",
                value: content
            });
        }
    }

    // 3. Images (img) -> Image Uploader
    // Regex captures src attribute
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    let imgMatch;
    while ((imgMatch = imgRegex.exec(html)) !== null) {
        const src = imgMatch[1];
        counters.image++;

        // For images, we usually handle them separately in the 'photos' array or a special 'image' content type.
        // However, the requested schema format for 'content' usually handles simple values.
        // If we want to make it editable, we might need to conform to how the sidebar expects images.
        // For now, let's treat it as a text field for the URL or a special 'image' type if supported.

        schema.push({
            id: `image_${counters.image}`,
            label: `الصورة ${counters.image}`,
            name: `image_${counters.image}`,
            type: "image", // Assuming 'image' type is supported or will be handled
            value: src
        });
    }

    // 4. Links (a) -> Link Input
    const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
    let linkMatch;
    while ((linkMatch = linkRegex.exec(html)) !== null) {
        const href = linkMatch[1];
        const text = linkMatch[2].replace(/<\/?[^>]+(>|$)/g, "").trim();

        counters.link++;
        schema.push({
            id: `link_${counters.link}`,
            label: `الرابط ${counters.link} (${text || "Link"})`,
            name: `link_${counters.link}`,
            type: "text", // Simple URL edit for now
            value: href
        });
    }

    return schema;
};
