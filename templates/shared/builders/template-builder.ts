import { TemplateType, PageType } from "@/shared/types";

/**
 * Template Builder - Fluent API for creating templates
 * 
 * Usage:
 * const template = new TemplateBuilder()
 *   .setId("my-template")
 *   .setTitle("My Template")
 *   .setStoreType("e-commerce")
 *   .addPage(homePage)
 *   .build();
 */
export class TemplateBuilder {
  private template: Partial<TemplateType> = {
    sections: [],
    pages: [],
  };

  setId(id: string): this {
    this.template.id = id;
    return this;
  }

  setTitle(title: string): this {
    this.template.title = title;
    return this;
  }

  setDescription(description: string): this {
    this.template.description = description;
    return this;
  }

  setStoreType(storeType: "e-commerce" | "restaurant"): this {
    this.template.storeType = storeType;
    return this;
  }

  setThumbnail(url: string): this {
    this.template.thumbnail = { url };
    return this;
  }

  addPage(page: PageType): this {
    if (!this.template.pages) {
      this.template.pages = [];
    }
    this.template.pages.push(page);
    return this;
  }

  addPages(pages: PageType[]): this {
    if (!this.template.pages) {
      this.template.pages = [];
    }
    this.template.pages.push(...pages);
    return this;
  }

  build(): TemplateType {
    if (!this.template.id) {
      throw new Error("Template ID is required");
    }
    if (!this.template.title) {
      throw new Error("Template title is required");
    }
    if (!this.template.storeType) {
      throw new Error("Template store type is required");
    }

    return {
      id: this.template.id,
      title: this.template.title,
      description: this.template.description || "",
      storeType: this.template.storeType,
      thumbnail: this.template.thumbnail || { url: "" },
      sections: this.template.sections || [],
      pages: this.template.pages || [],
    };
  }
}
