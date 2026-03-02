export const imageLink = (link: string | undefined) => {
    const baseURL = import.meta.env.VITE_R2_PUBLIC_URL
    if (!link) return ""
    if (link?.startsWith("http") || link?.startsWith("https")) return link
    if (link?.startsWith("/")) return baseURL + link
    return baseURL + "/" + link
}