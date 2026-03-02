import { TemplateType, PageType } from "@/shared/types";
import { product_info_sections } from "./sections/product-info/data";
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

export const productDetailPage: PageType = {
  id: "product-detail-page",
  name: "صفحة تفاصيل المنتج",
  type: "product-detail",
  sections: [
    createSection("product-detail-nav", "1", "navigation", navigation_sections, false),
    createSection("product-detail-info", "1", "productInfo", product_info_sections, true),
    createSection("product-detail-footer", "1", "footer", footer_sections, false),
  ],
};

export const productDetailTemplate: TemplateType = {
  id: "product-detail-template",
  title: "Product Detail Template",
  description: "صفحة تفاصيل المنتج مع خيارات تصميم متعددة",
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
      type: "productInfo",
      editable: true,
      options: product_info_sections,
    },
    {
      id: "2",
      section_id: "1",
      type: "footer",
      editable: false,
      options: footer_sections,
    },
  ],
  pages: [productDetailPage],
};
