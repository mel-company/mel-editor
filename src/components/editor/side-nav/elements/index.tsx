import { useState } from "react";
import React from "react";
import { useSectionStore } from "../../../../store/editor/section";
import { usePageStore } from "../../../../store/editor/page";
import { mockTemplate } from "../../../../mock/template";
import { SectionType, PageType } from "../../../../types";
import classNames from "classnames";
import { Plus } from "lucide-react";
import Divider from "../../../ui/divider";
import EditorSectionList from "../content/section-list";

// Mapping between page types and available section types
const pageSectionMapping: Record<PageType["type"], string[]> = {
  home: ["hero", "categories", "recentProducts"], // الصفحة الرئيسية - 3 أقسام
  about: ["hero"], // صفحة حول المتجر - 1 قسم
  content: ["hero"], // صفحة محتوى - 1 قسم
  menu: ["menu", "categories"], // صفحة القائمة (للمطاعم) - 2 أقسام
};

const ElementsSide = () => {
  const { addSection } = useSectionStore();
  const { getCurrentPage } = usePageStore();
  const currentPage = getCurrentPage();
  const [selectedSectionType, setSelectedSectionType] = useState<string>("");
  const [selectedVariant, setSelectedVariant] = useState<string>("");

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
    <div className="flex flex-col gap-4 h-full overflow-y-auto">
      {/* Add Section Form */}
      <div className="editor-nav-section">
        <Divider />
        <h3 className="title">{"إضافة قسم"}</h3>
        {currentPage && (
          <p className="text-xs text-slate-500 mb-2">
            الصفحة الحالية: <span className="font-medium text-slate-700">{getPageTypeLabel(currentPage.type)}</span>
          </p>
        )}
        <p className="text-xs text-slate-500 mb-4">أضف أقسام جديدة إلى صفحتك</p>

        {availableSections.length === 0 ? (
          <div className="p-4 bg-slate-50 rounded-lg text-center">
            <p className="text-xs text-slate-500">
              لا توجد أقسام متاحة لهذا النوع من الصفحات
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {/* Section Type Selector */}
            <div className="relative">
              <label className="block text-xs font-medium text-slate-700 mb-2">
                نوع القسم
              </label>
              <select
                value={selectedSectionType}
                onChange={(e) => handleSectionTypeChange(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">اختر نوع القسم</option>
                {availableSections.map((section) => (
                  <option key={section.id} value={section.type}>
                    {getSectionLabel(section.type)}
                  </option>
                ))}
              </select>
            </div>

          {/* Variant Selector - Only show if section type is selected */}
          {selectedSectionType &&
            getVariants(selectedSectionType).length > 0 && (
              <div className="relative">
                <label className="block text-xs font-medium text-slate-700 mb-2">
                  الشكل
                </label>
                <select
                  value={selectedVariant}
                  onChange={(e) => setSelectedVariant(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {getVariants(selectedSectionType).map((variant: any) => (
                    <option key={variant.id} value={variant.id}>
                      {variant.title}
                    </option>
                  ))}
                </select>
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
    </div>
  );
};

export default ElementsSide;
