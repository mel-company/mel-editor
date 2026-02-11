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
    console.log('=== ZUNDO UNDO TRIGGERED ===');
    console.log('[UNDO] Step 1: Calling zundo undo()');

    // Set flag to prevent auto-save from clearing redo history
    setUndoRedoInProgress(true);

    // Call undo on zundo store - this returns the previous state
    const previousState = undo();

    console.log('[UNDO] Step 2: Undo returned state:', {
      hasState: !!previousState,
      pageId: previousState?.id
    });

    if (previousState) {
      console.log('[UNDO] Step 3: Updating page store with:', previousState.id);
      console.log('[UNDO] Page sections:', previousState.sections.map(s => ({
        id: s.id,
        section_id: s.section_id
      })));
      updatePage(previousState);

      // Also restore store settings if they exist
      const currentState = useZundoHistoryStore.getState();
      if (currentState.storeSettings) {
        console.log('[UNDO] Step 4: Restoring store settings (colors, fonts)');
        updateStoreSettings(currentState.storeSettings);
      }

      console.log('[UNDO] Step 5: Page store updated successfully');

      // Reset flag after a short delay to allow the update to complete
      setTimeout(() => setUndoRedoInProgress(false), 100);

      return previousState;
    } else {
      console.log('[UNDO] Step 3: No previous state - undo failed');
      setUndoRedoInProgress(false);
    }

    return undefined;
  };

  // Enhanced redo function that also updates the page store
  const handleRedo = () => {
    console.log('=== ZUNDO REDO TRIGGERED ===');

    // Set flag to prevent auto-save from clearing redo history
    setUndoRedoInProgress(true);

    // Call redo on zundo store - this returns the next state
    const nextState = redo();

    if (nextState) {
      console.log('Zundo redo - updating page store with:', nextState.id);
      updatePage(nextState);

      // Also restore store settings if they exist
      const currentState = useZundoHistoryStore.getState();
      if (currentState.storeSettings) {
        console.log('Zundo redo - restoring store settings (colors, fonts)');
        updateStoreSettings(currentState.storeSettings);
      }

      // Reset flag after a short delay to allow the update to complete
      setTimeout(() => setUndoRedoInProgress(false), 100);

      return nextState;
    }

    setUndoRedoInProgress(false);
    return undefined;
  };

  // Function to manually save current state
  const saveCurrentState = () => {
    const currentPage = getCurrentPage();
    if (currentPage) {
      console.log('=== ZUNDO SAVE STATE TRIGGERED ===');
      console.log('Manually saving current state to zundo history:', currentPage.id);
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
