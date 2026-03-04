import { SectionOptionType } from "@/shared/types";
import { CategoriesSection, CategoriesSection2, CategoriesSection3, CategoriesSection4, CategoriesSection5 } from "./components";

export const categories_sections: SectionOptionType[] = [
    {
        id: "1",
        title: "Categories - Grid",
        description: "شبكة تصنيفات دائرية",
        component: CategoriesSection,
        thumbnail: {
            url: "https://cdn.shopify.com/s/files/1/0817/7988/4088/articles/fashion-ecommerce.jpg?v=1738095976",
        },
    },
    {
        id: "2",
        title: "Categories - Grid with Title",
        description: "شبكة تصنيفات مع عنوان",
        component: CategoriesSection2,
        thumbnail: {
            url: "https://cdn.shopify.com/s/files/1/0817/7988/4088/articles/fashion-ecommerce.jpg?v=1738095976",
        },
        content: [
            {
                id: "title",
                label: "العنوان",
                name: "title",
                type: "text" as const,
                value: "التصنيفات",
            },
        ],
    },
    {
        id: "3",
        title: "Categories - Horizontal Scroll",
        description: "تصنيفات قابلة للتمرير أفقياً",
        component: CategoriesSection3,
        thumbnail: {
            url: "https://cdn.shopify.com/s/files/1/0817/7988/4088/articles/fashion-ecommerce.jpg?v=1738095976",
        },
        content: [
            {
                id: "title",
                label: "العنوان",
                name: "title",
                type: "text" as const,
                value: "التصنيفات",
            },
        ],
    },
    {
        id: "4",
        title: "Categories - Large Cards",
        description: "بطاقات تصنيفات كبيرة",
        component: CategoriesSection4,
        thumbnail: {
            url: "https://cdn.shopify.com/s/files/1/0817/7988/4088/articles/fashion-ecommerce.jpg?v=1738095976",
        },
        content: [
            {
                id: "title",
                label: "العنوان",
                name: "title",
                type: "text" as const,
                value: "التصنيفات",
            },
        ],
    },
    {
        id: "5",
        title: "Categories - List",
        description: "قائمة تصنيفات أفقية",
        component: CategoriesSection5,
        thumbnail: {
            url: "https://cdn.shopify.com/s/files/1/0817/7988/4088/articles/fashion-ecommerce.jpg?v=1738095976",
        },
        content: [
            {
                id: "title",
                label: "العنوان",
                name: "title",
                type: "text" as const,
                value: "التصنيفات",
            },
        ],
    },
];
