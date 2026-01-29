import { create } from "zustand";
import { SectionType } from "../../../types";
import { usePageStore } from "../page";

type Store = {
  activeSectionId: string;
  activeElementType: "section" | "navigation" | "footer" | "";
  setActiveSectionId: (id: string) => void;
  setActiveElementType: (
    type: "section" | "navigation" | "footer" | ""
  ) => void;
  getSections: () => SectionType[];
  setSections: (sections: SectionType[]) => void;
  setSection: (section: SectionType) => void;
  addSection: (section: SectionType) => void;
  deleteSection: (targetId: string) => void;
};

export const useSectionStore = create<Store>()((set, get) => ({
  activeSectionId: "",
  activeElementType: "",
  setActiveSectionId: (id) =>
    set(() => ({
      activeSectionId: id,
      // Only set activeElementType to "section" if ID is not empty
      // This prevents overriding navigation/footer selection
      ...(id ? { activeElementType: "section" as const } : {})
    })),
  setActiveElementType: (type) =>
    set(() => ({
      activeElementType: type,
      activeSectionId: type === "section" ? get().activeSectionId : "",
    })),
  getSections: () => {
    const currentPage = usePageStore.getState().getCurrentPage();
    return currentPage?.sections || [];
  },
  setSections: (sections) => {
    const currentPage = usePageStore.getState().getCurrentPage();
    if (currentPage) {
      usePageStore.getState().updatePage({ ...currentPage, sections });
    }
  },
  setSection: (section) => {
    console.log("=== setSection called ===");
    console.log("Section to update:", section);

    const currentPage = usePageStore.getState().getCurrentPage();
    console.log("Current page:", currentPage);

    if (currentPage) {
      const updatedSections = currentPage.sections.map((s) => {
        // Match by target_id (primary) or fall back to section_id/id
        const isMatch = s.target_id
          ? s.target_id === section.target_id
          : (s.id === section.id || s.section_id === section.section_id);

        if (isMatch) {
          console.log("Found matching section, updating from:", s);
          console.log("To:", section);
        }

        return isMatch ? section : s;
      });

      console.log("Updated sections array:", updatedSections);
      console.log("Calling updatePage...");

      usePageStore
        .getState()
        .updatePage({ ...currentPage, sections: updatedSections });

      console.log("=== setSection complete ===");
    } else {
      console.error("No current page found!");
    }
  },
  addSection: (section) => {
    const currentPage = usePageStore.getState().getCurrentPage();
    if (currentPage) {
      // Deep clone the section to ensure content and photos are properly copied
      const deepClonedSection = {
        ...section,
        options: section.options?.map((option) => ({
          ...option,
          content: Array.isArray(option.content)
            ? option.content.map((item: any) => ({ ...item }))
            : option.content,
          photos: Array.isArray(option.photos)
            ? option.photos.map((photo: any) => ({ ...photo }))
            : option.photos,
        })),
      };
      const updatedSections = [...currentPage.sections, deepClonedSection];
      usePageStore
        .getState()
        .updatePage({ ...currentPage, sections: updatedSections });
    }
  },
  deleteSection: (targetId) => {
    const currentPage = usePageStore.getState().getCurrentPage();
    if (currentPage) {
      const updatedSections = currentPage.sections.filter((s) => {
        // Match by target_id (primary) or fall back to section_id/id
        const sectionId = s.target_id || s.id || s.section_id;
        return sectionId !== targetId;
      });
      usePageStore
        .getState()
        .updatePage({ ...currentPage, sections: updatedSections });

      // Clear active section if it was deleted
      const { activeSectionId } = get();
      if (activeSectionId === targetId) {
        // Directly set both to empty to avoid setActiveSectionId setting activeElementType to "section"
        set({ activeSectionId: "", activeElementType: "" });
      }
    }
  },
}));
