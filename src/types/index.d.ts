export type StoreType = {
    logo: FileType,
    name: string,
    description: string,
}

export type FileType = {
    id?: string,
    name: string,
    url?: string,
    base64Content?: string
}