import { SectionOptionType } from "@/shared/types";

export const products_sections: SectionOptionType[] = [
    {
        id: "1",
        title: "Products - Organic Grid",
        description: "شبكة منتجات عضوية مع تصميم طبيعي",
        component: "ProductsOrganic1",
        thumbnail: {
            url: "https://cdn.dribbble.com/userupload/43792476/file/original-2dc4c0056ba1870f72cc179f989655b4.jpg?resize=400x0",
        },
        view_all_link: "",
    },
    {
        id: "2",
        title: "Products - Featured Organic",
        description: "منتجات مميزة بتصميم عضوي",
        component: "ProductsOrganic2",
        thumbnail: {
            url: "https://cdn.dribbble.com/userupload/43792476/file/original-2dc4c0056ba1870f72cc179f989655b4.jpg?resize=400x0",
        },
        view_all_link: "",
    },
];
