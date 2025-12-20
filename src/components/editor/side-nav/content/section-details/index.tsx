import SectionImageList from "./image-list";
import EditorProductList from "./product-list";
import SectionContent from "./content";
import ActiveSectionWrapper from "./active-wrapper";
import DeleteSection from "./delete-section-btn";
import SectionVariants from "./variants";

const EditorSectionDetails = () => {
  return (
    <div className="editor-nav-section">
      <div className="flex items-center justify-between">
        <h3 className="title">{"معلومات القسم"}</h3>
        <DeleteSection />
      </div>
      <SectionVariants />
      <ActiveSectionWrapper>
        <SectionContent />
        <SectionImageList />
        <EditorProductList />
      </ActiveSectionWrapper>
    </div>
  );
};

export default EditorSectionDetails;
