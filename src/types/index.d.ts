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
export type ProductType = {
    id?: string,
    name: string,
    photos: FileType[],
    thumbnail: FileType,
    stock: number,
    price: number,
    discount: number,
    description: string,
    category: string,
}

export type SectionPropsType = {
    id: string,
    type: string,
    label: string,
    name: string,
    value?: string,
}

export type SectionType = {
  id: string,
  title: string,
  description: string,
  photos: FileType[],
  content: SectionPropsType[],
  products: ProductType[],
};