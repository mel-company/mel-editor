import { SectionType, SectionOptionType } from "@/shared/types";

/**
 * Section Factory - Create sections with consistent structure
 */
export class SectionFactory {
  /**
   * Create a basic section
   */
  static createSection(
    id: string,
    sectionId: string,
    type: string,
    options: SectionOptionType[],
    editable: boolean = true
  ): SectionType {
    return {
      id,
      section_id: sectionId,
      type,
      editable,
      options,
      target_id: id,
    };
  }

  /**
   * Create a hero section
   */
  static createHeroSection(
    id: string,
    variantId: string,
    options: SectionOptionType[],
    editable: boolean = true
  ): SectionType {
    return this.createSection(id, variantId, "hero", options, editable);
  }

  /**
   * Create a categories section
   */
  static createCategoriesSection(
    id: string,
    variantId: string,
    options: SectionOptionType[],
    editable: boolean = true
  ): SectionType {
    return this.createSection(id, variantId, "categories", options, editable);
  }

  /**
   * Create a products section
   */
  static createProductsSection(
    id: string,
    variantId: string,
    options: SectionOptionType[],
    editable: boolean = true
  ): SectionType {
    return this.createSection(id, variantId, "recentProducts", options, editable);
  }

  /**
   * Create a footer section
   */
  static createFooterSection(
    id: string,
    variantId: string,
    options: SectionOptionType[],
    editable: boolean = false
  ): SectionType {
    return this.createSection(id, variantId, "footer", options, editable);
  }

  /**
   * Create a navigation section
   */
  static createNavigationSection(
    id: string,
    variantId: string,
    options: SectionOptionType[],
    editable: boolean = false
  ): SectionType {
    return this.createSection(id, variantId, "navigation", options, editable);
  }

  /**
   * Create a contact section
   */
  static createContactSection(
    id: string,
    variantId: string,
    options: SectionOptionType[],
    editable: boolean = true
  ): SectionType {
    return this.createSection(id, variantId, "contact", options, editable);
  }

  /**
   * Create an our story section
   */
  static createOurStorySection(
    id: string,
    variantId: string,
    options: SectionOptionType[],
    editable: boolean = true
  ): SectionType {
    return this.createSection(id, variantId, "ourStory", options, editable);
  }

  /**
   * Create a section with custom styles
   */
  static createStyledSection(
    id: string,
    sectionId: string,
    type: string,
    options: SectionOptionType[],
    styles: Record<string, string>,
    editable: boolean = true
  ): SectionType {
    return {
      ...this.createSection(id, sectionId, type, options, editable),
      styles,
    };
  }
}
