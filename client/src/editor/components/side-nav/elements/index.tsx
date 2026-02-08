import { useState } from "react";
import { useSectionStore } from "@/shared/store/editor/section";
import { usePageStore } from "@/shared/store/editor/page";
import { mockTemplate } from "@templates/data/template";
import { SectionType, PageType } from "@/shared/types";
import classNames from "classnames";
import { Plus, Eye, X } from "lucide-react";
import Divider from "@/shared/components/ui/divider";
import { Select } from "@/shared/components/ui/select";
import EditorSectionList from "../content/section-list";

// Mapping between page types and available section types
const pageSectionMapping: Record<PageType["type"], string[]> = {
  home: ["hero", "categories", "recentProducts"], // الصفحة الرئيسية - 3 أقسام
  about: ["hero", "ourStory", "contact"], // صفحة حول المتجر - 3 أقسام
  content: ["hero"], // صفحة محتوى - 1 قسم
  menu: ["menu", "categories"], // صفحة القائمة (للمطاعم) - 2 أقسام
};

const ElementsSide = () => {
  const { addSection } = useSectionStore();
  const { getCurrentPage } = usePageStore();
  const currentPage = getCurrentPage();
  const [selectedSectionType, setSelectedSectionType] = useState<string>("");
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);

  // Get sections available for current page type
  const getAvailableSections = () => {
    if (!currentPage) return [];

    const allowedSectionTypes = pageSectionMapping[currentPage.type] || [];
    const allEditableSections = mockTemplate.sections.filter((s) => s.editable);

    // Filter sections based on page type
    return allEditableSections.filter((section) =>
      allowedSectionTypes.includes(section.type)
    );
  };

  const availableSections = getAvailableSections();

  // Get variants for selected section type
  const getVariants = (sectionType: string) => {
    const section = availableSections.find((s) => s.type === sectionType);
    return section?.options || [];
  };

  const handleSectionTypeChange = (sectionType: string) => {
    setSelectedSectionType(sectionType);
    setSelectedVariant(""); // Reset variant when section type changes
    const variants = getVariants(sectionType);
    if (variants.length > 0) {
      setSelectedVariant(variants[0].id); // Set first variant as default
    }
  };

  const handleAddSection = () => {
    if (!selectedSectionType || !selectedVariant) return;

    const templateSection = availableSections.find(
      (s) => s.type === selectedSectionType
    );

    if (templateSection) {
      const newSection: SectionType = {
        ...templateSection,
        section_id: selectedVariant,
        target_id: crypto.randomUUID(),
      };
      addSection(newSection);
      // Reset selections
      setSelectedSectionType("");
      setSelectedVariant("");
    }
  };

  const getSectionLabel = (type: string) => {
    const labels: Record<string, string> = {
      hero: "قسم العلوي الرئيسي",
      recentProducts: "قسم المنتجات",
      categories: "قسم التصنيفات",
      menu: "قسم القائمة",
      ourStory: "قسم قصتنا",
      contact: "قسم اتصل بنا",
    };
    return labels[type] || type;
  };

  const getPageTypeLabel = (type: PageType["type"]) => {
    const labels: Record<PageType["type"], string> = {
      home: "الصفحة الرئيسية",
      about: "حول المتجر",
      content: "صفحة محتوى",
      menu: "القائمة",
    };
    return labels[type] || type;
  };

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto overflow-x-visible">
      {/* Add Section Form */}
      <div className="editor-nav-section">
        <Divider />
        <h3 className="title">{"إضافة قسم"}</h3>
        {currentPage && (
          <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-xs text-slate-600 mb-1">
              الصفحة الحالية:
            </p>
            <p className="text-sm font-semibold text-slate-800">
              {getPageTypeLabel(currentPage.type)}
            </p>
            <p className="text-xs text-slate-500 mt-2">
              الأقسام المتاحة: {availableSections.length} قسم
            </p>
          </div>
        )}
        <p className="text-xs text-slate-500 mb-4">أضف أقسام جديدة مرتبطة بصفحتك</p>

        {availableSections.length === 0 ? (
          <div className="p-4 bg-slate-50 rounded-lg text-center">
            <p className="text-xs text-slate-500">
              لا توجد أقسام متاحة لهذا النوع من الصفحات
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {/* Section Type Selector */}
            <Select
              label="نوع القسم"
              value={selectedSectionType}
              onChange={(e) => handleSectionTypeChange(e.target.value)}
            >
              <option value="">اختر نوع القسم</option>
              {availableSections.map((section) => (
                <option key={section.id} value={section.type}>
                  {getSectionLabel(section.type)}
                </option>
              ))}
            </Select>

            {/* Variant Selector - Only show if section type is selected */}
            {selectedSectionType &&
              getVariants(selectedSectionType).length > 0 && (
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-medium text-slate-700">
                      الشكل
                    </label>
                    {selectedVariant && (
                      <button
                        onClick={() => setShowPreview(true)}
                        className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <Eye className="w-3 h-3" />
                        <span>معاينة</span>
                      </button>
                    )}
                  </div>
                  <Select
                    value={selectedVariant}
                    onChange={(e) => setSelectedVariant(e.target.value)}
                  >
                    {getVariants(selectedSectionType).map((variant: any) => (
                      <option key={variant.id} value={variant.id}>
                        {variant.title}
                      </option>
                    ))}
                  </Select>
                </div>
              )}

            {/* Add Button */}
            <button
              onClick={handleAddSection}
              disabled={!selectedSectionType || !selectedVariant}
              className={classNames(
                "w-full p-3 rounded-lg transition-colors text-right flex items-center justify-center gap-2 font-medium text-sm",
                {
                  "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer":
                    selectedSectionType && selectedVariant,
                  "bg-slate-200 text-slate-400 cursor-not-allowed":
                    !selectedSectionType || !selectedVariant,
                }
              )}
            >
              <Plus size={18} />
              <span>إضافة القسم</span>
            </button>
          </div>
        )}
      </div>

      {/* Sections List */}
      <EditorSectionList />

      {/* Preview Modal */}
      {showPreview && selectedSectionType && selectedVariant && (
        <SectionPreviewModal
          sectionType={selectedSectionType}
          variantId={selectedVariant}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
};

// Preview Modal Component
const SectionPreviewModal = ({
  sectionType,
  variantId,
  onClose,
}: {
  sectionType: string;
  variantId: string;
  onClose: () => void;
}) => {
  const availableSections = mockTemplate.sections.filter((s) => s.editable);
  const section = availableSections.find((s) => s.type === sectionType);
  const variant = section?.options?.find((opt) => opt.id === variantId);
  const Component = variant?.component as any;

  if (!Component) return null;

  // Create mock props for preview
  const mockProps: any = {};
  if (variant?.content) {
    if (Array.isArray(variant.content)) {
      variant.content.forEach((item: any) => {
        mockProps[item.name] = item.value || "";
      });
    } else {
      Object.assign(mockProps, variant.content);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-screen overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            معاينة: {variant?.title || sectionType}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>
        <div className="p-6">
          <div className="border-2 border-slate-200 rounded-xl p-4 bg-slate-50">
            <Component {...mockProps} />
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-800">
              💡 هذه معاينة للتصميم. بعد الإضافة يمكنك تعديل المحتوى والألوان.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementsSide;
