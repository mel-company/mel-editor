import { fetchAPI } from "@/shared/api/fetchy";
import { ProductType } from "@/shared/types";

export const fetchProducts: () => Promise<ProductType[]> = async () => {
    const response = await fetchAPI({
        endPoint: "/product/by-store-domain/cursor?store=azyaa&limit=20"
    });
    return response?.data || [];
}