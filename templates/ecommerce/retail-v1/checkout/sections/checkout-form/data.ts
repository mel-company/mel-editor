import { SectionOptionType } from "@/shared/types";

export const checkout_form_sections: SectionOptionType[] = [
    {
        id: "1",
        title: "Checkout - Classic Layout",
        description: "تصميم كلاسيكي بعمودين - النموذج والملخص",
        component: "CheckoutForm1",
        thumbnail: {
            url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300&vertical=center",
        },
        content: [
            {
                id: "page_title",
                label: "عنوان الصفحة",
                name: "page_title",
                type: "text" as const,
                value: "Checkout",
            },
            {
                id: "shipping_title",
                label: "عنوان معلومات الشحن",
                name: "shipping_title",
                type: "text" as const,
                value: "Shipping Information",
            },
            {
                id: "payment_title",
                label: "عنوان طريقة الدفع",
                name: "payment_title",
                type: "text" as const,
                value: "Payment Method",
            },
            {
                id: "order_summary_title",
                label: "عنوان ملخص الطلب",
                name: "order_summary_title",
                type: "text" as const,
                value: "Order Summary",
            },
        ],
        photos: [] as any[],
    },
    {
        id: "2",
        title: "Checkout - Modern Steps",
        description: "تصميم حديث مع خطوات متعددة",
        component: "CheckoutForm2",
        thumbnail: {
            url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300&vertical=center",
        },
        content: [
            {
                id: "page_title",
                label: "عنوان الصفحة",
                name: "page_title",
                type: "text" as const,
                value: "Secure Checkout",
            },
            {
                id: "shipping_title",
                label: "عنوان معلومات الشحن",
                name: "shipping_title",
                type: "text" as const,
                value: "Shipping Details",
            },
            {
                id: "payment_title",
                label: "عنوان طريقة الدفع",
                name: "payment_title",
                type: "text" as const,
                value: "Payment Information",
            },
            {
                id: "order_summary_title",
                label: "عنوان ملخص الطلب",
                name: "order_summary_title",
                type: "text" as const,
                value: "Review Order",
            },
        ],
        photos: [] as any[],
    },
];
