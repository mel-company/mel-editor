import SectionImageList from "./image-list";
import EditorProductList from "./product-list";
import SectionContent from "./content";
import ActiveSectionWrapper from "./active-wrapper";

const EditorSectionDetails = () => {
  return (
    <div className="editor-nav-section">
      <h3 className="title">{"معلومات القسم"}</h3>
      <ActiveSectionWrapper>
        <SectionContent />
        <SectionImageList />
        <EditorProductList />
      </ActiveSectionWrapper>
    </div>
  );
};

export default EditorSectionDetails;
