import useSectionDetails from "../../../../../../hooks/editor-section-details";
import { FileType } from "../../../../../../types";
import FileUploadListItem from "../../../../../ui/file-upload/item";
import FileUploadBar from "../../../../../ui/file-upload/bar";
import { Plus } from "lucide-react";
import React from "react";
const SectionImageList = () => {
  const { handleUploadImage, option, section, setSection } =
    useSectionDetails();

  // Only show image list for hero sections (they have photos)
  const shouldShowImages = section?.type === "hero";
  if (!shouldShowImages) return null;

  const photos = Array.isArray(option?.photos) ? option.photos : [];
  const maxPhotos =
    section?.type === "hero" && section?.section_id === "3" ? 10 : 1; // Carousel can have multiple photos

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
  };

  // Show photo upload slots - always show at least one slot for hero sections
  const photoSlots = photos.length > 0 ? photos : [{} as FileType];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="sub-title">{"الصور"}</h3>
        {photos.length < maxPhotos && (
          <button
            onClick={addPhotoSlot}
            className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors"
          >
            <Plus size={14} />
            <span>إضافة صورة</span>
          </button>
        )}
      </div>
      {photoSlots.map((photo: FileType, index: number) => {
        // If photo is empty, show FileUploadBar instead
        if (!photo.id && !photo.url && !photo.base64Content) {
          return (
            <div key={`photo-${index}`} className="flex flex-col gap-1">
              <label className="sub-title">{`صورة ${index + 1}`}</label>
              <FileUploadBar
                label={`صورة ${index + 1}`}
                value={photo}
                onChange={(file) => handleUploadImage(file, index)}
              />
            </div>
          );
        }
        return (
          <FileUploadListItem
            key={photo.id || `photo-${index}`}
            label={photo.name || `صورة ${index + 1}`}
            value={photo}
            onChange={(file) => handleUploadImage(file, index)}
          />
        );
      })}
    </div>
  );
};

export default SectionImageList;
