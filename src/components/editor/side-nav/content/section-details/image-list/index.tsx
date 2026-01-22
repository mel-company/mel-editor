import useSectionDetails from "../../../../../../hooks/editor-section-details";
import { FileType } from "../../../../../../types";
import FileUploadListItem from "../../../../../ui/file-upload/item";
import FileUploadBar from "../../../../../ui/file-upload/bar";
import ImageUploadModal from "../../../../../ui/image-upload-modal";
import { Plus } from "lucide-react";
import React, { useState } from "react";
const SectionImageList = () => {
  const { handleUploadImage, option, section, setSection } =
    useSectionDetails();
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Show image list for sections that have photos (hero, ourStory, contact)
  const shouldShowImages =
    section?.type === "hero" ||
    section?.type === "ourStory" ||
    section?.type === "contact";
  if (!shouldShowImages) return null;

  const photos = (section?.photos && Array.isArray(section.photos)) ? section.photos : (Array.isArray(option?.photos) ? option.photos : []);
  // Determine max photos based on section type and variant
  const maxPhotos =
    section?.type === "hero" && section?.section_id === "3" ? 10 : // Hero carousel
      section?.type === "ourStory" ? 1 : // Our Story sections typically have 1 photo
        section?.type === "contact" ? 1 : // Contact sections typically have 1 photo (map)
          1; // Default to 1

  const addPhotoSlot = () => {
    if (!section || !option) return;
    const newPhotos: FileType[] = [...photos, {} as FileType];
    const newOptions = section.options?.map((op) => {
      if (op.id === section.section_id) {
        return { ...op, photos: newPhotos as any };
      }
      return op;
    });
    setSection({ ...section, options: newOptions });
    setSelectedIndex(newPhotos.length - 1);
    setShowModal(true);
  };

  const handleImageConfirm = (file: FileType) => {
    if (selectedIndex !== null) {
      handleUploadImage(file, selectedIndex);
      setShowModal(false);
      setSelectedIndex(null);
    }
  };

  // Show photo upload slots - always show at least one slot for hero sections
  const photoSlots = photos.length > 0 ? photos : [{} as FileType];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-slate-600">عدد الصور: {photos.length} / {maxPhotos}</p>
        {photos.length < maxPhotos && (
          <button
            onClick={addPhotoSlot}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
          >
            <Plus size={14} />
            <span>إضافة صورة</span>
          </button>
        )}
      </div>
      <div className="flex flex-col gap-3">
        {photoSlots.map((photo: FileType, index: number) => {
          // If photo is empty, show FileUploadBar with modal option
          if (!photo.id && !photo.url && !photo.base64Content) {
            return (
              <div key={`photo-${index}`} className="border border-slate-200 rounded-lg p-3 bg-white">
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">
                    صورة {index + 1}
                  </label>
                  <button
                    onClick={() => {
                      setSelectedIndex(index);
                      setShowModal(true);
                    }}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    إضافة مع خيارات
                  </button>
                </div>
                <FileUploadBar
                  label=""
                  value={photo}
                  onChange={(file) => handleUploadImage(file, index)}
                />
              </div>
            );
          }
          return (
            <div key={photo.id || `photo-${index}`} className="border border-slate-200 rounded-lg p-3 bg-white">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700">
                  صورة {index + 1}
                </label>
                <button
                  onClick={() => {
                    setSelectedIndex(index);
                    setShowModal(true);
                  }}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  تعديل
                </button>
              </div>
              <FileUploadListItem
                label={photo.name || `صورة ${index + 1}`}
                value={photo}
                onChange={(file) => handleUploadImage(file, index)}
              />
            </div>
          );
        })}
      </div>

      {/* Image Upload Modal */}
      <ImageUploadModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedIndex(null);
        }}
        onConfirm={handleImageConfirm}
        label={`إضافة صورة ${selectedIndex !== null ? selectedIndex + 1 : ""}`}
      />
    </div>
  );
};

export default SectionImageList;
