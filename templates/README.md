# Templates Directory

This directory contains all website templates for the editor system.

## Directory Structure

```
templates/
├── shared/                    # Shared utilities across all templates
│   ├── builders/             # Template and page builders
│   ├── factories/            # Section and content factories
│   ├── utils/                # Helper utilities and validators
│   └── index.ts              # Main export file
├── ecommerce/                # E-commerce templates
│   ├── retail-v1/            # Retail template version 1
│   └── [other-templates]/
└── restaurant/               # Restaurant templates
    └── [templates]/
```

## Quick Start

### Using Shared Utilities

```typescript
import { 
  TemplateBuilder, 
  PageBuilder, 
  SectionFactory, 
  ContentFactory 
} from '@templates/shared';

// Create a page using builders
const homePage = new PageBuilder()
  .setId("home")
  .setName("Home Page")
  .setType("home")
  .addSection(
    SectionFactory.createHeroSection("hero-1", "1", heroOptions)
  )
  .build();

// Create a template
const template = new TemplateBuilder()
  .setId("my-template")
  .setTitle("My Template")
  .setStoreType("e-commerce")
  .addPage(homePage)
  .build();
```

### Creating Content

```typescript
import { ContentFactory } from '@templates/shared';

// Create hero content
const heroContent = ContentFactory.createHeroContent(
  "Welcome to Our Store",
  "Discover amazing products",
  "Shop Now",
  "/products"
);

// Create custom content
const customContent = [
  ContentFactory.createText("title", "Title", "My Title"),
  ContentFactory.createTextarea("description", "Description", "My description"),
  ContentFactory.createLink("link", "Link", "/page"),
];
```

## Template Development

### 1. Create Template Folder

```bash
mkdir -p templates/[store-type]/[template-name]/data/template/sections
```

### 2. Define Sections

Create section definitions in `data/template/sections/[section-type]/`:
- `data.ts` - Section data and variants
- `components.tsx` - React components
- `index.tsx` - Export file

### 3. Define Pages

Create page definitions in `data/template/pages/`:
- `home.ts`
- `about.ts`
- `contact.ts`

### 4. Create Main Template

In `data/template/index.ts`:

```typescript
import { TemplateBuilder } from '@templates/shared';
import { homePage, aboutPage } from './pages';

export const myTemplate = new TemplateBuilder()
  .setId("my-template-v1")
  .setTitle("My Template")
  .setStoreType("e-commerce")
  .setThumbnail("https://example.com/thumb.jpg")
  .addPages([homePage, aboutPage])
  .build();
```

### 5. Export for Server

In `data/server-export.ts`:

```typescript
import { myTemplate } from './template';

export {
  myTemplate as mockTemplate
};
```

## Best Practices

### ✅ DO

- Use builders and factories for consistency
- Validate templates before deployment
- Follow naming conventions (kebab-case for files, PascalCase for components)
- Document your sections and components
- Use TypeScript for type safety
- Create reusable components
- Test templates thoroughly

### ❌ DON'T

- Hardcode values
- Duplicate code
- Skip validation
- Use `any` types
- Create monolithic sections
- Ignore accessibility
- Skip documentation

## Validation

Validate your template before deployment:

```typescript
import { TemplateValidator } from '@templates/shared';

const validation = TemplateValidator.validateTemplate(myTemplate);

if (!validation.valid) {
  console.error("Template validation failed:", validation.errors);
}
```

## Resources

- [Developer Guide](../../DEVELOPER_GUIDE_TEMPLATES.md) - Complete guide to creating templates
- [Architecture](../../TEMPLATE_ARCHITECTURE.md) - System architecture documentation
- [Type Definitions](../../client/src/shared/types/index.d.ts) - TypeScript types

## Examples

See `templates/ecommerce/retail-v1/` for a complete example template.

## Support

For questions or issues:
1. Check the [Developer Guide](../../DEVELOPER_GUIDE_TEMPLATES.md)
2. Review existing templates for examples
3. Validate your template using `TemplateValidator`
4. Check console for error messages

---

**Happy Template Building! 🚀**
