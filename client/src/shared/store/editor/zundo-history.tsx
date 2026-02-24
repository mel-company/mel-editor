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
        set({ currentPage: page });
      },

      updatePage: (page: PageType) => {
        set({ currentPage: page });
      },

      updateStoreSettings: (settings: Partial<StoreType>) => {
        set({ storeSettings: settings });
      },
    }),
    {
      limit: 10,
      partialize: (state) => ({ currentPage: state.currentPage, storeSettings: state.storeSettings }),
      onSave: () => {
        // State saved to history
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
        return undefined;
      }

      if (!temporalApi) {
        return undefined;
      }

      // Use zundo's built-in undo method
      temporalApi.undo();

      // Get the current state after undo
      const currentState = useZundoHistoryStore.getState();
      return currentState.currentPage;
    },

    redo: () => {
      if (!isClient) {
        return undefined;
      }

      if (!temporalApi) {
        return undefined;
      }

      // Use zundo's built-in redo method
      temporalApi.redo();

      // Get the current state after redo
      const currentState = useZundoHistoryStore.getState();
      return currentState.currentPage;
    },

    canUndo: () => {
      return pastStatesLength > 0;
    },

    canRedo: () => {
      return futureStatesLength > 0;
    },

    clearHistory: () => {
      if (!isClient) {
        return;
      }

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
