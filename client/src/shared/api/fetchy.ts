import { getAuthData } from "../utils/auth";

type Props = {
    endPoint: string,
    method?: "GET" | "POST" | "PUT" | "DELETE",
    body?: any,
    headers?: any
}

export const fetchAPI = async ({
    endPoint = '',
    method = 'GET',
    body = null,
    headers = {}
}: Props) => {

    const credentials = getAuthData();

    if (!credentials) throw new Error("Unauthorized store user token")

    const { storeUserToken } = credentials

    const apiUrl = import.meta.env.VITE_EDITOR_API_URL || 'http://localhost:4000/api/v1';



    const response = await fetch(`${apiUrl}${endPoint?.startsWith('/') ? endPoint : `/${endPoint}`}`, {
        method,
        headers: {
            'Authorization': `Bearer ${storeUserToken}`,
            'Content-Type': 'application/json',
            ...headers
        },
        body: JSON.stringify(body)
    });
    return response.json();
};