import { TemplateType, PageType } from "@/shared/types";
import { checkout_form_sections } from "./sections/checkout-form/data";
import { navigation_sections } from "../home/sections/navbar/data";
import { footer_sections } from "../home/sections/footer/data";

const createSection = (id: string, sectionId: string, type: string, options: any[], editable: boolean = true) => ({
  id,
  section_id: sectionId,
  type,
  editable,
  options,
  target_id: id,
});

export const checkoutPage: PageType = {
  id: "checkout-page",
  name: "صفحة الدفع",
  type: "checkout",
  sections: [
    createSection("checkout-nav", "1", "navigation", navigation_sections, false),
    createSection("checkout-form", "1", "checkoutForm", checkout_form_sections, true),
    createSection("checkout-footer", "1", "footer", footer_sections, false),
  ],
};

export const checkoutTemplate: TemplateType = {
  id: "checkout-template",
  title: "Checkout Template",
  description: "صفحة الدفع مع خيارات تصميم متعددة",
  storeType: "e-commerce",
  thumbnail: {
    url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300",
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
      type: "checkoutForm",
      editable: true,
      options: checkout_form_sections,
    },
    {
      id: "2",
      section_id: "1",
      type: "footer",
      editable: false,
      options: footer_sections,
    },
  ],
  pages: [checkoutPage],
};
