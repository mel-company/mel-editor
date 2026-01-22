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
    title?: string; // عنوان الفوتر
    description?: string; // وصف الفوتر
    contactInfo?: {
      email?: string;
      phone?: string;
      address?: string;
    };
    links?: Array<{ id: string; label: string; url: string }>;
    socialLinks?: Array<{ id: string; platform: string; url: string }>;
    showFooter?: boolean; // التحكم في إظهار/إخفاء Footer
    footerVariant?: string; // نوع Footer (1, 2, 3)
    styles?: {
      backgroundColor?: string;
      textColor?: string;
      padding?: string;
      margin?: string;
    };
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
  type?: string;
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
  content?: any;
  photos?: any[];
  options?: SectionOptionType[];
  target_id?: string; // Optional because templates don't have target_id, it's added when creating pages
  styles?: {
    // Colors
    backgroundColor?: string;
    textColor?: string;
    headingColor?: string;
    buttonColor?: string;
    buttonTextColor?: string;
    borderColor?: string;
    // Typography
    headingFontSize?: string;
    textFontSize?: string;
    headingFontWeight?: string;
    textFontWeight?: string;
    // Spacing
    padding?: string;
    paddingTop?: string;
    paddingBottom?: string;
    paddingLeft?: string;
    paddingRight?: string;
    margin?: string;
    marginTop?: string;
    marginBottom?: string;
    marginLeft?: string;
    marginRight?: string;
    // Borders
    borderWidth?: string;
    borderStyle?: string;
    borderRadius?: string;
    // Effects
    boxShadow?: string;
    opacity?: string;
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

export type NavigationFooterType = {
  Component: React.ComponentType<any>;
  props: Record<string, any>;
};
