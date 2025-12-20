import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SectionType } from "../../../types";

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
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => {
          try {
            localStorage.setItem(name, JSON.stringify(value));
          } catch (e) {
            console.error("Local storage is full, failed to save sections:", e);
          }
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
