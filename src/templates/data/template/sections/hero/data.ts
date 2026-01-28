import { SectionOptionType } from "../../../../../shared/types";

export const hero_sections: SectionOptionType[] = [
    {
        id: "1",
        title: "Hero - نص فقط",
        description: "تصميم بسيط مع نص فقط في المنتصف",
        thumbnail: {
            url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300&vertical=center",
        },
        content: [
            {
                id: "title",
                label: "العنوان",
                name: "title",
                type: "text",
                value: "مرحباً بك في متجرنا",
            },
            {
                id: "description",
                label: "الوصف",
                name: "description",
                type: "textarea",
                value: "اكتشف مجموعتنا المميزة من المنتجات",
            },
        ],
    },
    {
        id: "2",
        title: "Hero - صورة ونص",
        description: "تصميم مع صورة ونص جنباً إلى جنب",
        thumbnail: {
            url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300&vertical=center",
        },
        photos: [{ id: "hero_image", label: "صورة البطل", url: "" }],
        content: [
            {
                id: "title",
                label: "العنوان",
                name: "title",
                type: "text",
                value: "منتجات مميزة",
            },
            {
                id: "description",
                label: "الوصف",
                name: "description",
                type: "textarea",
                value: "اكتشف مجموعتنا الواسعة من المنتجات عالية الجودة",
            },
        ],
    },
    {
        id: "3",
        title: "Hero - Carousel",
        description: "سلايدر مع عدة صور ونص",
        thumbnail: {
            url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300&vertical=center",
        },
        photos: [{ id: "carousel_slide_0", label: "شريحة 1", url: "" }],
        content: [
            {
                id: "title",
                label: "العنوان",
                name: "title",
                type: "text",
                value: "عروض مميزة",
            },
            {
                id: "description",
                label: "الوصف",
                name: "description",
                type: "textarea",
                value: "استمتع بأفضل العروض والخصومات الحصرية",
            },
        ],
    },
    {
        id: "4",
        title: "Hero - Full Width Image",
        description: "صورة كاملة العرض مع نص فوقها",
        thumbnail: {
            url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300&vertical=center",
        },
        photos: [{ id: "fullwidth_image", label: "صورة الخلفية", url: "" }],
        content: [
            {
                id: "title",
                label: "العنوان",
                name: "title",
                type: "text",
                value: "عروض حصرية",
            },
            {
                id: "description",
                label: "الوصف",
                name: "description",
                type: "textarea",
                value: "اكتشف أفضل العروض والمنتجات المميزة",
            },
        ],
    },
    {
        id: "5",
        title: "Hero - Split Screen",
        description: "شاشة مقسمة مع نص وصورة",
        thumbnail: {
            url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300&vertical=center",
        },
        photos: [{ id: "split_image", label: "صورة القسم", url: "" }],
        content: [
            {
                id: "title",
                label: "العنوان",
                name: "title",
                type: "text",
                value: "منتجات عالية الجودة",
            },
            {
                id: "description",
                label: "الوصف",
                name: "description",
                type: "textarea",
                value: "اكتشف مجموعتنا المميزة من المنتجات المصممة خصيصاً لك",
            },
        ],
    },
];
