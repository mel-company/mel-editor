import { useEffect, useRef } from 'react';
import { usePageStore } from '../store/editor/page';
import { useZundoHistoryStore } from '../store/editor/zundo-history';
import { useStoreSettingsStore } from '../store/editor/store-settings';

// Global flag to track if we're in an undo/redo operation
let isUndoRedoInProgress = false;

export const setUndoRedoInProgress = (value: boolean) => {
  isUndoRedoInProgress = value;
};

/**
 * Hook that automatically saves page changes and store settings to zundo history
 * This watches both the page store and store settings, syncing changes to the zundo store
 */
export const useAutoSaveHistory = () => {
  const { getCurrentPage } = usePageStore();
  const { updatePage, updateStoreSettings } = useZundoHistoryStore();
  const lastPageRef = useRef<string | null>(null);
  const lastSettingsRef = useRef<string | null>(null);

  useEffect(() => {
    // Save initial state to history on mount
    const currentPage = getCurrentPage();
    if (currentPage) {
      console.log('Initial save: Saving current page to history on mount');
      const pageStateId = JSON.stringify({
        id: currentPage.id,
        name: currentPage.name,
        type: currentPage.type,
        sections: currentPage.sections.map(s => ({
          id: s.id,
          section_id: s.section_id,
          type: s.type,
          content: s.content,
          styles: s.styles,
          photos: s.photos,
          links: s.links,
          options: s.options,
          view_all_link: s.view_all_link
        }))
      });
      lastPageRef.current = pageStateId;
      updatePage(currentPage);
    }

    const currentSettings = useStoreSettingsStore.getState().storeSettings;
    if (currentSettings) {
      console.log('Initial save: Saving store settings to history on mount');
      const settingsStateId = JSON.stringify({
        colors: currentSettings.colors,
        fonts: currentSettings.fonts
      });
      lastSettingsRef.current = settingsStateId;
      updateStoreSettings({
        colors: currentSettings.colors,
        fonts: currentSettings.fonts
      });
    }

    // After initial save, clear the history to start fresh
    setTimeout(() => {
      console.log('Clearing history after initial save');
      const temporalApi = useZundoHistoryStore.temporal?.getState();
      if (temporalApi) {
        temporalApi.clear();
      }
    }, 100);

    // Subscribe to page store changes
    const unsubscribe = usePageStore.subscribe((state) => {
      // Skip auto-save if we're in an undo/redo operation
      if (isUndoRedoInProgress) {
        console.log('Auto-save skipped - undo/redo in progress');
        return;
      }

      const currentPage = state.pages.find((p) => p.id === state.currentPageId);

      if (currentPage) {
        // Create a stable identifier for the page state including all section properties
        const pageStateId = JSON.stringify({
          id: currentPage.id,
          name: currentPage.name,
          type: currentPage.type,
          sections: currentPage.sections.map(s => ({
            id: s.id,
            section_id: s.section_id,
            type: s.type,
            content: s.content,
            styles: s.styles,
            photos: s.photos,
            links: s.links,
            options: s.options,
            view_all_link: s.view_all_link
          }))
        });

        // Only update if the page has actually changed
        if (lastPageRef.current !== pageStateId) {
          console.log('Auto-saving page to history:', currentPage.id);
          updatePage(currentPage);
          lastPageRef.current = pageStateId;
        }
      }
    });

    // Subscribe to store settings changes
    const unsubscribeSettings = useStoreSettingsStore.subscribe((state) => {
      // Skip auto-save if we're in an undo/redo operation
      if (isUndoRedoInProgress) {
        console.log('Auto-save settings skipped - undo/redo in progress');
        return;
      }

      // Create a stable identifier for the store settings (colors and fonts)
      const settingsStateId = JSON.stringify({
        colors: state.storeSettings.colors,
        fonts: state.storeSettings.fonts
      });

      // Only update if settings have actually changed
      if (lastSettingsRef.current !== settingsStateId) {
        console.log('Auto-saving store settings to history');
        updateStoreSettings({
          colors: state.storeSettings.colors,
          fonts: state.storeSettings.fonts
        });
        lastSettingsRef.current = settingsStateId;
      }
    });

    return () => {
      unsubscribe();
      unsubscribeSettings();
    };
  }, [getCurrentPage, updatePage, updateStoreSettings]);
};
