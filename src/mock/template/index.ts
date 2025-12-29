import { TemplateType } from "../../types";
import { categories_sections } from "./sections/categories";
import { hero_sections } from "./sections/hero";
import { navigation_sections } from "./sections/navigation";
import { recent_products_sections } from "./sections/recent-products";
import { footer_sections } from "./sections/footer";

export const mockTemplate: TemplateType = {
  id: "cklsmvdlkvmds",
  title: "Template 1",
  description: "Template 1 description",

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
      editable: true,
    },
  ],
};
