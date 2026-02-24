import { usePageStore } from '../store/editor/page';
import { useZundoHistoryStore, useZundoTemporal } from '../store/editor/zundo-history';
import { useStoreSettingsStore } from '../store/editor/store-settings';
import { setUndoRedoInProgress } from './use-auto-save-history';

export const useZundoHistory = () => {
  const { getCurrentPage, updatePage } = usePageStore();
  const { updatePage: updateZundoPage } = useZundoHistoryStore();
  const { updateStoreSettings } = useStoreSettingsStore();
  const { undo, redo, canUndo, canRedo, clearHistory, getHistorySize } = useZundoTemporal();

  // No initialization - history starts empty on reload

  // Enhanced undo function that also updates the page store
  const handleUndo = () => {
    // Set flag to prevent auto-save from clearing redo history
    setUndoRedoInProgress(true);

    // Call undo on zundo store - this returns the previous state
    const previousState = undo();

    if (previousState) {
      updatePage(previousState);

      // Also restore store settings if they exist
      const currentState = useZundoHistoryStore.getState();
      if (currentState.storeSettings) {
        updateStoreSettings(currentState.storeSettings);
      }

      // Reset flag after a short delay to allow the update to complete
      setTimeout(() => setUndoRedoInProgress(false), 100);

      return previousState;
    } else {
      setUndoRedoInProgress(false);
    }

    return undefined;
  };

  // Enhanced redo function that also updates the page store
  const handleRedo = () => {
    // Set flag to prevent auto-save from clearing redo history
    setUndoRedoInProgress(true);

    const nextState = redo();

    if (nextState) {
      updatePage(nextState);

      // Also restore store settings if they exist
      const currentState = useZundoHistoryStore.getState();
      if (currentState.storeSettings) {
        updateStoreSettings(currentState.storeSettings);
      }

      // Reset flag after a short delay to allow the update to complete
      setTimeout(() => setUndoRedoInProgress(false), 100);

      return nextState;
    } else {
      setUndoRedoInProgress(false);
    }

    return undefined;
  };

  // Function to manually save current state
  const saveCurrentState = () => {
    const currentPage = getCurrentPage();
    if (currentPage) {
      updateZundoPage(currentPage);
    }
  };

  return {
    // Actions
    undo: handleUndo,
    redo: handleRedo,
    saveState: saveCurrentState,
    clearHistory,

    // State checks with safe defaults
    canUndo: () => {
      try {
        return canUndo();
      } catch (error) {
        console.log('canUndo error:', error);
        return false;
      }
    },
    canRedo: () => {
      try {
        return canRedo();
      } catch (error) {
        console.log('canRedo error:', error);
        return false;
      }
    },
    getHistorySize: () => {
      try {
        return getHistorySize();
      } catch (error) {
        console.log('getHistorySize error:', error);
        return 0;
      }
    },

    // Current state
    getCurrentPage,
  };
};
