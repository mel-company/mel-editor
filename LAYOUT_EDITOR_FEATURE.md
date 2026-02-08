# Layout Editor Feature Implementation

## Overview
Implemented a dual-editor system where:
- **Home page**: Uses the existing deep editor with full section customization
- **Other pages** (about, menu, content): Use a new layout editor where users select from predefined layout options for each section

## Architecture

### Client-Side Components

#### 1. Layout Store (`/client/src/shared/store/editor/layout/index.tsx`)
- Manages layout selections for non-home pages
- Stores which layout variant is selected for each section on each page
- Provides methods to get/set layout selections
- Syncs with server API automatically
- Persists to local storage via Zustand

**Key Methods:**
- `setSectionLayout(pageId, sectionId, layoutId)` - Set layout for a section
- `getSelectedLayoutId(pageId, sectionId)` - Get selected layout ID
- `syncWithServer(pageId)` - Sync layout config to server
- `loadFromServer()` - Load all layouts from server

#### 2. Layout Panel (`/client/src/editor/components/side-nav/layout/`)
- **layout-panel.tsx**: Main panel shown in side navigation for non-home pages
- **layout-selector.tsx**: UI component for selecting layouts per section
- **index.tsx**: Exports for the layout components

**Features:**
- Grid view of available layout options with thumbnails
- Visual indication of selected layout
- Automatic initialization of layout config for new pages
- Auto-sync with server on layout change

#### 3. Updated Components

**Side Navigation (`/client/src/editor/components/side-nav/index.tsx`)**
- Detects current page type (home vs non-home)
- Shows "المحتوى" (Content) tab for home page
- Shows "التخطيطات" (Layouts) tab for non-home pages
- Auto-switches to appropriate tab based on page type

**Side Navigation Header (`/client/src/editor/components/side-nav/header/index.tsx`)**
- Conditionally renders tabs based on page type
- Uses `usePageStore` to determine current page

**Render Template (`/client/src/editor/components/render/index.tsx`)**
- Conditionally renders sections based on page type
- For home page: Uses deep editor (existing behavior)
- For non-home pages: Uses selected layout from layout store
- Dynamically swaps component and props based on layout selection

### Server-Side API

#### New Endpoints (`/server/api-routes.ts`)

1. **GET `/api/v1/layouts/:pageId`**
   - Get layout configuration for a specific page
   - Returns: `{ data: PageLayoutConfig | null }`

2. **POST `/api/v1/layouts/:pageId`**
   - Save layout configuration for a specific page
   - Body: `PageLayoutConfig`
   - Returns: `{ success: boolean }`

3. **GET `/api/v1/layouts`**
   - Get all layout configurations for the store
   - Returns: `{ data: PageLayoutConfig[] }`

**Storage:**
- Layout configurations stored in `stores.json` under `pageLayouts` array
- Persists alongside existing store data

## Data Structure

### PageLayoutConfig
```typescript
{
  pageId: string;
  sectionLayouts: SectionLayoutSelection[];
}
```

### SectionLayoutSelection
```typescript
{
  sectionId: string;
  selectedLayoutId: string;
}
```

## User Flow

### For Home Page (Deep Editor)
1. User navigates to home page
2. Side navigation shows "الثيم" and "المحتوى" tabs
3. User can fully customize each section:
   - Edit content (text, images, links)
   - Change section styles
   - Add/remove sections
   - Reorder sections

### For Other Pages (Layout Editor)
1. User navigates to non-home page (about, menu, etc.)
2. Side navigation automatically switches to "التخطيطات" tab
3. Layout panel displays all sections on the page
4. For each section, user sees available layout options in a grid
5. User clicks on a layout option to select it
6. Selection is:
   - Saved to local store
   - Synced to server API
   - Immediately reflected in the preview
7. Each section can have a different layout variant selected

## Benefits

1. **Simplified UX for non-home pages**: Users don't need to understand deep editing
2. **Faster page creation**: Select from pre-designed layouts instead of customizing
3. **Consistency**: Layout options ensure design consistency
4. **Flexibility**: Each section can still have multiple layout variants
5. **Scalability**: Easy to add new layout options per section type

## Technical Notes

- Layout store uses Zustand with persistence
- Server sync is automatic and non-blocking
- Fallback to default layout (section_id) if no selection exists
- Compatible with existing section structure and options
- No breaking changes to existing home page editor
- TypeScript types ensure type safety throughout

## Future Enhancements

- Add layout preview images/thumbnails for better visualization
- Support layout categories (e.g., "Modern", "Classic", "Minimal")
- Add layout search/filter functionality
- Enable layout customization within selected variant
- Add undo/redo for layout changes
