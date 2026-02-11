# 🧪 **Undo/Redo Testing Guide**

## **📋 What to Check:**

I've added extensive logging to help diagnose the issue. Please follow these steps and share the console output.

## **🔍 Testing Steps:**

### **Step 1: Refresh Browser**
- Open browser and navigate to `http://localhost:5173/editor`
- Open browser console (F12)
- Clear console logs

### **Step 2: Check Initial State**
Look for these logs on page load:
```
[ZUNDO STORE] setCurrentPage called: home-page
[ZUNDO STORE] setCurrentPage complete
[ZUNDO TEMPORAL] State saved to history: home-page
Zundo HistoryButtons render: {canUndo: false, canRedo: false, historySize: 1}
```

### **Step 3: Make First Change**
- Make any change in the editor (e.g., change section style)
- Look for these logs:
```
Auto-saving page to history: home-page
[ZUNDO STORE] updatePage called: home-page
[ZUNDO STORE] Page sections: [{id: '...', section_id: '...'}]
[ZUNDO STORE] updatePage complete
[ZUNDO TEMPORAL] State saved to history: home-page
Zundo canUndo check: true pastStates: 1
```

### **Step 4: Make Second Change**
- Make another change
- Look for similar logs with `pastStates: 2`

### **Step 5: Click Undo Button**
- Click the undo button (back arrow)
- Look for these detailed logs:
```
=== ZUNDO UNDO BUTTON CLICKED ===
Zundo undo button clicked - checking canUndo: true
=== ZUNDO UNDO TRIGGERED ===
[UNDO] Step 1: Calling zundo undo()
Zundo undo called
[UNDO] Step 2: Getting current state from zundo store
[UNDO] Step 3: Current state: {hasCurrentPage: true, pageId: 'home-page', sectionsCount: 5}
[UNDO] Step 4: Updating page store with: home-page
[UNDO] Page sections: [{id: '...', section_id: '...'}]
[UNDO] Step 5: Page store updated successfully
Zundo undo successful, current page: home-page
```

## **❓ What to Share:**

Please copy and paste the **entire console output** after:
1. Loading the page
2. Making 2 changes
3. Clicking the undo button

## **🔍 Key Things to Look For:**

### **If Auto-Save is NOT Working:**
- Missing `Auto-saving page to history` logs
- `historySize` stays at 1
- `canUndo` stays false

### **If Undo is NOT Working:**
- Undo logs appear but page doesn't change
- Error in `[UNDO] Step 3` or `[UNDO] Step 4`
- `hasCurrentPage: false` in Step 3

### **If Everything Works:**
- `historySize` increases with each change
- `canUndo` becomes true after first change
- Undo logs show all 5 steps successfully
- Page visually reverts to previous state

## **🐛 Common Issues:**

### **Issue 1: History Not Tracking**
**Symptom:** `historySize` stays at 1, no auto-save logs
**Cause:** Auto-save hook not running or not detecting changes
**Look for:** Missing `[ZUNDO STORE] updatePage` logs

### **Issue 2: Undo Called But No Effect**
**Symptom:** Undo logs appear but page doesn't change
**Cause:** Page store not updating or zundo state is wrong
**Look for:** `[UNDO] Step 3` showing wrong data

### **Issue 3: Undo Button Disabled**
**Symptom:** Can't click undo button
**Cause:** `canUndo()` returning false
**Look for:** `Zundo canUndo check: false pastStates: 0`

## **📊 Expected Full Console Flow:**

```
// Initial Load
[ZUNDO STORE] setCurrentPage called: home-page
Auto-saving page to history: home-page
[ZUNDO STORE] updatePage called: home-page
[ZUNDO TEMPORAL] State saved to history: home-page
Zundo HistoryButtons render: {canUndo: false, canRedo: false, historySize: 1}

// First Change
=== setSection called ===
Auto-saving page to history: home-page
[ZUNDO STORE] updatePage called: home-page
[ZUNDO TEMPORAL] State saved to history: home-page
Zundo canUndo check: true pastStates: 1
Zundo HistoryButtons render: {canUndo: true, canRedo: false, historySize: 2}

// Second Change
=== setSection called ===
Auto-saving page to history: home-page
[ZUNDO STORE] updatePage called: home-page
[ZUNDO TEMPORAL] State saved to history: home-page
Zundo canUndo check: true pastStates: 2
Zundo HistoryButtons render: {canUndo: true, canRedo: false, historySize: 3}

// Click Undo
=== ZUNDO UNDO BUTTON CLICKED ===
=== ZUNDO UNDO TRIGGERED ===
[UNDO] Step 1: Calling zundo undo()
Zundo undo called
[UNDO] Step 2: Getting current state from zundo store
[UNDO] Step 3: Current state: {hasCurrentPage: true, pageId: 'home-page', sectionsCount: 5}
[UNDO] Step 4: Updating page store with: home-page
[UNDO] Step 5: Page store updated successfully
Zundo canUndo check: true pastStates: 1
Zundo canRedo check: true futureStates: 1
```

## **🚀 Next Steps:**

Please share the console output and I'll identify exactly where the issue is occurring!
