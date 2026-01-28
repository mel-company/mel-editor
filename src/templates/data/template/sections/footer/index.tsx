import { footer_sections as sectionsData } from "./data";
import { Footer1, FooterSection2, FooterSection3 } from "./components";

export const footer_sections = sectionsData.map((section) => {
    switch (section.id) {
        case "1":
            return { ...section, component: Footer1 };
        case "2":
            return { ...section, component: FooterSection2 };
        case "3":
            return { ...section, component: FooterSection3 };
        default:
            return { ...section, component: Footer1 };
    }
});

export * from "./data";
