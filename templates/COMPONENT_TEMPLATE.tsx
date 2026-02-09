/**
 * SIMPLE COMPONENT TEMPLATE
 * 
 * Copy this template to create new sections quickly.
 * Just add data-type and data-name attributes to make elements editable.
 */

import React from 'react';

interface Props {
  // Basic props
  title?: string;
  description?: string;
  cta_link?: string;
  cta_text?: string;

  // Hero example props
  hero_title?: string;
  hero_subtitle?: string;
  hero_cta_link?: string;
  hero_cta_text?: string;

  // Section props
  section_title?: string;

  // Features example props
  features_title?: string;
  feature_1_title?: string;
  feature_1_desc?: string;
  feature_2_title?: string;
  feature_2_desc?: string;
  feature_3_title?: string;
  feature_3_desc?: string;
  feature_4_title?: string;
  feature_4_desc?: string;

  // Data arrays
  photos?: Array<{ id: string; url?: string; label: string }>;
  products?: any[];
  categories?: any[];

  // Allow any other props for flexibility
  [key: string]: any;
}

export const MyNewSection: React.FC<Props> = ({
  title,
  description,
  cta_link,
  cta_text,
  photos,
  products,
  categories
}) => {
  const mainImage = photos?.find(p => p.id === "main_image");

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">

        {/* EDITABLE HEADING */}
        <h2
          className="text-4xl font-bold mb-4"
          data-type="text"
          data-name="title"
        >
          {title || "Section Title"}
        </h2>

        {/* EDITABLE DESCRIPTION */}
        <p
          className="text-lg text-gray-600 mb-8"
          data-type="textarea"
          data-name="description"
        >
          {description || "Section description goes here"}
        </p>

        {/* EDITABLE IMAGE */}
        <img
          src={mainImage?.url || "https://via.placeholder.com/800x400"}
          alt="Section visual"
          className="w-full rounded-lg mb-8"
          data-type="image"
          data-name="main_image"
        />

        {/* EDITABLE BUTTON */}
        <a
          href={cta_link || "#"}
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          data-type="link"
          data-name="cta_link"
        >
          <span data-type="text" data-name="cta_text">
            {cta_text || "Learn More"}
          </span>
        </a>

      </div>
    </section>
  );
};

/**
 * USAGE:
 * 
 * 1. Copy this file to your section folder
 * 2. Rename the component
 * 3. Customize the JSX with your design
 * 4. Add data-type and data-name to editable elements
 * 5. Register in component-registry.ts:
 * 
 *    registry["my-section:1"] = {
 *      component: lazy(() => import("./MyNewSection").then(m => ({ default: m.MyNewSection })))
 *    };
 * 
 * 6. Done! The editor will automatically detect all editable fields.
 */

/**
 * DATA ATTRIBUTE REFERENCE:
 * 
 * data-type="text"      - For headings, paragraphs, button text
 * data-type="textarea"  - For longer text content
 * data-type="link"      - For URLs and links
 * data-type="image"     - For images (img src or background-image)
 * 
 * data-name="unique_id" - Unique identifier for this field
 * 
 * OPTIONAL ATTRIBUTES:
 * data-title="Label"    - Custom label in editor UI
 * data-placeholder="..."- Placeholder text for empty fields
 */

/**
 * EXAMPLE: Product Grid Section
 */
export const ProductGridExample: React.FC<Props> = ({ section_title, products }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">

        <h2
          className="text-3xl font-bold text-center mb-12"
          data-type="text"
          data-name="section_title"
        >
          {section_title || "Featured Products"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products?.slice(0, 6).map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={product.thumbnail?.url || "https://via.placeholder.com/300"}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">${product.price}</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

/**
 * EXAMPLE: Hero with Background Image
 */
export const HeroBackgroundExample: React.FC<Props> = ({ hero_title, hero_subtitle, hero_cta_link, hero_cta_text, photos }) => {
  const bgImage = photos?.find(p => p.id === "hero_bg");
  return (
    <section
      className="relative h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage?.url || "https://via.placeholder.com/1920x1080"})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      data-type="image"
      data-name="hero_bg"
    >
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      <div className="relative z-10 text-center text-white max-w-4xl px-4">
        <h1
          className="text-6xl font-bold mb-6"
          data-type="text"
          data-name="hero_title"
        >
          {hero_title || "Welcome to Our Store"}
        </h1>

        <p
          className="text-2xl mb-8"
          data-type="textarea"
          data-name="hero_subtitle"
        >
          {hero_subtitle || "Discover amazing products at great prices"}
        </p>

        <a
          href={hero_cta_link || "/products"}
          className="inline-block bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition"
          data-type="link"
          data-name="hero_cta_link"
        >
          <span data-type="text" data-name="hero_cta_text">
            {hero_cta_text || "Shop Now"}
          </span>
        </a>
      </div>
    </section>
  );
};

/**
 * EXAMPLE: Features Grid
 */
export const FeaturesGridExample: React.FC<Props> = ({
  features_title,
  feature_1_title,
  feature_1_desc,
  feature_2_title,
  feature_2_desc,
  feature_3_title,
  feature_3_desc,
  feature_4_title,
  feature_4_desc
}) => {
  const features = [
    { name: 'feature_1', icon: '🚚' },
    { name: 'feature_2', icon: '✨' },
    { name: 'feature_3', icon: '💎' },
    { name: 'feature_4', icon: '🎯' }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">

        <h2
          className="text-3xl font-bold text-center mb-12"
          data-type="text"
          data-name="features_title"
        >
          {features_title || "Why Choose Us"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.name} className="text-center">
              <div className="text-5xl mb-4">{feature.icon}</div>

              <h3
                className="text-xl font-semibold mb-2"
                data-type="text"
                data-name={`${feature.name}_title`}
              >
                {eval(`${feature.name}_title`) || "Feature Title"}
              </h3>

              <p
                className="text-gray-600"
                data-type="textarea"
                data-name={`${feature.name}_desc`}
              >
                {eval(`${feature.name}_desc`) || "Feature description"}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
