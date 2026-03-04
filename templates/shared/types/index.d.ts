export type ProductType = {
    id: string,
    title: string,
    image: string,
    description: string,
    price: number,
    createdAt: string,
    categories: {
        category: {
            id: string,
            name: string,
            image: string
        }
    }[],
    options: [],
    variants: [],
    _count: {
        categories: number,
        discounts: number
    }
}