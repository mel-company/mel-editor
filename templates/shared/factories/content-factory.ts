import { ContentItem, PhotoItem, LinkItem } from "@/shared/types";

/**
 * Content Factory - Create content items with consistent structure
 */
export class ContentFactory {
  /**
   * Create a text content item
   */
  static createText(
    name: string,
    label: string,
    value: string = "",
    placeholder?: string
  ): ContentItem {
    return {
      id: name,
      name,
      label,
      type: "text",
      value,
      placeholder,
    };
  }

  /**
   * Create a textarea content item
   */
  static createTextarea(
    name: string,
    label: string,
    value: string = "",
    placeholder?: string
  ): ContentItem {
    return {
      id: name,
      name,
      label,
      type: "textarea",
      value,
      placeholder,
    };
  }

  /**
   * Create a link content item
   */
  static createLink(
    name: string,
    label: string,
    value: string = "#",
    placeholder?: string
  ): ContentItem {
    return {
      id: name,
      name,
      label,
      type: "link",
      value,
      placeholder,
    };
  }

  /**
   * Create an image content item
   */
  static createImage(
    name: string,
    label: string,
    value: string = "",
    placeholder?: string
  ): ContentItem {
    return {
      id: name,
      name,
      label,
      type: "image",
      value,
      placeholder,
    };
  }

  /**
   * Create a photo item
   */
  static createPhoto(
    id: string,
    label: string,
    url: string = ""
  ): PhotoItem {
    return {
      id,
      label,
      url,
    };
  }

  /**
   * Create a link item for navigation
   */
  static createNavLink(
    id: string,
    label: string,
    url: string,
    pageId?: string,
    linkType?: "external" | "section",
    sectionId?: string
  ): LinkItem {
    return {
      id,
      label,
      url,
      pageId,
      linkType,
      sectionId,
    };
  }

  /**
   * Create common hero content
   */
  static createHeroContent(
    title: string = "Welcome",
    description: string = "Discover our products",
    ctaText: string = "Shop Now",
    ctaLink: string = "/products"
  ): ContentItem[] {
    return [
      this.createText("title", "العنوان", title),
      this.createTextarea("description", "الوصف", description),
      this.createText("cta_text", "نص الزر", ctaText),
      this.createLink("cta_link", "رابط الزر", ctaLink),
    ];
  }

  /**
   * Create common section title content
   */
  static createSectionTitleContent(
    title: string = "Section Title",
    subtitle: string = ""
  ): ContentItem[] {
    const content = [this.createText("title", "العنوان", title)];
    
    if (subtitle) {
      content.push(this.createText("subtitle", "العنوان الفرعي", subtitle));
    }
    
    return content;
  }

  /**
   * Create contact form content
   */
  static createContactContent(
    title: string = "Contact Us",
    description: string = "Get in touch",
    email: string = "info@example.com",
    phone: string = "+1234567890",
    address: string = "123 Main St"
  ): ContentItem[] {
    return [
      this.createText("title", "العنوان", title),
      this.createTextarea("description", "الوصف", description),
      this.createText("email", "البريد الإلكتروني", email),
      this.createText("phone", "الهاتف", phone),
      this.createTextarea("address", "العنوان", address),
    ];
  }
}
