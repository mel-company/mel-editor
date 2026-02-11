import { categories_sections } from "@templates/sections/categories/data";
import { recent_products_sections } from "@templates/sections/recent-products/data";
import { footer_sections } from "@templates/sections/footer/data";
import { navigation_sections } from "@templates/sections/navbar/data";
import { hero_sections } from "@templates/sections/hero/data";
import { lazy } from "react";

// Type definition for the registry
type RegistryEntry = {
    component: React.ComponentType<any>;
    defaultOptions?: any; // Relaxed type as we might not have full options in registry for lazy loaded ones
};

type ComponentRegistryType = Record<string, RegistryEntry>;

// Build the registry
const registry: ComponentRegistryType = {};

// Helper to register sections - No longer registers components automatically from array
// unless explicitly handled, but we are moving to manual lazy registration.
// We keep this to register *default options* if needed, but for now we rely on the ID match.

// --- Lazy Load Registrations ---

// Navigation
registry["navigation:1"] = {
    component: lazy(() => import("@templates/sections/navbar/components").then(m => ({ default: m.Navigation1 }))),
    defaultOptions: navigation_sections.find(s => s.id === "1")
};

// Hero Sections
registry["hero:1"] = {
    component: lazy(() => import("@templates/sections/hero/components").then(m => ({ default: m.HeroSection1 }))),
    defaultOptions: hero_sections.find(s => s.id === "1")
};
registry["hero:2"] = {
    component: lazy(() => import("@templates/sections/hero/components").then(m => ({ default: m.HeroSection2 }))),
    defaultOptions: hero_sections.find(s => s.id === "2")
};
registry["hero:3"] = {
    component: lazy(() => import("@templates/sections/hero/components").then(m => ({ default: m.HeroSection3 }))),
    defaultOptions: hero_sections.find(s => s.id === "3")
};
registry["hero:4"] = {
    component: lazy(() => import("@templates/sections/hero/components").then(m => ({ default: m.HeroSection4 }))),
    defaultOptions: hero_sections.find(s => s.id === "4")
};
registry["hero:5"] = {
    component: lazy(() => import("@templates/sections/hero/components").then(m => ({ default: m.HeroSection5 }))),
    defaultOptions: hero_sections.find(s => s.id === "5")
};

// Categories Sections
registry["categories:1"] = {
    component: lazy(() => import("@templates/sections/categories/components").then(m => ({ default: m.CategoriesSection }))),
    defaultOptions: categories_sections.find(s => s.id === "1")
};
registry["categories:2"] = {
    component: lazy(() => import("@templates/sections/categories/components").then(m => ({ default: m.CategoriesSection2 }))),
    defaultOptions: categories_sections.find(s => s.id === "2")
};
registry["categories:3"] = {
    component: lazy(() => import("@templates/sections/categories/components").then(m => ({ default: m.CategoriesSection3 }))),
    defaultOptions: categories_sections.find(s => s.id === "3")
};
registry["categories:4"] = {
    component: lazy(() => import("@templates/sections/categories/components").then(m => ({ default: m.CategoriesSection4 }))),
    defaultOptions: categories_sections.find(s => s.id === "4")
};
registry["categories:5"] = {
    component: lazy(() => import("@templates/sections/categories/components").then(m => ({ default: m.CategoriesSection5 }))),
    defaultOptions: categories_sections.find(s => s.id === "5")
};

// Recent Products Sections
registry["recent-products:1"] = {
    component: lazy(() => import("@templates/sections/recent-products/components").then(m => ({ default: m.RecentProducts }))),
    defaultOptions: recent_products_sections.find(s => s.id === "1")
};
registry["recent-products:2"] = {
    component: lazy(() => import("@templates/sections/recent-products/components").then(m => ({ default: m.RecentProductsCarousel }))),
    defaultOptions: recent_products_sections.find(s => s.id === "2")
};
registry["recent-products:3"] = {
    component: lazy(() => import("@templates/sections/recent-products/components").then(m => ({ default: m.RecentProductsLarge }))),
    defaultOptions: recent_products_sections.find(s => s.id === "3")
};
registry["recent-products:4"] = {
    component: lazy(() => import("@templates/sections/recent-products/components").then(m => ({ default: m.RecentProductsCompact }))),
    defaultOptions: recent_products_sections.find(s => s.id === "4")
};
registry["recent-products:5"] = {
    component: lazy(() => import("@templates/sections/recent-products/components").then(m => ({ default: m.RecentProductsList }))),
    defaultOptions: recent_products_sections.find(s => s.id === "5")
};

// CamelCase alias for T2 template compatibility
registry["recentProducts:1"] = registry["recent-products:1"];
registry["recentProducts:2"] = registry["recent-products:2"];
registry["recentProducts:3"] = registry["recent-products:3"];
registry["recentProducts:4"] = registry["recent-products:4"];
registry["recentProducts:5"] = registry["recent-products:5"];

// Footer Sections
registry["footer:1"] = {
    component: lazy(() => import("@templates/sections/footer/components").then(m => ({ default: m.Footer1 }))),
    defaultOptions: footer_sections.find(s => s.id === "1")
};
registry["footer:2"] = {
    component: lazy(() => import("@templates/sections/footer/components").then(m => ({ default: m.Footer2 }))),
    defaultOptions: footer_sections.find(s => s.id === "2")
};
registry["footer:3"] = {
    component: lazy(() => import("@templates/sections/footer/components").then(m => ({ default: m.Footer3 }))),
    defaultOptions: footer_sections.find(s => s.id === "3")
};

// Contact Sections
registry["contact:1"] = {
    component: lazy(() => import("@templates/sections/contact/components").then(m => ({ default: m.ContactSection1 }))),
};
registry["contact:2"] = {
    component: lazy(() => import("@templates/sections/contact/components").then(m => ({ default: m.ContactSection2 }))),
};
registry["contact:3"] = {
    component: lazy(() => import("@templates/sections/contact/components").then(m => ({ default: m.ContactSection3 }))),
};
registry["contact:4"] = {
    component: lazy(() => import("@templates/sections/contact/components").then(m => ({ default: m.ContactSection4 }))),
};
registry["contact:5"] = {
    component: lazy(() => import("@templates/sections/contact/components").then(m => ({ default: m.ContactSection5 }))),
};
registry["contact:6"] = {
    component: lazy(() => import("@templates/sections/contact/components").then(m => ({ default: m.ContactSection6 }))),
};

// Our Story Sections
registry["our-story:1"] = {
    component: lazy(() => import("@templates/sections/our-story/components").then(m => ({ default: m.OurStorySection1 }))),
};
registry["our-story:2"] = {
    component: lazy(() => import("@templates/sections/our-story/components").then(m => ({ default: m.OurStorySection2 }))),
};
registry["our-story:3"] = {
    component: lazy(() => import("@templates/sections/our-story/components").then(m => ({ default: m.OurStorySection3 }))),
};


// Legacy/Static Registration Handling
// All sections are now lazy loaded!
// The helper below is unused but kept if needed for future hybrid approaches, or can be removed.
/*
const registerSections = (sections: any[], type: string) => {
     sections.forEach(section => {
        if (section.id && section.component) {
            registry[`${type}:${section.id}`] = {
                component: section.component,
                defaultOptions: section
            };
        }
    });
};
*/
// registerSections(footer_sections, "footer"); // Removed: Footer is now lazy

export const COMPONENT_REGISTRY = registry;

export const resolveComponent = (type: string, id?: string): RegistryEntry | null => {
    // 1. Try exact match "type:id"
    if (id && registry[`${type}:${id}`]) {
        return registry[`${type}:${id}`];
    }
    return null;
};
