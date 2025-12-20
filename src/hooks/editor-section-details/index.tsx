import { useSectionStore } from "../../store/editor/section";
import { FileType, SectionOptionType } from "../../types";

const useSectionDetails = () => {
  const { sections, setSection, activeSectionId, setSections } =
    useSectionStore();

  const section = sections?.find(
    (section) => section.target_id === activeSectionId
  );

  const removeSection = () => {
    if (!section) return;
    const newSections = sections?.filter(
      (section) => section.target_id !== activeSectionId
    );
    setSections(newSections);
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
    const activeOption = section.options?.find(
      (option) => option.id === section.section_id
    );

    if (!activeOption) return;

    if (Array.isArray(activeOption.content)) {
      const newContent = activeOption.content.map((item: any) => {
        if (item.name === name) {
          return { ...item, value };
        }
        return item;
      });
      updateSectionOptions({ ...activeOption, content: newContent });
    } else {
      // Fallback for object-based content (if any remains)
      updateSectionOptions({
        content: {
          ...activeOption.content,
          [name]: value,
        },
      });
    }
  };

  const handleUploadImage = (file: FileType, index: number) => {
    if (!section) return;

    const newOptions = section?.options?.map((option) => {
      if (option.id === section.section_id) {
        return { ...option, photos: { ...option.photos, [index]: file } };
      }
      return option;
    });

    setSection({ ...section, options: newOptions });
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
    setSections,
    removeSection,
  };
};

export default useSectionDetails;
