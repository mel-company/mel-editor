import { create } from 'zustand';
import { PageType, StoreType } from '../../types';
import { temporal } from 'zundo';
import { useState, useEffect } from 'react';

type ZundoHistoryState = {
  // Current page state
  currentPage: PageType | null;
  // Store settings (colors, fonts, etc.)
  storeSettings: Partial<StoreType> | null;

  // Actions
  setCurrentPage: (page: PageType) => void;
  updatePage: (page: PageType) => void;
  updateStoreSettings: (settings: Partial<StoreType>) => void;
};

export const useZundoHistoryStore = create<ZundoHistoryState>()(
  temporal(
    (set) => ({
      currentPage: null,
      storeSettings: null,

      setCurrentPage: (page: PageType) => {
        console.log('[ZUNDO STORE] setCurrentPage called:', page.id);
        set({ currentPage: page });
        console.log('[ZUNDO STORE] setCurrentPage complete');
      },

      updatePage: (page: PageType) => {
        console.log('[ZUNDO STORE] updatePage called:', page.id);
        console.log('[ZUNDO STORE] Page sections:', page.sections.map(s => ({ id: s.id, section_id: s.section_id })));
        set({ currentPage: page });
        console.log('[ZUNDO STORE] updatePage complete');
      },

      updateStoreSettings: (settings: Partial<StoreType>) => {
        console.log('[ZUNDO STORE] updateStoreSettings called');
        set({ storeSettings: settings });
        console.log('[ZUNDO STORE] updateStoreSettings complete');
      },
    }),
    {
      limit: 10,
      partialize: (state) => ({ currentPage: state.currentPage, storeSettings: state.storeSettings }),
      onSave: (state) => {
        console.log('[ZUNDO TEMPORAL] State saved to history:', state.currentPage?.id);
      },
    }
  )
);

// Helper hook to access temporal methods with reactive state
export const useZundoTemporal = () => {
  // Check if we're in a browser environment
  const isClient = typeof window !== 'undefined';

  // Initialize state with current temporal state values
  const initialPastLength = isClient && useZundoHistoryStore.temporal
    ? useZundoHistoryStore.temporal.getState().pastStates.length
    : 0;
  const initialFutureLength = isClient && useZundoHistoryStore.temporal
    ? useZundoHistoryStore.temporal.getState().futureStates.length
    : 0;

  // Use state to track history lengths for reactive updates
  const [pastStatesLength, setPastStatesLength] = useState(initialPastLength);
  const [futureStatesLength, setFutureStatesLength] = useState(initialFutureLength);

  const temporalApi = isClient ? (useZundoHistoryStore.temporal?.getState() || null) : null;

  // Subscribe to temporal state changes
  useEffect(() => {
    if (!isClient || !useZundoHistoryStore.temporal) {
      return;
    }

    // Update state immediately
    const updateLengths = () => {
      const state = useZundoHistoryStore.temporal?.getState();
      if (state) {
        setPastStatesLength(state.pastStates.length);
        setFutureStatesLength(state.futureStates.length);
      }
    };

    updateLengths();

    // Subscribe to changes
    const unsubscribe = useZundoHistoryStore.temporal.subscribe(updateLengths);

    return () => unsubscribe();
  }, [isClient]);

  return {
    undo: () => {
      if (!isClient) {
        console.log('Zundo undo skipped - not in browser environment');
        return undefined;
      }

      console.log('Zundo undo called');
      if (!temporalApi) {
        console.log('Zundo undo failed - temporal not available');
        return undefined;
      }

      // Use zundo's built-in undo method
      temporalApi.undo();

      // Get the current state after undo
      const currentState = useZundoHistoryStore.getState();
      console.log('Zundo undo successful, current page:', currentState.currentPage?.id);
      return currentState.currentPage;
    },

    redo: () => {
      if (!isClient) {
        console.log('Zundo redo skipped - not in browser environment');
        return undefined;
      }

      console.log('Zundo redo called');
      if (!temporalApi) {
        console.log('Zundo redo failed - temporal not available');
        return undefined;
      }

      // Use zundo's built-in redo method
      temporalApi.redo();

      // Get the current state after redo
      const currentState = useZundoHistoryStore.getState();
      console.log('Zundo redo successful, current page:', currentState.currentPage?.id);
      return currentState.currentPage;
    },

    canUndo: () => {
      const result = pastStatesLength > 0;
      console.log('Zundo canUndo check:', result, 'pastStates:', pastStatesLength);
      return result;
    },

    canRedo: () => {
      const result = futureStatesLength > 0;
      console.log('Zundo canRedo check:', result, 'futureStates:', futureStatesLength);
      return result;
    },

    clearHistory: () => {
      if (!isClient) {
        console.log('Zundo clear skipped - not in browser environment');
        return;
      }

      console.log('Zundo clearing history');
      if (temporalApi) {
        temporalApi.clear();
      }
    },

    getHistorySize: () => {
      if (!isClient || !temporalApi) {
        const currentPage = useZundoHistoryStore.getState().currentPage;
        return currentPage ? 1 : 0;
      }

      const currentPage = useZundoHistoryStore.getState().currentPage;
      return temporalApi.pastStates.length + temporalApi.futureStates.length + (currentPage ? 1 : 0);
    },

    pauseTracking: () => {
      if (isClient && temporalApi) {
        temporalApi.pause();
      }
    },

    resumeTracking: () => {
      if (isClient && temporalApi) {
        temporalApi.resume();
      }
    },
  };
};
