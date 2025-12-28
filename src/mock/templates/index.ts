import { TemplateType, ProductType, CategoryType } from "../../types";
import { categories_sections } from "../template/sections/categories";
import { hero_sections } from "../template/sections/hero";
import { navigation_sections } from "../template/sections/navigation";
import { recent_products_sections } from "../template/sections/recent-products";
import { menu_sections } from "../template/sections/menu";
import { mockProducts } from "../products";

// Mock data for templates
const ecommerceCategories: CategoryType[] = [
  {
    id: "1",
    name: "ملابس",
    thumbnail: {
      url: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200",
    },
  },
  {
    id: "2",
    name: "أحذية",
    thumbnail: {
      url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200",
    },
  },
  {
    id: "3",
    name: "إلكترونيات",
    thumbnail: {
      url: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200",
    },
  },
  {
    id: "4",
    name: "إكسسوارات",
    thumbnail: {
      url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200",
    },
  },
  {
    id: "5",
    name: "عطور",
    thumbnail: {
      url: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=200",
    },
  },
];

const restaurantCategories: CategoryType[] = [
  {
    id: "1",
    name: "المقبلات",
    thumbnail: {
      url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200",
    },
  },
  {
    id: "2",
    name: "الأطباق الرئيسية",
    thumbnail: {
      url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200",
    },
  },
  {
    id: "3",
    name: "المشروبات",
    thumbnail: {
      url: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200",
    },
  },
  {
    id: "4",
    name: "الحلويات",
    thumbnail: {
      url: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200",
    },
  },
  {
    id: "5",
    name: "السلطات",
    thumbnail: {
      url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200",
    },
  },
];

const sampleProducts: ProductType[] = mockProducts.slice(0, 8);

// ============================================================================
// E-COMMERCE TEMPLATES - قوالب المتاجر الإلكترونية
// ============================================================================

// Helper function to create sections with default content
const createHeroSection = (sectionId: string, title: string, description: string, photoUrl?: string) => {
  const heroOption = hero_sections.find((h) => h.id === sectionId);
  if (!heroOption) return null;

  return {
    ...heroOption,
    content: [
      {
        id: "title",
        label: "العنوان",
        name: "title",
        type: "text",
        value: title,
      },
      {
        id: "description",
        label: "الوصف",
        name: "description",
        type: "textarea",
        value: description,
      },
    ],
    photos: photoUrl ? [{ id: crypto.randomUUID(), label: "صورة", url: photoUrl }] : [],
  };
};

const createProductsSection = (sectionId: string, title: string, products: ProductType[]) => {
  const productsOption = recent_products_sections.find((p) => p.id === sectionId);
  if (!productsOption) return null;

  return {
    ...productsOption,
    content: [
      {
        id: "title",
        label: "Title",
        name: "title",
        type: "text",
        value: title,
      },
    ],
    products: products,
  };
};

const createCategoriesSection = (categories: CategoryType[]) => {
  const categoriesOption = categories_sections[0];
  if (!categoriesOption) return null;

  return {
    ...categoriesOption,
    categories: categories,
  };
};

// Minimal E-commerce Template - Simple and clean (Text only hero, Simple grid products)
export const minimalEcommerceTemplate: TemplateType = {
  id: "minimal-ecommerce",
  title: "Minimalist",
  description: "تصميم بسيط وأنيق للمتاجر الإلكترونية - نص فقط مع شبكة منتجات بسيطة",
  storeType: "e-commerce",
  thumbnail: {
    url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300",
  },
  sections: [
    {
      id: "0",
      section_id: "1",
      type: "navigation",
      editable: false,
      options: navigation_sections,
    },
    {
      id: "1",
      section_id: "1", // Hero Section 1 - Text only, centered
      type: "hero",
      view_all_link: "",
      editable: true,
      options: [
        ...hero_sections.filter((h) => h.id !== "1"),
        createHeroSection("1", "مرحباً بك في متجرنا", "اكتشف مجموعتنا المميزة من المنتجات عالية الجودة") || hero_sections[0],
      ],
    },
    {
      id: "2",
      section_id: "1", // Recent Products 1 - Simple grid
      type: "recentProducts",
      view_all_link: "",
      options: [
        ...recent_products_sections.filter((p) => p.id !== "1"),
        createProductsSection("1", "منتجات مميزة", sampleProducts) || recent_products_sections[0],
      ],
      editable: true,
    },
  ],
};

// Modern E-commerce Template - More sections (Hero with image, Categories, Carousel products)
export const modernEcommerceTemplate: TemplateType = {
  id: "modern-ecommerce",
  title: "Modern",
  description: "تصميم عصري وجذاب للمتاجر الإلكترونية - هيرو مع صورة، تصنيفات، وcarousel للمنتجات",
  storeType: "e-commerce",
  thumbnail: {
    url: "https://cdn.dribbble.com/userupload/43792476/file/original-2dc4c0056ba1870f72cc179f989655b4.jpg?resize=400x0",
  },
  sections: [
    {
      id: "0",
      section_id: "1",
      type: "navigation",
      editable: false,
      options: navigation_sections,
    },
    {
      id: "1",
      section_id: "2", // Hero Section 2 - With image, side by side
      type: "hero",
      view_all_link: "",
      editable: true,
      options: [
        ...hero_sections.filter((h) => h.id !== "2"),
        createHeroSection(
          "2",
          "منتجات عصرية وأنيقة",
          "اكتشف مجموعتنا الواسعة من المنتجات عالية الجودة المصممة خصيصاً لك",
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"
        ) || hero_sections[1],
      ],
    },
    {
      id: "2",
      section_id: "1", // Categories Section 1 - Grid layout
      type: "categories",
      view_all_link: "",
      options: [
        createCategoriesSection(ecommerceCategories) || categories_sections[0],
      ],
      editable: true,
    },
    {
      id: "3",
      section_id: "2", // Recent Products 2 - Carousel style
      type: "recentProducts",
      view_all_link: "",
      options: [
        ...recent_products_sections.filter((p) => p.id !== "2"),
        createProductsSection("2", "أحدث المنتجات", sampleProducts) || recent_products_sections[1],
      ],
      editable: true,
    },
  ],
};

// Elegant E-commerce Template - Full featured (Hero with image, Categories, Grid products)
export const elegantEcommerceTemplate: TemplateType = {
  id: "elegant-ecommerce",
  title: "Elegant",
  description: "تصميم راقي ومميز للمتاجر الإلكترونية - هيرو فاخر، تصنيفات، وشبكة منتجات أنيقة",
  storeType: "e-commerce",
  thumbnail: {
    url: "https://cdn.shopify.com/s/files/1/0817/7988/4088/articles/fashion-ecommerce.jpg?v=1738095976",
  },
  sections: [
    {
      id: "0",
      section_id: "1",
      type: "navigation",
      editable: false,
      options: navigation_sections,
    },
    {
      id: "1",
      section_id: "3", // Hero Section 3 - Carousel for elegance
      type: "hero",
      view_all_link: "",
      editable: true,
      options: [
        ...hero_sections.filter((h) => h.id !== "3"),
        {
          ...hero_sections[2],
          content: [
            {
              id: "title",
              label: "العنوان",
              name: "title",
              type: "text",
              value: "مجموعة فاخرة من المنتجات",
            },
            {
              id: "description",
              label: "الوصف",
              name: "description",
              type: "textarea",
              value: "استمتع بأفضل العروض والخصومات الحصرية على منتجاتنا المميزة",
            },
          ],
          photos: [
            { id: crypto.randomUUID(), label: "صورة 1", url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200" },
            { id: crypto.randomUUID(), label: "صورة 2", url: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200" },
            { id: crypto.randomUUID(), label: "صورة 3", url: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200" },
          ],
        },
      ],
    },
    {
      id: "2",
      section_id: "1", // Categories Section 1 - Grid layout
      type: "categories",
      view_all_link: "",
      options: [
        createCategoriesSection(ecommerceCategories) || categories_sections[0],
      ],
      editable: true,
    },
    {
      id: "3",
      section_id: "1", // Recent Products 1 - Elegant grid
      type: "recentProducts",
      view_all_link: "",
      options: [
        ...recent_products_sections.filter((p) => p.id !== "1"),
        createProductsSection("1", "منتجات مميزة", sampleProducts) || recent_products_sections[0],
      ],
      editable: true,
    },
  ],
};

// ============================================================================
// RESTAURANT TEMPLATES - قوالب المطاعم
// ============================================================================

// Restaurant menu items
const restaurantMenuItems: ProductType[] = [
  {
    id: "r1",
    name: "برجر كلاسيكي",
    price: 45,
    discount: 0,
    stock: 50,
    category: "الأطباق الرئيسية",
    description: "برجر لحم طازج مع خضار وجبنة، يقدم مع بطاطا",
    photos: [{
      url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
    }],
    thumbnail: {
      url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
    },
  },
  {
    id: "r2",
    name: "سلطة قيصر",
    price: 35,
    discount: 5,
    stock: 30,
    category: "السلطات",
    description: "سلطة طازجة مع خس، جبنة بارميزان، وصلصة قيصر",
    photos: [{
      url: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500",
    }],
    thumbnail: {
      url: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500",
    },
  },
  {
    id: "r3",
    name: "بيتزا مارغريتا",
    price: 55,
    discount: 0,
    stock: 25,
    category: "الأطباق الرئيسية",
    description: "بيتزا إيطالية أصيلة مع جبنة موتزاريلا وطماطم طازجة",
    photos: [{
      url: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500",
    }],
    thumbnail: {
      url: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500",
    },
  },
  {
    id: "r4",
    name: "مشروب ليموناضة",
    price: 15,
    discount: 0,
    stock: 100,
    category: "المشروبات",
    description: "ليموناضة طبيعية منعشة",
    photos: [{
      url: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2fdc?w=500",
    }],
    thumbnail: {
      url: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2fdc?w=500",
    },
  },
  {
    id: "r5",
    name: "تشيز كيك",
    price: 30,
    discount: 10,
    stock: 20,
    category: "الحلويات",
    description: "تشيز كيك كريمي مع طبقة توت",
    photos: [{
      url: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=500",
    }],
    thumbnail: {
      url: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=500",
    },
  },
  {
    id: "r6",
    name: "ستيك لحم",
    price: 120,
    discount: 0,
    stock: 15,
    category: "الأطباق الرئيسية",
    description: "ستيك لحم مشوي مع خضار مشكلة",
    photos: [{
      url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500",
    }],
    thumbnail: {
      url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500",
    },
  },
];

const createMenuSection = (sectionId: string, title: string, products: ProductType[]) => {
  const menuOption = menu_sections.find((m) => m.id === sectionId);
  if (!menuOption) return null;

  return {
    ...menuOption,
    content: [
      {
        id: "title",
        label: "Title",
        name: "title",
        type: "text",
        value: title,
      },
    ],
    products: products,
  };
};

// Minimal Restaurant Template - Simple and clean (Text only hero, Simple menu list)
export const minimalRestaurantTemplate: TemplateType = {
  id: "minimal-restaurant",
  title: "Minimalist",
  description: "تصميم بسيط وأنيق للمطاعم - نص فقط مع قائمة طعام بسيطة",
  storeType: "restaurant",
  thumbnail: {
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
  },
  sections: [
    {
      id: "0",
      section_id: "1",
      type: "navigation",
      editable: false,
      options: navigation_sections,
    },
    {
      id: "1",
      section_id: "1", // Hero Section 1 - Text only, centered
      type: "hero",
      view_all_link: "",
      editable: true,
      options: [
        ...hero_sections.filter((h) => h.id !== "1"),
        createHeroSection("1", "مرحباً بك في مطعمنا", "استمتع بأشهى الأطباق والمشروبات") || hero_sections[0],
      ],
    },
    {
      id: "2",
      section_id: "1", // Menu Section 1 - Simple grid
      type: "recentProducts",
      view_all_link: "",
      options: [
        ...menu_sections.filter((m) => m.id !== "1"),
        createMenuSection("1", "قائمة الطعام", restaurantMenuItems.slice(0, 6)) || menu_sections[0],
      ],
      editable: true,
    },
  ],
};

// Modern Restaurant Template - More sections (Hero with image, Categories, Menu grid)
export const modernRestaurantTemplate: TemplateType = {
  id: "modern-restaurant",
  title: "Modern",
  description: "تصميم عصري وجذاب للمطاعم - هيرو مع صورة، تصنيفات الطعام، وقائمة grid",
  storeType: "restaurant",
  thumbnail: {
    url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
  },
  sections: [
    {
      id: "0",
      section_id: "1",
      type: "navigation",
      editable: false,
      options: navigation_sections,
    },
    {
      id: "1",
      section_id: "2", // Hero Section 2 - With image, side by side
      type: "hero",
      view_all_link: "",
      editable: true,
      options: [
        ...hero_sections.filter((h) => h.id !== "2"),
        createHeroSection(
          "2",
          "مطعمنا يقدم أشهى الأطباق",
          "استمتع بتجربة طعام فريدة مع قائمة متنوعة من الأطباق الشهية",
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800"
        ) || hero_sections[1],
      ],
    },
    {
      id: "2",
      section_id: "1", // Categories Section 1 - Food categories grid
      type: "categories",
      view_all_link: "",
      options: [
        createCategoriesSection(restaurantCategories) || categories_sections[0],
      ],
      editable: true,
    },
    {
      id: "3",
      section_id: "2", // Menu Section 2 - Grid layout with images
      type: "recentProducts",
      view_all_link: "",
      options: [
        ...menu_sections.filter((m) => m.id !== "2"),
        createMenuSection("2", "قائمة الطعام", restaurantMenuItems) || menu_sections[1],
      ],
      editable: true,
    },
  ],
};

// Elegant Restaurant Template - Full featured (Hero with image, Categories, Elegant menu list)
export const elegantRestaurantTemplate: TemplateType = {
  id: "elegant-restaurant",
  title: "Elegant",
  description: "تصميم راقي ومميز للمطاعم - هيرو فاخر، تصنيفات، وقائمة طعام أنيقة",
  storeType: "restaurant",
  thumbnail: {
    url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
  },
  sections: [
    {
      id: "0",
      section_id: "1",
      type: "navigation",
      editable: false,
      options: navigation_sections,
    },
    {
      id: "1",
      section_id: "3", // Hero Section 3 - Carousel for elegance
      type: "hero",
      view_all_link: "",
      editable: true,
      options: [
        ...hero_sections.filter((h) => h.id !== "3"),
        {
          ...hero_sections[2],
          content: [
            {
              id: "title",
              label: "العنوان",
              name: "title",
              type: "text",
              value: "تجربة طعام فاخرة",
            },
            {
              id: "description",
              label: "الوصف",
              name: "description",
              type: "textarea",
              value: "استمتع بأشهى الأطباق والمشروبات في أجواء راقية ومميزة",
            },
          ],
          photos: [
            { id: crypto.randomUUID(), label: "صورة 1", url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200" },
            { id: crypto.randomUUID(), label: "صورة 2", url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200" },
            { id: crypto.randomUUID(), label: "صورة 3", url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200" },
          ],
        },
      ],
    },
    {
      id: "2",
      section_id: "1", // Categories Section 1 - Food categories grid
      type: "categories",
      view_all_link: "",
      options: [
        createCategoriesSection(restaurantCategories) || categories_sections[0],
      ],
      editable: true,
    },
    {
      id: "3",
      section_id: "3", // Menu Section 3 - Elegant list layout
      type: "recentProducts",
      view_all_link: "",
      options: [
        ...menu_sections.filter((m) => m.id !== "3"),
        createMenuSection("3", "قائمة الطعام", restaurantMenuItems) || menu_sections[2],
      ],
      editable: true,
    },
  ],
};

// ============================================================================
// ADDITIONAL E-COMMERCE TEMPLATES - قوالب إضافية للمتاجر الإلكترونية
// ============================================================================

// Classic E-commerce Template
export const classicEcommerceTemplate: TemplateType = {
  id: "classic-ecommerce",
  title: "Classic",
  description: "تصميم كلاسيكي وأنيق للمتاجر الإلكترونية - هيرو تقليدي مع منتجات منظمة",
  storeType: "e-commerce",
  thumbnail: {
    url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
  },
  sections: [
    {
      id: "0",
      section_id: "1",
      type: "navigation",
      editable: false,
      options: navigation_sections,
    },
    {
      id: "1",
      section_id: "1",
      type: "hero",
      view_all_link: "",
      editable: true,
      options: [
        ...hero_sections.filter((h) => h.id !== "1"),
        createHeroSection("1", "متجرك الكلاسيكي", "اكتشف مجموعتنا المميزة من المنتجات") || hero_sections[0],
      ],
    },
    {
      id: "2",
      section_id: "1",
      type: "categories",
      view_all_link: "",
      options: [
        createCategoriesSection(ecommerceCategories) || categories_sections[0],
      ],
      editable: true,
    },
    {
      id: "3",
      section_id: "1",
      type: "recentProducts",
      view_all_link: "",
      options: [
        ...recent_products_sections.filter((p) => p.id !== "1"),
        createProductsSection("1", "منتجاتنا المميزة", sampleProducts) || recent_products_sections[0],
      ],
      editable: true,
    },
  ],
};

// Premium E-commerce Template
export const premiumEcommerceTemplate: TemplateType = {
  id: "premium-ecommerce",
  title: "Premium",
  description: "تصميم فاخر ومميز للمتاجر الإلكترونية - هيرو كراسل مع تصنيفات ومنتجات أنيقة",
  storeType: "e-commerce",
  thumbnail: {
    url: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=400&h=300&fit=crop",
  },
  sections: [
    {
      id: "0",
      section_id: "1",
      type: "navigation",
      editable: false,
      options: navigation_sections,
    },
    {
      id: "1",
      section_id: "3",
      type: "hero",
      view_all_link: "",
      editable: true,
      options: [
        ...hero_sections.filter((h) => h.id !== "3"),
        {
          ...hero_sections[2],
          content: [
            {
              id: "title",
              label: "العنوان",
              name: "title",
              type: "text",
              value: "مجموعة فاخرة حصرية",
            },
            {
              id: "description",
              label: "الوصف",
              name: "description",
              type: "textarea",
              value: "اكتشف مجموعتنا المميزة من المنتجات الفاخرة",
            },
          ],
          photos: [
            { id: crypto.randomUUID(), label: "صورة 1", url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200" },
            { id: crypto.randomUUID(), label: "صورة 2", url: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200" },
          ],
        },
      ],
    },
    {
      id: "2",
      section_id: "1",
      type: "categories",
      view_all_link: "",
      options: [
        createCategoriesSection(ecommerceCategories) || categories_sections[0],
      ],
      editable: true,
    },
    {
      id: "3",
      section_id: "2",
      type: "recentProducts",
      view_all_link: "",
      options: [
        ...recent_products_sections.filter((p) => p.id !== "2"),
        createProductsSection("2", "منتجات مميزة", sampleProducts) || recent_products_sections[1],
      ],
      editable: true,
    },
  ],
};

// ============================================================================
// ADDITIONAL RESTAURANT TEMPLATES - قوالب إضافية للمطاعم
// ============================================================================

// Classic Restaurant Template
export const classicRestaurantTemplate: TemplateType = {
  id: "classic-restaurant",
  title: "Classic",
  description: "تصميم كلاسيكي وأنيق للمطاعم - هيرو تقليدي مع قائمة منظمة",
  storeType: "restaurant",
  thumbnail: {
    url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop",
  },
  sections: [
    {
      id: "0",
      section_id: "1",
      type: "navigation",
      editable: false,
      options: navigation_sections,
    },
    {
      id: "1",
      section_id: "1",
      type: "hero",
      view_all_link: "",
      editable: true,
      options: [
        ...hero_sections.filter((h) => h.id !== "1"),
        createHeroSection("1", "مطعمنا الكلاسيكي", "استمتع بأشهى الأطباق في أجواء دافئة") || hero_sections[0],
      ],
    },
    {
      id: "2",
      section_id: "1",
      type: "recentProducts",
      view_all_link: "",
      options: [
        ...menu_sections.filter((m) => m.id !== "1"),
        createMenuSection("1", "قائمة الطعام", restaurantMenuItems) || menu_sections[0],
      ],
      editable: true,
    },
  ],
};

// Premium Restaurant Template
export const premiumRestaurantTemplate: TemplateType = {
  id: "premium-restaurant",
  title: "Premium",
  description: "تصميم فاخر ومميز للمطاعم - هيرو كراسل مع قائمة أنيقة",
  storeType: "restaurant",
  thumbnail: {
    url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
  },
  sections: [
    {
      id: "0",
      section_id: "1",
      type: "navigation",
      editable: false,
      options: navigation_sections,
    },
    {
      id: "1",
      section_id: "3",
      type: "hero",
      view_all_link: "",
      editable: true,
      options: [
        ...hero_sections.filter((h) => h.id !== "3"),
        {
          ...hero_sections[2],
          content: [
            {
              id: "title",
              label: "العنوان",
              name: "title",
              type: "text",
              value: "تجربة طعام فاخرة",
            },
            {
              id: "description",
              label: "الوصف",
              name: "description",
              type: "textarea",
              value: "استمتع بأشهى الأطباق في أجواء راقية ومميزة",
            },
          ],
          photos: [
            { id: crypto.randomUUID(), label: "صورة 1", url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200" },
            { id: crypto.randomUUID(), label: "صورة 2", url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200" },
          ],
        },
      ],
    },
    {
      id: "2",
      section_id: "1",
      type: "categories",
      view_all_link: "",
      options: [
        createCategoriesSection(restaurantCategories) || categories_sections[0],
      ],
      editable: true,
    },
    {
      id: "3",
      section_id: "3",
      type: "recentProducts",
      view_all_link: "",
      options: [
        ...menu_sections.filter((m) => m.id !== "3"),
        createMenuSection("3", "قائمة الطعام", restaurantMenuItems) || menu_sections[2],
      ],
      editable: true,
    },
  ],
};

// ============================================================================
// TEMPLATE MAP - خريطة القوالب
// ============================================================================

export const templatesMap: Record<string, TemplateType> = {
  // E-commerce templates
  "minimal-ecommerce": minimalEcommerceTemplate,
  "modern-ecommerce": modernEcommerceTemplate,
  "elegant-ecommerce": elegantEcommerceTemplate,
  "classic-ecommerce": classicEcommerceTemplate,
  "premium-ecommerce": premiumEcommerceTemplate,
  // Restaurant templates
  "minimal-restaurant": minimalRestaurantTemplate,
  "modern-restaurant": modernRestaurantTemplate,
  "elegant-restaurant": elegantRestaurantTemplate,
  "classic-restaurant": classicRestaurantTemplate,
  "premium-restaurant": premiumRestaurantTemplate,
};
