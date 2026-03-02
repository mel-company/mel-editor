import { TemplateType, PageType, PageTemplateVariant } from "@/shared/types";
import { categories_sections } from "./categories/data";
import { recent_products_sections } from "./recent-products/data";
import { footer_sections } from "./footer/data";
import { our_story_sections } from "./our-story/data";
import { contact_sections } from "./contact/data";
import { hero_sections } from "./hero/data";
import { navigation_sections } from "./navbar/data";
import { product_info_sections } from "../../product-detail/sections/product-info/data";
import { checkout_form_sections } from "../../checkout/sections/checkout-form/data";

const createSection = (id: string, sectionId: string, type: string, options: any[], editable: boolean = true) => ({
  id,
  section_id: sectionId,
  type,
  editable,
  options,
  target_id: id,
});

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

const productsPage: PageType = {
  id: "products-page",
  name: "المنتجات",
  type: "content",
  sections: [
    createSection("products-grid", "1", "recentProducts", recent_products_sections, true),
  ],
};

const contactPage: PageType = {
  id: "contact-page",
  name: "اتصل بنا",
  type: "content",
  sections: [
    createSection("contact-hero", "1", "hero", hero_sections, true),
    createSection("contact-form", "2", "contact", contact_sections, true),
  ],
};

// Product Detail Page with template variants
const productDetailPage: PageType = {
  id: "product-detail-page",
  name: "تفاصيل المنتج",
  type: "product-detail",
  sections: [
    createSection("product-detail-nav", "1", "navigation", navigation_sections, false),
    createSection("product-detail-info", "1", "productInfo", product_info_sections, true),
    createSection("product-detail-footer", "1", "footer", footer_sections, false),
  ],
  templateVariants: [
    {
      id: "product-detail-classic",
      title: "Classic Layout",
      description: "تصميم كلاسيكي مع معرض الصور والتفاصيل",
      thumbnail: {
        url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300&vertical=center",
      },
      sections: [
        createSection("product-detail-nav", "1", "navigation", navigation_sections, false),
        createSection("product-detail-info", "1", "productInfo", product_info_sections, true),
        createSection("product-detail-footer", "1", "footer", footer_sections, false),
      ],
    },
    {
      id: "product-detail-modern",
      title: "Modern Layout",
      description: "تصميم حديث مع تخطيط متقدم",
      thumbnail: {
        url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300&vertical=center",
      },
      sections: [
        createSection("product-detail-nav", "1", "navigation", navigation_sections, false),
        createSection("product-detail-info", "2", "productInfo", product_info_sections, true),
        createSection("product-detail-footer", "1", "footer", footer_sections, false),
      ],
    },
  ],
};

// Checkout Page with template variants
const checkoutPage: PageType = {
  id: "checkout-page",
  name: "صفحة الدفع",
  type: "checkout",
  sections: [
    createSection("checkout-nav", "1", "navigation", navigation_sections, false),
    createSection("checkout-form", "1", "checkoutForm", checkout_form_sections, true),
    createSection("checkout-footer", "1", "footer", footer_sections, false),
  ],
  templateVariants: [
    {
      id: "checkout-classic",
      title: "Classic Two-Column",
      description: "تصميم كلاسيكي بعمودين - النموذج والملخص",
      thumbnail: {
        url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300&vertical=center",
      },
      sections: [
        createSection("checkout-nav", "1", "navigation", navigation_sections, false),
        createSection("checkout-form", "1", "checkoutForm", checkout_form_sections, true),
        createSection("checkout-footer", "1", "footer", footer_sections, false),
      ],
    },
    {
      id: "checkout-modern",
      title: "Modern Steps",
      description: "تصميم حديث مع خطوات متعددة",
      thumbnail: {
        url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300&vertical=center",
      },
      sections: [
        createSection("checkout-nav", "1", "navigation", navigation_sections, false),
        createSection("checkout-form", "2", "checkoutForm", checkout_form_sections, true),
        createSection("checkout-footer", "1", "footer", footer_sections, false),
      ],
    },
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
      section_id: "2",
      type: "recentProducts",
      view_all_link: "",
      options: recent_products_sections,
      editable: true,
    },
    {
      id: "4",
      section_id: "1",
      type: "footer",
      editable: false,
      options: footer_sections,
    },
  ],

  pages: [homePage, aboutPage, productsPage, contactPage, productDetailPage, checkoutPage],
};
