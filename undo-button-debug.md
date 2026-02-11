# Undo Button Debug Guide

## Fixed Issues

1. **Added Debug Logging** - Console logs to track history state and button clicks
2. **History Initialization** - Added hook to initialize history with current page
3. **Enhanced Error Tracking** - Better visibility into what's happening

## How to Test the Undo Button

### Step 1: Check Console Logs
Open browser dev tools and look for these console messages:

1. **Initial Load:**
   ```
   Initializing history with current page
   Added to history: { historyLength: 1, currentIndex: 0 }
   HistoryButtons render: { canUndo: false, canRedo: false }
   ```

2. **After Making a Change:**
   ```
   Added to history: { historyLength: 2, currentIndex: 1 }
   HistoryButtons render: { canUndo: true, canRedo: false }
   ```

3. **After Clicking Undo:**
   ```
   Undo button clicked
   Undo called: { currentIndex: 1, historyLength: 2, canUndo: true }
   Undo successful: { newIndex: 0, returningState: {...} }
   Undo returned state, updating page
   ```

### Step 2: Test Scenarios

1. **Basic Test:**
   - Load editor
   - Make a change (edit text, color, etc.)
   - Click undo button
   - Should revert the change

2. **Multiple Changes:**
   - Make 2-3 changes
   - Click undo multiple times
   - Should step back through each change

3. **Button State:**
   - Initially: Both buttons disabled
   - After change: Undo enabled, redo disabled
   - After undo: Redo enabled
   - After redo: Undo enabled again

### Step 3: Keyboard Shortcuts
- Test Ctrl+Z for undo
- Test Ctrl+Shift+Z for redo
- Should not work in input fields

## Common Issues & Solutions

### Issue: Undo button stays disabled
**Cause:** History not initialized
**Solution:** Check for "Initializing history" console message

### Issue: Undo doesn't revert changes
**Cause:** Page update not working
**Solution:** Check for "Undo returned state, updating page" message

### Issue: Infinite loop
**Cause:** History operation flag not working
**Solution:** Check for "isHistoryOperation" behavior

## Debug Console Commands

Open browser console and run:
```javascript
// Check history state
console.log('History state:', window.useHistoryStore?.getState());

// Check page state  
console.log('Page state:', window.usePageStore?.getState());

// Manual undo test
const historyStore = window.useHistoryStore?.getState();
if (historyStore) {
  console.log('Can undo:', historyStore.canUndo());
  const result = historyStore.undo();
  console.log('Undo result:', result);
}
```

## Expected Behavior

✅ History initializes with current page state
✅ Changes are automatically tracked
✅ Undo button enables after changes
✅ Undo operation reverts last change
✅ Redo operation restores undone change
✅ Keyboard shortcuts work correctly
✅ No infinite loops or errors
