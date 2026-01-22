import { TemplateType } from "../../types";
import { categories_sections } from "./sections/categories";
import { recent_products_sections } from "./sections/recent-products";
import { footer_sections } from "./sections/footer";
import { our_story_sections } from "./sections/our-story";
import { contact_sections } from "./sections/contact";
import { navigation_sections } from "../../global-sections/page/home/production/navbar";
import { hero_sections } from "../../global-sections/page/home/production/hero";

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
      id: "test-registry-lookup",
      section_id: "1",
      type: "contact",
      editable: false,
      // Testing overrides: The registry has defaults, but we override the title here
      content: {
        title: "Custom Contact Title",
        description: "This description replaces the default one from the registry.",
      }
    },
    // {
    //   id: "2",
    //   section_id: "1",
    //   type: "categories",
    //   view_all_link: "",
    //   options: categories_sections,
    //   editable: true,
    // },
    // {
    //   id: "3",
    //   section_id: "1",
    //   type: "recentProducts",
    //   view_all_link: "",
    //   options: recent_products_sections,
    //   editable: true,
    // },
    // {
    //   id: "4",
    //   section_id: "1",
    //   type: "footer",
    //   view_all_link: "",
    //   options: footer_sections,
    //   editable: true,
    // },
    // {
    //   id: "5",
    //   section_id: "1",
    //   type: "ourStory",
    //   view_all_link: "",
    //   options: our_story_sections,
    //   editable: true,
    // },
    // {
    //   id: "6",
    //   section_id: "1",
    //   type: "contact",
    //   view_all_link: "",
    //   options: contact_sections,
    //   editable: true,
    // },
  ],
};
