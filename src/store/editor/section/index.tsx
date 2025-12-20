import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SectionType } from "../../../types";
import { mockTemplate } from "../../../mock/template";

type Store = {
  sections: SectionType[];
  activeSectionId: string;
  setActiveSectionId: (id: string) => void;
  setSections: (sections: SectionType[]) => void;
  setSection: (section: SectionType) => void;
};

export const useSectionStore = create<Store>()(
  persist(
    (set) => ({
      sections: [],
      activeSectionId: "",
      setActiveSectionId: (id) => set(() => ({ activeSectionId: id })),
      setSections: (sections) => set(() => ({ sections })),
      setSection: (section) =>
        set((state) => ({
          sections: state.sections.map((s) =>
            s.target_id === section.target_id ? section : s
          ),
        })),
    }),
    {
      name: "editor-sections-storage",
    }
  )
);
