import { ReactNode } from "react";

export type StoreType = {
  logo: FileType;
  name: string;
  description: string;
  type: "e-commerce" | "restaurant";
  colors?: {
    primary: string;
    secondary: string;
    text: string;
  };
  fonts?: {
    heading: string;
    body: string;
  };
  header: {
    logo?: FileType;
    navigationLinks?: Array<{ id: string; label: string; url: string; pageId?: string }>;
    styles?: {
      backgroundColor?: string;
      textColor?: string;
    };
  };
  footer: {
    logo?: FileType;
    text?: string;
    links?: Array<{ id: string; label: string; url: string }>;
  };
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
  photos?: Array<{ id: string; label: string; url: string }>;
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
  target_id?: string; // Optional because templates don't have target_id, it's added when creating pages
  styles?: {
    backgroundColor?: string;
    textColor?: string;
    padding?: string;
    margin?: string;
  };
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
  storeType: "e-commerce" | "restaurant";
  sections: SectionType[];
};

export type PageType = {
  id: string;
  name: string;
  type: "home" | "about" | "content" | "menu";
  sections: SectionType[];
};

export type EditorStoreType = {
  pages: PageType[];
  currentPageId: string;
};
