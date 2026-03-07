import { SectionOptionType } from "@/shared/types";

export const checkout_form_sections: SectionOptionType[] = [
    {
        id: "1",
        title: "Checkout - Organic Two Column",
        description: "تصميم صفحة الدفع بعمودين - عضوي",
        component: "CheckoutOrganic1",
        thumbnail: {
            url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300&vertical=center",
        },
    },
    {
        id: "2",
        title: "Checkout - Organic Single Column",
        description: "تصميم صفحة الدفع بعمود واحد - عضوي",
        component: "CheckoutOrganic2",
        thumbnail: {
            url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300&vertical=center",
        },
    },
];
