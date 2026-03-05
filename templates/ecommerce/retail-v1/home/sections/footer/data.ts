import { SectionOptionType } from "@/shared/types";
import { Footer1, Footer2, Footer3 } from "./components";

export const footer_sections: SectionOptionType[] = [
    {
        id: "1",
        title: "Footer - Dark Gradient",
        description: "تصميم داكن مع تدرج لوني",
        component: Footer1,
        thumbnail: {
            url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300&vertical=center",
        },
        content: [
            {
                id: "text",
                label: "نص الفوتر",
                name: "text",
                type: "textarea" as const,
                value: "وصف المتجر أو الشركة",
            },
            {
                id: "title",
                label: "عنوان الفوتر",
                name: "title",
                type: "text" as const,
                value: "اسم المتجر",
            },
            {
                id: "description",
                label: "وصف الفوتر",
                name: "description",
                type: "textarea" as const,
                value: "نقدم أفضل المنتجات والخدمات لعملائنا الكرام",
            },
        ],
    },
    {
        id: "2",
        title: "Footer - Light",
        description: "تصميم فاتح بسيط",
        component: Footer2,
        thumbnail: {
            url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300&vertical=center",
        },
        content: [
            {
                id: "text",
                label: "نص الفوتر",
                name: "text",
                type: "textarea" as const,
                value: "وصف المتجر أو الشركة",
            },
        ],
    },
    {
        id: "3",
        title: "Footer - Minimal",
        description: "تصميم بسيط ومختصر",
        component: Footer3,
        thumbnail: {
            url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300&vertical=center",
        },
        content: [
            {
                id: "text",
                label: "نص الفوتر",
                name: "text",
                type: "textarea" as const,
                value: "وصف المتجر أو الشركة",
            },
            {
                id: "title",
                label: "عنوان الفوتر",
                name: "title",
                type: "text" as const,
                value: "اسم المتجر",
            },
            {
                id: "description",
                label: "وصف الفوتر",
                name: "description",
                type: "textarea" as const,
                value: "نقدم أفضل المنتجات والخدمات لعملائنا الكرام",
            },
        ],
    },
];
