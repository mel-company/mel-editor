import { SectionOptionType } from "@/shared/types";

export const product_info_sections: SectionOptionType[] = [
    {
        id: "1",
        title: "Product Info - Organic Layout",
        description: "تصميم تفاصيل المنتج العضوي",
        component: "ProductInfoOrganic1",
        thumbnail: {
            url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300&vertical=center",
        },
        photos: [],
    },
    {
        id: "2",
        title: "Product Info - Minimal Organic",
        description: "تصميم مبسط للمنتج العضوي",
        component: "ProductInfoOrganic2",
        thumbnail: {
            url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300&vertical=center",
        },
        photos: [],
    },
];
