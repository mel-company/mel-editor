# Page Template System - Implementation Guide

## Overview

Implemented a **page-level template system** where:
- **Home page**: Uses the existing deep editor with full section customization
- **Other pages** (about, menu, content): Can select from multiple complete page template layouts
- Each template contains the **same sections** but with different arrangements, styles, and designs

## Key Concept

Instead of editing individual sections, users select a complete page layout template. Think of it like choosing between "Modern Layout", "Classic Layout", "Minimal Layout" - each template has all the same sections (hero, features, contact, etc.) but arranged and styled differently.

## Architecture

### 1. Type Definitions (`/client/src/shared/types/index.d.ts`)

```typescript
export type PageType = {
  id: string;
  name: string;
  type: "home" | "about" | "content" | "menu";
  sections: SectionType[];
  templateVariants?: PageTemplateVariant[]; // Available template layouts
  selectedTemplateId?: string; // Currently selected template
};

export type PageTemplateVariant = {
  id: string;
  title: string;
  description?: string;
  thumbnail?: { url: string };
  sections: SectionType[]; // Complete section configuration
};
```

### 2. Page Template Store (`/client/src/shared/store/editor/page-template/index.tsx`)

**Purpose**: Manages which template is selected for each non-home page

**Key Methods**:
- `getSelectedTemplateId(pageId)` - Get selected template ID for a page
- `setPageTemplate(pageId, templateId)` - Set template for a page
- `syncWithServer(pageId)` - Sync selection to server
- `loadFromServer()` - Load all selections from server

**Data Structure**:
```typescript
{
  pageTemplates: [
    {
      pageId: "about",
      selectedTemplateId: "modern-layout"
    }
  ]
}
```

### 3. UI Components (`/client/src/editor/components/side-nav/page-template/`)

#### **TemplatePanel** - Main panel for non-home pages
- Shows when user navigates to non-home page
- Displays available template options
- Replaces the deep editor interface

#### **TemplateSelector** - Template selection UI
- Shows all available templates in a list
- Each template displays:
  - Thumbnail preview
  - Title and description
  - Number of sections
  - Selection indicator
- Auto-syncs selection to server

### 4. Template Application (`/client/src/shared/hooks/use-template-structure.ts`)

The hook checks if a page has template variants and applies the selected one:

```typescript
// For non-home pages with template variants
if (page && page.type !== "home" && page.templateVariants?.length > 0) {
    const selectedTemplateId = getSelectedTemplateId(page.id);
    const selectedTemplate = page.templateVariants.find(t => t.id === selectedTemplateId);
    
    // Use selected template's sections
    if (selectedTemplate) {
        currentPage = {
            ...currentPage,
            sections: selectedTemplate.sections
        };
    }
}
```

### 5. Side Navigation Updates

**Header** (`/client/src/editor/components/side-nav/header/index.tsx`):
- For home page: Shows "الثيم" and "المحتوى" tabs
- For other pages: Shows "الثيم" and "التخطيطات" tabs

**Main Nav** (`/client/src/editor/components/side-nav/index.tsx`):
- Auto-switches to "التخطيطات" tab for non-home pages
- Renders `TemplatePanel` instead of content editor

### 6. Server API (`/server/api-routes.ts`)

Three new endpoints:

**GET `/api/v1/page-templates/:pageId`**
- Get template selection for a specific page
- Returns: `{ data: { pageId, selectedTemplateId } | null }`

**POST `/api/v1/page-templates/:pageId`**
- Save template selection for a page
- Body: `{ pageId: string, selectedTemplateId: string }`
- Returns: `{ success: boolean }`

**GET `/api/v1/page-templates`**
- Get all template selections for the store
- Returns: `{ data: PageTemplateSelection[] }`

**Storage**: Stored in `stores.json` under `pageTemplates` array

## How to Define Page Templates

To add template variants to a page, update the page definition:

```typescript
{
  id: "about",
  name: "About Us",
  type: "about",
  sections: [ /* default sections */ ],
  templateVariants: [
    {
      id: "modern",
      title: "Modern Layout",
      description: "Clean and contemporary design",
      thumbnail: { url: "/templates/about-modern.png" },
      sections: [
        // Complete section configuration for modern layout
        { type: "hero", section_id: "hero-1", /* ... */ },
        { type: "features", section_id: "features-2", /* ... */ },
        { type: "contact", section_id: "contact-1", /* ... */ }
      ]
    },
    {
      id: "classic",
      title: "Classic Layout",
      description: "Traditional and elegant design",
      thumbnail: { url: "/templates/about-classic.png" },
      sections: [
        // Complete section configuration for classic layout
        { type: "hero", section_id: "hero-2", /* ... */ },
        { type: "features", section_id: "features-1", /* ... */ },
        { type: "contact", section_id: "contact-2", /* ... */ }
      ]
    }
  ]
}
```

## User Flow

### For Home Page (Deep Editor)
1. User navigates to home page
2. Side navigation shows "المحتوى" tab
3. User can:
   - Edit content (text, images, links)
   - Change section styles
   - Add/remove sections
   - Reorder sections
   - Full customization available

### For Other Pages (Template Selector)
1. User navigates to non-home page (about, menu, etc.)
2. Side navigation automatically switches to "التخطيطات" tab
3. Template panel displays available layouts
4. User sees:
   - List of complete page templates
   - Preview thumbnails
   - Template descriptions
5. User clicks on a template to select it
6. Selection is:
   - Saved to local store
   - Synced to server API
   - Immediately applied to preview
7. All sections in the template are rendered with their predefined configurations

## Benefits

1. **Simplified UX**: Users don't need to understand complex editing for non-home pages
2. **Consistency**: Pre-designed templates ensure professional appearance
3. **Speed**: Instant page creation by selecting a template
4. **Flexibility**: Multiple template options per page type
5. **Maintainability**: Templates can be updated centrally

## Example: About Page Templates

**Template 1: "Modern"**
- Hero with large image on left, text on right
- 3-column features grid
- Contact form at bottom

**Template 2: "Classic"**
- Centered hero with background image
- 2-column features layout
- Contact info with map

**Template 3: "Minimal"**
- Simple text-based hero
- Single column features list
- Minimal contact section

All three templates have hero, features, and contact sections - just arranged and styled differently.

## Migration Notes

- Old section-level layout system has been replaced
- Home page behavior unchanged (still uses deep editor)
- Non-home pages now use template selection
- Template data stored separately from page data
- Backward compatible - pages without templates use default sections

## Next Steps

1. **Create template variants** for each page type (about, menu, content)
2. **Design thumbnails** for each template option
3. **Test template switching** to ensure smooth transitions
4. **Add more templates** based on user needs
5. **Consider template categories** (e.g., "Business", "Creative", "Minimal")

## Technical Notes

- Template selection persists in Zustand store with local storage
- Server sync is automatic and non-blocking
- Template sections are fully hydrated with components
- Fallback to first template if no selection exists
- TypeScript types ensure type safety throughout
- No breaking changes to existing home page functionality
