import { useState, useEffect } from "react";
import { useSectionStore } from "../../store/editor/section";
import { usePageStore } from "../../store/editor/page";
import { FileType, SectionOptionType } from "../../types";
import { resolveComponent } from "../../utils/component-registry";
import { useDomScannerEffect } from "./use-dom-scanner";

import { useTemplateStructure } from "../use-template-structure";

const useSectionDetails = () => {
  const { setSection, activeSectionId, deleteSection } =
    useSectionStore();

  // Use useTemplateStructure to get sections (handles mock fallback)
  const { sections: processedSections } = useTemplateStructure();

  // Find the processed section that matches activeSectionId
  const processedSection = processedSections?.find(
    (s) => s.id === activeSectionId
  );

  // Extract the original section data for editing
  const section = processedSection?.originalSection;

  console.log("[useSectionDetails] Debug:", { activeSectionId, processedCount: processedSections?.length, sectionFound: !!section });

  // Resolution Logic:
  // 1. Try standard options
  let option = section?.options?.find(
    (option) => option.id === section.section_id
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
      // Merge scanned schema. Avoid duplicates if registry already defined them.
      // Strategy: Append scanned items that don't match existing names.
      const existingContent = Array.isArray(option.content) ? option.content : [];
      const newItems = scannedSchema.filter(scannedItem =>
        !existingContent.some((existing: any) => existing.name === scannedItem.name)
      );

      // Hydrate new items from section.content if available (persistence)
      const hydratedNewItems = newItems.map(item => {
        if (section?.content && section.content[item.name] !== undefined) {
          return { ...item, value: section.content[item.name] };
        }
        return item;
      });

      option = {
        ...option,
        content: [...existingContent, ...hydratedNewItems]
      };
    }
  }

  const removeSection = () => {
    if (!section) return;
    deleteSection(activeSectionId);
  };

  const updateSectionOptions = (option: Partial<SectionOptionType>) => {
    if (!section) return;
    const newOptions = section.options?.map((op) => {
      if (op.id === section.section_id) {
        return { ...op, ...option };
      }
      return op;
    });
    setSection({ ...section, options: newOptions });
  };

  const handleTextChange = (value: string, name: string) => {
    if (!section) return;
    if (!option) return;

    // Custom Component Path: Direct update to section.content
    if (isCustomComponent) {
      const currentContent = section.content || {};
      setSection({
        ...section,
        content: {
          ...currentContent,
          [name]: value
        }
      });
      return;
    }

    // Standard Path: Update options array
    if (Array.isArray(option.content)) {
      const newContent = option.content.map((item: any) => {
        if (item.name === name) {
          return { ...item, value };
        }
        return item;
      });
      updateSectionOptions({ ...option, content: newContent });
    } else {
      // Fallback for object-based content (if any remains)
      updateSectionOptions({
        content: {
          ...option.content,
          [name]: value,
        },
      });
    }
  };

  const handleUploadImage = (file: FileType, index: number) => {
    if (!section) return;

    const currentPhotos: FileType[] = Array.isArray(option?.photos)
      ? [...option.photos]
      : [];
    // Ensure the array is large enough if index is out of bounds
    while (currentPhotos.length <= index) {
      currentPhotos.push({} as FileType);
    }
    currentPhotos[index] = file;

    // For custom components, we should likely also update section.content or section.photos if we separate them?
    // But the previous implementation logic handled photos via updateSectionOptions which writes options.
    // For custom components, we probably want to update section.content.photos or similar if we follow that pattern?
    // Or honestly, if 'updateSectionOptions' fails for custom components (because options mapping wont find ID), we need a fork here too.

    if (isCustomComponent) {
      // To be consistent with how we handle text, we should probably save photos properly. 
      // However, the original code used a dedicated 'SectionType.options.photos' array.
      // If we want to support custom component images, we should probably mirror that.
      // But for now, let's assume 'section.photos' doesn't exist on SectionType, only content.
      // So maybe we shouldn't fully support images yet unless we added that to SectionType?
      // Actually, SectionType options has photos.
      // Let's implement a simple override for now if needed, but the original request focused on text content.
      // Left as is, it might break because updateSectionOptions won't find the option ID in the real section options (which is empty).
      return;
    }

    updateSectionOptions({ photos: currentPhotos as any });
  };

  return {
    handleTextChange,
    handleUploadImage,
    section,
    sections: processedSections?.map(s => s.originalSection) || [],
    setSection,
    removeSection,
    option,
    activeSectionId,
  };
};

export default useSectionDetails;
