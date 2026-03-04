import { fetchAPI } from "@/shared/api/fetchy";
import { CategoryType } from "@/shared/types";

export const fetchCategories: () => Promise<CategoryType[]> = async () => {
    const response = await fetchAPI({
        endPoint: "/category/public"
    });
    return response?.data || [];
}