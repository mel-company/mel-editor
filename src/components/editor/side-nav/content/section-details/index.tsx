import { SectionPropsComponent } from "../section-props";
import SectionImageList from "./image-list";
import EditorProductList from "./product-list";
import useSectionDetails from "../../../../../hooks/editor-section-details";

const EditorSectionDetails = ({ sectionId }: { sectionId: string }) => {
  const { sections, handleTextChange } = useSectionDetails({ id: sectionId });
  const section = sections?.find((section) => section.id === sectionId);

  return (
    <div className="editor-nav-section">
      <h3 className="title">{"معلومات القسم"}</h3>
      {section?.props?.map((item) => {
        return (
          <SectionPropsComponent
            key={item.id}
            onChange={handleTextChange}
            {...item}
          />
        );
      })}
      <SectionImageList sectionId={sectionId} />
      <EditorProductList sectionId={sectionId} />
    </div>
  );
};

export default EditorSectionDetails;
