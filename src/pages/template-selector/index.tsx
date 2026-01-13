import { useState } from "react";
import React from "react";
import { usePageStore } from "../../store/editor/page";
import { useStoreSettingsStore } from "../../store/editor/store-settings";
import { templatesMap } from "../../mock/templates";
import { PageType, TemplateType } from "../../types";
import { Check, Sparkles, Store, UtensilsCrossed } from "lucide-react";
import { hero_sections } from "../../mock/template/sections/hero";
import { menu_sections } from "../../mock/template/sections/menu";
import { categories_sections } from "../../mock/template/sections/categories";
import { recent_products_sections } from "../../mock/template/sections/recent-products";
import { footer_sections } from "../../mock/template/sections/footer";
import { our_story_sections } from "../../mock/template/sections/our-story";
import { contact_sections } from "../../mock/template/sections/contact";
import { mockProducts } from "../../mock/products";
import { useNavigate } from "react-router-dom";

// Sample data for pages
const sampleProducts = mockProducts.slice(0, 8);
const restaurantMenuItems = [
  {
    id: "r1",
    name: "برجر كلاسيكي",
    price: 45,
    discount: 0,
    stock: 50,
    category: "الأطباق الرئيسية",
    description: "برجر لحم طازج مع خضار وجبنة، يقدم مع بطاطا",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
      },
    ],
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
    photos: [
      {
        url: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500",
      },
    ],
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
    photos: [
      {
        url: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500",
      },
    ],
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
    photos: [
      {
        url: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2fdc?w=500",
      },
    ],
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
    photos: [
      {
        url: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=500",
      },
    ],
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
    photos: [
      {
        url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500",
      },
    ],
    thumbnail: {
      url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500",
    },
  },
];
const TemplateSelector = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const { pages, setPages, setCurrentPageId } = usePageStore();
  const { storeSettings, updateStoreSettings, setStoreType } =
    useStoreSettingsStore();
  const navigate = useNavigate();

  // Check if store type needs to be selected (no pages exist)
  const needsStoreTypeSelection = pages.length === 0;
  const hasSelectedStoreType = !!storeSettings.type;

  // Filter templates by store type
  const filteredTemplates = Object.values(templatesMap).filter(
    (template) => template.storeType === storeSettings.type
  );

  // Create available templates with editable features
  const availableTemplates: (TemplateType & {
    editable: {
      colors: boolean;
      fonts: boolean;
      logo: boolean;
      header: boolean;
      footer: boolean;
      sections: boolean;
      products: boolean;
      categories: boolean;
    };
  })[] = filteredTemplates.map((template) => ({
    ...template,
    editable: {
      colors: true,
      fonts: true,
      logo: true,
      header: true,
      footer: true,
      sections: true,
      products: true,
      categories: true,
    },
  }));

  const handleSelectTemplate = (templateId: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Get the selected template
    const template = templatesMap[templateId];
    if (!template) {
      console.error("Template not found:", templateId);
      return;
    }

    // Initialize pages based on store type and selected template
    // Distribute template sections across 4 pages to make template complete

    // Get editable sections from template (excluding navigation)
    const editableSections = template.sections.filter(
      (s) => s.editable && s.type !== "navigation"
    );

    // Helper function to clone a section with new IDs
    const cloneSection = (section: any) => ({
      ...section,
      id: crypto.randomUUID(),
      target_id: crypto.randomUUID(),
    });

    // Helper function to create section with specific variant and custom content
    const createSectionWithVariant = (
      type: string,
      sectionId: string,
      customContent?: any
    ) => {
      let options: any[] = [];

      if (type === "hero") {
        options = hero_sections;
      } else if (type === "recentProducts") {
        options =
          storeSettings.type === "restaurant"
            ? menu_sections
            : recent_products_sections;
      } else if (type === "categories") {
        options = categories_sections;
      } else if (type === "footer") {
        options = footer_sections;
      } else if (type === "ourStory") {
        options = our_story_sections;
      } else if (type === "contact") {
        options = contact_sections;
      }

      const selectedOption = options.find((opt) => opt.id === sectionId);
      if (!selectedOption) return null;

      return {
        id: crypto.randomUUID(),
        section_id: sectionId,
        type: type,
        view_all_link: "",
        editable: true,
        options: options.map((opt) => {
          if (opt.id === sectionId && customContent) {
            return {
              ...opt,
              ...customContent,
            };
          }
          return opt;
        }),
        target_id: crypto.randomUUID(),
      };
    };

    let initialPages: PageType[] = [];

    if (storeSettings.type === "restaurant") {
      // Restaurant: Only 1 page - Menu (with Categories + Products, NO Navigation)
      const menuPageSections: any[] = [];

      // Add Categories section
      const categoriesSection = editableSections.find(
        (s) => s.type === "categories"
      );
      if (categoriesSection) {
        menuPageSections.push(cloneSection(categoriesSection));
      } else {
        // Create default categories section
        const defaultCategories = createSectionWithVariant(
          "categories",
          "1",
          {}
        );
        if (defaultCategories) menuPageSections.push(defaultCategories);
      }

      // Add Menu section (Products) - variant 2 (Grid) with menu items
      const menuSection = createSectionWithVariant("recentProducts", "2", {
        content: [
          {
            id: "title",
            label: "Title",
            name: "title",
            type: "text",
            value: "قائمة الطعام",
          },
        ],
        products: restaurantMenuItems,
      });
      if (menuSection) menuPageSections.push(menuSection);

      const menuPage: PageType = {
        id: crypto.randomUUID(),
        name: "القائمة",
        type: "menu",
        sections: menuPageSections,
      };

      initialPages = [menuPage];
    } else {
      // E-commerce: 4 pages - Home, About, Products, Contact

      // Page 1: Home Page - Hero (variant 3 - Carousel) + Categories + Products (variant 2 - Carousel)
      const homePageSections: any[] = [];

      // Add Navigation (only on home page)
      const navSection = template.sections.find((s) => s.type === "navigation");
      if (navSection) {
        homePageSections.push(cloneSection(navSection));
      }

      // Add Hero section - variant 3 (Carousel) with custom content
      const homeHero = createSectionWithVariant("hero", "3", {
        content: [
          {
            id: "title",
            label: "العنوان",
            name: "title",
            type: "text",
            value: "مرحباً بك في متجرنا",
          },
          {
            id: "description",
            label: "الوصف",
            name: "description",
            type: "textarea",
            value: "اكتشف مجموعتنا المميزة من المنتجات عالية الجودة",
          },
        ],
        photos: [
          {
            id: crypto.randomUUID(),
            label: "صورة 1",
            url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200",
          },
          {
            id: crypto.randomUUID(),
            label: "صورة 2",
            url: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200",
          },
        ],
      });
      if (homeHero) homePageSections.push(homeHero);

      // Add Categories section
      const categoriesSection = editableSections.find(
        (s) => s.type === "categories"
      );
      if (categoriesSection) {
        homePageSections.push(cloneSection(categoriesSection));
      } else {
        // Create default categories section
        const defaultCategories = createSectionWithVariant(
          "categories",
          "1",
          {}
        );
        if (defaultCategories) homePageSections.push(defaultCategories);
      }

      // Add Products section - variant 2 (Carousel) with custom content
      const homeProducts = createSectionWithVariant("recentProducts", "2", {
        content: [
          {
            id: "title",
            label: "Title",
            name: "title",
            type: "text",
            value: "منتجات مميزة",
          },
        ],
        products: sampleProducts,
      });
      if (homeProducts) homePageSections.push(homeProducts);

      const homePage: PageType = {
        id: crypto.randomUUID(),
        name: "الصفحة الرئيسية",
        type: "home",
        sections: homePageSections,
      };

      // Page 2: About Page - Hero + Our Story + Contact sections
      const aboutPageSections: any[] = [];

      // Add Hero section
      const aboutHero = createSectionWithVariant("hero", "2", {
        content: [
          {
            id: "title",
            label: "العنوان",
            name: "title",
            type: "text",
            value: "حول متجرنا",
          },
          {
            id: "description",
            label: "الوصف",
            name: "description",
            type: "textarea",
            value: "نقدم لكم أفضل المنتجات والخدمات مع ضمان الجودة والرضا",
          },
        ],
        photos: [
          {
            id: crypto.randomUUID(),
            label: "صورة",
            url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
          },
        ],
      });
      if (aboutHero) aboutPageSections.push(aboutHero);

      // Add Our Story section
      const ourStorySection = createSectionWithVariant("ourStory", "1", {
        content: [
          {
            id: "title",
            label: "العنوان",
            name: "title",
            type: "text",
            value: "قصتنا",
          },
          {
            id: "description",
            label: "الوصف",
            name: "description",
            type: "textarea",
            value: "نحن متجر متخصص في تقديم أفضل المنتجات والخدمات لعملائنا. بدأنا رحلتنا برؤية واضحة لتقديم تجربة تسوق استثنائية تجمع بين الجودة والسعر المناسب. نسعى دائماً لتطوير خدماتنا وتحسين تجربة عملائنا.",
          },
        ],
        photos: [
          {
            id: crypto.randomUUID(),
            label: "صورة",
            url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800",
          },
        ],
      });
      if (ourStorySection) aboutPageSections.push(ourStorySection);

      // Add Contact section
      const contactSection = createSectionWithVariant("contact", "1", {
        content: [
          {
            id: "title",
            label: "العنوان",
            name: "title",
            type: "text",
            value: "اتصل بنا",
          },
          {
            id: "description",
            label: "الوصف",
            name: "description",
            type: "textarea",
            value: "نحن هنا لمساعدتك. تواصل معنا عبر أي من الطرق التالية.",
          },
          {
            id: "email",
            label: "البريد الإلكتروني",
            name: "email",
            type: "text",
            value: "info@example.com",
          },
          {
            id: "phone",
            label: "رقم الهاتف",
            name: "phone",
            type: "text",
            value: "+966 50 123 4567",
          },
          {
            id: "address",
            label: "العنوان",
            name: "address",
            type: "textarea",
            value: "الرياض، المملكة العربية السعودية",
          },
          {
            id: "hours",
            label: "ساعات العمل",
            name: "hours",
            type: "text",
            value: "الأحد - الخميس: 9 صباحاً - 6 مساءً",
          },
        ],
      });
      if (contactSection) aboutPageSections.push(contactSection);

      const aboutPage: PageType = {
        id: crypto.randomUUID(),
        name: "حول المتجر",
        type: "about",
        sections: aboutPageSections,
      };

      // Page 3: Products Page - Products variant 1 (Grid) with different content
      const productsPageSections: any[] = [];

      const productsSection = createSectionWithVariant("recentProducts", "1", {
        content: [
          {
            id: "title",
            label: "Title",
            name: "title",
            type: "text",
            value: "جميع المنتجات",
          },
        ],
        products: sampleProducts,
      });
      if (productsSection) productsPageSections.push(productsSection);

      const productsPage: PageType = {
        id: crypto.randomUUID(),
        name: "المنتجات",
        type: "content",
        sections: productsPageSections,
      };

      // Page 4: Contact Page - Hero + Contact section
      const contactPageSections: any[] = [];

      // Add Hero section
      const contactHero = createSectionWithVariant("hero", "1", {
        content: [
          {
            id: "title",
            label: "العنوان",
            name: "title",
            type: "text",
            value: "اتصل بنا",
          },
          {
            id: "description",
            label: "الوصف",
            name: "description",
            type: "textarea",
            value:
              "نحن هنا لمساعدتك. تواصل معنا عبر البريد الإلكتروني أو الهاتف",
          },
        ],
      });
      if (contactHero) contactPageSections.push(contactHero);

      // Add Contact section
      const contactPageContactSection = createSectionWithVariant("contact", "2", {
        content: [
          {
            id: "title",
            label: "العنوان",
            name: "title",
            type: "text",
            value: "تواصل معنا",
          },
          {
            id: "description",
            label: "الوصف",
            name: "description",
            type: "textarea",
            value: "تواصل معنا عبر أي من الطرق التالية",
          },
          {
            id: "email",
            label: "البريد الإلكتروني",
            name: "email",
            type: "text",
            value: "info@example.com",
          },
          {
            id: "phone",
            label: "رقم الهاتف",
            name: "phone",
            type: "text",
            value: "+966 50 123 4567",
          },
          {
            id: "address",
            label: "العنوان",
            name: "address",
            type: "textarea",
            value: "الرياض، المملكة العربية السعودية",
          },
          {
            id: "hours",
            label: "ساعات العمل",
            name: "hours",
            type: "text",
            value: "الأحد - الخميس: 9 صباحاً - 6 مساءً",
          },
        ],
      });
      if (contactPageContactSection) contactPageSections.push(contactPageContactSection);

      const contactPage: PageType = {
        id: crypto.randomUUID(),
        name: "اتصل بنا",
        type: "content",
        sections: contactPageSections,
      };

      initialPages = [homePage, aboutPage, productsPage, contactPage];
    }

    // Set navigation links based on created pages (in order)
    const navigationLinks = initialPages.map((page) => ({
      id: crypto.randomUUID(),
      label: page.name,
      url: `/${page.type}`,
      pageId: page.id,
    }));

    updateStoreSettings({
      header: {
        ...storeSettings.header,
        navigationLinks: navigationLinks,
      },
    });

    // Set pages and navigate to editor
    setPages(initialPages);
    // Set current page to first page (menu for restaurant, home for e-commerce)
    setCurrentPageId(initialPages[0].id);
    navigate("/editor");
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-8 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Store Type Selection - Show only if no store type selected */}
        {needsStoreTypeSelection && !hasSelectedStoreType ? (
          <div className="min-h-[70vh] flex items-center justify-center">
            <div className="w-full max-w-5xl">
              <div className="text-center mb-16">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="p-4 bg-blue-100 rounded-2xl">
                    <Sparkles className="w-12 h-12 text-blue-600" />
                  </div>
                  <h1 className="text-5xl font-bold text-slate-900">
                    ابدأ بإنشاء متجرك
                  </h1>
                </div>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                  اختر نوع المتجر الذي تريد إنشاءه
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* E-commerce Option */}
                <button
                  onClick={() => setStoreType("e-commerce")}
                  className={`
                    relative group bg-white rounded-3xl overflow-hidden
                    shadow-xl hover:shadow-2xl transition-all duration-300
                    border-2 p-10 text-right transform hover:-translate-y-1
                    ${
                      storeSettings.type === "e-commerce"
                        ? "border-blue-600 ring-4 ring-blue-200 scale-105"
                        : "border-slate-200 hover:border-blue-400"
                    }
                  `}
                >
                  <div className="flex flex-col items-start gap-6">
                    <div
                      className={`p-5 rounded-2xl transition-colors ${
                        storeSettings.type === "e-commerce"
                          ? "bg-blue-600"
                          : "bg-blue-100 group-hover:bg-blue-200"
                      }`}
                    >
                      <Store
                        className={`w-10 h-10 ${
                          storeSettings.type === "e-commerce"
                            ? "text-white"
                            : "text-blue-600"
                        }`}
                      />
                    </div>

                    <div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-3">
                        متجر إلكتروني
                      </h3>
                      <p className="text-slate-600 text-lg leading-relaxed">
                        مثالي لبيع المنتجات والخدمات عبر الإنترنت
                      </p>
                    </div>
                    {storeSettings.type === "e-commerce" && (
                      <div className="absolute top-6 left-6 bg-blue-600 text-white rounded-full p-3 shadow-lg">
                        <Check className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                </button>

                {/* Restaurant Option */}
                <button
                  onClick={() => setStoreType("restaurant")}
                  className={`
                    relative group bg-white rounded-3xl overflow-hidden
                    shadow-xl hover:shadow-2xl transition-all duration-300
                    border-2 p-10 text-right transform hover:-translate-y-1
                    ${
                      storeSettings.type === "restaurant"
                        ? "border-blue-600 ring-4 ring-blue-200 scale-105"
                        : "border-slate-200 hover:border-blue-400"
                    }
                  `}
                >
                  <div className="flex flex-col items-start gap-6">
                    <div
                      className={`p-5 rounded-2xl transition-colors ${
                        storeSettings.type === "restaurant"
                          ? "bg-orange-600"
                          : "bg-orange-100 group-hover:bg-orange-200"
                      }`}
                    >
                      <UtensilsCrossed
                        className={`w-10 h-10 ${
                          storeSettings.type === "restaurant"
                            ? "text-white"
                            : "text-orange-600"
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-3">
                        مطعم
                      </h3>
                      <p className="text-slate-600 text-lg leading-relaxed">
                        مثالي لعرض القوائم والوجبات والخدمات
                      </p>
                    </div>
                    {storeSettings.type === "restaurant" && (
                      <div className="absolute top-6 left-6 bg-blue-600 text-white rounded-full p-3 shadow-lg">
                        <Check className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Store Type Selector - Always visible */}
            <div className="mb-12">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">
                      نوع المتجر المختار
                    </h2>
                    <p className="text-slate-600 text-sm">
                      يمكنك تغيير نوع المتجر في أي وقت
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setStoreType("e-commerce")}
                      className={`
                        flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-200
                        ${
                          storeSettings.type === "e-commerce"
                            ? "bg-blue-600 text-white shadow-lg"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }
                      `}
                    >
                      <Store className="w-5 h-5" />
                      <span>متجر إلكتروني</span>
                      {storeSettings.type === "e-commerce" && (
                        <Check className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => setStoreType("restaurant")}
                      className={`
                        flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-200
                        ${
                          storeSettings.type === "restaurant"
                            ? "bg-orange-600 text-white shadow-lg"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }
                      `}
                    >
                      <UtensilsCrossed className="w-5 h-5" />
                      <span>مطعم</span>
                      {storeSettings.type === "restaurant" && (
                        <Check className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Templates Grid */}
            {availableTemplates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {availableTemplates.map((template) => (
                  <div
                    key={template.id}
                    className={`
                      relative group bg-white rounded-3xl overflow-hidden
                      shadow-lg hover:shadow-2xl transition-all duration-300
                      border-2 transform hover:-translate-y-1
                      ${
                        selectedTemplate === template.id
                          ? "border-blue-600 ring-4 ring-blue-200 scale-105"
                          : "border-slate-200 hover:border-blue-400"
                      }
                    `}
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                      <img
                        src={template.thumbnail.url}
                        alt={template.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                      {selectedTemplate === template.id && (
                        <div className="absolute inset-0 bg-blue-600/30 flex items-center justify-center backdrop-blur-sm">
                          <div className="bg-blue-600 text-white rounded-full p-4 shadow-xl">
                            <Check className="w-8 h-8" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Template Info */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">
                        {template.title}
                      </h3>
                      <p className="text-slate-600 mb-5 leading-relaxed">
                        {template.description}
                      </p>

                      {/* Editable Features */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {template.editable.colors && (
                          <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold border border-blue-200">
                            الألوان
                          </span>
                        )}
                        {template.editable.fonts && (
                          <span className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-xs font-semibold border border-purple-200">
                            الخطوط
                          </span>
                        )}
                        {template.editable.logo && (
                          <span className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-semibold border border-green-200">
                            الشعار
                          </span>
                        )}
                        {template.editable.sections && (
                          <span className="px-3 py-1.5 bg-orange-50 text-orange-700 rounded-lg text-xs font-semibold border border-orange-200">
                            الأقسام
                          </span>
                        )}
                        {template.editable.products && (
                          <span className="px-3 py-1.5 bg-pink-50 text-pink-700 rounded-lg text-xs font-semibold border border-pink-200">
                            المنتجات
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Select Button */}
                    <div className="px-6 pb-6">
                      <button
                        onClick={(e) => {
                          setSelectedTemplate(template.id);
                          handleSelectTemplate(template.id, e);
                        }}
                        className={`
                          w-full py-3.5 rounded-xl font-semibold transition-all duration-200
                          ${
                            selectedTemplate === template.id
                              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-md"
                          }
                        `}
                      >
                        {selectedTemplate === template.id
                          ? "✓ تم الاختيار"
                          : "اختر هذا القالب"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl shadow-lg">
                <p className="text-xl text-slate-600">
                  لا توجد قوالب متاحة لهذا النوع من المتجر
                </p>
              </div>
            )}

            {/* Info Section */}
            <div className="bg-white rounded-3xl p-10 shadow-xl border border-slate-200">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                ما يمكنك تعديله في أي قالب:
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex flex-col gap-3 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                    <span className="text-3xl">🎨</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">الألوان</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    غير الألوان الأساسية والثانوية
                  </p>
                </div>
                <div className="flex flex-col gap-3 p-6 bg-purple-50 rounded-2xl border border-purple-100">
                  <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                    <span className="text-3xl">✍️</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">الخطوط</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    اختر خطوط العناوين والنصوص
                  </p>
                </div>
                <div className="flex flex-col gap-3 p-6 bg-green-50 rounded-2xl border border-green-100">
                  <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                    <span className="text-3xl">🖼️</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">الشعار</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    أضف شعار متجرك في الهيدر والفوتر
                  </p>
                </div>
                <div className="flex flex-col gap-3 p-6 bg-orange-50 rounded-2xl border border-orange-100">
                  <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
                    <span className="text-3xl">📦</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">المحتوى</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    أضف وأعدل الأقسام والمنتجات
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TemplateSelector;
