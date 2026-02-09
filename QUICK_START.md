# Quick Start - Simple Template Development

## The Simple Way

### 1. Write Component (2 minutes)

```jsx
export const MySection = ({ title, photos }) => (
  <section className="py-16">
    <h1 data-type="text" data-name="title">
      {title || "Default Title"}
    </h1>
    <img 
      src={photos?.[0]?.url || "/default.jpg"}
      data-type="image" 
      data-name="image"
    />
  </section>
);
```

### 2. Register Component (1 line)

```typescript
// component-registry.ts
registry["my-section:1"] = {
  component: lazy(() => import("./MySection").then(m => ({ default: m.MySection })))
};
```

### 3. Done!

The editor automatically detects editable fields through `data-type` and `data-name` attributes.

## Data Attributes

- `data-type="text"` - Editable text
- `data-type="textarea"` - Long text
- `data-type="link"` - URLs
- `data-type="image"` - Images

## Key Files

- **`SIMPLE_DEVELOPER_GUIDE.md`** - Complete guide with examples
- **`SIMPLIFIED_ARCHITECTURE.md`** - How the system works
- **`templates/COMPONENT_TEMPLATE.tsx`** - Copy-paste template

## Philosophy

Write JSX naturally. Add data attributes. The editor adapts to your code.

No builders. No factories. No complex patterns. Just React components.
