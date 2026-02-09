# Simple Developer Guide - Write Components Your Way

## Philosophy

**Write JSX/HTML naturally. The editor understands your components through simple data attributes.**

No complex architecture. No builders. No factories. Just write React components with special attributes, and the editor handles the rest.

## Core Concept: Data Attributes

The editor scans your HTML and makes elements editable based on `data-*` attributes:

```jsx
export const MySection = ({ title }) => (
  <h1 data-type="text" data-name="title">
    {title || "Welcome to Our Store"}
  </h1>
);
```

That's it. The editor now knows:
- This is **text** that can be edited
- It's identified by the name **"title"**

## Supported Data Types

### 1. Text (`data-type="text"`)

For headings, paragraphs, buttons, etc.

```jsx
export const MySection = ({ heading, description, button_text }) => (
  <>
    <h1 data-type="text" data-name="heading">
      {heading || "Your Heading Here"}
    </h1>

    <p data-type="text" data-name="description">
      {description || "Your description text"}
    </p>

    <button data-type="text" data-name="button_text">
      {button_text || "Click Me"}
    </button>
  </>
);
```

### 2. Link (`data-type="link"`)

For clickable links and buttons.

```jsx
<a 
  href="/products" 
  data-type="link" 
  data-name="cta_link"
>
  Shop Now
</a>

<button 
  onClick={() => window.location.href = url}
  data-type="link" 
  data-name="button_link"
>
  Learn More
</button>
```

### 3. Image (`data-type="image"`)

For images and background images.

```jsx
export const MySection = ({ photos }) => {
  const heroImage = photos?.find(p => p.id === "hero_image");
  const bgImage = photos?.find(p => p.id === "background");
  
  return (
    <>
      {/* Regular image */}
      <img 
        src={heroImage?.url || "/default.jpg"} 
        data-type="image" 
        data-name="hero_image"
        alt="Hero"
      />

      {/* Background image */}
      <div 
        style={{ backgroundImage: `url(${bgImage?.url || ''})` }}
        data-type="image" 
        data-name="background"
      >
        Content here
      </div>
    </>
  );
};
```

### 4. Textarea (`data-type="textarea"`)

For longer text content.

```jsx
<p data-type="textarea" data-name="long_description">
  This is a longer piece of text that users can edit.
  It can span multiple lines.
</p>
```

## Complete Component Example

```jsx
// templates/my-template/sections/hero/MyHero.tsx

export const MyHero = ({ title, description, cta_link, cta_text, photos }) => {
  const heroImage = photos?.find(p => p.id === "hero_image");
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto">
        {/* Editable heading */}
        <h1 
          className="text-5xl font-bold mb-4"
          data-type="text" 
          data-name="title"
        >
          {title || "Default Title"}
        </h1>
        
        {/* Editable description */}
        <p 
          className="text-xl mb-8"
          data-type="textarea" 
          data-name="description"
        >
          {description || "Default description"}
        </p>
        
        {/* Editable image */}
        <img 
          src={heroImage?.url || "/default.jpg"}
          alt="Hero"
          className="w-full rounded-lg"
          data-type="image" 
          data-name="hero_image"
        />
        
        {/* Editable button with link */}
        <a 
          href={cta_link || "#"}
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded"
          data-type="link" 
          data-name="cta_link"
        >
          <span data-type="text" data-name="cta_text">
            {cta_text || "Shop Now"}
          </span>
        </a>
      </div>
    </section>
  );
};
```

## How to Create a New Section

### Step 1: Write Your Component

Just write normal React/JSX with data attributes:

```jsx
// templates/ecommerce/my-template/sections/features/MyFeatures.tsx

export const MyFeatures = ({ 
  section_title,
  feature_1_title,
  feature_1_desc,
  feature_2_title,
  feature_2_desc,
  feature_3_title,
  feature_3_desc
}) => {
  return (
    <section className="py-16">
      <h2 data-type="text" data-name="section_title">
        {section_title || "Our Features"}
      </h2>
      
      <div className="grid grid-cols-3 gap-8">
        <div>
          <h3 data-type="text" data-name="feature_1_title">
            {feature_1_title || "Fast Shipping"}
          </h3>
          <p data-type="textarea" data-name="feature_1_desc">
            {feature_1_desc || "Get your order quickly"}
          </p>
        </div>
        
        <div>
          <h3 data-type="text" data-name="feature_2_title">
            {feature_2_title || "Quality Products"}
          </h3>
          <p data-type="textarea" data-name="feature_2_desc">
            {feature_2_desc || "Only the best quality"}
          </p>
        </div>
        
        <div>
          <h3 data-type="text" data-name="feature_3_title">
            {feature_3_title || "Great Support"}
          </h3>
          <p data-type="textarea" data-name="feature_3_desc">
            {feature_3_desc || "We're here to help"}
          </p>
        </div>
      </div>
    </section>
  );
};
```

### Step 2: Register Your Component

Add it to the component registry:

```typescript
// client/src/shared/utils/component-registry.ts

registry["features:1"] = {
  component: lazy(() => 
    import("@templates/sections/features/MyFeatures")
      .then(m => ({ default: m.MyFeatures }))
  )
};
```

### Step 3: Use in Template

```typescript
// templates/ecommerce/my-template/data/template/index.ts

const homePage = {
  id: "home",
  name: "Home",
  type: "home",
  sections: [
    {
      id: "features-1",
      section_id: "1",
      type: "features",
      editable: true,
      options: [
        {
          id: "1",
          title: "Features Section",
          component: MyFeatures
        }
      ]
    }
  ]
};
```

That's it! No builders, no factories, no complex setup.

## Props Your Component Receives

### Direct Props

Editable text/link values are passed as direct props:

```typescript
{
  title: "User's edited title",
  description: "User's edited description",
  cta_link: "/products"
}
```

### `photos` Array

Editable images:

```typescript
[
  { id: "hero_image", url: "https://...", label: "Hero Image" },
  { id: "background", url: "https://...", label: "Background" }
]
```

### `products` Array (for e-commerce)

```typescript
[
  { 
    id: "1", 
    name: "Product Name", 
    price: 99.99, 
    thumbnail: { url: "..." } 
  }
]
```

### `categories` Array (for e-commerce)

```typescript
[
  { 
    id: "1", 
    name: "Category Name", 
    thumbnail: { url: "..." } 
  }
]
```

## Best Practices

### ✅ DO

```jsx
// Clear, semantic data-name
<h1 data-type="text" data-name="main_heading">{title}</h1>

// Provide fallback values
{title || "Default Title"}

// Use semantic HTML
<button data-type="link" data-name="cta">Click</button>
```

### ❌ DON'T

```jsx
// Vague data-name
<h1 data-type="text" data-name="text1">{title}</h1>

// No fallback
{title}

// Missing data attributes
<h1>Title</h1> // Editor won't know this is editable!
```

## Multiple Variants (Optional)

Want to offer different designs? Just create multiple components:

```jsx
// Variant 1: Simple
export const HeroSimple = ({ title }) => (
  <section className="text-center py-20">
    <h1 data-type="text" data-name="title">
      {title || "Welcome"}
    </h1>
  </section>
);

// Variant 2: With Image
export const HeroWithImage = ({ title, photos }) => {
  const heroImage = photos?.find(p => p.id === "hero_image");
  
  return (
    <section className="py-20 flex">
      <div>
        <h1 data-type="text" data-name="title">
          {title || "Welcome"}
        </h1>
      </div>
      <img 
        src={heroImage?.url || "/default.jpg"}
        data-type="image" 
        data-name="hero_image"
      />
    </section>
  );
};
```

Register both:

```typescript
registry["hero:1"] = { component: lazy(() => import("...").then(m => ({ default: m.HeroSimple }))) };
registry["hero:2"] = { component: lazy(() => import("...").then(m => ({ default: m.HeroWithImage }))) };
```

## Dynamic Content

The editor automatically detects editable elements by scanning the DOM. No configuration needed!

```jsx
// This component has 5 editable fields
// The editor will automatically create inputs for all of them
export const ContactForm = ({ title, intro, email, phone, address }) => (
  <section>
    <h2 data-type="text" data-name="title">{title || "Contact Us"}</h2>
    <p data-type="textarea" data-name="intro">{intro || "Get in touch"}</p>
    
    <div>
      <p data-type="text" data-name="email">{email || "email@example.com"}</p>
      <p data-type="text" data-name="phone">{phone || "+1234567890"}</p>
      <p data-type="textarea" data-name="address">{address || "123 Main St"}</p>
    </div>
  </section>
);
```

The editor scans and finds all 5 fields automatically!

## Working with Styles

Use Tailwind or inline styles freely:

```jsx
export const StyledSection = ({ title }) => (
  <section 
    className="py-20 bg-gradient-to-r from-blue-500 to-purple-600"
    style={{ minHeight: '500px' }}
  >
    <h1 
      className="text-6xl font-bold text-white drop-shadow-lg"
      data-type="text" 
      data-name="title"
    >
      {title || "Styled Title"}
    </h1>
  </section>
);
```

## Advanced: Custom Data Attributes

Add extra metadata for your use:

```jsx
<h1 
  data-type="text" 
  data-name="title"
  data-title="Main Heading"  // Shows in editor UI
  data-placeholder="Enter your heading"  // Placeholder text
>
  {title || "Default"}
</h1>
```

## Complete Real-World Example

```jsx
// templates/ecommerce/modern-store/sections/hero/HeroWithCTA.tsx

export const HeroWithCTA = ({ badge, heading, description, cta_link, cta_text, photos }) => {
  const bgImage = photos?.find(p => p.id === "background");
  
  return (
    <section className="relative h-screen">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${bgImage?.url || "/hero-bg.jpg"})` 
        }}
        data-type="image" 
        data-name="background"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto h-full flex items-center">
        <div className="max-w-2xl text-white">
          {/* Editable Badge */}
          <span 
            className="inline-block bg-blue-600 px-4 py-2 rounded-full text-sm mb-4"
            data-type="text" 
            data-name="badge"
          >
            {badge || "New Arrival"}
          </span>
          
          {/* Editable Heading */}
          <h1 
            className="text-6xl font-bold mb-6"
            data-type="text" 
            data-name="heading"
          >
            {heading || "Discover Amazing Products"}
          </h1>
          
          {/* Editable Description */}
          <p 
            className="text-xl mb-8"
            data-type="textarea" 
            data-name="description"
          >
            {description || "Shop the latest collection with exclusive deals"}
          </p>
          
          {/* Editable CTA Button */}
          <a 
            href={cta_link || "/products"}
            className="inline-block bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
            data-type="link" 
            data-name="cta_link"
          >
            <span data-type="text" data-name="cta_text">
              {cta_text || "Shop Now"}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};
```

## Summary

1. **Write normal JSX** - No special syntax or patterns
2. **Add data attributes** - `data-type` and `data-name` on editable elements
3. **Register component** - One line in the registry
4. **Done!** - The editor handles everything else

## Quick Reference

```jsx
// Text
<h1 data-type="text" data-name="title">{title}</h1>

// Textarea
<p data-type="textarea" data-name="desc">{desc}</p>

// Link
<a href={link} data-type="link" data-name="link">Click</a>

// Image
<img src={photos?.find(p => p.id === "image")?.url} data-type="image" data-name="image" />

// Background Image
<div 
  style={{ backgroundImage: `url(${photos?.find(p => p.id === "bg")?.url})` }}
  data-type="image" 
  data-name="bg"
/>
```

---

**That's it! Write components your way. The editor adapts to you, not the other way around.**
