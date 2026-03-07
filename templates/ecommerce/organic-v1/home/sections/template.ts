import { TemplateType, PageType } from "@/shared/types";
import { navigation_sections } from "./navbar/data";
import { hero_sections } from "./hero/data";
import { features_sections } from "./features/data";
import { products_sections } from "./products/data";
import { about_sections } from "./about/data";
import { inspired_sections } from "./inspired/data";
import { quiz_sections } from "./quiz/data";
import { testimonials_sections } from "./testimonials/data";
import { newsletter_sections } from "./newsletter/data";
import { footer_sections } from "./footer/data";
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
    createSection("home-hero", "1", "hero", hero_sections, true),
    createSection("home-inspired", "1", "inspired", inspired_sections, true),
    createSection("home-features", "1", "features", features_sections, true),
    createSection("home-products", "1", "products", products_sections, true),
    createSection("home-about", "1", "about", about_sections, true),
    createSection("home-products-2", "2", "products", products_sections, true),
    createSection("home-quiz", "1", "quiz", quiz_sections, true),
    createSection("home-testimonials", "1", "testimonials", testimonials_sections, true),
    createSection("home-newsletter", "1", "newsletter", newsletter_sections, true),
    createSection("home-footer", "1", "footer", footer_sections, false),
  ],
};

const aboutPage: PageType = {
  id: "about-page",
  name: "حول المتجر",
  type: "about",
  sections: [
    createSection("about-hero", "2", "hero", hero_sections, true),
    createSection("about-story", "1", "about", about_sections, true),
    createSection("about-footer", "1", "footer", footer_sections, false),
  ],
};

const productsPage: PageType = {
  id: "products-page",
  name: "المنتجات",
  type: "content",
  sections: [
    createSection("products-nav", "1", "navigation", navigation_sections, false),
    createSection("products-grid", "1", "products", products_sections, true),
    createSection("products-footer", "1", "footer", footer_sections, false),
  ],
};

const contactPage: PageType = {
  id: "contact-page",
  name: "اتصل بنا",
  type: "content",
  sections: [
    createSection("contact-nav", "1", "navigation", navigation_sections, false),
    createSection("contact-hero", "2", "hero", hero_sections, true),
    createSection("contact-newsletter", "1", "newsletter", newsletter_sections, true),
    createSection("contact-footer", "1", "footer", footer_sections, false),
  ],
};

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
      title: "Classic Organic Layout",
      description: "تصميم كلاسيكي عضوي مع معرض الصور والتفاصيل",
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
      title: "Modern Organic Layout",
      description: "تصميم عضوي حديث مع تخطيط متقدم",
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
      title: "Classic Two-Column Organic",
      description: "تصميم كلاسيكي عضوي بعمودين - النموذج والملخص",
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
      title: "Modern Organic Steps",
      description: "تصميم عضوي حديث مع خطوات متعددة",
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
  id: "organic-v1-template",
  title: "Organic Beauty - Natural Skincare",
  description: "قالب عضوي أنيق لمتاجر العناية بالبشرة والمنتجات الطبيعية بتصميم أخضر هادئ",
  storeType: "e-commerce",

  thumbnail: {
    url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300&vertical=center",
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
      type: "inspired",
      view_all_link: "",
      editable: true,
      options: inspired_sections,
    },
    {
      id: "3",
      section_id: "1",
      type: "features",
      view_all_link: "",
      editable: true,
      options: features_sections,
    },
    {
      id: "4",
      section_id: "1",
      type: "products",
      view_all_link: "",
      editable: true,
      options: products_sections,
    },
    {
      id: "5",
      section_id: "1",
      type: "about",
      view_all_link: "",
      editable: true,
      options: about_sections,
    },
    {
      id: "6",
      section_id: "2",
      type: "products",
      view_all_link: "",
      editable: true,
      options: products_sections,
    },
    {
      id: "7",
      section_id: "1",
      type: "quiz",
      view_all_link: "",
      editable: true,
      options: quiz_sections,
    },
    {
      id: "8",
      section_id: "1",
      type: "testimonials",
      view_all_link: "",
      editable: true,
      options: testimonials_sections,
    },
    {
      id: "9",
      section_id: "1",
      type: "newsletter",
      view_all_link: "",
      editable: true,
      options: newsletter_sections,
    },
    {
      id: "10",
      section_id: "1",
      type: "footer",
      editable: false,
      options: footer_sections,
    },
  ],

  pages: [homePage, aboutPage, productsPage, contactPage, productDetailPage, checkoutPage],
};
