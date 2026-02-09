# Developer Guide: Creating Templates

## Table of Contents

1. [Introduction](#introduction)
2. [Quick Start](#quick-start)
3. [Template Structure](#template-structure)
4. [Creating Your First Template](#creating-your-first-template)
5. [Section Development](#section-development)
6. [Page Configuration](#page-configuration)
7. [Advanced Features](#advanced-features)
8. [Best Practices](#best-practices)
9. [Testing & Validation](#testing--validation)
10. [Troubleshooting](#troubleshooting)

---

## Introduction

This guide will walk you through creating new templates for the editor system. Templates are pre-designed website layouts that users can select and customize.

### What You'll Learn

- How to structure a new template
- How to create reusable sections
- How to define multiple page layouts
- How to add section variants
- How to integrate with the editor

### Prerequisites

- Basic TypeScript/React knowledge
- Understanding of the project structure
- Familiarity with the type system (`@/shared/types`)

---

## Quick Start

### 5-Minute Template

Here's how to create a basic template in 5 minutes:

```typescript
// 1. Create: /templates/ecommerce/my-template/data/template/index.ts

import { TemplateType, PageType } from "@/shared/types";

// 2. Define a simple page
const homePage: PageType = {
  id: "home",
  name: "Home",
  type: "home",
  sections: [
    {
      id: "hero-1",
      section_id: "1",
      type: "hero",
      editable: true,
      options: [], // We'll add these next
    }
  ],
};

// 3. Export the template
export const myTemplate: TemplateType = {
  id: "my-template",
  title: "My First Template",
  description: "A simple template",
  storeType: "e-commerce",
  thumbnail: { url: "" },
  sections: [],
  pages: [homePage],
};
```

---

## Template Structure

### Folder Organization

```
templates/
└── [store-type]/           # ecommerce or restaurant
    └── [template-name]/    # your-template-name
        ├── data/
        │   ├── template/
        │   │   ├── index.ts           # Main template file
        │   │   ├── pages/             # Page definitions
        │   │   │   ├── home.ts
        │   │   │   ├── about.ts
        │   │   │   └── contact.ts
        │   │   └── sections/          # Section definitions
        │   │       ├── hero/
        │   │       │   ├── index.tsx
        │   │       │   ├── data.ts
        │   │       │   └── components.tsx
        │   │       ├── categories/
        │   │       └── products/
        │   ├── products/              # Mock data
        │   │   └── index.ts
        │   ├── categories.ts
        │   └── server-export.ts       # Export for server
        └── sections/                  # Production components
            └── page/
                └── home/
                    └── production/
```

### File Naming Conventions

- **Folders**: `kebab-case` (e.g., `my-section`)
- **TypeScript files**: `kebab-case.ts` (e.g., `hero-section.ts`)
- **React components**: `PascalCase` (e.g., `HeroCarousel`)
- **Data files**: `data.ts`, `index.ts`

---

## Creating Your First Template

### Step 1: Create Template Folder

```bash
mkdir -p templates/ecommerce/my-store/data/template/sections
mkdir -p templates/ecommerce/my-store/data/products
```

### Step 2: Define Template Metadata

Create `/templates/ecommerce/my-store/data/template/index.ts`:

```typescript
import { TemplateType } from "@/shared/types";

export const myStoreTemplate: TemplateType = {
  id: "my-store-v1",
  title: "My Store Template",
  description: "A modern e-commerce template",
  storeType: "e-commerce",
  thumbnail: {
    url: "https://example.com/thumbnail.jpg"
  },
  sections: [], // Legacy support
  pages: [],    // We'll add pages next
};
```

### Step 3: Create Your First Section

Create `/templates/ecommerce/my-store/data/template/sections/hero/data.ts`:

```typescript
import { SectionOptionType } from "@/shared/types";

export const hero_sections: SectionOptionType[] = [
  {
    id: "1",
    title: "Simple Hero",
    description: "Text-only hero section",
    thumbnail: {
      url: "https://example.com/hero-preview.jpg"
    },
    content: [
      {
        id: "title",
        label: "Title",
        name: "title",
        type: "text",
        value: "Welcome to Our Store"
      },
      {
        id: "description",
        label: "Description",
        name: "description",
        type: "textarea",
        value: "Discover amazing products"
      }
    ]
  }
];
```

### Step 4: Create React Component

Create `/templates/ecommerce/my-store/data/template/sections/hero/components.tsx`:

```typescript
import React from "react";

interface HeroProps {
  content: {
    title: { value: string };
    description: { value: string };
  };
}

export const SimpleHero: React.FC<HeroProps> = ({ content }) => {
  return (
    <section className="py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">
        {content.title.value}
      </h1>
      <p className="text-lg text-gray-600">
        {content.description.value}
      </p>
    </section>
  );
};
```

### Step 5: Link Component to Data

Update `/templates/ecommerce/my-store/data/template/sections/hero/data.ts`:

```typescript
import { SectionOptionType } from "@/shared/types";
import { SimpleHero } from "./components";

export const hero_sections: SectionOptionType[] = [
  {
    id: "1",
    title: "Simple Hero",
    description: "Text-only hero section",
    component: SimpleHero, // ← Add component reference
    thumbnail: { url: "..." },
    content: [...]
  }
];
```

### Step 6: Export Section

Create `/templates/ecommerce/my-store/data/template/sections/hero/index.tsx`:

```typescript
export * from "./data";
```

### Step 7: Create a Page

Create `/templates/ecommerce/my-store/data/template/pages/home.ts`:

```typescript
import { PageType } from "@/shared/types";
import { hero_sections } from "../sections/hero";

export const homePage: PageType = {
  id: "home",
  name: "Home Page",
  type: "home",
  sections: [
    {
      id: "home-hero",
      section_id: "1", // Matches hero_sections[0].id
      type: "hero",
      editable: true,
      options: hero_sections,
      target_id: "home-hero"
    }
  ]
};
```

### Step 8: Add Page to Template

Update `/templates/ecommerce/my-store/data/template/index.ts`:

```typescript
import { TemplateType } from "@/shared/types";
import { homePage } from "./pages/home";

export const myStoreTemplate: TemplateType = {
  id: "my-store-v1",
  title: "My Store Template",
  description: "A modern e-commerce template",
  storeType: "e-commerce",
  thumbnail: { url: "..." },
  sections: [],
  pages: [homePage] // ← Add your page
};
```

### Step 9: Export for Server

Create `/templates/ecommerce/my-store/data/server-export.ts`:

```typescript
import { myStoreTemplate } from './template';

export {
  myStoreTemplate as mockTemplate
};
```

---

## Section Development

### Section Anatomy

A section consists of three parts:

1. **Data Definition** (`data.ts`) - Section metadata and content structure
2. **React Components** (`components.tsx`) - UI implementation
3. **Export** (`index.tsx`) - Public API

### Content Types

Sections can have different content types:

```typescript
// Text input
{
  id: "title",
  name: "title",
  type: "text",
  label: "Title",
  value: "Default value"
}

// Textarea
{
  id: "description",
  name: "description",
  type: "textarea",
  label: "Description",
  value: "Long text..."
}

// Link
{
  id: "button_link",
  name: "button_link",
  type: "link",
  label: "Button Link",
  value: "/products"
}

// Image
{
  id: "hero_image",
  name: "hero_image",
  type: "image",
  label: "Hero Image",
  value: "https://..."
}
```

### Creating Section Variants

Variants allow users to switch between different designs for the same section type:

```typescript
export const hero_sections: SectionOptionType[] = [
  {
    id: "1",
    title: "Text Only",
    component: HeroTextOnly,
    content: [...]
  },
  {
    id: "2",
    title: "With Image",
    component: HeroWithImage,
    content: [...],
    photos: [
      {
        id: "hero_image",
        label: "Hero Image",
        url: ""
      }
    ]
  },
  {
    id: "3",
    title: "Carousel",
    component: HeroCarousel,
    content: [...],
    photos: [
      { id: "slide_1", label: "Slide 1", url: "" },
      { id: "slide_2", label: "Slide 2", url: "" }
    ]
  }
];
```

### Working with Photos

```typescript
// In data.ts
photos: [
  {
    id: "product_image",
    label: "Product Image",
    url: "https://example.com/default.jpg"
  }
]

// In component
interface Props {
  photos: Array<{ id: string; url: string; label: string }>;
}

export const ProductCard: React.FC<Props> = ({ photos }) => {
  const mainImage = photos.find(p => p.id === "product_image");
  
  return (
    <img src={mainImage?.url} alt={mainImage?.label} />
  );
};
```

### Working with Products

```typescript
// In data.ts
products: [
  {
    id: "1",
    name: "Product 1",
    price: 99.99,
    thumbnail: { url: "..." },
    // ... other fields
  }
]

// In component
interface Props {
  products: ProductType[];
}

export const ProductGrid: React.FC<Props> = ({ products }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
```

### Working with Categories

```typescript
// In data.ts
categories: [
  {
    id: "1",
    name: "Electronics",
    thumbnail: { url: "..." }
  }
]

// In component
interface Props {
  categories: CategoryType[];
}

export const CategoryGrid: React.FC<Props> = ({ categories }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {categories.map(category => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
};
```

---

## Page Configuration

### Page Types

The system supports four page types:

- `home` - Main landing page (uses deep editor)
- `about` - About page
- `content` - Generic content page
- `menu` - Menu/catalog page

### Creating Multiple Pages

```typescript
// pages/home.ts
export const homePage: PageType = {
  id: "home",
  name: "Home",
  type: "home",
  sections: [heroSection, categoriesSection, productsSection]
};

// pages/about.ts
export const aboutPage: PageType = {
  id: "about",
  name: "About Us",
  type: "about",
  sections: [heroSection, storySection, contactSection]
};

// template/index.ts
export const template: TemplateType = {
  // ...
  pages: [homePage, aboutPage]
};
```

### Page Template Variants

For non-home pages, you can provide multiple layout variants:

```typescript
export const aboutPage: PageType = {
  id: "about",
  name: "About Us",
  type: "about",
  sections: [], // Default sections
  templateVariants: [
    {
      id: "modern",
      title: "Modern Layout",
      description: "Clean and contemporary",
      thumbnail: { url: "..." },
      sections: [
        // Complete section configuration
      ]
    },
    {
      id: "classic",
      title: "Classic Layout",
      description: "Traditional design",
      thumbnail: { url: "..." },
      sections: [
        // Different section arrangement
      ]
    }
  ]
};
```

---

## Advanced Features

### Helper Functions

Create reusable helpers for common patterns:

```typescript
// utils/section-factory.ts
export const createSection = (
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

// Usage
const heroSection = createSection(
  "home-hero",
  "1",
  "hero",
  hero_sections,
  true
);
```

### Content Factory

```typescript
// utils/content-factory.ts
export const createContentItem = (
  name: string,
  label: string,
  type: 'text' | 'textarea' | 'link' | 'image',
  value: string
): ContentItem => ({
  id: name,
  name,
  label,
  type,
  value
});

// Usage
const heroContent = [
  createContentItem("title", "Title", "text", "Welcome"),
  createContentItem("description", "Description", "textarea", "...")
];
```

### Styling Sections

Add custom styles to sections:

```typescript
{
  id: "hero-1",
  section_id: "1",
  type: "hero",
  editable: true,
  options: hero_sections,
  styles: {
    backgroundColor: "#f5f5f5",
    textColor: "#333333",
    padding: "80px 0",
    borderRadius: "8px"
  }
}
```

### Dynamic Content

Use functions to generate dynamic content:

```typescript
const generateProducts = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `product-${i}`,
    name: `Product ${i + 1}`,
    price: Math.random() * 100,
    thumbnail: { url: `https://picsum.photos/200?random=${i}` }
  }));
};

const productsSection = {
  // ...
  products: generateProducts(12)
};
```

---

## Best Practices

### 1. Component Design

✅ **DO:**
- Keep components small and focused
- Use TypeScript for type safety
- Handle missing data gracefully
- Use semantic HTML

❌ **DON'T:**
- Hardcode values
- Use inline styles (use Tailwind classes)
- Ignore accessibility
- Create deeply nested components

### 2. Data Structure

✅ **DO:**
```typescript
// Good: Clear, typed structure
const content = [
  {
    id: "title",
    name: "title",
    type: "text" as const,
    label: "Title",
    value: "Welcome"
  }
];
```

❌ **DON'T:**
```typescript
// Bad: Untyped, unclear structure
const content = {
  title: "Welcome",
  desc: "Some text"
};
```

### 3. Reusability

✅ **DO:**
- Extract common patterns
- Create shared utilities
- Use composition
- Document your code

❌ **DON'T:**
- Copy-paste code
- Create monolithic sections
- Hardcode values
- Skip documentation

### 4. Performance

✅ **DO:**
- Optimize images
- Lazy load components
- Memoize expensive operations
- Use proper React keys

❌ **DON'T:**
- Load all images at once
- Create unnecessary re-renders
- Use large bundle sizes
- Ignore performance metrics

### 5. Naming

✅ **DO:**
```typescript
// Clear, descriptive names
const heroWithCarousel = { ... };
const productGridSection = { ... };
```

❌ **DON'T:**
```typescript
// Vague, unclear names
const section1 = { ... };
const temp = { ... };
```

---

## Testing & Validation

### Manual Testing Checklist

- [ ] Template appears in template selector
- [ ] All sections render correctly
- [ ] Content is editable in editor
- [ ] Images upload and display
- [ ] Section variants switch properly
- [ ] Responsive design works
- [ ] No console errors
- [ ] Performance is acceptable

### Validation Script

```typescript
// utils/validate-template.ts
export const validateTemplate = (template: TemplateType): boolean => {
  // Check required fields
  if (!template.id || !template.title) {
    console.error("Missing required template fields");
    return false;
  }
  
  // Check pages
  if (!template.pages || template.pages.length === 0) {
    console.error("Template must have at least one page");
    return false;
  }
  
  // Check sections
  for (const page of template.pages) {
    for (const section of page.sections) {
      if (!section.options || section.options.length === 0) {
        console.error(`Section ${section.id} has no options`);
        return false;
      }
      
      // Check components
      for (const option of section.options) {
        if (!option.component) {
          console.error(`Option ${option.id} missing component`);
          return false;
        }
      }
    }
  }
  
  return true;
};
```

---

## Troubleshooting

### Common Issues

#### 1. Section Not Rendering

**Problem**: Section appears blank or doesn't render

**Solutions**:
- Check that `component` is defined in section option
- Verify `section_id` matches an option `id`
- Ensure component is properly exported
- Check for TypeScript errors

#### 2. Content Not Updating

**Problem**: Edited content doesn't appear

**Solutions**:
- Verify content structure matches component props
- Check that `editable: true` is set
- Ensure content names match between data and component
- Clear browser cache

#### 3. Images Not Loading

**Problem**: Images show broken or don't load

**Solutions**:
- Check image URLs are valid
- Verify photo IDs match between data and component
- Ensure CORS is configured for external images
- Check network tab for errors

#### 4. Type Errors

**Problem**: TypeScript compilation errors

**Solutions**:
- Import types from `@/shared/types`
- Ensure all required fields are present
- Use proper type annotations
- Run `npm run type-check`

### Debug Tips

```typescript
// Add logging to components
export const MyComponent: React.FC<Props> = (props) => {
  console.log("Component props:", props);
  
  // Check for missing data
  if (!props.content) {
    console.error("Missing content in MyComponent");
    return <div>Error: Missing content</div>;
  }
  
  return <div>...</div>;
};
```

---

## Examples

### Complete Hero Section Example

```typescript
// sections/hero/data.ts
import { SectionOptionType } from "@/shared/types";
import { HeroSimple, HeroWithImage } from "./components";

export const hero_sections: SectionOptionType[] = [
  {
    id: "1",
    title: "Simple Hero",
    description: "Text-centered hero",
    component: HeroSimple,
    thumbnail: {
      url: "https://example.com/hero-simple.jpg"
    },
    content: [
      {
        id: "title",
        name: "title",
        type: "text",
        label: "Title",
        value: "Welcome to Our Store"
      },
      {
        id: "subtitle",
        name: "subtitle",
        type: "text",
        label: "Subtitle",
        value: "Quality Products"
      },
      {
        id: "cta_text",
        name: "cta_text",
        type: "text",
        label: "Button Text",
        value: "Shop Now"
      },
      {
        id: "cta_link",
        name: "cta_link",
        type: "link",
        label: "Button Link",
        value: "/products"
      }
    ]
  },
  {
    id: "2",
    title: "Hero with Image",
    description: "Hero with background image",
    component: HeroWithImage,
    thumbnail: {
      url: "https://example.com/hero-image.jpg"
    },
    content: [
      {
        id: "title",
        name: "title",
        type: "text",
        label: "Title",
        value: "Premium Collection"
      },
      {
        id: "description",
        name: "description",
        type: "textarea",
        label: "Description",
        value: "Discover our latest products"
      }
    ],
    photos: [
      {
        id: "background",
        label: "Background Image",
        url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8"
      }
    ]
  }
];

// sections/hero/components.tsx
import React from "react";

interface ContentMap {
  [key: string]: { value: string };
}

interface HeroSimpleProps {
  content: ContentMap;
}

export const HeroSimple: React.FC<HeroSimpleProps> = ({ content }) => {
  return (
    <section className="py-20 text-center bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-4">
          {content.title?.value || ""}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {content.subtitle?.value || ""}
        </p>
        <a
          href={content.cta_link?.value || "#"}
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {content.cta_text?.value || "Learn More"}
        </a>
      </div>
    </section>
  );
};

interface Photo {
  id: string;
  url?: string;
  label: string;
}

interface HeroWithImageProps {
  content: ContentMap;
  photos: Photo[];
}

export const HeroWithImage: React.FC<HeroWithImageProps> = ({ 
  content, 
  photos 
}) => {
  const bgImage = photos.find(p => p.id === "background");
  
  return (
    <section 
      className="relative py-32 bg-cover bg-center"
      style={{ 
        backgroundImage: bgImage?.url 
          ? `url(${bgImage.url})` 
          : undefined 
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="container mx-auto px-4 relative z-10 text-white text-center">
        <h1 className="text-6xl font-bold mb-6">
          {content.title?.value || ""}
        </h1>
        <p className="text-xl max-w-2xl mx-auto">
          {content.description?.value || ""}
        </p>
      </div>
    </section>
  );
};

// sections/hero/index.tsx
export * from "./data";
```

---

## Next Steps

1. **Explore existing templates** in `/templates/ecommerce/retail-v1/`
2. **Create a test template** following this guide
3. **Review the architecture** in `TEMPLATE_ARCHITECTURE.md`
4. **Join the discussion** if you have questions
5. **Contribute improvements** to this guide

## Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- Project Types: `/client/src/shared/types/index.d.ts`
- Example Template: `/templates/ecommerce/retail-v1/`

---

**Happy Template Building! 🚀**
