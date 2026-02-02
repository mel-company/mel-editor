import useSectionDetails from "../../../../../hooks/editor-section-details";
import { FileType, PhotoItem } from "../../../../../../shared/types";
import FileUploadListItem from "../../../../../../shared/components/ui/file-upload/item";
import FileUploadBar from "../../../../../../shared/components/ui/file-upload/bar";
import ImageUploadModal from "../../../../../../shared/components/ui/image-upload-modal";
import { Plus } from "lucide-react";
import React, { useState, useMemo, useCallback } from "react";
import { DetectedImage } from "../../../../../hooks/editor-section-details/use-dom-image-scanner";

interface SectionImageListProps {
  detectedImages: DetectedImage[];
}

const SectionImageList = React.memo(({ detectedImages }: SectionImageListProps) => {
  const { handleUploadImage, section, setSection, activeSectionId, option } =
    useSectionDetails();
  const [showModal, setShowModal] = useState(false);
  const [selectedImageName, setSelectedImageName] = useState<string | null>(null);

  // Memoize section photos to prevent unnecessary re-renders
  const sectionPhotos = useMemo<PhotoItem[]>(() => section?.photos || option?.photos || [], [section?.photos, option?.photos]);

  // Check if this is a carousel section
  const isCarousel = useMemo(() =>
    section?.type === "hero" && section?.section_id === "3",
    [section?.type, section?.section_id]
  );

  // Debug logging - only when detectedImages changes


  // Combined list of images to render
  // For carousel sections, always use sectionPhotos since we manage slides through the store
  // For other sections, use detected images from DOM
  const imagesToEdit = useMemo(() => {
    // For carousel sections, prioritize sectionPhotos for proper add/delete functionality
    if (isCarousel && sectionPhotos.length > 0) {
      return sectionPhotos.map((photo: PhotoItem, index) => ({
        name: photo.id || `photo_${index}`,
        title: photo.label || `شريحة ${index + 1}`,
        currentSrc: photo.url || photo.base64Content || "",
        index
      }));
    }

    // For non-carousel sections, use DOM-detected images if available
    if (detectedImages.length > 0) return detectedImages;

    return sectionPhotos.map((photo: PhotoItem, index) => ({
      name: photo.id || `photo_${index}`,
      title: photo.label || `Image ${index + 1}`,
      currentSrc: photo.url || photo.base64Content || "",
      index
    }));
  }, [detectedImages, sectionPhotos, isCarousel]);

  // If no images available at all, don't show
  if (imagesToEdit.length === 0) return null;

  // Helper to find photo data by image name
  const getPhotoByName = useCallback((imageName: string) => {
    return sectionPhotos.find((photo) => photo.id === imageName || photo.label === imageName);
  }, [sectionPhotos]);

  // Helper to update a specific image by index
  const handleImageUpload = useCallback((file: FileType, imageName: string, imageIndex: number) => {
    if (!section) return;

    // Convert FileType to PhotoItem
    const newPhoto = {
      id: imageName,
      label: file.name || imageName,
      url: file.url,
      base64Content: file.base64Content,
    };

    let updatedPhotos = [...sectionPhotos];

    // Use index to update the correct photo
    if (imageIndex >= 0 && imageIndex < sectionPhotos.length) {
      // Update existing photo at the specific index
      updatedPhotos[imageIndex] = newPhoto;
    } else {
      // Add new photo if index is out of bounds
      updatedPhotos = [...sectionPhotos, newPhoto];
    }

    // Update section.photos
    setSection({
      ...section,
      photos: updatedPhotos,
    });

    // Also update the DOM element's src attribute for immediate visual feedback
    if (activeSectionId) {
      const sectionElement =
        (document.querySelector(
          `[data-section-instance-id="${activeSectionId}"]`
        ) as HTMLElement | null) || document.getElementById(activeSectionId);

      if (sectionElement) {
        const imgElement = sectionElement.querySelector(
          `[data-name="${imageName}"]`
        ) as HTMLImageElement;
        if (imgElement) {
          imgElement.src = file.url || file.base64Content || "";
        }
      }
    }
  }, [section, sectionPhotos, setSection, activeSectionId]);

  const handleImageConfirm = useCallback((file: FileType) => {
    if (selectedImageName) {
      const selectedIndex = imagesToEdit.findIndex(img => img.name === selectedImageName);
      handleImageUpload(file, selectedImageName, selectedIndex);
      setShowModal(false);
      setSelectedImageName(null);
    }
  }, [selectedImageName, handleImageUpload, imagesToEdit]);

  // Helper to add a new slide (for carousel sections)
  const addNewSlide = useCallback(() => {
    if (!section) return;

    // Get photos from section.photos or option.photos
    const currentPhotos = Array.isArray(section.photos) && section.photos.length > 0
      ? [...section.photos]
      : Array.isArray(option?.photos)
        ? [...option.photos]
        : [];

    const newSlide = {
      id: `slide_${Date.now()}`,
      label: `شريحة ${currentPhotos.length + 1}`,
      url: '',
      base64Content: ''
    };

    const updatedPhotos = [...currentPhotos, newSlide];

    // Update both section.photos and options
    const newOptions = section.options?.map((op: any) => {
      if (op.id === section.section_id) {
        return { ...op, photos: updatedPhotos };
      }
      return op;
    });

    setSection({
      ...section,
      photos: updatedPhotos,
      options: newOptions,
    });
  }, [section, option, setSection]);

  // Helper to delete a slide (for carousel sections) - uses index for reliable deletion
  const deleteSlide = useCallback((imageIndex: number) => {
    if (!section || imageIndex < 0) return;

    // Get photos from section.photos or option.photos
    const currentPhotos = Array.isArray(section.photos) && section.photos.length > 0
      ? [...section.photos]
      : Array.isArray(option?.photos)
        ? [...option.photos]
        : [];

    if (imageIndex >= currentPhotos.length) return;

    const updatedPhotos = currentPhotos.filter((_, index) => index !== imageIndex);

    // Update both section.photos and options (like handleUploadImage does)
    const newOptions = section.options?.map((op: any) => {
      if (op.id === section.section_id) {
        return { ...op, photos: updatedPhotos };
      }
      return op;
    });

    setSection({
      ...section,
      photos: updatedPhotos,
      options: newOptions,
    });
  }, [section, option, setSection]);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-slate-600">
          عدد الصور: {imagesToEdit.length}
        </p>
        {isCarousel && (
          <button
            onClick={addNewSlide}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
          >
            <Plus size={14} />
            <span>إضافة شريحة</span>
          </button>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        {imagesToEdit.map((detectedImage) => {
          const photo = getPhotoByName(detectedImage.name);
          const photoUrl = photo?.url || photo?.base64Content || detectedImage.currentSrc;

          return (
            <div
              key={detectedImage.name}
              className="border border-slate-200 rounded-lg bg-white"
            >


              {photoUrl ? (
                <FileUploadListItem
                  label={detectedImage.title}
                  value={{
                    id: detectedImage.name,
                    name: detectedImage.title,
                    url: photoUrl,
                  }}
                  deleteSlide={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    deleteSlide(detectedImage.index)
                  }}
                  onChange={(file) => handleImageUpload(file, detectedImage.name, detectedImage.index)}
                />
              ) : (
                <FileUploadBar
                  label="رفع صورة"
                  value={{}}
                  deleteSlide={isCarousel ? (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    deleteSlide(detectedImage.index);
                  } : undefined}
                  onChange={(file) => handleImageUpload(file, detectedImage.name, detectedImage.index)}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Image Upload Modal */}
      <ImageUploadModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedImageName(null);
        }}
        onConfirm={handleImageConfirm}
        label={`إضافة صورة ${selectedImageName ? imagesToEdit.find(img => img.name === selectedImageName)?.title : ""}`}
      />
    </div>
  );
});

SectionImageList.displayName = 'SectionImageList';

export default SectionImageList;
