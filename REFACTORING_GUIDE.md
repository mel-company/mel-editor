# Template Refactoring Guide

## Overview

This guide shows how to refactor existing templates to use the new clean architecture with builders, factories, and utilities.

## Before and After Comparison

### ❌ Before (Old Approach)

```typescript
// Helper function for each template
const createSection = (id: string, sectionId: string, type: string, options: any[], editable: boolean = true) => ({
  id,
  section_id: sectionId,
  type,
  editable,
  options,
  target_id: id,
});

// Manual page creation
const homePage: PageType = {
  id: "home-page",
  name: "الصفحة الرئيسية",
  type: "home",
  sections: [
    createSection("home-nav", "1", "navigation", navigation_sections, false),
    createSection("home-hero", "3", "hero", hero_sections, true),
    createSection("home-categories", "1", "categories", categories_sections, true),
    // ... more sections
  ],
};

// Manual template creation
export const mockTemplate: TemplateType = {
  id: "cklsmvdlkvmds",
  title: "Template 1",
  description: "Template 1 description",
  storeType: "e-commerce",
  thumbnail: { url: "" },
  sections: [],
  pages: [homePage, aboutPage, productsPage, contactPage],
};
```

**Problems:**
- ❌ Duplicated `createSection` helper in every template
- ❌ Manual object creation prone to errors
- ❌ No validation
- ❌ Inconsistent structure across templates
- ❌ Hard to maintain

### ✅ After (New Approach)

```typescript
import { TemplateBuilder, PageBuilder, SectionFactory } from "@templates/shared";

// Clean page creation with builder
const homePage: PageType = new PageBuilder()
  .setId("home-page")
  .setName("الصفحة الرئيسية")
  .setType("home")
  .addSections([
    SectionFactory.createNavigationSection("home-nav", "1", navigation_sections, false),
    SectionFactory.createHeroSection("home-hero", "3", hero_sections, true),
    SectionFactory.createCategoriesSection("home-categories", "1", categories_sections, true),
  ])
  .build();

// Clean template creation with builder
export const mockTemplate: TemplateType = new TemplateBuilder()
  .setId("cklsmvdlkvmds")
  .setTitle("Template 1")
  .setDescription("Template 1 description")
  .setStoreType("e-commerce")
  .setThumbnail("")
  .addPages([homePage, aboutPage, productsPage, contactPage])
  .build();
```

**Benefits:**
- ✅ No code duplication
- ✅ Built-in validation
- ✅ Type-safe fluent API
- ✅ Consistent across all templates
- ✅ Easy to maintain and extend

## Step-by-Step Refactoring

### Step 1: Import Shared Utilities

Replace local helpers with shared utilities:

```typescript
// Old
const createSection = (id, sectionId, type, options, editable) => ({ ... });

// New
import { SectionFactory } from "@templates/shared";
```

### Step 2: Refactor Section Creation

Replace manual section creation with factory methods:

```typescript
// Old
createSection("home-hero", "1", "hero", hero_sections, true)

// New
SectionFactory.createHeroSection("home-hero", "1", hero_sections, true)
```

Available factory methods:
- `createHeroSection()`
- `createCategoriesSection()`
- `createProductsSection()`
- `createFooterSection()`
- `createNavigationSection()`
- `createContactSection()`
- `createOurStorySection()`
- `createSection()` - Generic method

### Step 3: Refactor Page Creation

Use `PageBuilder` for pages:

```typescript
// Old
const homePage: PageType = {
  id: "home",
  name: "Home",
  type: "home",
  sections: [section1, section2],
};

// New
const homePage: PageType = new PageBuilder()
  .setId("home")
  .setName("Home")
  .setType("home")
  .addSections([section1, section2])
  .build();
```

### Step 4: Refactor Template Creation

Use `TemplateBuilder` for templates:

```typescript
// Old
export const mockTemplate: TemplateType = {
  id: "my-template",
  title: "My Template",
  description: "Description",
  storeType: "e-commerce",
  thumbnail: { url: "" },
  sections: [],
  pages: [homePage],
};

// New
export const mockTemplate: TemplateType = new TemplateBuilder()
  .setId("my-template")
  .setTitle("My Template")
  .setDescription("Description")
  .setStoreType("e-commerce")
  .setThumbnail("")
  .addPages([homePage])
  .build();
```

### Step 5: Refactor Content Creation

Use `ContentFactory` for content items:

```typescript
// Old
content: [
  {
    id: "title",
    label: "العنوان",
    name: "title",
    type: "text",
    value: "مرحباً",
  },
  {
    id: "description",
    label: "الوصف",
    name: "description",
    type: "textarea",
    value: "وصف",
  },
]

// New
import { ContentFactory } from "@templates/shared";

content: [
  ContentFactory.createText("title", "العنوان", "مرحباً"),
  ContentFactory.createTextarea("description", "الوصف", "وصف"),
]

// Or use pre-built content
content: ContentFactory.createHeroContent(
  "مرحباً",
  "وصف",
  "تسوق الآن",
  "/products"
)
```

## Common Refactoring Patterns

### Pattern 1: Multiple Sections of Same Type

```typescript
// Old - Repeated createSection calls
const sections = [
  createSection("hero-1", "1", "hero", hero_sections, true),
  createSection("hero-2", "2", "hero", hero_sections, true),
  createSection("hero-3", "3", "hero", hero_sections, true),
];

// New - Use factory method
const sections = [
  SectionFactory.createHeroSection("hero-1", "1", hero_sections),
  SectionFactory.createHeroSection("hero-2", "2", hero_sections),
  SectionFactory.createHeroSection("hero-3", "3", hero_sections),
];
```

### Pattern 2: Sections with Custom Styles

```typescript
// Old
const styledSection = {
  ...createSection("hero-1", "1", "hero", hero_sections, true),
  styles: {
    backgroundColor: "#f5f5f5",
    padding: "80px 0",
  },
};

// New
const styledSection = SectionFactory.createStyledSection(
  "hero-1",
  "1",
  "hero",
  hero_sections,
  {
    backgroundColor: "#f5f5f5",
    padding: "80px 0",
  },
  true
);
```

### Pattern 3: Dynamic Content

```typescript
// Old
const content = [
  { id: "title", name: "title", type: "text", label: "Title", value: title },
  { id: "desc", name: "description", type: "textarea", label: "Desc", value: desc },
];

// New
import { ContentFactory } from "@templates/shared";

const content = [
  ContentFactory.createText("title", "Title", title),
  ContentFactory.createTextarea("description", "Desc", desc),
];
```

## Validation After Refactoring

Always validate your refactored template:

```typescript
import { TemplateValidator } from "@templates/shared";

// Validate template
const validation = TemplateValidator.validateTemplate(mockTemplate);

if (!validation.valid) {
  console.error("Validation errors:", validation.errors);
  throw new Error("Template validation failed");
}

// Check for duplicate IDs
const duplicateCheck = TemplateValidator.checkDuplicateIds(mockTemplate);

if (!duplicateCheck.valid) {
  console.error("Duplicate IDs:", duplicateCheck.duplicates);
  throw new Error("Duplicate IDs found");
}

// Or use combined validation with logging
TemplateValidator.validateAndLog(mockTemplate);
```

## Migration Checklist

- [ ] Import shared utilities (`@templates/shared`)
- [ ] Replace local helper functions with factories
- [ ] Refactor section creation to use `SectionFactory`
- [ ] Refactor page creation to use `PageBuilder`
- [ ] Refactor template creation to use `TemplateBuilder`
- [ ] Refactor content creation to use `ContentFactory`
- [ ] Add validation using `TemplateValidator`
- [ ] Test template in editor
- [ ] Verify all sections render correctly
- [ ] Check for console errors
- [ ] Update documentation

## Testing Your Refactored Template

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Check for TypeScript errors**
   ```bash
   npm run type-check
   ```

3. **Test in development**
   ```bash
   npm run dev
   ```

4. **Verify in editor**
   - Select your template
   - Check all pages load
   - Verify sections render
   - Test section switching
   - Edit content
   - Save changes

## Common Issues and Solutions

### Issue 1: Import Errors

**Problem**: Cannot find module `@templates/shared`

**Solution**: Ensure TypeScript path alias is configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@templates/*": ["templates/*"]
    }
  }
}
```

### Issue 2: Type Errors

**Problem**: Type mismatch errors

**Solution**: Ensure you're importing types from the correct location:

```typescript
import { TemplateType, PageType, SectionType } from "@/shared/types";
```

### Issue 3: Validation Failures

**Problem**: Template validation fails

**Solution**: Check validation errors and fix:

```typescript
const validation = TemplateValidator.validateTemplate(template);
console.log(validation.errors); // See what's wrong
```

## Best Practices

1. **Always use builders** for templates and pages
2. **Use factory methods** for sections
3. **Validate templates** before deployment
4. **Keep content in factories** when possible
5. **Document your changes** in comments
6. **Test thoroughly** after refactoring
7. **Use TypeScript** strictly (no `any` types)

## Example: Complete Refactored Template

See `templates/ecommerce/retail-v1/data/template/index.refactored.ts` for a complete example of a refactored template.

## Benefits Summary

| Aspect | Before | After |
|--------|--------|-------|
| Code Lines | ~139 | ~90 |
| Duplication | High | None |
| Type Safety | Manual | Built-in |
| Validation | None | Automatic |
| Maintainability | Low | High |
| Consistency | Variable | Enforced |
| Learning Curve | Medium | Low |

## Next Steps

1. Refactor one template at a time
2. Test each refactored template
3. Update documentation
4. Share learnings with team
5. Create new templates using new architecture

---

**Need Help?** Check the [Developer Guide](./DEVELOPER_GUIDE_TEMPLATES.md) or [Architecture Documentation](./TEMPLATE_ARCHITECTURE.md).
