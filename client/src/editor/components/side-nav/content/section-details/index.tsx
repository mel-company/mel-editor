import SectionImageList from "./image-list";
import EditorProductList from "./product-list";
import ProductSelector from "./product-selector";
import CategorySelector from "./category-selector";
import SectionContent from "./content";
import ActiveSectionWrapper from "./active-wrapper";
import DeleteSection from "./delete-section-btn";
import SectionVariants from "./variants";
import NavigationStyles from "./navigation-styles";
import useSectionDetails from "../../../../hooks/editor-section-details";
import { useDomImageScanner } from "../../../../hooks/editor-section-details/use-dom-image-scanner";
import { useSectionStore } from "../../../../../shared/store/editor/section";
import Divider from "../../../../../shared/components/ui/divider";
import { useEffect, useRef, useMemo } from "react";

const EditorSectionDetails = () => {
  const { option, section } = useSectionDetails();
  const { activeElementType, activeSectionId } = useSectionStore();
  const isProductSection = option?.products !== undefined;
  const isCategorySection = option?.categories !== undefined;

  // Better content check - ensure it's an array with items or a truthy object
  const hasContent = useMemo(() => {
    if (!option?.content) return false;
    if (Array.isArray(option.content)) {
      return option.content.length > 0;
    }
    return true; // Non-array content is considered valid
  }, [option?.content]);

  // Check if section supports images by scanning the DOM
  // This is dynamic - any section with data-type="image" elements will show the images tab
  const detectedImages = useDomImageScanner(activeSectionId);

  // Photos tab should appear if:
  // 1. DOM scanner detected image elements with data-type="image"
  // 2. OR section defines photos property (indicating it supports images, even if empty array)
  const hasImages = useMemo(() =>
    detectedImages.length > 0 || (section?.photos !== undefined) || (option?.photos !== undefined),
    [detectedImages.length, section?.photos, option?.photos]
  );



  const sectionDetailsRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to section details when a section is selected
  useEffect(() => {
    if (activeSectionId && activeElementType === "section" && sectionDetailsRef.current) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        sectionDetailsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [activeSectionId, activeElementType]);

  // Reset to default tab when section changes

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
  return (
    <div className="editor-nav-section" ref={sectionDetailsRef}>
      {/* Header with section name */}
      <ActiveSectionWrapper>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="title">{"تعديل القسم"}</h3>
            <DeleteSection />
          </div>

          <SectionVariants />
        </div>





        <Divider />



        {hasContent && <SectionContent />}
        {hasImages && <SectionImageList detectedImages={detectedImages} />}
        {isProductSection && (
          isProductSection ? <ProductSelector /> : <EditorProductList />
        )}
        {isCategorySection && <CategorySelector />}
        {/* {activeTab === "styles" && <SectionStyles />} */}
      </ActiveSectionWrapper>
    </div>
  );

};

export default EditorSectionDetails;
