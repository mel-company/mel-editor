# Comprehensive Undo/Redo Debug Guide

## 🔧 **Debug Component Added**

I've added a **red debug panel** in the top-left corner of the editor that will help us identify exactly what's happening with the undo/redo system.

## **How to Use the Debug Panel:**

### **Step 1: Open Editor**
Navigate to `/editor` - you'll see a red debug panel in the top-left corner

### **Step 2: Check Initial State**
Click **"Refresh Info"** - you should see:
```
History Length: 0 or 1
Current Index: 0 or -1
Can Undo: false
Can Redo: false
Current Page ID: [some-id]
History Operation: No
```

### **Step 3: Manual Testing**
Use the debug panel buttons to test each part of the system:

1. **"Add Current to History"** - Manually add current page state
2. **"Manual Undo"** - Test undo without using the top nav button
3. **"Manual Redo"** - Test redo without using the top nav button
4. **"Clear History"** - Reset the history system

## **Expected Console Messages:**

### **When Loading:**
```
History tracker effect: { pagesLength: X, currentPageId: "...", historyLength: 0, ... }
Initializing history with current page: [page-id]
Added to history: { historyLength: 1, currentIndex: 0 }
```

### **When Making Changes:**
```
History tracker effect: { pagesLength: X, currentPageId: "...", historyLength: 1, ... }
Page changed, adding to history: [page-id]
Added to history: { historyLength: 2, currentIndex: 1 }
```

### **When Using Undo/Redo:**
```
Undo button clicked
Undo called: { currentIndex: 1, historyLength: 2, canUndo: true }
Undo successful: { newIndex: 0, returningState: {...} }
```

## **Debugging Checklist:**

### **✅ History Tracking:**
- [ ] History tracker effect runs on page load
- [ ] "Initializing history with current page" appears
- [ ] "Added to history" appears with increasing length
- [ ] "Page changed, adding to history" appears when making edits

### **✅ Button States:**
- [ ] Can Undo becomes true after making changes
- [ ] Can Redo becomes true after undo
- [ ] Buttons enable/disable correctly

### **✅ Undo/Redo Operations:**
- [ ] Manual undo/redo buttons work
- [ ] Top nav undo/redo buttons work
- [ ] Console shows successful operations
- [ ] Page actually changes visually

## **Common Issues & Solutions:**

### **Issue: History Length Stays 0**
**Console shows:** `No current page found`
**Cause:** Page data not loaded yet
**Solution:** Wait for page to fully load, then click "Add Current to History"

### **Issue: No "Page changed" Messages**
**Console shows:** `No page change detected or not initialized`
**Cause:** Page changes not being detected
**Solution:** Make actual visible changes to sections

### **Issue: Manual Undo Works but Top Nav Doesn't**
**Cause:** Button event handlers not working
**Solution:** Check button click logs in console

### **Issue: Undo/Redo Return Null**
**Console shows:** `Undo failed - no history available`
**Cause:** History not populated or index issues
**Solution:** Use "Add Current to History" to populate

## **Test Scenarios:**

### **Scenario 1: Basic Test**
1. Click "Refresh Info" - note initial state
2. Click "Add Current to History" - should increase length
3. Click "Manual Undo" - should work and disable undo
4. Click "Manual Redo" - should work and re-enable undo

### **Scenario 2: Real Changes Test**
1. Make a real change in the editor (edit text/color)
2. Check console for "Page changed" message
3. Use top nav undo/redo buttons
4. Verify visual changes occur

### **Scenario 3: Keyboard Shortcuts**
1. Make changes
2. Use Ctrl+Z and Ctrl+Shift+Z
3. Check console for keyboard shortcut logs

## **What to Report:**

If it's still not working, please provide:
1. **Debug panel state** (screenshot or text)
2. **Console messages** (copy all relevant logs)
3. **What happens** when you click each button
4. **Any error messages** in console

The debug panel will give us complete visibility into what's happening with the history system!
