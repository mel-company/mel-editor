import useSectionDetails from "../../../../../../hooks/editor-section-details";
import FileUploadListItem from "../../../../../ui/file-upload/item";

const SectionImageList = () => {
  const { handleUploadImage, section } = useSectionDetails();

  if (!section?.photos?.length) return null;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="sub-title">{"الصور"}</h3>
      {section?.photos?.map((photo, index) => {
        return (
          <FileUploadListItem
            key={photo.id}
            label={photo.name}
            value={photo}
            onChange={(file) => handleUploadImage(file, index)}
          />
        );
      })}
    </div>
  );
};

export default SectionImageList;
