# Template System Architecture

## Overview

This document outlines the clean architecture for the template system, designed for scalability, maintainability, and ease of development for future templates.

## Architecture Principles

1. **Separation of Concerns**: Clear separation between data, components, and business logic
2. **DRY (Don't Repeat Yourself)**: Reusable components and utilities
3. **Single Responsibility**: Each module has one clear purpose
4. **Composition over Inheritance**: Build complex templates from simple, reusable parts
5. **Type Safety**: Full TypeScript support with strict typing

## Directory Structure

```
templates/
├── [store-type]/              # e.g., ecommerce, restaurant
│   ├── [template-name]/       # e.g., retail-v1, modern-cafe
│   │   ├── data/
│   │   │   ├── template/
│   │   │   │   ├── index.ts           # Main template definition
│   │   │   │   ├── pages/             # Page definitions
│   │   │   │   │   ├── home.ts
│   │   │   │   │   ├── about.ts
│   │   │   │   │   └── ...
│   │   │   │   └── sections/          # Section definitions
│   │   │   │       ├── hero/
│   │   │   │       │   ├── index.tsx  # Export
│   │   │   │       │   ├── data.ts    # Section data
│   │   │   │       │   └── components.tsx # React components
│   │   │   │       └── ...
│   │   │   ├── products/              # Mock product data
│   │   │   │   └── index.ts
│   │   │   ├── categories.ts          # Mock category data
│   │   │   └── server-export.ts       # Server-side exports
│   │   └── sections/                  # Production section components
│   │       └── page/
│   │           └── home/
│   │               └── production/
│   │                   └── navbar/
│   └── shared/                        # Shared utilities across templates
│       ├── builders/                  # Template builders
│       ├── factories/                 # Section factories
│       └── utils/                     # Helper functions
└── README.md                          # This file
```

## Core Concepts

### 1. Template Definition

A template is a complete website design with multiple pages and sections.

```typescript
export type TemplateType = {
  id: string;
  title: string;
  description: string;
  thumbnail: { url: string };
  storeType: "e-commerce" | "restaurant";
  sections: SectionType[];  // Legacy support
  pages?: PageType[];       // Multi-page support
};
```

### 2. Page Definition

A page contains multiple sections arranged in a specific order.

```typescript
export type PageType = {
  id: string;
  name: string;
  type: "home" | "about" | "content" | "menu";
  sections: SectionType[];
  templateVariants?: PageTemplateVariant[];
  selectedTemplateId?: string;
};
```

### 3. Section Definition

A section is a reusable UI component with multiple variants.

```typescript
export type SectionType = {
  id: string;
  section_id: string;        // Variant ID
  type: string;              // Section type (hero, categories, etc.)
  editable: boolean;
  options: SectionOptionType[];  // Available variants
  content?: ContentItem[];
  photos?: PhotoItem[];
  styles?: Record<string, string>;
};
```

### 4. Section Option (Variant)

Each section can have multiple design variants.

```typescript
export type SectionOptionType = {
  id: string;
  title: string;
  description?: string;
  component: React.ComponentType<any>;
  thumbnail?: { url: string };
  content?: ContentItem[];
  photos?: PhotoItem[];
  products?: ProductType[];
  categories?: CategoryType[];
};
```

## Component Hierarchy

```
Template
  └── Pages[]
      └── Sections[]
          └── Section Options[] (Variants)
              └── React Component
```

## Data Flow

1. **Template Definition** → Defines overall structure
2. **Page Builder** → Creates pages from sections
3. **Section Factory** → Creates sections with variants
4. **Component Hydration** → Renders React components with data
5. **Editor Store** → Manages state and user edits

## Key Design Patterns

### 1. Factory Pattern

Use factories to create sections with consistent structure:

```typescript
const createSection = (
  id: string,
  sectionId: string,
  type: string,
  options: SectionOptionType[],
  editable: boolean = true
): SectionType => ({
  id,
  section_id: sectionId,
  type,
  editable,
  options,
  target_id: id,
});
```

### 2. Builder Pattern

Build complex templates step by step:

```typescript
const templateBuilder = new TemplateBuilder()
  .setId("retail-v1")
  .setTitle("Modern Retail")
  .setStoreType("e-commerce")
  .addPage(homePage)
  .addPage(aboutPage)
  .build();
```

### 3. Composition Pattern

Compose sections from reusable content items:

```typescript
const heroContent = [
  createContentItem("title", "العنوان", "text", "مرحباً بك"),
  createContentItem("description", "الوصف", "textarea", "وصف المتجر"),
];
```

## Best Practices

### 1. Section Organization

- **One section type per folder**: Each section type (hero, categories, etc.) has its own folder
- **Separate data and components**: Keep data definitions separate from React components
- **Export from index**: Use index files for clean imports

### 2. Naming Conventions

- **Files**: kebab-case (e.g., `hero-section.ts`)
- **Components**: PascalCase (e.g., `HeroCarousel`)
- **Variables**: camelCase (e.g., `heroSections`)
- **Types**: PascalCase with Type suffix (e.g., `SectionType`)

### 3. Type Safety

- Always define TypeScript types
- Use strict mode
- Avoid `any` types
- Validate data at runtime when needed

### 4. Reusability

- Extract common patterns into utilities
- Create shared components for similar UI elements
- Use composition to build complex sections

### 5. Performance

- Lazy load components when possible
- Optimize images (use thumbnails for previews)
- Minimize bundle size by code splitting

## Template Lifecycle

1. **Development**: Create template files in `/templates/[store-type]/[template-name]/`
2. **Registration**: Export template in `server-export.ts`
3. **API Integration**: Template served via `/api/v1/templates`
4. **Selection**: User selects template in editor
5. **Conversion**: API data converted to internal format
6. **Hydration**: Sections hydrated with React components
7. **Rendering**: Components rendered in preview/production
8. **Editing**: User edits content via editor interface

## Migration Guide

### From Old Structure to New

1. **Identify duplicated code**: Look for repeated section definitions
2. **Extract to factories**: Create factory functions for common patterns
3. **Separate concerns**: Split data, components, and logic
4. **Add types**: Ensure full TypeScript coverage
5. **Test thoroughly**: Verify no breaking changes

## Common Patterns

### Creating a New Section Type

1. Create folder: `/templates/[store-type]/[template-name]/data/template/sections/[section-type]/`
2. Create files:
   - `index.tsx` - Export file
   - `data.ts` - Section data definitions
   - `components.tsx` - React components
3. Define section options with variants
4. Export from main template file

### Creating a New Page

1. Create file: `/templates/[store-type]/[template-name]/data/template/pages/[page-name].ts`
2. Define page structure with sections
3. Add to template's pages array
4. Configure navigation links

### Creating a New Template

1. Create folder: `/templates/[store-type]/[template-name]/`
2. Set up directory structure
3. Define template in `data/template/index.ts`
4. Create sections and pages
5. Export in `data/server-export.ts`
6. Test in editor

## Validation and Testing

### Section Validation

- Ensure all required fields are present
- Validate component references
- Check for unique IDs
- Verify content structure

### Template Validation

- All pages have valid sections
- No circular references
- Proper type assignments
- Thumbnail URLs are valid

## Performance Optimization

1. **Code Splitting**: Load sections on demand
2. **Image Optimization**: Use appropriate image sizes
3. **Lazy Loading**: Defer non-critical components
4. **Memoization**: Cache expensive computations
5. **Bundle Analysis**: Monitor bundle size

## Troubleshooting

### Common Issues

1. **Component not rendering**: Check component reference in section option
2. **Data not showing**: Verify content structure matches component props
3. **Type errors**: Ensure proper TypeScript types
4. **Missing sections**: Check section ID mapping

### Debug Tools

- React DevTools for component inspection
- Redux DevTools for state management
- Console logging for data flow
- TypeScript compiler for type checking

## Future Enhancements

1. **Template Marketplace**: Allow third-party templates
2. **Visual Template Builder**: Drag-and-drop template creation
3. **Template Versioning**: Support multiple versions
4. **Template Inheritance**: Extend existing templates
5. **A/B Testing**: Test different template variants
