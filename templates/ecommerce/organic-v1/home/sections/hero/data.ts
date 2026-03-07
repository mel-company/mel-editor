import { SectionOptionType } from "@/shared/types";

export const hero_sections: SectionOptionType[] = [
    {
        id: "1",
        title: "Hero - Natural Split",
        description: "تصميم طبيعي مقسم مع منتج ونص",
        component: "HeroOrganic1",
        thumbnail: {
            url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300&vertical=center",
        },
        photos: [],
    },
    {
        id: "2",
        title: "Hero - Full Width Natural",
        description: "تصميم بعرض كامل مع خلفية طبيعية",
        component: "HeroOrganic2",
        thumbnail: {
            url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300&vertical=center",
        },
        photos: [],
    },
];
