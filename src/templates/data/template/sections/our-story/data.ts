import { SectionOptionType } from "../../../../types";

export const our_story_sections: SectionOptionType[] = [
    {
        id: "1",
        title: "صورة ونص",
        thumbnail: {
            url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400",
        },
        content: [
            {
                id: "title",
                label: "العنوان",
                name: "title",
                type: "text",
                value: "قصتنا",
            },
            {
                id: "description",
                label: "الوصف",
                name: "description",
                type: "textarea",
                value: "نحن متجر متخصص في تقديم أفضل المنتجات والخدمات لعملائنا. بدأنا رحلتنا برؤية واضحة لتقديم تجربة تسوق استثنائية تجمع بين الجودة والسعر المناسب.",
            },
        ],
        photos: [{ id: "main_image", label: "الصورة", url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400" }],
    },
    {
        id: "2",
        title: "نص مركزي",
        thumbnail: {
            url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400",
        },
        content: [
            {
                id: "title",
                label: "العنوان",
                name: "title",
                type: "text",
                value: "قصتنا",
            },
            {
                id: "description",
                label: "الوصف",
                name: "description",
                type: "textarea",
                value: "نحن متجر متخصص في تقديم أفضل المنتجات والخدمات لعملائنا. بدأنا رحلتنا برؤية واضحة لتقديم تجربة تسوق استثنائية تجمع بين الجودة والسعر المناسب.",
            },
        ],
    },
    {
        id: "3",
        title: "تصميم زمني",
        thumbnail: {
            url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400",
        },
        content: [
            {
                id: "title",
                label: "العنوان",
                name: "title",
                type: "text",
                value: "قصتنا",
            },
            {
                id: "description",
                label: "الوصف",
                name: "description",
                type: "textarea",
                value: "نحن متجر متخصص في تقديم أفضل المنتجات والخدمات لعملائنا. بدأنا رحلتنا برؤية واضحة لتقديم تجربة تسوق استثنائية تجمع بين الجودة والسعر المناسب.",
            },
        ],
        photos: [{ id: "main_image", label: "الصورة", url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400" }],
    },
];
