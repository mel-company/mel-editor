import { PageType, SectionType } from "@/shared/types";

/**
 * Page Builder - Fluent API for creating pages
 * 
 * Usage:
 * const page = new PageBuilder()
 *   .setId("home")
 *   .setName("Home Page")
 *   .setType("home")
 *   .addSection(heroSection)
 *   .build();
 */
export class PageBuilder {
  private page: Partial<PageType> = {
    sections: [],
  };

  setId(id: string): this {
    this.page.id = id;
    return this;
  }

  setName(name: string): this {
    this.page.name = name;
    return this;
  }

  setType(type: "home" | "about" | "content" | "menu"): this {
    this.page.type = type;
    return this;
  }

  addSection(section: SectionType): this {
    if (!this.page.sections) {
      this.page.sections = [];
    }
    this.page.sections.push(section);
    return this;
  }

  addSections(sections: SectionType[]): this {
    if (!this.page.sections) {
      this.page.sections = [];
    }
    this.page.sections.push(...sections);
    return this;
  }

  build(): PageType {
    if (!this.page.id) {
      throw new Error("Page ID is required");
    }
    if (!this.page.name) {
      throw new Error("Page name is required");
    }
    if (!this.page.type) {
      throw new Error("Page type is required");
    }

    return {
      id: this.page.id,
      name: this.page.name,
      type: this.page.type,
      sections: this.page.sections || [],
    };
  }
}
