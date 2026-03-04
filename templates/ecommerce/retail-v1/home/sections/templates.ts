import { TemplateType, ProductType, CategoryType } from "@/shared/types";
import { categories_sections } from "./categories/data";
import { hero_sections } from "./hero/data";
import { navigation_sections } from "./navbar/data";
import { recent_products_sections } from "./recent-products/data";
import { footer_sections } from "./footer/data";

// Sample products for templates
const sampleProducts: ProductType[] = [
  {
    id: "1",
    name: "قميص قطني كلاسيكي",
    price: 150,
    discount: 20,
    stock: 25,
    category: "ملابس",
    description: "قميص قطني عالي الجودة، مريح ومناسب للارتداء اليومي",
    photos: [
      {
        name: "قميص قطني كلاسيكي",
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
      },
    ],
    thumbnail: {
      name: "قميص قطني كلاسيكي",
      url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    },
  },
  {
    id: "2",
    name: "حذاء رياضي مريح",
    price: 299,
    discount: 15,
    stock: 18,
    category: "أحذية",
    description: "حذاء رياضي متين ومريح للمشي والجري، مناسب للاستخدام اليومي",
    photos: [
      {
        name: "حذاء رياضي مريح",
        url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      },
    ],
    thumbnail: {
      name: "حذاء رياضي مريح",
      url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    },
  },
  {
    id: "3",
    name: "ساعة ذكية حديثة",
    price: 599,
    discount: 0,
    stock: 12,
    category: "إلكترونيات",
    description: "ساعة ذكية متطورة مع شاشة كبيرة وميزات صحية متعددة",
    photos: [
      {
        name: "ساعة ذكية حديثة",
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      },
    ],
    thumbnail: {
      name: "ساعة ذكية حديثة",
      url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    },
  },
  {
    id: "4",
    name: "حقيبة يد أنيقة",
    price: 199,
    discount: 25,
    stock: 30,
    category: "إكسسوارات",
    description: "حقيبة يد عصرية مع جيوب متعددة، مناسبة للاستخدام اليومي والمناسبات",
    photos: [
      {
        name: "حقيبة يد أنيقة",
        url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
      },
    ],
    thumbnail: {
      name: "حقيبة يد أنيقة",
      url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    },
  },
  {
    id: "5",
    name: "نظارة شمسية كلاسيكية",
    price: 120,
    discount: 10,
    stock: 45,
    category: "إكسسوارات",
    description: "نظارة شمسية أنيقة مع حماية من الأشعة فوق البنفسجية",
    photos: [
      {
        name: "نظارة شمسية كلاسيكية",
        url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
      },
    ],
    thumbnail: {
      name: "نظارة شمسية كلاسيكية",
      url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
    },
  },
  {
    id: "6",
    name: "قميص بولو عصري",
    price: 180,
    discount: 0,
    stock: 22,
    category: "ملابس",
    description: "قميص بولو أنيق بألوان متنوعة، مناسب للمناسبات والعمل",
    photos: [
      {
        name: "قميص بولو عصري",
        url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500",
      },
    ],
    thumbnail: {
      name: "قميص بولو عصري",
      url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500",
    },
  },
  {
    id: "7",
    name: "سماعات لاسلكية",
    price: 349,
    discount: 30,
    stock: 15,
    category: "إلكترونيات",
    description: "سماعات لاسلكية عالية الجودة مع إلغاء الضوضاء النشط",
    photos: [
      {
        name: "سماعات لاسلكية",
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      },
    ],
    thumbnail: {
      name: "سماعات لاسلكية",
      url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    },
  },
  {
    id: "8",
    name: "بنطال جينز كلاسيكي",
    price: 220,
    discount: 20,
    stock: 28,
    category: "ملابس",
    description: "بنطال جينز مريح وقوي، مناسب للارتداء اليومي",
    photos: [
      {
        name: "بنطال جينز كلاسيكي",
        url: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
      },
    ],
    thumbnail: {
      name: "بنطال جينز كلاسيكي",
      url: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
    },
  },
];

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

const sampleProductsForTemplates: ProductType[] = sampleProducts.slice(0, 8);

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
        type: "text" as const,
        value: title,
      },
      {
        id: "description",
        label: "الوصف",
        name: "description",
        type: "textarea" as const,
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
        type: "text" as const,
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
      section_id: "1",
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
      section_id: "1",
      type: "recentProducts",
      view_all_link: "",
      options: [
        ...recent_products_sections.filter((p) => p.id !== "1"),
        createProductsSection("1", "منتجات مميزة", sampleProductsForTemplates) || recent_products_sections[0],
      ],
      editable: true,
    },
  ],
};

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
      section_id: "2",
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
        createProductsSection("2", "أحدث المنتجات", sampleProductsForTemplates) || recent_products_sections[1],
      ],
      editable: true,
    },
    {
      id: "4",
      section_id: "1",
      type: "footer",
      editable: true,
      options: footer_sections,
    },
  ],
};

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
              type: "text" as const,
              value: "مجموعة فاخرة من المنتجات",
            },
            {
              id: "description",
              label: "الوصف",
              name: "description",
              type: "textarea" as const,
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
        createProductsSection("1", "منتجات مميزة", sampleProductsForTemplates) || recent_products_sections[0],
      ],
      editable: true,
    },
  ],
};

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
  const menuOption = recent_products_sections.find((m) => m.id === sectionId);
  if (!menuOption) return null;

  return {
    ...menuOption,
    content: [
      {
        id: "title",
        label: "Title",
        name: "title",
        type: "text" as const,
        value: title,
      },
    ],
    products: products,
  };
};

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
      section_id: "1",
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
      section_id: "1",
      type: "recentProducts",
      view_all_link: "",
      options: [
        ...recent_products_sections.filter((m) => m.id !== "1"),
        createMenuSection("1", "قائمة الطعام", restaurantMenuItems.slice(0, 6)) || recent_products_sections[0],
      ],
      editable: true,
    },
  ],
};

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
      section_id: "2",
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
      section_id: "2",
      type: "recentProducts",
      view_all_link: "",
      options: [
        ...recent_products_sections.filter((m) => m.id !== "2"),
        createMenuSection("2", "قائمة الطعام", restaurantMenuItems) || recent_products_sections[1],
      ],
      editable: true,
    },
  ],
};

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
              type: "text" as const,
              value: "تجربة طعام فاخرة",
            },
            {
              id: "description",
              label: "الوصف",
              name: "description",
              type: "textarea" as const,
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
        ...recent_products_sections.filter((m) => m.id !== "3"),
        createMenuSection("3", "قائمة الطعام", restaurantMenuItems) || recent_products_sections[2],
      ],
      editable: true,
    },
  ],
};

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
        createProductsSection("1", "منتجاتنا المميزة", sampleProductsForTemplates) || recent_products_sections[0],
      ],
      editable: true,
    },
  ],
};

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
              type: "text" as const,
              value: "مجموعة فاخرة حصرية",
            },
            {
              id: "description",
              label: "الوصف",
              name: "description",
              type: "textarea" as const,
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
        createProductsSection("2", "منتجات مميزة", sampleProductsForTemplates) || recent_products_sections[1],
      ],
      editable: true,
    },
  ],
};

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
        ...recent_products_sections.filter((m) => m.id !== "1"),
        createMenuSection("1", "قائمة الطعام", restaurantMenuItems) || recent_products_sections[0],
      ],
      editable: true,
    },
  ],
};

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
              type: "text" as const,
              value: "تجربة طعام فاخرة",
            },
            {
              id: "description",
              label: "الوصف",
              name: "description",
              type: "textarea" as const,
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
        ...recent_products_sections.filter((m) => m.id !== "3"),
        createMenuSection("3", "قائمة الطعام", restaurantMenuItems) || recent_products_sections[2],
      ],
      editable: true,
    },
  ],
};

export const templatesMap: Record<string, TemplateType> = {
  "minimal-ecommerce": minimalEcommerceTemplate,
  "modern-ecommerce": modernEcommerceTemplate,
  "elegant-ecommerce": elegantEcommerceTemplate,
  "classic-ecommerce": classicEcommerceTemplate,
  "premium-ecommerce": premiumEcommerceTemplate,
  "minimal-restaurant": minimalRestaurantTemplate,
  "modern-restaurant": modernRestaurantTemplate,
  "elegant-restaurant": elegantRestaurantTemplate,
  "classic-restaurant": classicRestaurantTemplate,
  "premium-restaurant": premiumRestaurantTemplate,
};
