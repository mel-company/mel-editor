import { categories_sections } from "@templates/home/sections/categories/data";
import { recent_products_sections } from "@templates/home/sections/recent-products/data";
import { navigation_sections } from "@templates/home/sections/navbar/data";
import { hero_sections } from "@templates/home/sections/hero/data";
import { product_info_sections } from "@templates/product-detail/sections/product-info/data";
import { checkout_form_sections } from "@templates/checkout/sections/checkout-form/data";
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
    component: lazy(() => import("../../../../templates/ecommerce/organic-v1/home/sections/navbar/components").then(m => ({ default: m.NavigationOrganic1 }))),
    defaultOptions: navigation_sections.find(s => s.id === "1")
};

// Hero Sections - Organic (new natural design)
registry["hero:organic1"] = {
    component: lazy(() => import("../../../../templates/ecommerce/organic-v1/home/sections/hero/components").then(m => ({ default: m.HeroOrganic1 }))),
};
registry["hero:organic2"] = {
    component: lazy(() => import("../../../../templates/ecommerce/organic-v1/home/sections/hero/components").then(m => ({ default: m.HeroOrganic2 }))),
};

// Keep retail hero sections as defaults
registry["hero:1"] = {
    component: lazy(() => import("@templates/home/sections/hero/components").then(m => ({ default: m.HeroSection1 }))),
    defaultOptions: hero_sections.find(s => s.id === "1")
};
registry["hero:2"] = {
    component: lazy(() => import("@templates/home/sections/hero/components").then(m => ({ default: m.HeroSection2 }))),
    defaultOptions: hero_sections.find(s => s.id === "2")
};
registry["hero:3"] = {
    component: lazy(() => import("@templates/home/sections/hero/components").then(m => ({ default: m.HeroSection3 }))),
    defaultOptions: hero_sections.find(s => s.id === "3")
};
registry["hero:4"] = {
    component: lazy(() => import("@templates/home/sections/hero/components").then(m => ({ default: m.HeroSection4 }))),
    defaultOptions: hero_sections.find(s => s.id === "4")
};
registry["hero:5"] = {
    component: lazy(() => import("@templates/home/sections/hero/components").then(m => ({ default: m.HeroSection5 }))),
    defaultOptions: hero_sections.find(s => s.id === "5")
};

// Categories Sections
registry["categories:1"] = {
    component: lazy(() => import("@templates/home/sections/categories/components").then(m => ({ default: m.CategoriesSection }))),
    defaultOptions: categories_sections.find(s => s.id === "1")
};
registry["categories:2"] = {
    component: lazy(() => import("@templates/home/sections/categories/components").then(m => ({ default: m.CategoriesSection2 }))),
    defaultOptions: categories_sections.find(s => s.id === "2")
};
registry["categories:3"] = {
    component: lazy(() => import("@templates/home/sections/categories/components").then(m => ({ default: m.CategoriesSection3 }))),
    defaultOptions: categories_sections.find(s => s.id === "3")
};
registry["categories:4"] = {
    component: lazy(() => import("@templates/home/sections/categories/components").then(m => ({ default: m.CategoriesSection4 }))),
    defaultOptions: categories_sections.find(s => s.id === "4")
};
registry["categories:5"] = {
    component: lazy(() => import("@templates/home/sections/categories/components").then(m => ({ default: m.CategoriesSection5 }))),
    defaultOptions: categories_sections.find(s => s.id === "5")
};

// Recent Products Sections
registry["recent-products:1"] = {
    component: lazy(() => import("@templates/home/sections/recent-products/components").then(m => ({ default: m.RecentProducts }))),
    defaultOptions: recent_products_sections.find(s => s.id === "1")
};
registry["recent-products:2"] = {
    component: lazy(() => import("@templates/home/sections/recent-products/components").then(m => ({ default: m.RecentProductsCarousel }))),
    defaultOptions: recent_products_sections.find(s => s.id === "2")
};
registry["recent-products:3"] = {
    component: lazy(() => import("@templates/home/sections/recent-products/components").then(m => ({ default: m.RecentProductsLarge }))),
    defaultOptions: recent_products_sections.find(s => s.id === "3")
};
registry["recent-products:4"] = {
    component: lazy(() => import("@templates/home/sections/recent-products/components").then(m => ({ default: m.RecentProductsCompact }))),
    defaultOptions: recent_products_sections.find(s => s.id === "4")
};
registry["recent-products:5"] = {
    component: lazy(() => import("@templates/home/sections/recent-products/components").then(m => ({ default: m.RecentProductsList }))),
    defaultOptions: recent_products_sections.find(s => s.id === "5")
};

// CamelCase alias for T2 template compatibility
registry["recentProducts:1"] = registry["recent-products:1"];
registry["recentProducts:2"] = registry["recent-products:2"];
registry["recentProducts:3"] = registry["recent-products:3"];
registry["recentProducts:4"] = registry["recent-products:4"];
registry["recentProducts:5"] = registry["recent-products:5"];

// ===== ORGANIC TEMPLATE COMPONENTS =====
// These are unique components for the organic/natural skincare template

// Hero Sections - Organic (unique natural design)
registry["hero:1"] = {
    component: lazy(() => import("../../../../templates/ecommerce/organic-v1/home/sections/hero/components").then(m => ({ default: m.HeroOrganic1 }))),
};
registry["hero:2"] = {
    component: lazy(() => import("../../../../templates/ecommerce/organic-v1/home/sections/hero/components").then(m => ({ default: m.HeroOrganic2 }))),
};

// Features Sections - Organic (unique natural values)
registry["features:1"] = {
    component: lazy(() => import("../../../../templates/ecommerce/organic-v1/home/sections/features/components").then(m => ({ default: m.FeaturesOrganic1 }))),
};

// Products Sections - Organic (unique product grids)
registry["products:1"] = {
    component: lazy(() => import("../../../../templates/ecommerce/organic-v1/home/sections/products/components").then(m => ({ default: m.ProductsOrganic1 }))),
};
registry["products:2"] = {
    component: lazy(() => import("../../../../templates/ecommerce/organic-v1/home/sections/products/components").then(m => ({ default: m.ProductsOrganic2 }))),
};

// About Sections - Organic (unique brand story)
registry["about:1"] = {
    component: lazy(() => import("../../../../templates/ecommerce/organic-v1/home/sections/about/components").then(m => ({ default: m.AboutOrganic1 }))),
};

// Inspired By Sections - Organic (traditional knowledge)
registry["inspired:1"] = {
    component: lazy(() => import("../../../../templates/ecommerce/organic-v1/home/sections/inspired/components").then(m => ({ default: m.InspiredByOrganic1 }))),
};

// Skin Quiz Sections - Organic (3 minute quiz)
registry["quiz:1"] = {
    component: lazy(() => import("../../../../templates/ecommerce/organic-v1/home/sections/quiz/components").then(m => ({ default: m.SkinQuizOrganic1 }))),
};

// Testimonials Sections - Organic (unique reviews)
registry["testimonials:1"] = {
    component: lazy(() => import("../../../../templates/ecommerce/organic-v1/home/sections/testimonials/components").then(m => ({ default: m.TestimonialsOrganic1 }))),
};

// Newsletter Sections - Organic (unique subscribe)
registry["newsletter:1"] = {
    component: lazy(() => import("../../../../templates/ecommerce/organic-v1/home/sections/newsletter/components").then(m => ({ default: m.NewsletterOrganic1 }))),
};

// Footer Sections - Organic (unique natural footer)
registry["footer:1"] = {
    component: lazy(() => import("../../../../templates/ecommerce/organic-v1/home/sections/footer/components").then(m => ({ default: m.FooterOrganic1 }))),
};

// Contact Sections
registry["contact:1"] = {
    component: lazy(() => import("@templates/home/sections/contact/components").then(m => ({ default: m.ContactSection1 }))),
};
registry["contact:2"] = {
    component: lazy(() => import("@templates/home/sections/contact/components").then(m => ({ default: m.ContactSection2 }))),
};
registry["contact:3"] = {
    component: lazy(() => import("@templates/home/sections/contact/components").then(m => ({ default: m.ContactSection3 }))),
};
registry["contact:4"] = {
    component: lazy(() => import("@templates/home/sections/contact/components").then(m => ({ default: m.ContactSection4 }))),
};
registry["contact:5"] = {
    component: lazy(() => import("@templates/home/sections/contact/components").then(m => ({ default: m.ContactSection5 }))),
};
registry["contact:6"] = {
    component: lazy(() => import("@templates/home/sections/contact/components").then(m => ({ default: m.ContactSection6 }))),
};

// Our Story Sections
registry["our-story:1"] = {
    component: lazy(() => import("@templates/home/sections/our-story/components").then(m => ({ default: m.OurStorySection1 }))),
};
registry["our-story:2"] = {
    component: lazy(() => import("@templates/home/sections/our-story/components").then(m => ({ default: m.OurStorySection2 }))),
};
registry["our-story:3"] = {
    component: lazy(() => import("@templates/home/sections/our-story/components").then(m => ({ default: m.OurStorySection3 }))),
};

// Our Story Sections (camelCase alias)
registry["ourStory:1"] = {
    component: lazy(() => import("@templates/home/sections/our-story/components").then(m => ({ default: m.OurStorySection1 }))),
};
registry["ourStory:2"] = {
    component: lazy(() => import("@templates/home/sections/our-story/components").then(m => ({ default: m.OurStorySection2 }))),
};
registry["ourStory:3"] = {
    component: lazy(() => import("@templates/home/sections/our-story/components").then(m => ({ default: m.OurStorySection3 }))),
};

// Product Info Sections
registry["productInfo:1"] = {
    component: lazy(() => import("@templates/product-detail/sections/product-info/components").then(m => ({ default: m.ProductInfo1 }))),
    defaultOptions: product_info_sections.find(s => s.id === "1")
};
registry["productInfo:2"] = {
    component: lazy(() => import("@templates/product-detail/sections/product-info/components").then(m => ({ default: m.ProductInfo2 }))),
    defaultOptions: product_info_sections.find(s => s.id === "2")
};

// Checkout Form Sections
registry["checkoutForm:1"] = {
    component: lazy(() => import("@templates/checkout/sections/checkout-form/components").then(m => ({ default: m.CheckoutForm1 }))),
    defaultOptions: checkout_form_sections.find(s => s.id === "1")
};
registry["checkoutForm:2"] = {
    component: lazy(() => import("@templates/checkout/sections/checkout-form/components").then(m => ({ default: m.CheckoutForm2 }))),
    defaultOptions: checkout_form_sections.find(s => s.id === "2")
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
