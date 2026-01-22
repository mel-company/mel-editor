import { useState, useEffect } from "react";

export interface DetectedImage {
    name: string;
    title: string;
    currentSrc: string;
    index: number;
}

/**
 * Hook to scan the DOM for image elements with data-type="image"
 * Returns an array of detected images with their metadata
 */
export const useDomImageScanner = (
    activeSectionId: string | null
): DetectedImage[] => {
    const [detectedImages, setDetectedImages] = useState<DetectedImage[]>([]);

    useEffect(() => {
        if (!activeSectionId) {
            setDetectedImages([]);
            return;
        }

        // Find the section element in the DOM
        const sectionElement =
            (document.querySelector(
                `[data-section-instance-id="${activeSectionId}"]`
            ) as HTMLElement | null) || document.getElementById(activeSectionId);

        if (!sectionElement) {
            setDetectedImages([]);
            return;
        }

        // Small delay to ensure DOM is fully rendered
        const timeoutId = setTimeout(() => {
            // Find all image elements with data-type="image"
            const imageElements = sectionElement.querySelectorAll('[data-type="image"]');

            const images: DetectedImage[] = Array.from(imageElements).map((el, index) => ({
                name: el.getAttribute("data-name") || `image_${index}`,
                title: el.getAttribute("data-title") || `صورة ${index + 1}`,
                currentSrc: el.getAttribute("src") || "",
                index,
            }));

            setDetectedImages(images);
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [activeSectionId]);

    return detectedImages;
};
