# Simplified Architecture - Developer Freedom

## Core Philosophy

**Developers write components their way. The editor adapts through data attributes.**

## How It Works

### 1. Developer Writes Component

```jsx
export const MySection = ({ title, photos }) => {
  const heroImage = photos?.find(p => p.id === "hero_image");
  
  return (
    <section>
      <h1 data-type="text" data-name="title">
        {title || "Default"}
      </h1>
      <img 
        src={heroImage?.url} 
        data-type="image" 
        data-name="hero_image"
      />
    </section>
  );
};
```

### 2. Editor Scans DOM

The editor automatically scans the rendered HTML and finds:
- All elements with `data-type` attributes
- Extracts `data-name` for identification
- Creates appropriate editing UI

### 3. User Edits Content

- Text fields → Text inputs
- Textarea fields → Textarea inputs
- Link fields → URL inputs
- Image fields → Image uploader

### 4. Changes Saved

Editor updates the `content` and `photos` props, component re-renders with new data.

## Architecture Layers

```
┌─────────────────────────────────────────┐
│  Developer Layer (Your Code)            │
│  - Write JSX with data attributes       │
│  - No complex patterns required         │
│  - Full creative freedom                │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  Component Registry (Simple)            │
│  - One-line registration                │
│  - Lazy loading for performance         │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  DOM Scanner (Automatic)                │
│  - Scans for data-type attributes       │
│  - Detects editable fields              │
│  - No configuration needed              │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  Editor UI (Generated)                  │
│  - Auto-creates inputs                  │
│  - Handles saving                       │
│  - Updates component props              │
└─────────────────────────────────────────┘
```

## Developer Rules (Simple!)

### Rule 1: Add Data Attributes

Make any element editable by adding:
- `data-type="text|textarea|link|image"`
- `data-name="unique_identifier"`

### Rule 2: Use Props

Your component receives direct props:
- Text/link fields as direct props (e.g., `title`, `description`, `cta_link`)
- `photos` - Array of editable images
- `products` - Array of products (e-commerce)
- `categories` - Array of categories (e-commerce)

### Rule 3: Provide Fallbacks

Always provide default values:
```jsx
{title || "Default Title"}
```

### Rule 4: Register Component

Add one line to `component-registry.ts`:
```typescript
registry["section-type:variant-id"] = {
  component: lazy(() => import("./MyComponent").then(m => ({ default: m.MyComponent })))
};
```

That's it! Four simple rules.

## What You DON'T Need

❌ No builders  
❌ No factories  
❌ No complex type definitions  
❌ No configuration files  
❌ No learning curve  
❌ No restrictions on your code  

## What You GET

✅ Full creative freedom  
✅ Write JSX naturally  
✅ Automatic editor integration  
✅ Type safety (optional)  
✅ Hot reload during development  
✅ Lazy loading for performance  

## Comparison

### Old Approach (Complex)
```typescript
// Need to learn builders
const section = new SectionBuilder()
  .setId("hero")
  .setType("hero")
  .addContent(ContentFactory.createText("title", "Title", "Default"))
  .build();

// Need to learn factories
const content = ContentFactory.createHeroContent(
  "Title",
  "Description",
  "Button",
  "/link"
);

// Complex registration
const heroSection = SectionFactory.createHeroSection(
  "home-hero",
  "1",
  hero_sections,
  true
);
```

### New Approach (Simple)
```jsx
// Just write JSX!
export const Hero = ({ title }) => (
  <section>
    <h1 data-type="text" data-name="title">
      {title || "Default"}
    </h1>
  </section>
);

// Register in one line
registry["hero:1"] = {
  component: lazy(() => import("./Hero").then(m => ({ default: m.Hero })))
};
```

## File Structure (Flexible)

You can organize files however you want:

```
templates/
└── my-template/
    └── sections/
        ├── hero/
        │   ├── SimpleHero.tsx
        │   ├── HeroWithImage.tsx
        │   └── HeroCarousel.tsx
        ├── features/
        │   └── FeaturesGrid.tsx
        └── products/
            ├── ProductGrid.tsx
            └── ProductCarousel.tsx
```

Or:

```
templates/
└── my-template/
    ├── Hero.tsx
    ├── Features.tsx
    └── Products.tsx
```

Or any other structure you prefer!

## Advanced: Custom Attributes

Add extra metadata for richer editing experience:

```jsx
<h1 
  data-type="text" 
  data-name="title"
  data-title="Main Heading"           // Label in editor
  data-placeholder="Enter heading"    // Placeholder text
  data-max-length="100"               // Character limit
>
  {content?.title?.value}
</h1>
```

The editor will use these hints to improve UX.

## How Editor Detects Fields

The DOM scanner (`client/src/shared/utils/dom-scanner.ts`) automatically:

1. Finds all elements with `data-type` attribute
2. Extracts metadata (name, title, placeholder)
3. Determines field type (text, textarea, link, image)
4. Creates appropriate editor UI
5. Handles saving and updating

**You don't configure this. It just works.**

## Example: Complete Section in 30 Seconds

```jsx
// 1. Create file: sections/testimonials/Testimonials.tsx
export const Testimonials = ({ content }) => (
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto">
      <h2 data-type="text" data-name="title">
        {content?.title?.value || "What Our Customers Say"}
      </h2>
      
      <div className="grid grid-cols-3 gap-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white p-6 rounded-lg">
            <p data-type="textarea" data-name={`testimonial_${i}`}>
              {content?.[`testimonial_${i}`]?.value || "Customer testimonial"}
            </p>
            <p data-type="text" data-name={`customer_${i}`}>
              {content?.[`customer_${i}`]?.value || "Customer Name"}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// 2. Register: component-registry.ts
registry["testimonials:1"] = {
  component: lazy(() => import("./Testimonials").then(m => ({ default: m.Testimonials })))
};

// Done! 6 editable fields, automatic detection, ready to use.
```

## Migration from Complex to Simple

If you have existing complex code:

### Before
```jsx
// Before
const content = [
  ContentFactory.createText("title", "Title", "Default"),
  ContentFactory.createTextarea("description", "Description", "Default"),
];

const section = SectionFactory.createHeroSection("hero", "1", options);
```

### After
```jsx
// Just write the component!
export const Hero = ({ title, description }) => (
  <section>
    <h1 data-type="text" data-name="title">
      {title || "Default"}
    </h1>
    <p data-type="textarea" data-name="description">
      {description || "Default"}
    </p>
  </section>
);
```

The complex utilities are **optional** - use them if they help, ignore them if they don't.

## Performance

- **Lazy Loading**: Components load only when needed
- **Code Splitting**: Each section is a separate chunk
- **DOM Scanning**: Happens once per section, cached
- **Optimized Rendering**: React handles updates efficiently

## Developer Experience Goals

1. **5-Minute Onboarding**: New developers productive in 5 minutes
2. **No Learning Curve**: If you know React, you know this system
3. **Full Freedom**: Write code your way
4. **Automatic Integration**: Editor adapts to your components
5. **Fast Development**: Create sections in minutes, not hours

## Summary

| Aspect | Complex Approach | Simple Approach |
|--------|-----------------|-----------------|
| Learning Time | Hours/Days | 5 Minutes |
| Code Lines | 50-100 | 10-20 |
| Flexibility | Limited | Full |
| Patterns Required | Many | One (data attributes) |
| Configuration | Extensive | Minimal |
| Maintenance | Complex | Simple |
| Developer Joy | 😐 | 😊 |

## The Bottom Line

**Write JSX. Add data attributes. Register component. Done.**

No architecture to learn. No patterns to follow. No restrictions on creativity.

The editor is smart enough to understand your components. You focus on building great designs.

---

**See `SIMPLE_DEVELOPER_GUIDE.md` for complete examples and `COMPONENT_TEMPLATE.tsx` for ready-to-use templates.**
