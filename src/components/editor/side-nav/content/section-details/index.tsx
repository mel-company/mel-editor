import { SectionPropsComponent } from "../section-props";
import SectionImageList from "./image-list";
import EditorProductList from "./product-list";
import useSectionDetails from "../../../../../hooks/editor-section-details";
import SectionContent from "./content";

const EditorSectionDetails = () => {
  return (
    <div className="editor-nav-section">
      <h3 className="title">{"معلومات القسم"}</h3>
      <SectionContent />
      <SectionImageList />
      <EditorProductList />
    </div>
  );
};

export default EditorSectionDetails;
