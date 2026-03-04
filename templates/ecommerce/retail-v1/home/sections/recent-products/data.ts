import { SectionOptionType } from "@/shared/types";
import { RecentProducts, RecentProductsCarousel, RecentProductsLarge, RecentProductsCompact, RecentProductsList } from "./components";

export const recent_products_sections: SectionOptionType[] = [
    {
        id: "1",
        title: "Products - Grid",
        description: "شبكة منتجات قياسية",
        component: RecentProducts,
        thumbnail: {
            url: "https://cdn.dribbble.com/userupload/43792476/file/original-2dc4c0056ba1870f72cc179f989655b4.jpg?resize=400x0",
        },
        content: [
            {
                id: "title",
                label: "العنوان",
                name: "title",
                type: "text" as const,
                value: "المنتجات",
            },
        ],
        view_all_link: "",
    },
    {
        id: "2",
        title: "Products - Carousel",
        description: "شريط منتجات متحرك",
        component: RecentProductsCarousel,
        thumbnail: {
            url: "https://cdn.dribbble.com/userupload/43792476/file/original-2dc4c0056ba1870f72cc179f989655b4.jpg?resize=400x0",
        },
        content: [
            {
                id: "title",
                label: "العنوان",
                name: "title",
                type: "text" as const,
                value: "المنتجات",
            },
        ],
        view_all_link: "",
    },
    {
        id: "3",
        title: "Products - Large Cards",
        description: "بطاقات منتجات كبيرة",
        component: RecentProductsLarge,
        thumbnail: {
            url: "https://cdn.dribbble.com/userupload/43792476/file/original-2dc4c0056ba1870f72cc179f989655b4.jpg?resize=400x0",
        },
        content: [
            {
                id: "title",
                label: "العنوان",
                name: "title",
                type: "text" as const,
                value: "المنتجات",
            },
        ],
        view_all_link: "",
    },
    {
        id: "4",
        title: "Products - Compact",
        description: "منتجات مدمجة",
        component: RecentProductsCompact,
        thumbnail: {
            url: "https://cdn.dribbble.com/userupload/43792476/file/original-2dc4c0056ba1870f72cc179f989655b4.jpg?resize=400x0",
        },
        content: [
            {
                id: "title",
                label: "العنوان",
                name: "title",
                type: "text" as const,
                value: "المنتجات",
            },
        ],
        view_all_link: "",
    },
    {
        id: "5",
        title: "Products - List",
        description: "قائمة منتجات",
        component: RecentProductsList,
        thumbnail: {
            url: "https://cdn.dribbble.com/userupload/43792476/file/original-2dc4c0056ba1870f72cc179f989655b4.jpg?resize=400x0",
        },
        content: [
            {
                id: "title",
                label: "العنوان",
                name: "title",
                type: "text" as const,
                value: "المنتجات",
            },
        ],
        view_all_link: "",
    },
];
