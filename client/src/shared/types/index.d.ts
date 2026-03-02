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
    navigationLinks?: Array<{
      id: string;
      label: string;
      url: string;
      pageId?: string;
      linkType?: 'external' | 'section';
      sectionId?: string;
    }>;
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
  image?: string;
  price: number;
  variants?: Array<{ id: string, name: string, price: number, image: string }>;
  description?: string;
  title?: string;
  categories?: { id: string, name: string; image: string }[];
  discount?: number;
  stock?: number;
  category?: string;
  photos?: FileType[];
  thumbnail?: FileType;
};

export type SectionPropsType = {
  id: string;
  type: string;
  label: string;
  name: string;
  value?: string;
};

/**
 * Content item for editable text/textarea/link fields in sections
 */
export type ContentItem = {
  id?: string;
  label?: string;
  name: string;
  value: string;
  type?: 'text' | 'textarea' | 'link' | 'image';
  title?: string;
  placeholder?: string;
};

/**
 * Photo/Image item for sections
 */
export type PhotoItem = {
  id: string;
  label: string;
  url?: string;
  base64Content?: string;
};

/**
 * Link item for navigation and footer links
 */
export type LinkItem = {
  id: string;
  label: string;
  url: string;
  pageId?: string;
  linkType?: 'external' | 'section';
  sectionId?: string;
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
  photos?: PhotoItem[];
  content?: ContentItem[] | Record<string, string>;
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
  links?: LinkItem[];
  content?: ContentItem[] | Record<string, string>; // Support both array and object formats
  photos?: PhotoItem[];
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
  pages?: PageType[];
};

export type PageType = {
  id: string;
  name: string;
  type: "home" | "about" | "content" | "menu" | "product-detail" | "checkout";
  sections: SectionType[];
  templateVariants?: PageTemplateVariant[]; // Available template layouts for this page
  selectedTemplateId?: string; // Currently selected template variant
};

export type PageTemplateVariant = {
  id: string;
  title: string;
  description?: string;
  thumbnail?: {
    url: string;
  };
  sections: SectionType[]; // Complete section configuration for this layout
};

export type EditorStoreType = {
  pages: PageType[];
  currentPageId: string;
};

export type NavigationFooterType = {
  id: string;
  Component: React.ComponentType<any>;
  props: Record<string, any>;
};

export interface HydratedSection {
  id: any;
  type: string;
  Component: React.ComponentType<any>;
  props: any;
  originalSection: SectionType;
}
