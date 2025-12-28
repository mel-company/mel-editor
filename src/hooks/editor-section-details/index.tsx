import { useSectionStore } from "../../store/editor/section";
import { FileType, SectionOptionType } from "../../types";

const useSectionDetails = () => {
  const { getSections, setSection, activeSectionId, deleteSection } =
    useSectionStore();
  const sections = getSections();

  const section = sections?.find(
    (section) => section.target_id === activeSectionId
  );

  const option = section?.options?.find(
    (option) => option.id === section.section_id
  );

  const removeSection = () => {
    if (!section) return;
    deleteSection(activeSectionId);
  };

  const updateSectionOptions = (option: Partial<SectionOptionType>) => {
    if (!section) return;
    const newOptions = section.options?.map((op) => {
      if (op.id === section.section_id) {
        return { ...op, ...option };
      }
      return op;
    });
    setSection({ ...section, options: newOptions });
  };

  const handleTextChange = (value: string, name: string) => {
    if (!section) return;

    if (!option) return;

    if (Array.isArray(option.content)) {
      const newContent = option.content.map((item: any) => {
        if (item.name === name) {
          return { ...item, value };
        }
        return item;
      });
      updateSectionOptions({ ...option, content: newContent });
    } else {
      // Fallback for object-based content (if any remains)
      updateSectionOptions({
        content: {
          ...option.content,
          [name]: value,
        },
      });
    }
  };

  const handleUploadImage = (file: FileType, index: number) => {
    if (!section) return;

    const currentPhotos: FileType[] = Array.isArray(option?.photos)
      ? [...option.photos]
      : [];
    // Ensure the array is large enough if index is out of bounds
    while (currentPhotos.length <= index) {
      currentPhotos.push({} as FileType);
    }
    currentPhotos[index] = file;

    updateSectionOptions({ photos: currentPhotos as any });
  };

  // const handleToggleProduct = ({ product }: { product: ProductType }) => {
  //   if (!section) return;
  //   const find = section?.options?.find((item) => item.id === product.id);

  //   const newOptions = section?.options?.map((item) => {
  //     if (item.id === section.section_id) {
  //       return {
  //         ...item,
  //         products: { ...item.products, product: { ...product } },
  //       };
  //     }
  //     return item;
  //   });
  // };

  return {
    handleTextChange,
    handleUploadImage,
    // handleToggleProduct,
    section,
    sections,
    setSection,
    removeSection,
    option,
    activeSectionId,
  };
};

export default useSectionDetails;
