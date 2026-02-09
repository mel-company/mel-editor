import { TemplateType, PageType, SectionType } from "@/shared/types";

/**
 * Template Validation Utilities
 */
export class TemplateValidator {
  /**
   * Validate a complete template
   */
  static validateTemplate(template: TemplateType): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // Check required fields
    if (!template.id) {
      errors.push("Template ID is required");
    }
    if (!template.title) {
      errors.push("Template title is required");
    }
    if (!template.storeType) {
      errors.push("Template store type is required");
    }

    // Validate pages
    if (!template.pages || template.pages.length === 0) {
      errors.push("Template must have at least one page");
    } else {
      template.pages.forEach((page, index) => {
        const pageErrors = this.validatePage(page);
        if (!pageErrors.valid) {
          errors.push(`Page ${index} (${page.name}): ${pageErrors.errors.join(", ")}`);
        }
      });
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate a page
   */
  static validatePage(page: PageType): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!page.id) {
      errors.push("Page ID is required");
    }
    if (!page.name) {
      errors.push("Page name is required");
    }
    if (!page.type) {
      errors.push("Page type is required");
    }
    if (!page.sections || page.sections.length === 0) {
      errors.push("Page must have at least one section");
    } else {
      page.sections.forEach((section, index) => {
        const sectionErrors = this.validateSection(section);
        if (!sectionErrors.valid) {
          errors.push(`Section ${index}: ${sectionErrors.errors.join(", ")}`);
        }
      });
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate a section
   */
  static validateSection(section: SectionType): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!section.id) {
      errors.push("Section ID is required");
    }
    if (!section.section_id) {
      errors.push("Section variant ID is required");
    }
    if (!section.type) {
      errors.push("Section type is required");
    }
    if (!section.options || section.options.length === 0) {
      errors.push("Section must have at least one option");
    } else {
      // Validate that section_id matches one of the options
      const matchingOption = section.options.find(
        (opt) => opt.id === section.section_id
      );
      if (!matchingOption) {
        errors.push(
          `Section variant ID "${section.section_id}" does not match any option`
        );
      }

      // Validate each option has a component
      section.options.forEach((option, index) => {
        if (!option.component) {
          errors.push(`Option ${index} (${option.title}) is missing component`);
        }
        if (!option.id) {
          errors.push(`Option ${index} is missing ID`);
        }
        if (!option.title) {
          errors.push(`Option ${index} is missing title`);
        }
      });
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Check for duplicate IDs in template
   */
  static checkDuplicateIds(template: TemplateType): {
    valid: boolean;
    duplicates: string[];
  } {
    const ids = new Set<string>();
    const duplicates: string[] = [];

    template.pages?.forEach((page) => {
      if (ids.has(page.id)) {
        duplicates.push(`Page ID: ${page.id}`);
      }
      ids.add(page.id);

      page.sections.forEach((section) => {
        if (ids.has(section.id)) {
          duplicates.push(`Section ID: ${section.id}`);
        }
        ids.add(section.id);
      });
    });

    return {
      valid: duplicates.length === 0,
      duplicates,
    };
  }

  /**
   * Validate template and log results
   */
  static validateAndLog(template: TemplateType): boolean {
    console.log(`\n🔍 Validating template: ${template.title}`);

    const validation = this.validateTemplate(template);
    const duplicateCheck = this.checkDuplicateIds(template);

    if (validation.valid && duplicateCheck.valid) {
      console.log("✅ Template is valid");
      return true;
    }

    if (!validation.valid) {
      console.error("❌ Validation errors:");
      validation.errors.forEach((error) => {
        console.error(`  - ${error}`);
      });
    }

    if (!duplicateCheck.valid) {
      console.error("❌ Duplicate IDs found:");
      duplicateCheck.duplicates.forEach((dup) => {
        console.error(`  - ${dup}`);
      });
    }

    return false;
  }
}
