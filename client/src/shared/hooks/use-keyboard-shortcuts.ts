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
          console.log('=== ZUNDO KEYBOARD UNDO TRIGGERED ===');
          console.log('Zundo keyboard undo - checking canUndo:', canUndo());
          if (canUndo()) {
            const result = undo();
            console.log('Zundo keyboard undo returned:', result?.id);
          } else {
            console.log('Zundo keyboard undo - canUndo is false');
          }
          console.log('=== ZUNDO KEYBOARD UNDO END ===');
        }

        // Ctrl+Shift+Z for redo
        if (event.ctrlKey && event.shiftKey && event.key === 'z') {
          event.preventDefault();
          console.log('=== ZUNDO KEYBOARD REDO TRIGGERED ===');
          console.log('Zundo keyboard redo - checking canRedo:', canRedo());
          if (canRedo()) {
            const result = redo();
            console.log('Zundo keyboard redo returned:', result?.id);
          } else {
            console.log('Zundo keyboard redo - canRedo is false');
          }
          console.log('=== ZUNDO KEYBOARD REDO END ===');
        }

        // Also support Ctrl+Y for redo (common alternative)
        if (event.ctrlKey && event.key === 'y') {
          event.preventDefault();
          console.log('=== ZUNDO KEYBOARD CTRL+Y REDO TRIGGERED ===');
          console.log('Zundo keyboard Ctrl+Y redo - checking canRedo:', canRedo());
          if (canRedo()) {
            const result = redo();
            console.log('Zundo keyboard Ctrl+Y redo returned:', result?.id);
          } else {
            console.log('Zundo keyboard Ctrl+Y redo - canRedo is false');
          }
          console.log('=== ZUNDO KEYBOARD CTRL+Y REDO END ===');
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
