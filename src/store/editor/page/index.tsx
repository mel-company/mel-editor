import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PageType, SectionType } from "../../../types";
import { navigation_sections } from "../../../mock/template/sections/navigation";
import { hero_sections } from "../../../mock/template/sections/hero";
import { categories_sections } from "../../../mock/template/sections/categories";
import { recent_products_sections } from "../../../mock/template/sections/recent-products";
import { menu_sections } from "../../../mock/template/sections/menu";

// Map section types to their section definitions
const sectionTypesMap: Record<string, any[]> = {
  navigation: navigation_sections,
  hero: hero_sections,
  categories: categories_sections,
  recentProducts: recent_products_sections,
  menu: menu_sections,
};

// Function to restore components in sections after loading from localStorage
const restoreSectionComponents = (pages: PageType[]): PageType[] => {
  return pages.map((page) => ({
    ...page,
    sections: page.sections.map((section) => {
      const sectionOptions = sectionTypesMap[section.type];
      if (!sectionOptions) {
        return section;
      }

      // If section has no options or options array is empty, restore from section definitions
      if (!section.options || section.options.length === 0) {
        return {
          ...section,
          options: sectionOptions,
        };
      }

      // Restore components for each option in the saved section
      const restoredOptions = section.options.map((savedOption) => {
        // Find the corresponding option definition that contains the component
        const optionDefinition = sectionOptions.find((opt) => opt.id === savedOption.id);
        if (optionDefinition && optionDefinition.component) {
          // Merge saved data (content, photos, products, categories) with the component from section definitions
          return {
            ...optionDefinition, // Start with the full definition (includes all default data)
            ...savedOption, // Override with saved data (user's edits)
            component: optionDefinition.component, // Always use component from definitions
          };
        }
        return savedOption;
      });

      return {
        ...section,
        options: restoredOptions,
      };
    }),
  }));
};

type Store = {
  pages: PageType[];
  currentPageId: string;
  setPages: (pages: PageType[]) => void;
  setCurrentPageId: (id: string) => void;
  addPage: (page: PageType) => void;
  updatePage: (page: PageType) => void;
  deletePage: (id: string) => void;
  getCurrentPage: () => PageType | undefined;
};

export const usePageStore = create<Store>()(
  persist(
    (set, get) => ({
      pages: [],
      currentPageId: "",
      setPages: (pages) => set(() => ({ pages })),
      setCurrentPageId: (id) => set(() => ({ currentPageId: id })),
      addPage: (page) =>
        set((state) => {
          // Limit to maximum 4 pages
          if (state.pages.length >= 4) {
            console.warn("Maximum 4 pages allowed");
            return state;
          }
          return {
            pages: [...state.pages, page],
            currentPageId: page.id,
          };
        }),
      updatePage: (page) =>
        set((state) => ({
          pages: state.pages.map((p) => (p.id === page.id ? page : p)),
        })),
      deletePage: (id) => {
        set((state) => {
          const newPages = state.pages.filter((p) => p.id !== id);
          const newCurrentPageId =
            state.currentPageId === id
              ? newPages.length > 0
                ? newPages[0].id
                : ""
              : state.currentPageId;
          
          // Update navigation links - remove deleted page
          try {
            const { useStoreSettingsStore } = require("../store-settings");
            const storeSettings = useStoreSettingsStore.getState().storeSettings;
            const currentLinks = storeSettings.header?.navigationLinks || [];
            const updatedLinks = currentLinks.filter(
              (link: any) => link.pageId !== id && link.url !== `/${id}`
            );
            useStoreSettingsStore.getState().updateStoreSettings({
              header: {
                ...storeSettings.header,
                navigationLinks: updatedLinks,
              },
            });
          } catch (error) {
            console.error("Error updating navigation links:", error);
          }
          
          return { pages: newPages, currentPageId: newCurrentPageId };
        });
      },
      getCurrentPage: () => {
        const state = get();
        return state.pages.find((p) => p.id === state.currentPageId);
      },
    }),
    {
      name: "editor-pages-storage",
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const parsed = JSON.parse(str);
          // Restore components in pages after loading from localStorage
          if (parsed?.state?.pages) {
            parsed.state.pages = restoreSectionComponents(parsed.state.pages);
          }
          return parsed;
        },
        setItem: (name, value) => {
          try {
            localStorage.setItem(name, JSON.stringify(value));
          } catch (e) {
            console.error("Local storage is full, failed to save pages:", e);
          }
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
