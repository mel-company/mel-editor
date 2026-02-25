import { TemplateType, PageType } from "@/shared/types";
import { categories_sections } from "../../sections/categories/data";
import { recent_products_sections } from "../../sections/recent-products/data";
import { footer_sections } from "../../sections/footer/data";
import { our_story_sections } from "../../sections/our-story/data";
import { contact_sections } from "../../sections/contact/data";
import { hero_sections } from "../../sections/hero/data";
import { navigation_sections } from "../../sections/navbar/data";

// Helper function to create a section with proper structure
const createSection = (id: string, sectionId: string, type: string, options: any[], editable: boolean = true) => ({
  id,
  section_id: sectionId,
  type,
  editable,
  options,
  target_id: id,
});

// Page 1: Home Page - Navigation, Hero, Categories, Products, Footer
const homePage: PageType = {
  id: "home-page",
  name: "الصفحة الرئيسية",
  type: "home",
  sections: [
    createSection("home-nav", "1", "navigation", navigation_sections, false),
    createSection("home-hero", "3", "hero", hero_sections, true),
    createSection("home-categories", "1", "categories", categories_sections, true),
    createSection("home-products", "2", "recentProducts", recent_products_sections, true),
    createSection("home-footer", "1", "footer", footer_sections, false),
  ],
};

// Page 2: About Page - Hero, Our Story, Contact Info
const aboutPage: PageType = {
  id: "about-page",
  name: "حول المتجر",
  type: "about",
  sections: [
    createSection("about-hero", "2", "hero", hero_sections, true),
    createSection("about-story", "1", "ourStory", our_story_sections, true),
    createSection("about-contact", "1", "contact", contact_sections, true),
  ],
};

// Page 3: Products Page - Products Grid
const productsPage: PageType = {
  id: "products-page",
  name: "المنتجات",
  type: "content",
  sections: [
    createSection("products-grid", "1", "recentProducts", recent_products_sections, true),
  ],
};

// Page 4: Contact Page - Hero, Contact Form
const contactPage: PageType = {
  id: "contact-page",
  name: "اتصل بنا",
  type: "content",
  sections: [
    createSection("contact-hero", "1", "hero", hero_sections, true),
    createSection("contact-form", "2", "contact", contact_sections, true),
  ],
};

export const mockTemplate: TemplateType = {
  id: "cklsmvdlkvmds",
  title: "Template 1",
  description: "Template 1 description",
  storeType: "e-commerce",

  thumbnail: {
    url: "",
  },

  // Legacy sections array (for backwards compatibility)
  sections: [
    {
      id: "0",
      section_id: "1",
      type: "navigation",
      editable: false,
      options: navigation_sections,
    },
    {
      id: "1",
      section_id: "1",
      type: "hero",
      view_all_link: "",
      editable: true,
      options: hero_sections,
    },
    {
      id: "2",
      section_id: "1",
      type: "categories",
      view_all_link: "",
      options: categories_sections,
      editable: true,
    },
    {
      id: "3",
      section_id: "1",
      type: "recentProducts",
      view_all_link: "",
      options: recent_products_sections,
      editable: true,
    },
    {
      id: "4",
      section_id: "1",
      type: "footer",
      view_all_link: "",
      options: footer_sections,
      editable: false,
    },
    {
      id: "5",
      section_id: "1",
      type: "ourStory",
      view_all_link: "",
      options: our_story_sections,
      editable: true,
    },
    {
      id: "6",
      section_id: "1",
      type: "contact",
      view_all_link: "",
      options: contact_sections,
      editable: true,
    },
  ],

  // Multi-page support: 4 pages for e-commerce
  pages: [homePage, aboutPage, productsPage, contactPage],
};
