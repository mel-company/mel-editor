import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PageType, SectionType } from "../../../types";
import { navigation_sections } from "../../../mock/template/sections/navigation";
import { hero_sections } from "../../../mock/template/sections/hero";
import { categories_sections } from "../../../mock/template/sections/categories";
import { recent_products_sections } from "../../../mock/template/sections/recent-products";
import { menu_sections } from "../../../mock/template/sections/menu";
import { our_story_sections } from "../../../mock/template/sections/our-story";
import { contact_sections } from "../../../mock/template/sections/contact";
import { footer_sections } from "../../../mock/template/sections/footer";

// Map section types to their section definitions
const sectionTypesMap: Record<string, any[]> = {
  navigation: navigation_sections,
  hero: hero_sections,
  carouselHero: hero_sections, // carouselHero uses hero_sections
  categories: categories_sections,
  categoryGrid: categories_sections, // categoryGrid uses categories_sections
  recentProducts: recent_products_sections,
  productGrid: recent_products_sections, // productGrid uses recent_products_sections
  menu: menu_sections,
  // Add support for other section types from API
  featuresGrid: categories_sections, // featuresGrid uses categories_sections
  testimonialSlider: contact_sections, // testimonialSlider uses contact_sections
  promoBanner: hero_sections, // promoBanner uses hero_sections
  pageHeader: hero_sections, // pageHeader uses hero_sections
  contentBlock: our_story_sections, // contentBlock uses our_story_sections
  ourStory: our_story_sections,
  contactForm: contact_sections,
  contactInfo: contact_sections,
  contact: contact_sections,
  footer: footer_sections,
};

// Function to restore components in sections after loading from localStorage
const restoreSectionComponents = (pages: PageType[]): PageType[] => {
  console.log("🔄 Restoring components for pages:", pages.length);

  return pages.map((page) => {
    const restoredSections = page.sections.map((section) => {
      const sectionOptions = sectionTypesMap[section.type];
      if (!sectionOptions) {
        console.warn(`⚠️ No section options found for type: ${section.type}`);
        return section;
      }

      // If section has no options or options array is empty, restore from section definitions
      if (!section.options || section.options.length === 0) {
        console.log(`📦 Restoring empty options for section type: ${section.type}`);
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
        } else {
          console.warn(`⚠️ Option definition not found for section type: ${section.type}, option id: ${savedOption.id}`);
          // Try to find any option with component as fallback
          const fallbackOption = sectionOptions.find(opt => opt.component);
          if (fallbackOption) {
            return {
              ...fallbackOption,
              ...savedOption,
              component: fallbackOption.component,
            };
          }
        }
        return savedOption;
      });

      // Verify at least one option has component
      const hasComponent = restoredOptions.some(opt => opt.component);
      if (!hasComponent) {
        console.error(`❌ No component found for section type: ${section.type}, using first option with component`);
        const firstWithComponent = sectionOptions.find(opt => opt.component);
        if (firstWithComponent) {
          restoredOptions[0] = {
            ...firstWithComponent,
            ...restoredOptions[0],
            component: firstWithComponent.component,
          };
        }
      }

      // Ensure target_id exists (critical for editor selection)
      const sanitizedSection = {
        ...section,
        target_id: section.target_id || section.id || section.section_id,
        options: restoredOptions,
      };

      return sanitizedSection;
    });

    console.log(`✅ Restored page: ${page.name} with ${restoredSections.length} sections`);

    return {
      ...page,
      sections: restoredSections,
    };
  });
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
      addPage: (page) => {
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
        });
      },
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
