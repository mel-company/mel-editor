import { useSectionStore } from "../../store/editor/section";
import { FileType, ProductType } from "../../types";

const useSectionDetails = ({ id = "1" }: { id: string }) => {
  const { sections, setSection } = useSectionStore();

  const section = sections?.find((section) => section.id === id);

  const handleTextChange = (value: string, name: string) => {
    if (!section) return;
    const newProps = section.props.map((item) => {
      if (item.name === name) {
        return { ...item, value };
      }
      return item;
    });
    setSection({ ...section, props: newProps });
  };

  const handleUploadImage = (file: FileType, index: number) => {
    if (!section) return;
    const newPhotos = section.photos.map((item) => {
      if (item.name === "image") {
        return { ...item, ...file };
      }
      return item;
    });
    setSection({ ...section, photos: newPhotos });
  };

  const handleToggleProduct = ({ product }: { product: ProductType }) => {
    if (!section) return;
    const find = section?.products?.find((item) => item.id === product.id);

    const newProducts = section?.products?.filter(
      (item) => item.id !== product.id
    );

    if (!find)
      return setSection({
        ...section,
        products: [...newProducts, product],
      });
    else {
      setSection({
        ...section,
        products: newProducts,
      });
    }
  };

  return {
    handleTextChange,
    handleUploadImage,
    handleToggleProduct,
    section,
    sections,
  };
};

export default useSectionDetails;
