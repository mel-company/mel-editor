import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePageStore } from "../../../../../store/editor/page";

// Hero 1: Text Only - نص فقط
const HeroSection1 = ({ id }: { id?: string }) => {
    // Connect to store
    const sectionContent = usePageStore((state) => {
        const page = state.pages.find((p) => p.id === state.currentPageId);
        const section = page?.sections.find((s) => s.id === id || s.section_id === id);
        return section?.content || {};
    });

    const { title, description } = sectionContent;
    return (
        <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 min-h-[50vh] sm:min-h-[60vh] flex flex-col items-center justify-center text-center">
            {title && (
                <h1
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-slate-900 px-4"
                    data-type="text"
                    data-title="العنوان"
                    data-name="title"
                >
                    {title}
                </h1>
            )}
            {description && (
                <p
                    className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 max-w-3xl px-4"
                    data-type="textarea"
                    data-title="الوصف"
                    data-name="description"
                >
                    {description}
                </p>
            )}
        </header>
    );
};

// Hero 2: Image and Text - صورة ونص
const HeroSection2 = ({ id }: { id?: string }) => {
    // Connect to store for content and photos
    const sectionData = usePageStore((state) => {
        const page = state.pages.find((p) => p.id === state.currentPageId);
        return page?.sections.find((s) => s.id === id || s.section_id === id);
    });

    const sectionContent = sectionData?.content || {};
    const photos = sectionData?.photos;

    const { title, description } = sectionContent;
    const photoUrl = photos?.[0]?.url || photos?.[0]?.base64Content;

    return (
        <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 min-h-[60vh] sm:min-h-[70vh] flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12">
            <div className="flex-1 flex flex-col gap-4 sm:gap-6 w-full md:w-auto">
                {title && (
                    <h1
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900"
                        data-type="text"
                        data-title="العنوان"
                        data-name="title"
                    >
                        {title}
                    </h1>
                )}
                {description && (
                    <p
                        className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 leading-relaxed"
                        data-type="textarea"
                        data-title="الوصف"
                        data-name="description"
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
                        data-type="image"
                        data-name="hero_image"
                        data-title="صورة البطل"
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
const HeroSection3 = ({ id }: { id?: string }) => {
    // Connect to store for content and photos
    const sectionData = usePageStore((state) => {
        const page = state.pages.find((p) => p.id === state.currentPageId);
        return page?.sections.find((s) => s.id === id || s.section_id === id);
    });

    const sectionContent = sectionData?.content || {};
    const photos = sectionData?.photos;

    const { title, description } = sectionContent;
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
                                        className={`w-full h-full object-cover transition-opacity duration-500 absolute inset-0 ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                            }`}
                                        alt={title || "Hero"}
                                        data-type="image"
                                        data-name={`carousel_slide_${index}`}
                                        data-title={`شريحة ${index + 1}`}
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
                                data-type="image"
                                data-name="carousel_slide_0"
                                data-title="شريحة 1"
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
                {title && (
                    <h1
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 drop-shadow-2xl px-4"
                        data-type="text"
                        data-title="العنوان"
                        data-name="title"
                    >
                        {title}
                    </h1>
                )}
                {description && (
                    <p
                        className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-3xl mx-auto drop-shadow-lg leading-relaxed px-4"
                        data-type="textarea"
                        data-title="الوصف"
                        data-name="description"
                    >
                        {description}
                    </p>
                )}
            </div>
        </header>
    );
};

// Hero 4: Full Width Image with Overlay
const HeroSection4 = ({ id }: { id?: string }) => {
    // Connect to store for content and photos
    const sectionData = usePageStore((state) => {
        const page = state.pages.find((p) => p.id === state.currentPageId);
        return page?.sections.find((s) => s.id === id || s.section_id === id);
    });

    const sectionContent = sectionData?.content || {};
    const photos = sectionData?.photos;

    const { title, description } = sectionContent;
    const photoUrl = photos?.[0]?.url || photos?.[0]?.base64Content;

    return (
        <header className="relative w-full min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center text-center overflow-hidden">
            {photoUrl ? (
                <div className="absolute inset-0">
                    <img
                        src={photoUrl}
                        className="w-full h-full object-cover"
                        alt={title || "Hero"}
                        data-type="image"
                        data-name="fullwidth_image"
                        data-title="صورة الخلفية"
                    />
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900"></div>
            )}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                {title && (
                    <h1
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white"
                        data-type="text"
                        data-title="العنوان"
                        data-name="title"
                    >
                        {title}
                    </h1>
                )}
                {description && (
                    <p
                        className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto"
                        data-type="textarea"
                        data-title="الوصف"
                        data-name="description"
                    >
                        {description}
                    </p>
                )}
            </div>
        </header>
    );
};

// Hero 5: Split Screen
const HeroSection5 = ({ id }: { id?: string }) => {
    // Connect to store for content and photos
    const sectionData = usePageStore((state) => {
        const page = state.pages.find((p) => p.id === state.currentPageId);
        return page?.sections.find((s) => s.id === id || s.section_id === id);
    });

    const sectionContent = sectionData?.content || {};
    const photos = sectionData?.photos;

    const { title, description } = sectionContent;
    const photoUrl = photos?.[0]?.url || photos?.[0]?.base64Content;

    return (
        <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 min-h-[60vh] sm:min-h-[70vh] grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div className="flex flex-col gap-4 sm:gap-6">
                {title && (
                    <h1
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900"
                        data-type="text"
                        data-title="العنوان"
                        data-name="title"
                    >
                        {title}
                    </h1>
                )}
                {description && (
                    <p
                        className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed"
                        data-type="textarea"
                        data-title="الوصف"
                        data-name="description"
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
                        data-type="image"
                        data-name="split_image"
                        data-title="صورة القسم"
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
        photos: [] as any[], // PhotoItem[] - will be populated when user adds images
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
