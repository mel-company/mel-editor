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


  // Combined list of images to render (detected from DOM or from stored/option photos)
  const imagesToEdit = useMemo(() => {
    if (detectedImages.length > 0) return detectedImages;

    return sectionPhotos.map((photo: PhotoItem, index) => ({
      name: photo.id || `photo_${index}`,
      title: photo.label || `Image ${index + 1}`,
      currentSrc: photo.url || photo.base64Content || "",
      index
    }));
  }, [detectedImages, sectionPhotos]);

  // If no images available at all, don't show
  if (imagesToEdit.length === 0) return null;

  // Helper to find photo data by image name
  const getPhotoByName = useCallback((imageName: string) => {
    return sectionPhotos.find((photo) => photo.id === imageName || photo.label === imageName);
  }, [sectionPhotos]);

  // Helper to update a specific image by name
  const handleImageUpload = useCallback((file: FileType, imageName: string) => {
    if (!section) return;

    // Convert FileType to PhotoItem
    const newPhoto = {
      id: imageName,
      label: file.name || imageName,
      url: file.url,
      base64Content: file.base64Content,
    };

    // Update or add the photo in the section.photos array
    const existingIndex = sectionPhotos.findIndex(
      (photo) => photo.id === imageName || photo.label === imageName
    );

    let updatedPhotos;
    if (existingIndex >= 0) {
      // Update existing photo
      updatedPhotos = [...sectionPhotos];
      updatedPhotos[existingIndex] = newPhoto;
    } else {
      // Add new photo
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
      handleImageUpload(file, selectedImageName);
      setShowModal(false);
      setSelectedImageName(null);
    }
  }, [selectedImageName, handleImageUpload]);

  // Helper to add a new slide (for carousel sections)
  const addNewSlide = useCallback(() => {
    if (!section) return;

    const newSlide = {
      id: `slide_${Date.now()}`,
      label: `شريحة ${imagesToEdit.length + 1}`,
      url: '',
      base64Content: ''
    };

    const updatedPhotos = [...sectionPhotos, newSlide];

    setSection({
      ...section,
      photos: updatedPhotos,
    });
  }, [section, sectionPhotos, imagesToEdit.length, setSection]);

  // Helper to delete a slide (for carousel sections)
  const deleteSlide = useCallback((imageName: string) => {
    if (!section) return;

    const updatedPhotos = sectionPhotos.filter(
      (photo) => photo.id !== imageName && photo.label !== imageName
    );

    setSection({
      ...section,
      photos: updatedPhotos,
    });
  }, [section, sectionPhotos, setSection]);

  return (
    <div className="flex flex-col gap-3">
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
      <div className="flex flex-col gap-3">
        {imagesToEdit.map((detectedImage) => {
          const photo = getPhotoByName(detectedImage.name);
          const photoUrl = photo?.url || photo?.base64Content || detectedImage.currentSrc;

          return (
            <div
              key={detectedImage.name}
              className="border border-slate-200 rounded-lg p-3 bg-white"
            >
              <div className="mb-2 flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700">
                  {detectedImage.title}
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedImageName(detectedImage.name);
                      setShowModal(true);
                    }}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {photoUrl ? "تعديل" : "إضافة مع خيارات"}
                  </button>
                  {isCarousel && imagesToEdit.length > 1 && (
                    <button
                      onClick={() => deleteSlide(detectedImage.name)}
                      className="text-xs text-red-600 hover:text-red-700 font-medium"
                    >
                      حذف
                    </button>
                  )}
                </div>
              </div>

              {photoUrl ? (
                <FileUploadListItem
                  label={detectedImage.title}
                  value={{
                    id: detectedImage.name,
                    name: detectedImage.title,
                    url: photoUrl,
                  }}
                  onChange={(file) => handleImageUpload(file, detectedImage.name)}
                />
              ) : (
                <FileUploadBar
                  label=""
                  value={{}}
                  onChange={(file) => handleImageUpload(file, detectedImage.name)}
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
