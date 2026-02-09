import { SectionOptionType, ContentItem, PhotoItem } from "@/shared/types";

/**
 * Section Helper Utilities
 */
export class SectionHelpers {
  /**
   * Create a section option with common defaults
   */
  static createOption(
    id: string,
    title: string,
    component: React.ComponentType<any>,
    options: {
      description?: string;
      thumbnail?: string;
      content?: ContentItem[];
      photos?: PhotoItem[];
      products?: any[];
      categories?: any[];
    } = {}
  ): SectionOptionType {
    return {
      id,
      title,
      description: options.description,
      component,
      thumbnail: options.thumbnail ? { url: options.thumbnail } : undefined,
      content: options.content || [],
      photos: options.photos || [],
      products: options.products,
      categories: options.categories,
    };
  }

  /**
   * Find content item by name
   */
  static findContent(
    content: ContentItem[] | Record<string, string> | undefined,
    name: string
  ): string {
    if (!content) return "";

    if (Array.isArray(content)) {
      const item = content.find((c) => c.name === name);
      return item?.value || "";
    }

    return content[name] || "";
  }

  /**
   * Find photo by id
   */
  static findPhoto(photos: PhotoItem[] | undefined, id: string): PhotoItem | undefined {
    if (!photos) return undefined;
    return photos.find((p) => p.id === id);
  }

  /**
   * Get photo URL by id
   */
  static getPhotoUrl(photos: PhotoItem[] | undefined, id: string): string {
    const photo = this.findPhoto(photos, id);
    return photo?.url || "";
  }

  /**
   * Convert content array to object map
   */
  static contentToMap(content: ContentItem[]): Record<string, { value: string }> {
    return content.reduce((acc, item) => {
      acc[item.name] = { value: item.value };
      return acc;
    }, {} as Record<string, { value: string }>);
  }

  /**
   * Merge default content with custom values
   */
  static mergeContent(
    defaultContent: ContentItem[],
    customValues: Record<string, string>
  ): ContentItem[] {
    return defaultContent.map((item) => ({
      ...item,
      value: customValues[item.name] !== undefined ? customValues[item.name] : item.value,
    }));
  }

  /**
   * Validate section option has required fields
   */
  static validateOption(option: SectionOptionType): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!option.id) errors.push("Option ID is required");
    if (!option.title) errors.push("Option title is required");
    if (!option.component) errors.push("Option component is required");

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
