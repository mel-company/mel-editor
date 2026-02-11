/**
 * REFACTORED TEMPLATE - Using Clean Architecture
 * 
 * This is an example of how to refactor the template using the new
 * builders, factories, and utilities for cleaner, more maintainable code.
 * 
 * Compare this with the original index.ts to see the improvements:
 * - Less code duplication
 * - Better type safety
 * - Clearer intent
 * - Easier to maintain
 */

import { TemplateType, PageType } from "@/shared/types";
import { TemplateBuilder, PageBuilder, SectionFactory } from "@templates/shared";

// Import section definitions
import { categories_sections } from "./sections/categories";
import { recent_products_sections } from "./sections/recent-products";
import { footer_sections } from "./sections/footer";
import { our_story_sections } from "./sections/our-story";
import { contact_sections } from "./sections/contact";
import { hero_sections } from "./sections/hero";
import { navigation_sections } from "../../sections/navbar/data";

/**
 * HOME PAGE
 * Navigation, Hero, Categories, Products, Footer
 */
const homePage: PageType = new PageBuilder()
  .setId("home-page")
  .setName("الصفحة الرئيسية")
  .setType("home")
  .addSections([
    SectionFactory.createNavigationSection("home-nav", "1", navigation_sections, false),
    SectionFactory.createHeroSection("home-hero", "3", hero_sections, true),
    SectionFactory.createCategoriesSection("home-categories", "1", categories_sections, true),
    SectionFactory.createProductsSection("home-products", "2", recent_products_sections, true),
    SectionFactory.createFooterSection("home-footer", "1", footer_sections, false),
  ])
  .build();

/**
 * ABOUT PAGE
 * Hero, Our Story, Contact Info
 */
const aboutPage: PageType = new PageBuilder()
  .setId("about-page")
  .setName("حول المتجر")
  .setType("about")
  .addSections([
    SectionFactory.createHeroSection("about-hero", "2", hero_sections, true),
    SectionFactory.createOurStorySection("about-story", "1", our_story_sections, true),
    SectionFactory.createContactSection("about-contact", "1", contact_sections, true),
  ])
  .build();

/**
 * PRODUCTS PAGE
 * Products Grid
 */
const productsPage: PageType = new PageBuilder()
  .setId("products-page")
  .setName("المنتجات")
  .setType("content")
  .addSections([
    SectionFactory.createProductsSection("products-grid", "1", recent_products_sections, true),
  ])
  .build();

/**
 * CONTACT PAGE
 * Hero, Contact Form
 */
const contactPage: PageType = new PageBuilder()
  .setId("contact-page")
  .setName("اتصل بنا")
  .setType("content")
  .addSections([
    SectionFactory.createHeroSection("contact-hero", "1", hero_sections, true),
    SectionFactory.createContactSection("contact-form", "2", contact_sections, true),
  ])
  .build();

/**
 * MAIN TEMPLATE
 * Built using TemplateBuilder for consistency
 */
export const mockTemplateRefactored: TemplateType = new TemplateBuilder()
  .setId("cklsmvdlkvmds")
  .setTitle("Template 1")
  .setDescription("Template 1 description")
  .setStoreType("e-commerce")
  .setThumbnail("")
  .addPages([homePage, aboutPage, productsPage, contactPage])
  .build();

/**
 * BENEFITS OF THIS REFACTORED VERSION:
 * 
 * 1. ✅ Less Code: Reduced from ~139 lines to ~90 lines
 * 2. ✅ No Duplication: Helper function removed, using factory methods
 * 3. ✅ Better Readability: Clear intent with named factory methods
 * 4. ✅ Type Safety: Builders ensure all required fields are present
 * 5. ✅ Consistency: All sections created using same pattern
 * 6. ✅ Maintainability: Easy to add new pages or sections
 * 7. ✅ Validation: Built-in validation in builders
 * 8. ✅ Scalability: Easy to extend with new features
 */
