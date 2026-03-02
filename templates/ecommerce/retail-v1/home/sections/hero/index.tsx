import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePageStore } from "@/shared/store/editor/page";

// Helper to get editor data if in editor context
const useEditorData = (id?: string) => {
  if (!id) return { sectionData: null, sectionContent: {}, photos: [], getContentValue: (key: string) => '' };

  const sectionData = usePageStore((state) => {
    const page = state.pages.find((p) => p.id === state.currentPageId);
    return page?.sections.find((s) => s.id === id || s.section_id === id);
  });

  const sectionContent = sectionData?.content || {};
  const photos = sectionData?.photos || [];

  // Helper to get content value regardless of format
  const getContentValue = (key: string) => {
    if (Array.isArray(sectionContent)) {
      const item = sectionContent.find((item: any) => item.name === key);
      return item?.value || '';
    }
    return sectionContent[key] || '';
  };

  return {
    sectionData,
    sectionContent,
    photos,
    getContentValue
  };
};

// Hero 1: Text Only - نص فقط
export const HeroSection1 = ({
  id,
  title,
  description,
  styles,
  isEditor = false
}: {
  id?: string;
  title?: string;
  description?: string;
  styles?: any;
  isEditor?: boolean;
}) => {
  const { getContentValue } = useEditorData(isEditor ? id : undefined);

  // Use editor content if available, otherwise props
  const finalTitle = getContentValue('title') || title;
  const finalDescription = getContentValue('description') || description;

  return (
    <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 min-h-[50vh] sm:min-h-[60vh] flex flex-col items-center justify-center text-center">
      {finalTitle && (
        <h1
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 px-4 ${!styles?.headingColor && !styles?.textColor ? "text-slate-900" : ""}`}
          style={{ color: styles?.headingColor || styles?.textColor }}
          {...(isEditor && {
            "data-type": "text",
            "data-title": "العنوان",
            "data-name": "title"
          })}
        >
          {finalTitle}
        </h1>
      )}
      {finalDescription && (
        <p
          className={`text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl px-4 ${!styles?.textColor ? "text-slate-600" : ""}`}
          style={{ color: styles?.textColor }}
          {...(isEditor && {
            "data-type": "textarea",
            "data-title": "الوصف",
            "data-name": "description"
          })}
        >
          {finalDescription}
        </p>
      )}
    </header>
  );
};

// Hero 2: Image and Text - صورة ونص
export const HeroSection2 = ({
  id,
  title,
  description,
  photos,
  styles,
  isEditor = false
}: {
  id?: string;
  title?: string;
  description?: string;
  photos?: any[];
  styles?: any;
  isEditor?: boolean;
}) => {
  const { getContentValue, photos: editorPhotos } = useEditorData(isEditor ? id : undefined);

  // Use editor content if available, otherwise props
  const finalTitle = getContentValue('title') || title;
  const finalDescription = getContentValue('description') || description;
  const finalPhotos = editorPhotos.length > 0 ? editorPhotos : (photos || []);
  const photoUrl = finalPhotos[0]?.url || finalPhotos[0]?.base64Content;

  return (
    <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 min-h-[60vh] sm:min-h-[70vh] flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12">
      <div className="flex-1 flex flex-col gap-4 sm:gap-6 w-full md:w-auto">
        {finalTitle && (
          <h1
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold ${!styles?.headingColor && !styles?.textColor ? "text-slate-900" : ""}`}
            style={{ color: styles?.headingColor || styles?.textColor }}
            {...(isEditor && {
              "data-type": "text",
              "data-title": "العنوان",
              "data-name": "title"
            })}
          >
            {finalTitle}
          </h1>
        )}
        {finalDescription && (
          <p
            className={`text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed ${!styles?.textColor ? "text-slate-600" : ""}`}
            style={{ color: styles?.textColor }}
            {...(isEditor && {
              "data-type": "textarea",
              "data-title": "الوصف",
              "data-name": "description"
            })}
          >
            {finalDescription}
          </p>
        )}
      </div>
      {photoUrl ? (
        <div className="flex-1 w-full max-w-lg">
          <img
            src={photoUrl}
            className="w-full h-auto rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl object-cover"
            alt={finalTitle || "Hero"}
            {...(isEditor && {
              "data-type": "image",
              "data-name": "hero_image",
              "data-title": "صورة البطل"
            })}
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
export const HeroSection3 = ({
  id,
  title,
  description,
  photos,
  styles,
  isEditor = false
}: {
  id?: string;
  title?: string;
  description?: string;
  photos?: any[];
  styles?: any;
  isEditor?: boolean;
}) => {
  const { getContentValue, photos: editorPhotos } = useEditorData(isEditor ? id : undefined);

  // Use editor content if available, otherwise props
  const finalTitle = getContentValue('title') || title;
  const finalDescription = getContentValue('description') || description;
  const finalPhotos = editorPhotos.length > 0 ? editorPhotos : (photos || []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const validPhotos = finalPhotos?.filter((photo) => photo?.url || photo?.base64Content) || [];

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
    setCurrentIndex((prev) => (prev - 1 + validPhotos.length) % validPhotos.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % validPhotos.length);
  };

  const currentPhoto = validPhotos[currentIndex];

  return (
    <header className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
      <>
        <div className="absolute inset-0 z-0">
          {validPhotos.length > 0 ? (
            <>
              {/* Render all images so DOM scanner can detect them */}
              {validPhotos.map((photo, index) => {
                const photoUrl = photo?.url || photo?.base64Content;
                return (
                  <img
                    key={photo.id || index}
                    src={photoUrl}
                    className={`w-full h-full object-cover transition-opacity duration-500 absolute inset-0 ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    alt={finalTitle || "Hero"}
                    {...(isEditor && {
                      "data-type": "image",
                      "data-name": `carousel_slide_${index}`,
                      "data-title": `شريحة ${index + 1}`
                    })}
                  />
                );
              })}
            </>
          ) : (
            <>
              {/* Render placeholder image so DOM scanner can detect it */}
              <img
                src=""
                className="w-full h-full object-cover absolute inset-0 opacity-0"
                alt="Carousel placeholder"
                {...(isEditor && {
                  "data-type": "image",
                  "data-name": "carousel_slide_0",
                  "data-title": "شريحة 1"
                })}
              />
              <div className="absolute inset-0 bg-slate-200 flex items-center justify-center z-10">
                <span className="text-slate-400 text-sm sm:text-base">
                  أضف صور للـ Carousel
                </span>
              </div>
            </>
          )}
          {validPhotos.length > 0 && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/20 z-20"></div>
          )}
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
                className={`h-2 sm:h-3 rounded-full transition-all ${index === currentIndex
                  ? "bg-white w-6 sm:w-8"
                  : "bg-white/50 hover:bg-white/75 w-2 sm:w-3"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {finalTitle && (
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 drop-shadow-2xl px-4"
            {...(isEditor && {
              "data-type": "text",
              "data-title": "العنوان",
              "data-name": "title"
            })}
          >
            {finalTitle}
          </h1>
        )}
        {finalDescription && (
          <p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-3xl mx-auto drop-shadow-lg leading-relaxed px-4"
            {...(isEditor && {
              "data-type": "textarea",
              "data-title": "الوصف",
              "data-name": "description"
            })}
          >
            {finalDescription}
          </p>
        )}
      </div>
    </header>
  );
};

// Hero 4: Full Width Image with Overlay
export const HeroSection4 = ({
  id,
  title,
  description,
  photos,
  styles,
  isEditor = false
}: {
  id?: string;
  title?: string;
  description?: string;
  photos?: any[];
  styles?: any;
  isEditor?: boolean;
}) => {
  const { getContentValue, photos: editorPhotos } = useEditorData(isEditor ? id : undefined);

  // Use editor content if available, otherwise props
  const finalTitle = getContentValue('title') || title;
  const finalDescription = getContentValue('description') || description;
  const finalPhotos = editorPhotos.length > 0 ? editorPhotos : (photos || []);
  const photoUrl = finalPhotos[0]?.url || finalPhotos[0]?.base64Content;

  return (
    <header className="relative w-full min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center text-center overflow-hidden">
      {photoUrl ? (
        <div className="absolute inset-0">
          <img
            src={photoUrl}
            className="w-full h-full object-cover"
            alt={finalTitle || "Hero"}
            {...(isEditor && {
              "data-type": "image",
              "data-name": "fullwidth_image",
              "data-title": "صورة الخلفية"
            })}
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900"></div>
      )}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {finalTitle && (
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 ${!styles?.headingColor && !styles?.textColor ? "text-white" : ""}`}
            style={{ color: styles?.headingColor || styles?.textColor }}
            {...(isEditor && {
              "data-type": "text",
              "data-title": "العنوان",
              "data-name": "title"
            })}
          >
            {finalTitle}
          </h1>
        )}
        {finalDescription && (
          <p
            className={`text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto ${!styles?.textColor ? "text-white/90" : ""}`}
            style={{ color: styles?.textColor }}
            {...(isEditor && {
              "data-type": "textarea",
              "data-title": "الوصف",
              "data-name": "description"
            })}
          >
            {finalDescription}
          </p>
        )}
      </div>
    </header>
  );
};

// Hero 5: Split Screen
export const HeroSection5 = ({
  id,
  title,
  description,
  photos,
  styles,
  isEditor = false
}: {
  id?: string;
  title?: string;
  description?: string;
  photos?: any[];
  styles?: any;
  isEditor?: boolean;
}) => {
  const { getContentValue, photos: editorPhotos } = useEditorData(isEditor ? id : undefined);

  // Use editor content if available, otherwise props
  const finalTitle = getContentValue('title') || title;
  const finalDescription = getContentValue('description') || description;
  const finalPhotos = editorPhotos.length > 0 ? editorPhotos : (photos || []);
  const photoUrl = finalPhotos[0]?.url || finalPhotos[0]?.base64Content;

  return (
    <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 min-h-[60vh] sm:min-h-[70vh] grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
      <div className="flex flex-col gap-4 sm:gap-6">
        {finalTitle && (
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ${!styles?.headingColor && !styles?.textColor ? "text-slate-900" : ""}`}
            style={{ color: styles?.headingColor || styles?.textColor }}
            {...(isEditor && {
              "data-type": "text",
              "data-title": "العنوان",
              "data-name": "title"
            })}
          >
            {finalTitle}
          </h1>
        )}
        {finalDescription && (
          <p
            className={`text-base sm:text-lg md:text-xl leading-relaxed ${!styles?.textColor ? "text-slate-600" : ""}`}
            style={{ color: styles?.textColor }}
            {...(isEditor && {
              "data-type": "textarea",
              "data-title": "الوصف",
              "data-name": "description"
            })}
          >
            {finalDescription}
          </p>
        )}
      </div>
      {photoUrl ? (
        <div className="w-full">
          <img
            src={photoUrl}
            className="w-full h-auto rounded-2xl shadow-2xl object-cover"
            alt={finalTitle || "Hero"}
            {...(isEditor && {
              "data-type": "image",
              "data-name": "split_image",
              "data-title": "صورة القسم"
            })}
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
