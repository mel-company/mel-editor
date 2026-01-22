import { categories_sections } from "../mock/template/sections/categories";
import { recent_products_sections } from "../mock/template/sections/recent-products";
import { footer_sections } from "../mock/template/sections/footer";
import { our_story_sections } from "../mock/template/sections/our-story";
import { contact_sections } from "../mock/template/sections/contact";
import { navigation_sections } from "../global-sections/page/home/production/navbar";
import { hero_sections } from "../global-sections/page/home/production/hero";
import { SectionOptionType } from "../types";

// Type definition for the registry
type RegistryEntry = {
    component: React.ComponentType<any>;
    defaultOptions?: SectionOptionType;
};

type ComponentRegistryType = Record<string, RegistryEntry>;

// Build the registry
const registry: ComponentRegistryType = {};

// Helper to register sections
const registerSections = (sections: any[], type: string) => {
    sections.forEach(section => {
        // Register by specific ID if available (e.g. "hero:1")
        if (section.id) {
            registry[`${type}:${section.id}`] = {
                component: section.component,
                defaultOptions: section
            };
        }
    });
};

// Register all known sections
registerSections(navigation_sections, "navigation");
registerSections(hero_sections, "hero");
registerSections(categories_sections, "categories");
registerSections(recent_products_sections, "recent-products");
registerSections(footer_sections, "footer");
registerSections(our_story_sections, "our-story");
registerSections(contact_sections, "contact");

// Export the registry and a resolver function
export const COMPONENT_REGISTRY = registry;

export const resolveComponent = (type: string, id?: string): RegistryEntry | null => {
    // 1. Try exact match "type:id"
    if (id && registry[`${type}:${id}`]) {
        return registry[`${type}:${id}`];
    }

    return null;
};
