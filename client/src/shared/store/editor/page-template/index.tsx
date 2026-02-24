import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import createDbStorage from "../../../utils/db-storage";

/**
 * Page template selection
 * Stores which complete template layout is selected for a non-home page
 */
export type PageTemplateSelection = {
  pageId: string;
  selectedTemplateId: string; // The ID of the selected template variant
};

type PageTemplateStore = {
  pageTemplates: PageTemplateSelection[];

  // Get selected template ID for a page
  getSelectedTemplateId: (pageId: string) => string | undefined;

  // Set the selected template for a page
  setPageTemplate: (pageId: string, templateId: string) => void;

  // Remove template selection when a page is deleted
  removePageTemplate: (pageId: string) => void;

  // Sync template selection with server
  syncWithServer: (pageId: string) => Promise<void>;

  // Load all template selections from server
  loadFromServer: () => Promise<void>;
};

export const usePageTemplateStore = create<PageTemplateStore>()(
  persist(
    (set, get) => ({
      pageTemplates: [],

      getSelectedTemplateId: (pageId: string) => {
        const state = get();
        const selection = state.pageTemplates.find((t) => t.pageId === pageId);
        return selection?.selectedTemplateId;
      },

      setPageTemplate: (pageId: string, templateId: string) => {
        set((state) => {
          const existingIndex = state.pageTemplates.findIndex(
            (t) => t.pageId === pageId
          );

          if (existingIndex >= 0) {
            // Update existing selection
            const updatedTemplates = [...state.pageTemplates];
            updatedTemplates[existingIndex].selectedTemplateId = templateId;
            return { pageTemplates: updatedTemplates };
          } else {
            // Add new selection
            return {
              pageTemplates: [
                ...state.pageTemplates,
                { pageId, selectedTemplateId: templateId },
              ],
            };
          }
        });
      },

      removePageTemplate: (pageId: string) => {
        set((state) => ({
          pageTemplates: state.pageTemplates.filter((t) => t.pageId !== pageId),
        }));
      },

      syncWithServer: async (pageId: string) => {
        const state = get();
        const selection = state.pageTemplates.find((t) => t.pageId === pageId);

        if (!selection) return;

        const url = import.meta.env.VITE_EDITOR_API_URL

        try {
          await fetch(`${url}/page-templates/${pageId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(selection),
          });
        } catch (error) {
          console.error("Failed to sync page template with server:", error);
        }
      },

      loadFromServer: async () => {
        const url = import.meta.env.VITE_EDITOR_API_URL

        try {
          const response = await fetch(`${url}/page-templates`);
          const data = await response.json();

          if (data.data && Array.isArray(data.data)) {
            set({ pageTemplates: data.data });
          }
        } catch (error) {
          console.error("Failed to load page templates from server:", error);
        }
      },
    }),
    {
      name: "editor-page-template-storage",
      storage: createJSONStorage(() => createDbStorage()),
    }
  )
);
