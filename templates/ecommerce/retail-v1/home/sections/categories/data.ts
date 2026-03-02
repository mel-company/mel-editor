import { SectionOptionType } from "@/shared/types";

export const categories_sections: SectionOptionType[] = [
    {
        id: "1",
        title: "Categories - Grid",
        description: "شبكة تصنيفات دائرية",
        thumbnail: {
            url: "https://cdn.shopify.com/s/files/1/0817/7988/4088/articles/fashion-ecommerce.jpg?v=1738095976",
        },
        categories: [
            {
                id: "1",
                name: "ملابس",
                thumbnail: {
                    url: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200",
                },
            },
            {
                id: "2",
                name: "أحذية",
                thumbnail: {
                    url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200",
                },
            },
            {
                id: "3",
                name: "إلكترونيات",
                thumbnail: {
                    url: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200",
                },
            },
            {
                id: "4",
                name: "إكسسوارات",
                thumbnail: {
                    url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200",
                },
            },
            {
                id: "5",
                name: "عطور",
                thumbnail: {
                    url: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=200",
                },
            },
            {
                id: "6",
                name: "ساعات",
                thumbnail: {
                    url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200",
                },
            },
            {
                id: "7",
                name: "حقائب",
                thumbnail: {
                    url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200",
                },
            },
            {
                id: "8",
                name: "نظارات",
                thumbnail: {
                    url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200",
                },
            },
        ],
    },
    {
        id: "2",
        title: "Categories - Grid with Title",
        description: "شبكة تصنيفات مع عنوان",
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
        categories: [
            {
                id: "1",
                name: "ملابس",
                thumbnail: {
                    url: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200",
                },
            },
            {
                id: "2",
                name: "أحذية",
                thumbnail: {
                    url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200",
                },
            },
            {
                id: "3",
                name: "إلكترونيات",
                thumbnail: {
                    url: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200",
                },
            },
            {
                id: "4",
                name: "إكسسوارات",
                thumbnail: {
                    url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200",
                },
            },
        ],
    },
    {
        id: "3",
        title: "Categories - Horizontal Scroll",
        description: "تصنيفات قابلة للتمرير أفقياً",
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
        categories: [
            {
                id: "1",
                name: "ملابس",
                thumbnail: {
                    url: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200",
                },
            },
            {
                id: "2",
                name: "أحذية",
                thumbnail: {
                    url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200",
                },
            },
            {
                id: "3",
                name: "إلكترونيات",
                thumbnail: {
                    url: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200",
                },
            },
        ],
    },
    {
        id: "4",
        title: "Categories - Large Cards",
        description: "بطاقات تصنيفات كبيرة",
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
        categories: [
            {
                id: "1",
                name: "ملابس",
                thumbnail: {
                    url: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200",
                },
            },
            {
                id: "2",
                name: "أحذية",
                thumbnail: {
                    url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200",
                },
            },
            {
                id: "3",
                name: "إلكترونيات",
                thumbnail: {
                    url: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200",
                },
            },
        ],
    },
    {
        id: "5",
        title: "Categories - List",
        description: "قائمة تصنيفات أفقية",
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
        categories: [
            {
                id: "1",
                name: "ملابس",
                thumbnail: {
                    url: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200",
                },
            },
            {
                id: "2",
                name: "أحذية",
                thumbnail: {
                    url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200",
                },
            },
            {
                id: "3",
                name: "إلكترونيات",
                thumbnail: {
                    url: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200",
                },
            },
        ],
    },
];
