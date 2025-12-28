import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Hero 1: Text Only - نص فقط
const HeroSection1 = ({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) => {
  return (
    <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 min-h-[50vh] sm:min-h-[60vh] flex flex-col items-center justify-center text-center">
      {title && (
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-slate-900 px-4">
          {title}
        </h1>
      )}
      {description && (
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 max-w-3xl px-4">
          {description}
        </p>
      )}
    </header>
  );
};

// Hero 2: Image and Text - صورة ونص
const HeroSection2 = ({
  title,
  description,
  photos,
}: {
  title?: string;
  description?: string;
  photos?: any[];
}) => {
  const photoUrl = photos?.[0]?.url || photos?.[0]?.base64Content;

  return (
    <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 min-h-[60vh] sm:min-h-[70vh] flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12">
      <div className="flex-1 flex flex-col gap-4 sm:gap-6 w-full md:w-auto">
        {title && (
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900">
            {title}
          </h1>
        )}
        {description && (
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 leading-relaxed">
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

// Hero 3: Carousel - سلايدر
const HeroSection3 = ({
  title,
  description,
  photos,
}: {
  title?: string;
  description?: string;
  photos?: any[];
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const validPhotos =
    photos?.filter((photo) => photo?.url || photo?.base64Content) || [];

  useEffect(() => {
    if (validPhotos.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % validPhotos.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [validPhotos.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + validPhotos.length) % validPhotos.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % validPhotos.length);
  };

  const currentPhoto = validPhotos[currentIndex];
  const currentPhotoUrl = currentPhoto?.url || currentPhoto?.base64Content;

  return (
    <header className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
      {currentPhotoUrl ? (
        <>
          <div className="absolute inset-0 z-0">
            <img
              src={currentPhotoUrl}
              className="w-full h-full object-cover transition-opacity duration-500"
              alt={title || "Hero"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/20"></div>
          </div>

          {/* Navigation Arrows */}
          {validPhotos.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {validPhotos.length > 1 && (
            <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {validPhotos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 sm:h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-white w-6 sm:w-8"
                      : "bg-white/50 hover:bg-white/75 w-2 sm:w-3"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
          <span className="text-slate-400 text-sm sm:text-base">
            أضف صور للـ Carousel
          </span>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {title && (
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 drop-shadow-2xl px-4">
            {title}
          </h1>
        )}
        {description && (
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-3xl mx-auto drop-shadow-lg leading-relaxed px-4">
            {description}
          </p>
        )}
      </div>
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
    component: HeroSection3,
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
];
