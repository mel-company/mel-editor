"use client"

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const HeroCarousel = ({
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
