import { getAuthData } from "../utils/auth";

type Props = {
    endPoint: string,
    method?: "GET" | "POST" | "PUT" | "DELETE",
    body?: any,
    headers?: any,
    ignoreAuth?: boolean
}

export const fetchAPI = async ({
    endPoint = '',
    method = 'GET',
    body = null,
    headers = {},
    ignoreAuth = false
}: Props) => {

    const credentials = getAuthData();


    const storeUserToken = credentials?.storeUserToken

    const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1';

    const url = `${apiUrl}${endPoint?.startsWith('/') ? endPoint : `/${endPoint}`}`;

    const requestHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...headers
    };

    if (!ignoreAuth && storeUserToken) {
        requestHeaders['Authorization'] = `Bearer ${storeUserToken}`;
    }

    const requestBody = (method !== 'GET' && body)
        ? (typeof body === 'string' ? body : JSON.stringify(body))
        : undefined;

    const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: requestBody
    });



    return response.json();
};