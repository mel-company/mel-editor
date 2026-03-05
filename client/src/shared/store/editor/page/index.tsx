import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import createDbStorage from "../../../utils/db-storage";
import { PageType } from "../../../types";
import { navigation_sections } from "@templates/home/sections/navbar/data";
import { hero_sections } from "@templates/home/sections/hero/data";
import { categories_sections } from "@templates/home/sections/categories/data";
import { recent_products_sections } from "@templates/home/sections/recent-products/data";
import { our_story_sections } from "@templates/home/sections/our-story/data";
import { contact_sections } from "@templates/home/sections/contact/data";
import { resolveComponent } from "../../../utils/component-registry";
import { footer_sections } from "@templates/home/sections/footer/data";
import { mockTemplate } from "@templates/home/sections/template";

// Map section types to their section definitions
const sectionTypesMap: Record<string, any[]> = {
  navigation: navigation_sections,
  hero: hero_sections,
  carouselHero: hero_sections, // carouselHero uses hero_sections
  categories: categories_sections,
  categoryGrid: categories_sections, // categoryGrid uses categories_sections
  recentProducts: recent_products_sections,
  productGrid: recent_products_sections, // productGrid uses recent_products_sections
  menu: recent_products_sections, // menu uses recent_products_sections as fallback
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
export const restoreSectionComponents = (pages: PageType[]): PageType[] => {


  return pages.map((page) => {
    const restoredSections = page.sections.map((section) => {
      const sectionOptions = sectionTypesMap[section.type];
      if (!sectionOptions) {
        console.warn(`⚠️ No section options found for type: ${section.type}`);
        return section;
      }

      // If section has no options or options array is empty, restore from section definitions
      if (!section.options || section.options.length === 0) {
        // Map section options to include resolved components
        const optionsWithComponents = sectionOptions.map((option) => {
          const registryEntry = resolveComponent(section.type, option.id);
          return {
            ...option,
            component: registryEntry ? registryEntry.component : undefined
          };
        });

        return {
          ...section,
          options: optionsWithComponents,
        };
      }

      // Restore components for each option in the saved section
      const restoredOptions = section.options.map((savedOption) => {
        // First try to resolve from registry (preferred method)
        // Check for specific variant ID
        const registryEntry = resolveComponent(section.type, savedOption.id);

        if (registryEntry) {
          return {
            ...savedOption,
            component: registryEntry.component,
          }
        }

        // Fallback to legacy lookups (if any)
        const optionDefinition = sectionOptions.find((opt) => opt.id === savedOption.id);
        if (optionDefinition && optionDefinition.component) {
          // ... (existing logic)
          return {
            ...optionDefinition,
            ...savedOption,
            component: optionDefinition.component
          }
        }

        return savedOption;
      });

      // Verify at least one option has component
      const hasComponent = restoredOptions.some(opt => opt.component);
      if (!hasComponent) {
        // Try fallback to registry using section_id if available
        const fallbackRegistry = resolveComponent(section.type, section.section_id);
        if (fallbackRegistry) {
          // Find which option corresponds to section_id
          const targetOptionIndex = restoredOptions.findIndex(o => o.id === section.section_id);
          if (targetOptionIndex >= 0) {
            restoredOptions[targetOptionIndex] = {
              ...restoredOptions[targetOptionIndex],
              component: fallbackRegistry.component
            };
          } else {
            // Or if strict mapping failed, just attach to the first option as a last resort check
            // Ideally we should adhere to section_id match.
            if (restoredOptions.length > 0) {
              restoredOptions[0] = { ...restoredOptions[0], component: fallbackRegistry.component };
            }
          }
        } else {
          console.warn(`⚠️ No component found for section type: ${section.type}`);
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
      pages: mockTemplate.pages && mockTemplate.pages.length > 0
        ? restoreSectionComponents(mockTemplate.pages)
        : [],
      currentPageId: mockTemplate.pages && mockTemplate.pages.length > 0
        ? mockTemplate.pages[0].id
        : "",
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
        set((state) => {
          const updatedPages = state.pages.map((p) => (p.id === page.id ? page : p));
          return { pages: updatedPages };
        }),
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
      storage: createJSONStorage(() => {
        // Only use storage on client side
        if (typeof window === "undefined") {
          // Return a noop storage for SSR
          return {
            getItem: () => Promise.resolve(null),
            setItem: () => Promise.resolve(),
            removeItem: () => Promise.resolve(),
          };
        }
        return createDbStorage();
      }),
      onRehydrateStorage: () => (state) => {
        console.log('🔄 Page store rehydration started', { state, hasState: !!state });
        if (state) {
          const mockPages = mockTemplate.pages || [];
          const storedPagesCount = state.pages?.length || 0;

          console.log('📄 Rehydration check:', {
            mockPagesCount: mockPages.length,
            storedPagesCount,
            hasMockTemplate: !!mockTemplate,
            mockTemplateKeys: Object.keys(mockTemplate),
          });

          // If mockTemplate has more pages than storage, use mockTemplate pages
          // This ensures new multi-page templates are loaded even when old single-page data exists
          if (mockPages.length > 0 && mockPages.length > storedPagesCount) {
            console.log(`📄 MockTemplate has more pages (${mockPages.length}) than storage (${storedPagesCount}), loading mockTemplate pages`);
            state.pages = restoreSectionComponents(mockPages);
            state.currentPageId = mockPages[0].id;
          } else if (state.pages && state.pages.length > 0) {
            // Restore components for stored pages
            console.log('📄 Restoring components for stored pages:', state.pages.length);
            state.pages = restoreSectionComponents(state.pages);
          } else if (mockPages.length > 0) {
            // No pages in storage, use mockTemplate
            console.log("📄 No cached pages found, loading default pages from mockTemplate");
            state.pages = restoreSectionComponents(mockPages);
            state.currentPageId = mockPages[0].id;
          } else {
            console.warn('⚠️ No pages found in storage or mockTemplate!');
          }

          console.log('✅ Rehydration complete, pages count:', state.pages?.length);
        }
      },
    }
  )
);
