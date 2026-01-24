import SectionImageList from "./image-list";
import EditorProductList from "./product-list";
import ProductSelector from "./product-selector";
import CategorySelector from "./category-selector";
import SectionContent from "./content";
import ActiveSectionWrapper from "./active-wrapper";
import DeleteSection from "./delete-section-btn";
import SectionVariants from "./variants";
import SectionStyles from "./styles";
import NavigationStyles from "./navigation-styles";
import useSectionDetails from "../../../../../hooks/editor-section-details";
import { useDomImageScanner } from "../../../../../hooks/editor-section-details/use-dom-image-scanner";
import { useSectionStore } from "../../../../../store/editor/section";
import Divider from "../../../../ui/divider";
import { useState, useEffect, useRef, useMemo } from "react";
import { Type, Image, Package, Settings, Tag } from "lucide-react";

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
    detectedImages.length > 0 || (section?.photos !== undefined),
    [detectedImages.length, section?.photos]
  );

  console.log('[EditorSectionDetails] Debug Info:', {
    hasImages,
    hasContent,
    detectedImagesLength: detectedImages.length,
    optionContent: option?.content,
    optionPhotos: option?.photos,
    sectionPhotos: section?.photos,
    sectionType: section?.type,
    sectionId: section?.section_id,
    isProductSection,
    isCategorySection
  });

  // Determine default tab based on available content
  const getDefaultTab = useMemo(() => {
    if (hasContent) return "content";
    if (hasImages) return "images";
    if (isProductSection) return "products";
    if (isCategorySection) return "categories";
    return "styles";
  }, [hasContent, hasImages, isProductSection, isCategorySection]);

  const [activeTab, setActiveTab] = useState<"content" | "images" | "products" | "categories" | "styles">(getDefaultTab);
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
  useEffect(() => {
    if (activeSectionId && activeElementType === "section") {
      setActiveTab(getDefaultTab);
    }
  }, [activeSectionId, activeElementType, getDefaultTab]);

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
      <div className="editor-nav-section" ref={sectionDetailsRef}>
        {/* Header with section name */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="title">{"تعديل القسم"}</h3>
            <DeleteSection />
          </div>

          <SectionVariants />
        </div>



        {/* Tabs for different content types - Better organized */}
        <div className="mb-4">
          <p className="text-xs text-slate-600 mb-2 font-medium">اختر ما تريد تعديله:</p>
          <div className="grid grid-cols-2 gap-2">
            {hasContent && (
              <button
                onClick={() => setActiveTab("content")}
                className={`flex flex-col items-center justify-center gap-2 px-3 py-3 rounded-lg border-2 transition-all ${activeTab === "content"
                  ? "bg-blue-50 border-blue-500 text-blue-700 shadow-sm"
                  : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50"
                  }`}
              >
                <Type className={`w-5 h-5 ${activeTab === "content" ? "text-blue-600" : "text-slate-500"}`} />
                <span className="text-xs font-medium">النصوص</span>
              </button>
            )}
            {hasImages && (
              <button
                onClick={() => setActiveTab("images")}
                className={`flex flex-col items-center justify-center gap-2 px-3 py-3 rounded-lg border-2 transition-all ${activeTab === "images"
                  ? "bg-blue-50 border-blue-500 text-blue-700 shadow-sm"
                  : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50"
                  }`}
              >
                <Image className={`w-5 h-5 ${activeTab === "images" ? "text-blue-600" : "text-slate-500"}`} />
                <span className="text-xs font-medium">الصور</span>
              </button>
            )}
            {isProductSection && (
              <button
                onClick={() => setActiveTab("products")}
                className={`flex flex-col items-center justify-center gap-2 px-3 py-3 rounded-lg border-2 transition-all ${activeTab === "products"
                  ? "bg-blue-50 border-blue-500 text-blue-700 shadow-sm"
                  : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50"
                  }`}
              >
                <Package className={`w-5 h-5 ${activeTab === "products" ? "text-blue-600" : "text-slate-500"}`} />
                <span className="text-xs font-medium">المنتجات</span>
              </button>
            )}
            {isCategorySection && (
              <button
                onClick={() => setActiveTab("categories")}
                className={`flex flex-col items-center justify-center gap-2 px-3 py-3 rounded-lg border-2 transition-all ${activeTab === "categories"
                  ? "bg-blue-50 border-blue-500 text-blue-700 shadow-sm"
                  : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50"
                  }`}
              >
                <Tag className={`w-5 h-5 ${activeTab === "categories" ? "text-blue-600" : "text-slate-500"}`} />
                <span className="text-xs font-medium">التصنيفات</span>
              </button>
            )}
            <button
              onClick={() => setActiveTab("styles")}
              className={`flex flex-col items-center justify-center gap-2 px-3 py-3 rounded-lg border-2 transition-all ${activeTab === "styles"
                ? "bg-blue-50 border-blue-500 text-blue-700 shadow-sm"
                : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50"
                }`}
            >
              <Settings className={`w-5 h-5 ${activeTab === "styles" ? "text-blue-600" : "text-slate-500"}`} />
              <span className="text-xs font-medium">التصميم</span>
            </button>
          </div>
        </div>

        <Divider />

        {/* Content based on active tab - With clear header */}
        <ActiveSectionWrapper>
          <div className="mb-3">
            <div className="flex items-center gap-2 px-2 py-1 bg-slate-50 rounded-lg">
              {activeTab === "content" && (
                <>
                  <Type className="w-4 h-4 text-blue-600" />
                  <h4 className="text-sm font-semibold text-slate-800">تعديل النصوص</h4>
                </>
              )}
              {activeTab === "images" && (
                <>
                  <Image className="w-4 h-4 text-blue-600" />
                  <h4 className="text-sm font-semibold text-slate-800">تعديل الصور</h4>
                </>
              )}
              {activeTab === "products" && (
                <>
                  <Package className="w-4 h-4 text-blue-600" />
                  <h4 className="text-sm font-semibold text-slate-800">تعديل المنتجات</h4>
                </>
              )}
              {activeTab === "categories" && (
                <>
                  <Tag className="w-4 h-4 text-blue-600" />
                  <h4 className="text-sm font-semibold text-slate-800">تعديل التصنيفات</h4>
                </>
              )}
              {activeTab === "styles" && (
                <>
                  <Settings className="w-4 h-4 text-blue-600" />
                  <h4 className="text-sm font-semibold text-slate-800">تعديل التصميم</h4>
                </>
              )}
            </div>
          </div>

          {activeTab === "content" && hasContent && <SectionContent />}
          {activeTab === "images" && hasImages && <SectionImageList detectedImages={detectedImages} />}
          {activeTab === "products" && isProductSection && (
            isProductSection ? <ProductSelector /> : <EditorProductList />
          )}
          {activeTab === "categories" && isCategorySection && <CategorySelector />}
          {activeTab === "styles" && <SectionStyles />}
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
