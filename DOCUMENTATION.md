# 📚 توثيق شامل للنظام - Mel Editor

## 🔹 المقدمة

نظام محرر متاجر إلكترونية مبني على **React + Vite + TypeScript**، يعتمد على نظام **JSON Templates** للسماح للمستخدمين بإنشاء وتخصيص متاجرهم.

### الفكرة الأساسية:
- المتجر مبني على **JSON Templates** قابلة للتخصيص
- المستخدم يختار قالب → يحصل على نسخة خاصة به → يفتح المحرر → يعدّل القيم المسموحة فقط
- المنطق الثابت (سلة، طلب، checkout) موجود مسبقاً داخل المكونات
- هذا الأسلوب يضمن: **أمان + قابلية توسعة + سهولة الصيانة**

---

## 📁 1. بنية المشروع (Project Structure)

```
src/
├─ App.jsx                          # Router الرئيسي
├─ main.jsx                         # نقطة الدخول
│
├─ pages/                           # الصفحات الرئيسية
│  ├─ template-selector/            # صفحة اختيار القالب
│  │  └─ index.tsx
│  └─ editor/                       # صفحة المحرر
│     └─ index.tsx
│
├─ components/                      # المكونات
│  ├─ editor/                       # مكونات المحرر
│  │  ├─ render/                    # رندر الموقع
│  │  │  └─ index.tsx
│  │  └─ side-nav/                  # القائمة الجانبية
│  │     ├─ content/                # تبويب المحتوى
│  │     │  ├─ page-list/           # قائمة الصفحات
│  │     │  ├─ section-list/        # قائمة الأقسام
│  │     │  └─ section-details/     # تفاصيل القسم المحدد
│  │     ├─ theme/                  # تبويب الثيم
│  │     │  ├─ colors/              # الألوان
│  │     │  ├─ fonts/               # الخطوط
│  │     │  ├─ store/               # إعدادات المتجر
│  │     │  └─ store-settings/      # إعدادات متقدمة
│  │     ├─ elements/               # تبويب العناصر (إضافة أقسام جديدة)
│  │     └─ header/                 # رأس القائمة الجانبية
│  └─ ui/                           # مكونات UI عامة
│     ├─ input/
│     ├─ file-upload/
│     └─ divider/
│
├─ store/                           # State Management (Zustand)
│  └─ editor/
│     ├─ page/                      # إدارة الصفحات
│     ├─ section/                   # إدارة الأقسام
│     └─ store-settings/            # إعدادات المتجر
│
├─ mock/                            # البيانات التجريبية
│  ├─ templates/                    # القوالب المتاحة
│  │  └─ index.ts
│  ├─ template/                     # قالب تجريبي قديم
│  └─ products/                     # المنتجات التجريبية
│
├─ types/                           # TypeScript Types
│  └─ index.d.ts
│
├─ hooks/                           # Custom Hooks
│  ├─ use-file-upload.ts
│  └─ editor-section-details/
│
└─ utils/                           # Utilities
   ├─ export.ts                     # تصدير JSON
   └─ file.ts                       # معالجة الملفات
```

---

## 📊 2. Types والبيانات (TypeScript Types)

### 2.1 TemplateType - القالب
```typescript
export type TemplateType = {
  id: string;                       // معرف القالب (مثل: "minimal", "modern", "elegant")
  title: string;                    // اسم القالب
  description: string;              // وصف القالب
  thumbnail: {                      // صورة القالب
    url: string;
  };
  sections: SectionType[];          // الأقسام التي يحتويها القالب
};
```

### 2.2 SectionType - القسم
```typescript
export type SectionType = {
  id: string;                       // معرف القسم (من القالب)
  section_id: string;               // معرف نوع القسم (يحدد أي option يُستخدم)
  type: string;                     // نوع القسم ("hero", "products", "categories", ...)
  editable: boolean;                // هل القسم قابل للتعديل؟
  view_all_link?: string;           // رابط "عرض الكل"
  links?: any[];                    // روابط إضافية
  options: SectionOptionType[];     // خيارات القسم (كل option = تصميم مختلف)
  target_id: string;                // معرف فريد للنسخة المحددة (يُنشأ عند التطبيق)
};
```

### 2.3 SectionOptionType - خيار القسم
```typescript
export type SectionOptionType = {
  id: string;                       // معرف الخيار (يُطابق section_id)
  title: string;                    // عنوان الخيار
  description?: string;             // وصف الخيار
  component?: React.ComponentType;  // المكون React الذي يُرندر
  thumbnail?: { url: string };      // صورة مصغرة للخيار
  photos?: any;                     // صور القسم
  content?: any;                    // محتوى نصي (مصفوفة أو كائن)
  products?: ProductType[];         // المنتجات (للأقسام التي تعرض منتجات)
  categories?: CategoryType[];      // الفئات
  view_all_link?: string;           // رابط "عرض الكل"
};
```

### 2.4 PageType - الصفحة
```typescript
export type PageType = {
  id: string;                       // معرف الصفحة (UUID)
  name: string;                     // اسم الصفحة
  type: "home" | "about" | "content" | "menu";  // نوع الصفحة
  sections: SectionType[];          // الأقسام في الصفحة
};
```

### 2.5 StoreType - إعدادات المتجر
```typescript
export type StoreType = {
  logo: FileType;                   // شعار المتجر
  name: string;                     // اسم المتجر
  description: string;              // وصف المتجر
  type: "e-commerce" | "restaurant"; // نوع المتجر
  header: {                         // الهيدر
    logo?: FileType;
    navigationLinks?: Array<{ id: string; label: string; url: string }>;
  };
  footer: {                         // الفوتر
    logo?: FileType;
    text?: string;
    links?: Array<{ id: string; label: string; url: string }>;
  };
};
```

---

## 🔄 3. تدفق البيانات (Data Flow)

### 3.1 اختيار القالب (Template Selection)
```
1. المستخدم يفتح التطبيق → TemplateSelector
2. يعرض القوالب المتاحة من mock/templates/index.ts
3. المستخدم يختار قالب → handleSelectTemplate()
4. يتم إنشاء صفحات جديدة:
   - homePage: يحتوي على sections القالب المختار (filter editable فقط)
   - aboutPage: صفحة فارغة
   - menuPage: (إذا كان type = "restaurant")
5. يتم حفظ الصفحات في usePageStore
6. التنقل إلى /editor
```

**الكود:**
```typescript
// src/pages/template-selector/index.tsx
const handleSelectTemplate = (templateId: string) => {
  const template = templatesMap[templateId];
  
  const homePage: PageType = {
    id: crypto.randomUUID(),
    name: "الصفحة الرئيسية",
    type: "home",
    sections: template.sections
      .filter((s) => s.editable)  // فقط الأقسام القابلة للتعديل
      .map((section) => ({
        ...section,
        target_id: crypto.randomUUID(),  // إنشاء target_id فريد
      })),
  };
  
  setPages([homePage, aboutPage, ...]);
  setCurrentPageId(homePage.id);
  navigate("/editor");
};
```

### 3.2 عرض الموقع (Rendering)
```
1. RenderTemplate يقرأ currentPage من usePageStore
2. لكل section في currentPage.sections:
   - يبحث عن option المطابق لـ section.section_id
   - يستخرج component من option
   - يرندر component مع props من option
3. يعرض Header و Footer من storeSettings
```

**الكود:**
```typescript
// src/components/editor/render/index.tsx
const RenderTemplate = () => {
  const { pages, currentPageId } = usePageStore();
  const currentPage = pages.find((p) => p.id === currentPageId);
  const sections = currentPage?.sections || [];

  return (
    <div>
      <Header {...storeSettings.header} />
      {sections.map((section) => (
        <Section key={section.target_id} section={section} />
      ))}
      <Footer {...storeSettings.footer} />
    </div>
  );
};

const Section = ({ section }: { section: SectionType }) => {
  // البحث عن option المطابق
  const selected_option = section.options?.find(
    (option) => option.id === section.section_id
  );
  const Component = selected_option?.component;
  
  // استخراج props من option
  const props = { ...selected_option, ...content, ...photos };
  
  return <Component {...props} />;
};
```

### 3.3 التعديل في المحرر (Editing)
```
1. المستخدم يضغط على section في Preview → setActiveSectionId(target_id)
2. Sidebar يقرأ activeSectionId → يعرض section-details
3. المستخدم يعدّل (نص، صورة، منتج) → handleTextChange, handleUploadImage, etc.
4. يتم تحديث section في currentPage → updatePage()
5. يتم حفظ التغييرات في localStorage (Zustand persist)
6. Preview يعيد الرندر تلقائياً
```

**الكود:**
```typescript
// src/hooks/editor-section-details/index.tsx
const useSectionDetails = () => {
  const { getSections, setSection, activeSectionId } = useSectionStore();
  const sections = getSections();
  const section = sections.find(s => s.target_id === activeSectionId);

  const handleTextChange = (value: string, name: string) => {
    const updatedSection = {
      ...section,
      options: section.options.map(opt => {
        if (opt.id === section.section_id) {
          return {
            ...opt,
            content: opt.content.map(item =>
              item.name === name ? { ...item, value } : item
            )
          };
        }
        return opt;
      })
    };
    setSection(updatedSection);
  };

  return { section, handleTextChange, ... };
};
```

### 3.4 حفظ البيانات (Persistence)
```
حالياً: localStorage (Zustand persist middleware)
المستقبل: Backend API

- usePageStore → "editor-pages-storage"
- useStoreSettingsStore → "editor-store-settings-storage"
- عند التصدير: exportToJSON() → JSON file
```

---

## 🗄️ 4. State Management (Zustand)

### 4.1 usePageStore - إدارة الصفحات
```typescript
// src/store/editor/page/index.tsx
const usePageStore = create<Store>()(
  persist(
    (set, get) => ({
      pages: PageType[],
      currentPageId: string,
      
      setPages: (pages) => set({ pages }),
      setCurrentPageId: (id) => set({ currentPageId: id }),
      addPage: (page) => set((state) => ({
        pages: [...state.pages, page],
        currentPageId: page.id
      })),
      updatePage: (page) => set((state) => ({
        pages: state.pages.map(p => p.id === page.id ? page : p)
      })),
      deletePage: (id) => set((state) => ({
        pages: state.pages.filter(p => p.id !== id)
      })),
      getCurrentPage: () => {
        const state = get();
        return state.pages.find(p => p.id === state.currentPageId);
      },
    }),
    { name: "editor-pages-storage" }
  )
);
```

### 4.2 useSectionStore - إدارة الأقسام
```typescript
// src/store/editor/section/index.tsx
const useSectionStore = create<Store>()((set, get) => ({
  activeSectionId: string,
  
  setActiveSectionId: (id) => set({ activeSectionId: id }),
  getSections: () => {
    const currentPage = usePageStore.getState().getCurrentPage();
    return currentPage?.sections || [];
  },
  setSections: (sections) => {
    const currentPage = usePageStore.getState().getCurrentPage();
    if (currentPage) {
      usePageStore.getState().updatePage({ ...currentPage, sections });
    }
  },
  setSection: (section) => {
    const currentPage = usePageStore.getState().getCurrentPage();
    const updatedSections = currentPage.sections.map(s =>
      s.target_id === section.target_id ? section : s
    );
    usePageStore.getState().updatePage({ ...currentPage, sections: updatedSections });
  },
  addSection: (section) => { /* ... */ },
  deleteSection: (targetId) => { /* ... */ },
}));
```

### 4.3 useStoreSettingsStore - إعدادات المتجر
```typescript
// src/store/editor/store-settings/index.tsx
const useStoreSettingsStore = create<Store>()(
  persist(
    (set) => ({
      storeSettings: StoreType,
      
      setStoreSettings: (settings) => set({ storeSettings: settings }),
      updateStoreSettings: (updates) => set((state) => ({
        storeSettings: { ...state.storeSettings, ...updates }
      })),
      setLogo: (logo) => set((state) => ({
        storeSettings: { ...state.storeSettings, logo }
      })),
      // ...
    }),
    { name: "editor-store-settings-storage" }
  )
);
```

---

## 🎨 5. كيفية إضافة قالب جديد

### الخطوات:

1. **إنشاء القالب في `src/mock/templates/index.ts`:**
```typescript
export const myNewTemplate: TemplateType = {
  id: "my-new-template",
  title: "My New Template",
  description: "وصف القالب",
  thumbnail: {
    url: "https://example.com/thumbnail.jpg"
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
      editable: true,
      options: hero_sections,
    },
    // ... المزيد من الأقسام
  ],
};
```

2. **إضافة القالب إلى `templatesMap`:**
```typescript
export const templatesMap: Record<string, TemplateType> = {
  minimal: minimalTemplate,
  modern: modernTemplate,
  elegant: elegantTemplate,
  "my-new-template": myNewTemplate,  // ← إضافة هنا
};
```

3. **إضافة القالب إلى `availableTemplates` في `template-selector/index.tsx`:**
```typescript
const availableTemplates = [
  // ... القوالب الموجودة
  {
    ...templatesMap["my-new-template"],
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
  },
];
```

---

## 🧩 6. كيفية إضافة Section Type جديد

### الخطوات:

1. **إنشاء المكون React:**
```typescript
// src/mock/template/sections/my-section/index.tsx
const MySection = ({ title, description, image }) => {
  return (
    <div className="my-section">
      <h2>{title}</h2>
      <p>{description}</p>
      {image && <img src={image.url || image.base64Content} alt={title} />}
    </div>
  );
};

export default MySection;
```

2. **إنشاء Section Options:**
```typescript
// src/mock/template/sections/my-section/index.tsx
import MySectionComponent from "./component";  // المكون الفعلي

export const my_section_options: SectionOptionType[] = [
  {
    id: "1",
    title: "تصميم 1",
    description: "وصف التصميم",
    component: MySectionComponent,
    content: [
      { name: "title", value: "عنوان افتراضي" },
      { name: "description", value: "وصف افتراضي" },
    ],
    photos: [],
  },
  {
    id: "2",
    title: "تصميم 2",
    // ...
  },
];
```

3. **إضافة Section Type إلى `elements/index.tsx`:**
```typescript
// src/components/editor/side-nav/elements/index.tsx
const availableSections = [
  // ... الأقسام الموجودة
  {
    id: "my-section",
    name: "قسمي الجديد",
    description: "وصف القسم",
    icon: SomeIcon,
    type: "mySection",
    defaultOptions: my_section_options,
  },
];
```

4. **إضافة معالجة في `section-details/index.tsx`:**
```typescript
// src/components/editor/side-nav/content/section-details/index.tsx
// إذا كان القسم يحتاج معالجة خاصة
if (section.type === "mySection") {
  return <MySectionDetails section={section} />;
}
```

---

## 🔌 7. التكامل مع Backend (API Integration)

### 7.1 حالياً: localStorage
البيانات تُحفظ محلياً في `localStorage` باستخدام Zustand persist middleware.

### 7.2 المستقبل: Backend API

**إنشاء ملف `src/services/api.ts`:**
```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// القوالب
export const getTemplates = () =>
  api.get('/templates').then(res => res.data);

// متجر المستخدم
export const getUserStore = () =>
  api.get('/stores/me', {
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(res => res.data);

export const saveStore = (storeData: {
  pages: PageType[];
  storeSettings: StoreType;
}) =>
  api.patch('/stores/me', storeData, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });

// المتجر العام (للزوار)
export const getPublicStore = (slug: string) =>
  api.get(`/stores/public/${slug}`).then(res => res.data);

// Helper
function getToken() {
  return localStorage.getItem('auth_token');
}
```

**تكامل مع Zustand Store:**
```typescript
// في usePageStore
export const usePageStore = create<Store>()(
  persist(
    (set, get) => ({
      // ... existing code
      syncWithBackend: async () => {
        const state = get();
        await saveStore({
          pages: state.pages,
          storeSettings: useStoreSettingsStore.getState().storeSettings,
        });
      },
    }),
    {
      name: "editor-pages-storage",
      // يمكن إضافة sync عند التحميل/الحفظ
      onRehydrateStorage: () => async (state) => {
        if (state) {
          // تحميل من Backend
          const serverData = await getUserStore();
          if (serverData) {
            state.setPages(serverData.pages);
          }
        }
      },
    }
  )
);
```

**استخدام في المكونات:**
```typescript
// في EditorPage أو ExportButton
const handleSave = async () => {
  await usePageStore.getState().syncWithBackend();
  // أو
  await saveStore({
    pages: usePageStore.getState().pages,
    storeSettings: useStoreSettingsStore.getState().storeSettings,
  });
};
```

---

## 📤 8. التصدير والاستيراد (Export/Import)

### 8.1 التصدير إلى JSON
```typescript
// src/utils/export.ts
export const exportToJSON = () => {
  const pages = usePageStore.getState().pages;
  const storeSettings = useStoreSettingsStore.getState().storeSettings;
  
  return JSON.stringify({
    pages,
    storeSettings,
    version: "1.0.0",
    exportedAt: new Date().toISOString(),
  }, null, 2);
};

export const downloadJSON = () => {
  const json = exportToJSON();
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'store-export.json';
  a.click();
  URL.revokeObjectURL(url);
};
```

### 8.2 الاستيراد من JSON
```typescript
// يمكن إضافة import function
export const importFromJSON = (jsonString: string) => {
  try {
    const data = JSON.parse(jsonString);
    
    if (data.pages) {
      usePageStore.getState().setPages(data.pages);
    }
    
    if (data.storeSettings) {
      useStoreSettingsStore.getState().setStoreSettings(data.storeSettings);
    }
    
    return true;
  } catch (error) {
    console.error('Import failed:', error);
    return false;
  }
};
```

---

## 🎯 9. ملاحظات مهمة

### 9.1 الأمان (Security)
- ✅ المستخدم يعدّل فقط `editable: true` sections
- ✅ لا يمكن تعديل structure القالب (فقط data)
- ✅ Backend يتحقق من البيانات قبل الحفظ
- ⚠️ يجب التحقق من البيانات في Backend قبل تطبيقها

### 9.2 الأداء (Performance)
- ✅ Sections تُرندر فقط عند الحاجة
- ✅ Images تُحفظ كـ base64 (يمكن تحسينها لـ URLs)
- ⚠️ القوالب الكبيرة قد تحتاج lazy loading

### 9.3 قابلية التوسعة (Scalability)
- ✅ إضافة قالب جديد = ملف JSON واحد
- ✅ إضافة Section Type = مكون React + option config
- ✅ Backend API منفصل = سهولة التكامل

---

## 🚀 10. الخلاصة

هذا النظام مصمم ليكون:
- **مرن**: إضافة قوالب وأقسام جديدة سهل
- **آمن**: المستخدم يعدّل فقط ما هو مسموح
- **قابل للتوسعة**: Backend API منفصل
- **قابل للصيانة**: كود منظم وموثق

### الخطوات التالية:
1. ✅ اختيار القالب
2. ✅ عرض القالب في المحرر
3. ✅ تعديل القالب (مقيّد)
4. ✅ حفظ التعديلات (localStorage)
5. ⏳ التكامل مع Backend API
6. ⏳ عرض المتجر العام (Public Store View)

---

**تم التوثيق بواسطة:** AI Assistant  
**التاريخ:** 2024  
**الإصدار:** 1.0.0

