import useSectionDetails from "../../../../../../hooks/editor-section-details";
import { FileType } from "../../../../../../types";
import FileUploadListItem from "../../../../../ui/file-upload/item";

const SectionImageList = () => {
  const { handleUploadImage, option } = useSectionDetails();

  if (!option?.photos?.length) return null;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="sub-title">{"الصور"}</h3>
      {(Array.isArray(option?.photos) ? option.photos : []).map(
        (photo: FileType, index: number) => {
          return (
            <FileUploadListItem
              key={photo.id || index}
              label={photo.name}
              value={photo}
              onChange={(file) => handleUploadImage(file, index)}
            />
          );
        }
      )}
    </div>
  );
};

export default SectionImageList;
