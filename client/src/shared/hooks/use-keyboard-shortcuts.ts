import { useEffect } from "react";
import { useZundoHistory } from "../hooks/use-zundo-history";

export const useKeyboardShortcuts = () => {
  const { undo, redo, canUndo, canRedo } = useZundoHistory();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if we're in an input field, textarea, or contenteditable element
      const target = event.target as HTMLElement;
      const isInputElement =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.contentEditable === 'true';

      // Only handle shortcuts if we're not in an input field
      if (!isInputElement) {
        // Ctrl+Z for undo
        if (event.ctrlKey && event.key === 'z' && !event.shiftKey) {
          event.preventDefault();
          if (canUndo()) {
            undo();
          }
        }

        // Ctrl+Shift+Z for redo
        if (event.ctrlKey && event.shiftKey && event.key === 'z') {
          event.preventDefault();
          if (canRedo()) {
            redo();
          }
        }

        // Also support Ctrl+Y for redo (common alternative)
        if (event.ctrlKey && event.key === 'y') {
          event.preventDefault();
          if (canRedo()) {
            redo();
          }
        }
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [undo, redo, canUndo, canRedo]);
};
