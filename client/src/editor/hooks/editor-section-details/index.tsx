import { useState, useEffect } from "react";
import { useSectionStore } from "../../../shared/store/editor/section";
import { usePageStore } from "../../../shared/store/editor/page";
import { FileType, SectionOptionType, HydratedSection } from "../../../shared/types";
import { resolveComponent } from "../../../shared/utils/component-registry";
import { useDomScannerEffect } from "./use-dom-scanner";

import { useTemplateStructure } from "../../../shared/hooks/use-template-structure";

const useSectionDetails = () => {
  const { setSection, activeSectionId, deleteSection } =
    useSectionStore();

  // Use useTemplateStructure to get sections (handles mock fallback)
  const { sections: processedSections } = useTemplateStructure();

  // Find the processed section that matches activeSectionId
  // activeSectionId is set to section.target_id from the section list,
  // but processedSections use id (which is section.id || section.section_id)
  // So we need to match against the original section's target_id
  const processedSection = processedSections?.find(
    (s: HydratedSection) => {
      const original = s.originalSection;
      return original.target_id === activeSectionId ||
        original.id === activeSectionId ||
        original.section_id === activeSectionId ||
        s.id === activeSectionId;
    }
  );

  // Extract the original section data for editing
  const section = processedSection?.originalSection;

  // Resolution Logic:
  // 1. Try standard options
  let option = section?.options?.find(
    (option: SectionOptionType) => option.id === section.section_id
  );

  // State to store auto-detected schema from DOM
  // Scan DOM for auto-detected schema
  const scannedSchema = useDomScannerEffect(activeSectionId, section);

  // 2. Try Registry if not found
  let isCustomComponent = false;

  // Base option resolution (Registry or Store)
  if (!option && section) {
    const registryEntry = resolveComponent(section.type, section.section_id);
    if (registryEntry && registryEntry.defaultOptions) {
      isCustomComponent = true;
      const defaultOpts = registryEntry.defaultOptions;

      // We need to Hydrate the default options with current values from section.content
      // This ensures the sidebar inputs show the current values
      let hydratedContent = defaultOpts.content;

      if (Array.isArray(defaultOpts.content)) {
        hydratedContent = defaultOpts.content.map((item: any) => {
          // If we have an override in section.content, use it
          if (section.content && section.content[item.name] !== undefined) {
            return { ...item, value: section.content[item.name] };
          }
          return item;
        });
      } else if (defaultOpts.content && typeof defaultOpts.content === 'object') {
        // Object based content schema (rare in this codebase but handled)
        if (section.content) {
          hydratedContent = { ...defaultOpts.content, ...section.content };
        }
      }

      option = {
        ...defaultOpts,
        id: section.section_id,
        content: hydratedContent
      };
    }
  }

  // Auto-Detection Merge Logic
  // If we have a scanned schema, we should merge it into the detected/resolved option.
  // This ensures that even if the registry didn't define fields, or if we have NO registry entry (pure custom),
  // we still show inputs for the detected HTML elements.
  if (scannedSchema.length > 0) {
    // If no option existed yet, create a virtual one
    if (!option && section) {
      isCustomComponent = true;
      option = {
        id: section.section_id,
        title: "Custom Component",
        type: section.type,
        content: [], // Will be populated with scanned schema
      };
    }

    if (option) {
      // Hydrate scanned items from section.content if available (persistence)
      // But prefer scanned DOM values if section.content is empty/undefined
      const hydratedScannedItems = scannedSchema.map(item => {
        if (section?.content && section.content[item.name] !== undefined && section.content[item.name] !== "") {
          return { ...item, value: section.content[item.name] };
        }
        // Use scanned value from DOM (which contains initial values)
        return item;
      });

      // MERGE scanned items with existing content instead of replacing
      // This preserves static content fields (like title, description) while adding DOM-detected fields
      let mergedContent = Array.isArray(option.content) ? [...option.content] : [];

      // Add scanned items that don't already exist in the content
      hydratedScannedItems.forEach(scannedItem => {
        const existsInContent = mergedContent.some(
          (item: any) => item.name === scannedItem.name || item.id === scannedItem.id
        );
        if (!existsInContent) {
          mergedContent.push(scannedItem);
        }
      });

      option = {
        ...option,
        content: mergedContent
      };
    }
  }

  const removeSection = () => {
    if (!section) return;
    deleteSection(activeSectionId);
  };

  const updateSectionOptions = (option: Partial<SectionOptionType>) => {
    if (!section) return;
    const newOptions = section.options?.map((op: SectionOptionType) => {
      if (op.id === section.section_id) {
        return { ...op, ...option };
      }
      return op;
    });
    setSection({ ...section, options: newOptions });
  };

  const handleTextChange = (value: string, name: string) => {
    console.log("=== handleTextChange START ===");
    console.log("Value:", value);
    console.log("Name:", name);
    console.log("Section:", section);
    console.log("Option:", option);
    console.log("activeSectionId:", activeSectionId);
    console.log("isCustomComponent:", isCustomComponent);

    if (!section) {
      console.error("No section found!");
      return;
    }
    if (!option) {
      console.error("No option found!");
      return;
    }

    // Update DOM directly using data-name attribute
    if (activeSectionId) {
      const sectionElement =
        (document.querySelector(
          `[data-section-instance-id="${activeSectionId}"]`
        ) as HTMLElement | null) || document.getElementById(activeSectionId);
      console.log("Section element found:", sectionElement);

      if (sectionElement) {
        const targetElement = sectionElement.querySelector(`[data-name="${name}"]`);
        console.log("Target element found:", targetElement);

        if (targetElement) {
          const dataType = targetElement.getAttribute("data-type");
          console.log("Data type:", dataType);

          if (dataType === "link") {
            targetElement.setAttribute("href", value);
            console.log("Updated link href to:", value);
          } else if (dataType === "image") {
            targetElement.setAttribute("src", value);
            console.log("Updated image src to:", value);
          } else {
            targetElement.textContent = value;
            console.log("Updated textContent to:", value);
          }
        } else {
          console.warn(`No element found with data-name="${name}"`);
        }
      } else {
        console.warn(`No section element found with id or data-section-instance-id="${activeSectionId}"`);
      }
    }

    // Custom Component Path: Direct update to section.content
    if (isCustomComponent) {
      const currentContent = section.content || {};
      const updated = {
        ...section,
        content: {
          ...currentContent,
          [name]: value
        }
      };
      console.log("Updating custom component, new section:", updated);
      setSection(updated);
      console.log("=== handleTextChange END (custom component) ===");
      return;
    }

    // Standard Path: Update options array AND section.content for persistence
    let newOptionContent = option.content;

    if (Array.isArray(option.content)) {
      newOptionContent = option.content.map((item: any) => {
        if (item.name === name) {
          return { ...item, value };
        }
        return item;
      });
      console.log("Updated array content:", newOptionContent);
    } else {
      // Fallback for object-based content
      newOptionContent = {
        ...option.content,
        [name]: value,
      };
      console.log("Updated object content:", newOptionContent);
    }

    // Prepare persistence object (Key-Value)
    const contentForPersistence = {
      ...(section.content || {}),
      [name]: value
    };
    console.log("Content for persistence:", contentForPersistence);

    // Update both options (for immediate view) and content (for persistence/fallback)
    const newOptions = section.options?.map((op: SectionOptionType) => {
      if (op.id === section.section_id) {
        return { ...op, content: newOptionContent };
      }
      return op;
    });
    console.log("New options:", newOptions);

    const updatedSection = {
      ...section,
      options: newOptions,
      content: contentForPersistence
    };
    console.log("Final updated section:", updatedSection);

    setSection(updatedSection);
    console.log("=== handleTextChange END (standard path) ===");
  };

  const handleUploadImage = (file: FileType, index: number) => {
    if (!section) return;

    // Get current photos from section.photos (priority) or option.photos (fallback)
    const currentPhotos = Array.isArray(section.photos)
      ? [...section.photos]
      : Array.isArray(option?.photos)
        ? [...option.photos]
        : [];

    // Ensure the array is large enough
    while (currentPhotos.length <= index) {
      currentPhotos.push({
        id: `photo-${Date.now()}-${currentPhotos.length}`,
        label: `صورة ${currentPhotos.length + 1}`,
        url: '',
        base64Content: ''
      });
    }

    // Convert FileType to PhotoItem by adding required 'label' property
    currentPhotos[index] = {
      id: file.id || `photo-${Date.now()}`,
      label: file.name || `صورة ${index + 1}`,
      url: file.url,
      base64Content: file.base64Content
    };

    // Update section.photos directly (Primary storage now)
    const newOptions = section.options?.map((op: SectionOptionType) => {
      if (op.id === section.section_id) {
        return { ...op, photos: currentPhotos };
      }
      return op;
    });

    setSection({
      ...section,
      photos: currentPhotos,
      options: newOptions
    });
  };

  return {
    handleTextChange,
    handleUploadImage,
    section,
    sections: processedSections?.map((s: HydratedSection) => s.originalSection) || [],
    setSection,
    removeSection,
    option,
    activeSectionId,
  };
};

export default useSectionDetails;
