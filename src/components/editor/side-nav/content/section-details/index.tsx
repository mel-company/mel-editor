import SectionImageList from "./image-list";
import EditorProductList from "./product-list";
import ProductSelector from "./product-selector";
import SectionContent from "./content";
import ActiveSectionWrapper from "./active-wrapper";
import DeleteSection from "./delete-section-btn";
import SectionVariants from "./variants";
import SectionStyles from "./styles";
import NavigationStyles from "./navigation-styles";
import useSectionDetails from "../../../../../hooks/editor-section-details";
import { useSectionStore } from "../../../../../store/editor/section";
import Divider from "../../../../ui/divider";
import React from "react";
const EditorSectionDetails = () => {
  const { option } = useSectionDetails();
  const { activeElementType } = useSectionStore();
  const isProductSection = option?.products !== undefined;

  // Show navigation styles if navigation is selected
  if (activeElementType === "navigation") {
    return (
      <div className="editor-nav-section">
        <h3 className="title">{"شريط التنقل"}</h3>
        <Divider />
        <NavigationStyles />
      </div>
    );
  }

  // Show section details if section is selected
  if (activeElementType === "section" && option) {
    return (
      <div className="editor-nav-section">
        <div className="flex items-center justify-between">
          <h3 className="title">{"معلومات القسم"}</h3>
          <DeleteSection />
        </div>
        <SectionVariants />
        <Divider />
        <SectionStyles />
        <Divider />
        <ActiveSectionWrapper>
          <SectionContent />
          <SectionImageList />
          {isProductSection ? <ProductSelector /> : <EditorProductList />}
        </ActiveSectionWrapper>
      </div>
    );
  }

  // Show nothing if nothing is selected
  return (
    <div className="editor-nav-section">
      <p className="text-sm text-slate-500 text-center py-8">
        اختر عنصراً للتعديل
      </p>
    </div>
  );
};

export default EditorSectionDetails;
