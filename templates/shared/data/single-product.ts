import { fetchAPI } from "@/shared/api/fetchy";
import { ProductType } from "@/shared/types";

export const fetchProduct: (id: string) => Promise<ProductType | null> = async (id: string) => {
    const response = await fetchAPI({
        endPoint: `/product/${id}`
    });
    return response?.data || null;
}
