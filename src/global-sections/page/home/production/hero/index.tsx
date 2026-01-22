"use server"
import { HeroCarousel } from "./hero-carousel";

// Hero 1: Text Only - نص فقط
// Hero 1: Text Only - نص فقط
export const HeroSection1 = ({
  title,
  description,
  styles,
}: {
  title?: string;
  description?: string;
  styles?: any;
}) => {
  return (
    <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 min-h-[50vh] sm:min-h-[60vh] flex flex-col items-center justify-center text-center">
      {title && (
        <h1
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 px-4 ${!styles?.headingColor && !styles?.textColor ? "text-slate-900" : ""}`}
          style={{ color: styles?.headingColor || styles?.textColor }}
        >
          {title}
        </h1>
      )}
      {description && (
        <p
          className={`text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl px-4 ${!styles?.textColor ? "text-slate-600" : ""}`}
          style={{ color: styles?.textColor }}
        >
          {description}
        </p>
      )}
    </header>
  );
};

// Hero 2: Image and Text - صورة ونص
// Hero 2: Image and Text - صورة ونص
export const HeroSection2 = ({
  title,
  description,
  photos,
  styles,
}: {
  title?: string;
  description?: string;
  photos?: any[];
  styles?: any;
}) => {
  const photoUrl = photos?.[0]?.url || photos?.[0]?.base64Content;

  return (
    <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 min-h-[60vh] sm:min-h-[70vh] flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12">
      <div className="flex-1 flex flex-col gap-4 sm:gap-6 w-full md:w-auto">
        {title && (
          <h1
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold ${!styles?.headingColor && !styles?.textColor ? "text-slate-900" : ""}`}
            style={{ color: styles?.headingColor || styles?.textColor }}
          >
            {title}
          </h1>
        )}
        {description && (
          <p
            className={`text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed ${!styles?.textColor ? "text-slate-600" : ""}`}
            style={{ color: styles?.textColor }}
          >
            {description}
          </p>
        )}
      </div>
      {photoUrl ? (
        <div className="flex-1 w-full max-w-lg">
          <img
            src={photoUrl}
            className="w-full h-auto rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl object-cover"
            alt={title || "Hero"}
          />
        </div>
      ) : (
        <div className="flex-1 w-full max-w-lg h-64 sm:h-80 md:h-96 bg-slate-200 rounded-xl sm:rounded-2xl flex items-center justify-center">
          <span className="text-slate-400 text-sm sm:text-base">أضف صورة</span>
        </div>
      )}
    </header>
  );
};

// Hero 4: Full Width Image with Overlay
// Hero 4: Full Width Image with Overlay
export const HeroSection4 = ({
  title,
  description,
  photos,
  styles,
}: {
  title?: string;
  description?: string;
  photos?: any[];
  styles?: any;
}) => {
  const photoUrl = photos?.[0]?.url || photos?.[0]?.base64Content;

  return (
    <header className="relative w-full min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center text-center overflow-hidden">
      {photoUrl ? (
        <div className="absolute inset-0">
          <img
            src={photoUrl}
            className="w-full h-full object-cover"
            alt={title || "Hero"}
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900"></div>
      )}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {title && (
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 ${!styles?.headingColor && !styles?.textColor ? "text-white" : ""}`}
            style={{ color: styles?.headingColor || styles?.textColor }}
          >
            {title}
          </h1>
        )}
        {description && (
          <p
            className={`text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto ${!styles?.textColor ? "text-white/90" : ""}`}
            style={{ color: styles?.textColor }}
          >
            {description}
          </p>
        )}
      </div>
    </header>
  );
};

// Hero 5: Split Screen
export const HeroSection5 = ({
  title,
  description,
  photos,
  styles,
}: {
  title?: string;
  description?: string;
  photos?: any[];
  styles?: any;
}) => {
  const photoUrl = photos?.[0]?.url || photos?.[0]?.base64Content;

  return (
    <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 min-h-[60vh] sm:min-h-[70vh] grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
      <div className="flex flex-col gap-4 sm:gap-6">
        {title && (
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ${!styles?.headingColor && !styles?.textColor ? "text-slate-900" : ""}`}
            style={{ color: styles?.headingColor || styles?.textColor }}
          >
            {title}
          </h1>
        )}
        {description && (
          <p
            className={`text-base sm:text-lg md:text-xl leading-relaxed ${!styles?.textColor ? "text-slate-600" : ""}`}
            style={{ color: styles?.textColor }}
          >
            {description}
          </p>
        )}
      </div>
      {photoUrl ? (
        <div className="w-full">
          <img
            src={photoUrl}
            className="w-full h-auto rounded-2xl shadow-2xl object-cover"
            alt={title || "Hero"}
          />
        </div>
      ) : (
        <div className="w-full h-64 sm:h-80 md:h-96 bg-slate-200 rounded-2xl flex items-center justify-center">
          <span className="text-slate-400 text-sm sm:text-base">أضف صورة</span>
        </div>
      )}
    </header>
  );
};

export const hero_sections = [
  {
    id: "1",
    title: "Hero - نص فقط",
    description: "تصميم بسيط مع نص فقط في المنتصف",
    component: HeroSection1,
    thumbnail: {
      url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300&vertical=center",
    },
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
        value: "اكتشف مجموعتنا المميزة من المنتجات",
      },
    ],
  },
  {
    id: "2",
    title: "Hero - صورة ونص",
    description: "تصميم مع صورة ونص جنباً إلى جنب",
    thumbnail: {
      url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300&vertical=center",
    },
    component: HeroSection2,
    photos: [],
    content: [
      {
        id: "title",
        label: "العنوان",
        name: "title",
        type: "text",
        value: "منتجات مميزة",
      },
      {
        id: "description",
        label: "الوصف",
        name: "description",
        type: "textarea",
        value: "اكتشف مجموعتنا الواسعة من المنتجات عالية الجودة",
      },
    ],
  },
  {
    id: "3",
    title: "Hero - Carousel",
    description: "سلايدر مع عدة صور ونص",
    thumbnail: {
      url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300&vertical=center",
    },
    component: HeroCarousel,
    photos: [],
    content: [
      {
        id: "title",
        label: "العنوان",
        name: "title",
        type: "text",
        value: "عروض مميزة",
      },
      {
        id: "description",
        label: "الوصف",
        name: "description",
        type: "textarea",
        value: "استمتع بأفضل العروض والخصومات الحصرية",
      },
    ],
  },
  {
    id: "4",
    title: "Hero - Full Width Image",
    description: "صورة كاملة العرض مع نص فوقها",
    thumbnail: {
      url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300&vertical=center",
    },
    component: HeroSection4,
    photos: [],
    content: [
      {
        id: "title",
        label: "العنوان",
        name: "title",
        type: "text",
        value: "عروض حصرية",
      },
      {
        id: "description",
        label: "الوصف",
        name: "description",
        type: "textarea",
        value: "اكتشف أفضل العروض والمنتجات المميزة",
      },
    ],
  },
  {
    id: "5",
    title: "Hero - Split Screen",
    description: "شاشة مقسمة مع نص وصورة",
    thumbnail: {
      url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300&vertical=center",
    },
    component: HeroSection5,
    photos: [],
    content: [
      {
        id: "title",
        label: "العنوان",
        name: "title",
        type: "text",
        value: "منتجات عالية الجودة",
      },
      {
        id: "description",
        label: "الوصف",
        name: "description",
        type: "textarea",
        value: "اكتشف مجموعتنا المميزة من المنتجات المصممة خصيصاً لك",
      },
    ],
  },
];
