import useSectionDetails from "../../../../../../hooks/editor-section-details";
import { FileType } from "../../../../../../types";
import FileUploadListItem from "../../../../../ui/file-upload/item";
import FileUploadBar from "../../../../../ui/file-upload/bar";
import ImageUploadModal from "../../../../../ui/image-upload-modal";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { useDomImageScanner } from "../../../../../../hooks/editor-section-details/use-dom-image-scanner";

const SectionImageList = () => {
  const { handleUploadImage, section, setSection, activeSectionId } =
    useSectionDetails();
  const [showModal, setShowModal] = useState(false);
  const [selectedImageName, setSelectedImageName] = useState<string | null>(null);

  // Dynamically detect images from the DOM
  const detectedImages = useDomImageScanner(activeSectionId);

  // If no images detected in the DOM, don't show this component
  if (detectedImages.length === 0) return null;

  // Get photos from section data
  const sectionPhotos = section?.photos || [];

  // Helper to find photo data by image name
  const getPhotoByName = (imageName: string) => {
    return sectionPhotos.find((photo) => photo.id === imageName || photo.label === imageName);
  };

  // Helper to update a specific image by name
  const handleImageUpload = (file: FileType, imageName: string) => {
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
  };

  const handleImageConfirm = (file: FileType) => {
    if (selectedImageName) {
      handleImageUpload(file, selectedImageName);
      setShowModal(false);
      setSelectedImageName(null);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-slate-600">
          عدد الصور: {detectedImages.length}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {detectedImages.map((detectedImage) => {
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
                <button
                  onClick={() => {
                    setSelectedImageName(detectedImage.name);
                    setShowModal(true);
                  }}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  {photoUrl ? "تعديل" : "إضافة مع خيارات"}
                </button>
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
        label={`إضافة صورة ${selectedImageName ? detectedImages.find(img => img.name === selectedImageName)?.title : ""}`}
      />
    </div>
  );
};

export default SectionImageList;
