import { TemplateType, PageType, SectionType } from "../types";
import { ApiTemplateResponse } from "../services/api";
import { hero_sections } from "@templates/data/template/sections/hero";
import { menu_sections } from "@templates/data/template/sections/menu";
import { categories_sections } from "@templates/data/template/sections/categories";
import { recent_products_sections } from "@templates/data/template/sections/recent-products";
import { footer_sections } from "@templates/data/template/sections/footer";
import { our_story_sections } from "@templates/data/template/sections/our-story";
import { contact_sections } from "@templates/data/template/sections/contact";
import { navigation_sections } from "@templates/sections/navbar/data";

/**
 * Convert API template response to TemplateType
 */
export const convertApiTemplateToTemplateType = (
  apiTemplate: ApiTemplateResponse["data"][0]
): TemplateType => {
  // Determine store type from template (default to e-commerce)
  // You can add logic here to determine from apiTemplate.body.store or other fields
  const storeType: "e-commerce" | "restaurant" = "e-commerce";

  // Convert pages from API to sections
  const sections: SectionType[] = [];

  // Process each page and extract its sections
  if (apiTemplate.body.pages && Array.isArray(apiTemplate.body.pages)) {
    apiTemplate.body.pages.forEach((page) => {
      if (page.sections && Array.isArray(page.sections)) {
        page.sections.forEach((apiSection: any) => {
          // Convert API section to SectionType
          const section = convertApiSectionToSectionType(apiSection);
          if (section) {
            sections.push(section);
          }
        });
      }
    });
  }

  return {
    id: apiTemplate.id,
    title: apiTemplate.name,
    description: apiTemplate.description || "",
    thumbnail: {
      url: apiTemplate.image || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
    },
    storeType,
    sections,
  };
};

/**
 * Convert API section to SectionType
 */
const convertApiSectionToSectionType = (apiSection: any): SectionType | null => {
  if (!apiSection || !apiSection.type) {
    return null;
  }

  const sectionType = apiSection.type;
  let options: any[] = [];
  let defaultSectionId = "1";

  // Map section types to their corresponding options
  switch (sectionType) {
    case "carouselHero":
      options = hero_sections;
      defaultSectionId = "3"; // Carousel is variant 3 in hero_sections
      break;
    case "hero":
      options = hero_sections;
      defaultSectionId = "1";
      break;
    case "productGrid":
      options = recent_products_sections;
      defaultSectionId = "1"; // Grid is variant 1
      break;
    case "recentProducts":
      options = recent_products_sections;
      defaultSectionId = "2"; // Carousel is variant 2
      break;
    case "categoryGrid":
    case "categories":
      options = categories_sections;
      defaultSectionId = "1";
      break;
    case "footer":
      options = footer_sections;
      defaultSectionId = "1";
      break;
    case "contentBlock":
    case "ourStory":
      options = our_story_sections;
      defaultSectionId = "1";
      break;
    case "contactForm":
    case "contactInfo":
    case "contact":
      options = contact_sections;
      defaultSectionId = "1";
      break;
    case "featuresGrid":
      // Features grid - use categories sections (similar structure)
      options = categories_sections;
      defaultSectionId = "1";
      break;
    case "testimonialSlider":
      // Testimonials - use contact sections (similar structure)
      options = contact_sections;
      defaultSectionId = "1";
      break;
    case "promoBanner":
      // Promotional banner - use hero section 2 (image + text)
      options = hero_sections;
      defaultSectionId = "2";
      break;
    case "pageHeader":
      // Page header - use hero section 1 (text only)
      options = hero_sections;
      defaultSectionId = "1";
      break;
    case "navigation":
      options = navigation_sections;
      defaultSectionId = "1";
      break;
    default:
      // For unknown types, try to use hero sections as fallback
      console.warn(`⚠️ Unknown section type: ${sectionType}, using hero sections as fallback`);
      options = hero_sections;
      defaultSectionId = "1";
  }

  // Ensure we have options
  if (!options || options.length === 0) {
    console.error(`❌ No options available for section type: ${sectionType}`);
    return null;
  }

  // Try to find matching option by ID, or use default
  let sectionId = apiSection.id;
  const originalSectionId = sectionId;

  // If section.id is a string like "hero-carousel", map it to the correct variant ID
  if (sectionId && typeof sectionId === "string" && !/^\d+$/.test(sectionId)) {
    // Map known section IDs to variant numbers
    const idMapping: Record<string, string> = {
      "hero-carousel": "3",
      "featured-products": "1",
      "categories": "1",
      "promotional-banner": "2",
      "testimonials": "1",
    };

    if (idMapping[sectionId]) {
      sectionId = idMapping[sectionId];
    } else {
      // Try to extract number from string (e.g., "section-2" -> "2")
      const match = sectionId.match(/(\d+)/);
      if (match) {
        sectionId = match[1];
      } else {
        // Use default based on section type
        sectionId = defaultSectionId;
      }
    }
  }

  // If no valid ID, use default
  if (!sectionId || (typeof sectionId === "string" && !/^\d+$/.test(sectionId))) {
    sectionId = defaultSectionId;
  }

  // Convert to string for comparison
  let sectionIdStr = String(sectionId);

  // Find matching option - must match exactly
  let selectedOption = options.find((opt) => opt.id === sectionIdStr);

  // If not found, try to find by index or use first one
  if (!selectedOption) {
    const index = parseInt(sectionIdStr) - 1;
    if (index >= 0 && index < options.length) {
      selectedOption = options[index];
      sectionIdStr = selectedOption.id; // Update to match the found option
      console.warn(`⚠️ Option not found by id "${String(sectionId)}", using index ${index} -> id "${sectionIdStr}"`);
    } else {
      selectedOption = options[0];
      sectionIdStr = selectedOption.id; // Update to match the found option
      console.warn(`⚠️ Using first option as fallback for section type ${sectionType} -> id "${sectionIdStr}"`);
    }
  }



  if (!selectedOption) {
    console.error(`❌ No option found for section type ${sectionType}`);
    return null;
  }

  if (!selectedOption.component) {
    console.error(`❌ Selected option has no component:`, {
      optionId: selectedOption.id,
      optionTitle: selectedOption.title,
      allOptions: options.map(o => ({ id: o.id, hasComponent: !!o.component })),
    });
    // Try to find any option with component
    const optionWithComponent = options.find(o => o.component);
    if (optionWithComponent) {
      console.warn(`⚠️ Using option with component as fallback`);
      selectedOption = optionWithComponent;
      sectionIdStr = optionWithComponent.id;
    } else {
      console.error(`❌ No option with component found for section type ${sectionType}`);
      return null;
    }
  }

  // Merge API section data with the selected option
  // IMPORTANT: Preserve the component from selectedOption!
  const mergedOption = {
    ...selectedOption, // This includes component, thumbnail, etc.
    content: mergeSectionContent(selectedOption.content || [], apiSection),
    photos: extractPhotosFromApiSection(apiSection) || selectedOption.photos || [],
    products: apiSection.products || selectedOption.products || [],
    categories: apiSection.categories || selectedOption.categories || [],
    // Explicitly ensure component is preserved
    component: selectedOption.component,
  };

  // Verify component exists
  if (!mergedOption.component) {
    console.error(`❌ Component missing for section type ${sectionType}, id ${sectionId}`, {
      selectedOptionId: selectedOption.id,
      selectedOptionHasComponent: !!selectedOption.component,
      allOptionsIds: options.map(o => o.id),
    });
    // Try to use first option's component as fallback
    if (options[0]?.component) {
      mergedOption.component = options[0].component;
      console.warn(`⚠️ Using fallback component from first option`);
    } else {
      console.error(`❌ No component available for section type ${sectionType}`);
      return null;
    }
  }

  // Create all options array - include all available options so user can switch variants
  // The selected option will have the merged data from API
  const allOptions = options.map((opt) => {
    if (opt.id === sectionIdStr) {
      // This is the selected option - use merged data from API
      return mergedOption;
    }
    // Other options - keep original (including component)
    return opt;
  });



  // CRITICAL: section_id MUST match the id of the selected option for rendering to work
  return {
    id: crypto.randomUUID(),
    section_id: sectionIdStr, // Use the final sectionIdStr (may have been updated during fallback)
    type: sectionType,
    editable: apiSection.enabled !== false, // Default to editable unless explicitly disabled
    view_all_link: apiSection.view_all_link || "",
    options: allOptions, // Include ALL options, not just the selected one
    styles: apiSection.style || {},
  };
};

/**
 * Extract photos from API section
 */
const extractPhotosFromApiSection = (apiSection: any): any[] => {
  // Check for slides (carousel)
  if (apiSection.slides && Array.isArray(apiSection.slides)) {
    return apiSection.slides.map((slide: any, index: number) => ({
      id: slide.id || `slide-${index}`,
      label: slide.title || `صورة ${index + 1}`,
      url: slide.backgroundImage || slide.image || slide.url,
    }));
  }

  // Check for direct photos array
  if (apiSection.photos && Array.isArray(apiSection.photos)) {
    return apiSection.photos.map((photo: any, index: number) => ({
      id: photo.id || `photo-${index}`,
      label: photo.label || `صورة ${index + 1}`,
      url: photo.url || photo.image || photo.backgroundImage,
    }));
  }

  // Check for single image
  if (apiSection.image || apiSection.backgroundImage) {
    return [
      {
        id: "image-1",
        label: "صورة",
        url: apiSection.image || apiSection.backgroundImage,
      },
    ];
  }

  return [];
};

/**
 * Merge section content from API with default content
 */
const mergeSectionContent = (defaultContent: any[], apiSection: any): any[] => {
  if (!defaultContent || !Array.isArray(defaultContent)) {
    return [];
  }

  // If API section has content object, merge it
  if (apiSection.content && typeof apiSection.content === "object" && !Array.isArray(apiSection.content)) {
    return defaultContent.map((item) => {
      const apiValue = apiSection.content[item.name];
      if (apiValue !== undefined) {
        return { ...item, value: apiValue };
      }
      return item;
    });
  }

  // Check for slides (carousel sections)
  if (apiSection.slides && Array.isArray(apiSection.slides) && apiSection.slides.length > 0) {
    const firstSlide = apiSection.slides[0];
    return defaultContent.map((item) => {
      const apiValue = firstSlide[item.name] || apiSection[item.name];
      if (apiValue !== undefined) {
        return { ...item, value: apiValue };
      }
      return item;
    });
  }

  // If API section has direct properties (title, description, subtitle, etc.)
  const merged = defaultContent.map((item) => {
    // Try multiple property names
    const apiValue =
      apiSection[item.name] ||
      apiSection[item.name === "title" ? "title" : item.name] ||
      apiSection[item.name === "description" ? "subtitle" : item.name];

    if (apiValue !== undefined && apiValue !== null) {
      return { ...item, value: apiValue };
    }
    return item;
  });

  return merged;
};

/**
 * Convert API pages directly to PageType array
 * This is used when selecting a template to create pages
 */
export const convertApiPagesToPageTypes = (
  apiPages: any[],
  templateId: string
): PageType[] => {


  return apiPages
    .filter((apiPage) => {
      const isValid = apiPage && apiPage.sections && Array.isArray(apiPage.sections);
      if (!isValid) {
        console.warn("⚠️ Skipping invalid page:", apiPage);
      }
      return isValid;
    })
    .map((apiPage) => {
      const sections: SectionType[] = [];



      // Process each section in the page
      apiPage.sections.forEach((apiSection: any, index: number) => {
        if (!apiSection || !apiSection.type) {
          console.warn(`⚠️ Invalid section at index ${index}:`, apiSection);
          return;
        }



        const section = convertApiSectionToSectionType(apiSection);
        if (section) {

          sections.push({
            ...section,
            target_id: crypto.randomUUID(),
          });
        } else {
          console.error(`  ❌ Failed to convert section: ${apiSection.type}`, apiSection);
        }
      });

      // Determine page name and type
      const pageName = apiPage.title || apiPage.name || apiPage.id || "صفحة";
      const pageType = mapPageType(apiPage.id || apiPage.route || pageName);



      return {
        id: crypto.randomUUID(),
        name: pageName,
        type: pageType,
        sections,
      };
    });
};

/**
 * Map API page ID/route to PageType type
 */
const mapPageType = (pageIdOrRoute: string): "home" | "about" | "content" | "menu" => {
  if (!pageIdOrRoute) return "content";

  const lower = pageIdOrRoute.toLowerCase();

  // Check for home page
  if (lower === "home" || lower === "/" || lower.includes("home") || lower === "الرئيسية") {
    return "home";
  }

  // Check for about page
  if (lower === "about" || lower.includes("about") || lower.includes("حول")) {
    return "about";
  }

  // Check for menu page
  if (lower === "menu" || lower.includes("menu") || lower.includes("قائمة")) {
    return "menu";
  }

  // Check for products page
  if (lower.includes("product") || lower.includes("منتج")) {
    return "content";
  }

  // Check for contact page
  if (lower.includes("contact") || lower.includes("تواصل")) {
    return "content";
  }

  // Default to content
  return "content";
};

