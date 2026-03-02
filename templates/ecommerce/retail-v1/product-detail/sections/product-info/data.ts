import { SectionOptionType } from "@/shared/types";

export const product_info_sections: SectionOptionType[] = [
    {
        id: "1",
        title: "Product Info - Classic",
        description: "تصميم كلاسيكي مع معرض الصور والتفاصيل",
        component: "ProductInfo1",
        thumbnail: {
            url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300&vertical=center",
        },
        content: [
            {
                id: "product_name",
                label: "اسم المنتج",
                name: "product_name",
                type: "text" as const,
                value: "Premium Wireless Headphones",
            },
            {
                id: "product_price",
                label: "السعر",
                name: "product_price",
                type: "text" as const,
                value: "299.99",
            },
            {
                id: "product_description",
                label: "وصف المنتج",
                name: "product_description",
                type: "textarea" as const,
                value: "Experience premium sound quality with our wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort padding for all-day wear.",
            },
            {
                id: "product_rating",
                label: "التقييم",
                name: "product_rating",
                type: "text" as const,
                value: "4.5",
            },
            {
                id: "product_reviews_count",
                label: "عدد التقييمات",
                name: "product_reviews_count",
                type: "text" as const,
                value: "128",
            },
        ],
        photos: [] as any[],
    },
    {
        id: "2",
        title: "Product Info - Modern",
        description: "تصميم حديث مع تخطيط متقدم",
        component: "ProductInfo2",
        thumbnail: {
            url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300&vertical=center",
        },
        content: [
            {
                id: "product_name",
                label: "اسم المنتج",
                name: "product_name",
                type: "text" as const,
                value: "Premium Wireless Headphones",
            },
            {
                id: "product_price",
                label: "السعر",
                name: "product_price",
                type: "text" as const,
                value: "299.99",
            },
            {
                id: "product_description",
                label: "وصف المنتج",
                name: "product_description",
                type: "textarea" as const,
                value: "Experience premium sound quality with our wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort padding for all-day wear.",
            },
            {
                id: "product_rating",
                label: "التقييم",
                name: "product_rating",
                type: "text" as const,
                value: "4.5",
            },
            {
                id: "product_reviews_count",
                label: "عدد التقييمات",
                name: "product_reviews_count",
                type: "text" as const,
                value: "128",
            },
        ],
        photos: [] as any[],
    },
];
