import { ProductType } from "../../types";

export const mockProducts: ProductType[] = [
    {
        id: "1",
        name: "Product 1",
       
        price: 100,
        discount: 10,
        stock: 10,
        category: "Category 1",
        description: "Description 1",

        photos: [
            {
                name: "Product 1",
                url: "https://via.placeholder.com/150",
            },
        ],

        thumbnail: {
            name: "Product 1",
            url: "https://via.placeholder.com/150",
        },
    },
];