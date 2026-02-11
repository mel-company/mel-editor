import { useState, useEffect } from "react";
import { useZundoHistory } from "../hooks/use-zundo-history";
import { useZundoTemporal } from "../store/editor/zundo-history";
import { usePageStore } from "../store/editor/page";

export const HistoryDebug = () => {
  const { getCurrentPage } = usePageStore();
  const { canUndo, canRedo, getHistorySize } = useZundoTemporal();
  const [debugInfo, setDebugInfo] = useState<string>("");

  const updateDebugInfo = () => {
    try {
      const currentPage = getCurrentPage();

      const historySize = getHistorySize();
      const canUndoValue = canUndo();
      const canRedoValue = canRedo();

      setDebugInfo(`
History Size: ${historySize}
Can Undo: ${canUndoValue}
Can Redo: ${canRedoValue}
Current Page ID: ${currentPage?.id || 'none'}
Has History: ${historySize > 0 ? 'Yes' : 'No'}
    `.trim());
    } catch (error) {
      console.log('Debug info update error:', error);
      const currentPage = getCurrentPage();
      setDebugInfo(`
History Size: 0
Can Undo: false
Can Redo: false
Current Page ID: ${currentPage?.id || 'none'}
Has History: No
Error: ${error.message}
      `.trim());
    }
  };

  // Update debug info on mount and when history changes
  useEffect(() => {
    updateDebugInfo();

    // Set up interval to update debug info
    const interval = setInterval(updateDebugInfo, 2000);

    return () => clearInterval(interval);
  }, [getCurrentPage, canUndo, canRedo, getHistorySize]);

  const handleManualUndo = () => {
    try {
      console.log('Manual undo triggered');
      const { undo } = useZundoTemporal();
      undo();
      updateDebugInfo();
    } catch (error) {
      console.log('Manual undo error:', error);
    }
  };

  const handleManualRedo = () => {
    try {
      console.log('Manual redo triggered');
      const { redo } = useZundoTemporal();
      redo();
      updateDebugInfo();
    } catch (error) {
      console.log('Manual redo error:', error);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      left: '10px',
      background: 'white',
      border: '2px solid green',
      padding: '10px',
      zIndex: 9999,
      fontSize: '12px',
      fontFamily: 'monospace'
    }}>
      <h4>Zundo History Debug</h4>
      <pre>{debugInfo}</pre>
      <button onClick={updateDebugInfo}>Refresh Info</button>
      <br />
      <button onClick={handleManualUndo} disabled={!canUndo()}>
        Manual Undo
      </button>
      <br />
      <button onClick={handleManualRedo} disabled={!canRedo()}>
        Manual Redo
      </button>
      <br />
      <small style={{ color: 'gray' }}>
        Use green "Save" button to add states
      </small>
    </div>
  );
};
