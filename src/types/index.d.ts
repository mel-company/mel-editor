import { ReactNode } from "react";

export type StoreType = {
  logo: FileType;
  name: string;
  description: string;
};

export type FileType = {
  id?: string;
  name?: string;
  url?: string;
  base64Content?: string;
};
export type ProductType = {
  id?: string;
  name: string;
  photos: FileType[];
  thumbnail: FileType;
  stock: number;
  price: number;
  discount: number;
  description: string;
  category: string;
};

export type SectionPropsType = {
  id: string;
  type: string;
  label: string;
  name: string;
  value?: string;
};

export type SectionOptionType = {
  id: string;
  title: string;
  description?: string;
  component?: React.ComponentType<any> | ReactNode;
  thumbnail?: {
    url: string;
  };
  photos?: any;
  content?: any;
  products?: ProductType[];
  categories?: CategoryType[];
  view_all_link?: string;
};
export type SectionType = {
  id: string;
  section_id: string;
  type: string;
  editable: boolean;
  view_all_link?: string;
  links?: any[];
  options: SectionOptionType[];
};

export type CategoryType = {
  id: string;
  name: string;
  thumbnail: FileType;
};

export type TemplateType = {
  id: string;
  title: string;
  description: string;
  thumbnail: {
    url: string;
  };
  sections: SectionType[];
};
