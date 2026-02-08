import { Plus } from "lucide-react";
import { useState } from "react";
import { useSectionStore } from "@/shared/store/editor/section";
import { usePageStore } from "@/shared/store/editor/page";
import { SectionType, PageType } from "@/shared/types";
import { mockTemplate } from "@templates/data/template";
import { Select } from "@/shared/components/ui/select";

const pageSectionMapping: Record<PageType["type"], string[]> = {
  home: ["hero", "categories", "recentProducts"],
  about: ["hero", "ourStory", "contact"],
  content: ["hero"],
  menu: ["menu", "categories"],
};

const AddSectionBtn = () => {
  const { addSection } = useSectionStore();
  const { getCurrentPage } = usePageStore();
  const currentPage = getCurrentPage();
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedSectionType, setSelectedSectionType] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");

  const getAvailableSections = () => {
    if (!currentPage) return [];
    const allowedSectionTypes = pageSectionMapping[currentPage.type] || [];
    const allEditableSections = mockTemplate.sections.filter((s) => s.editable);
    return allEditableSections.filter((section) =>
      allowedSectionTypes.includes(section.type)
    );
  };

  const availableSections = getAvailableSections();

  const getVariants = (sectionType: string) => {
    const section = availableSections.find((s) => s.type === sectionType);
    return section?.options || [];
  };

  const handleSectionTypeChange = (sectionType: string) => {
    setSelectedSectionType(sectionType);
    setSelectedVariant("");
    const variants = getVariants(sectionType);
    if (variants.length > 0) {
      setSelectedVariant(variants[0].id);
    }
  };

  const handleAddSection = () => {
    if (!selectedSectionType || !selectedVariant) return;
    const templateSection = availableSections.find((s) => s.type === selectedSectionType);
    if (templateSection) {
      const newSection: SectionType = {
        ...templateSection,
        section_id: selectedVariant,
        target_id: crypto.randomUUID(),
      };
      addSection(newSection);
      setSelectedSectionType("");
      setSelectedVariant("");
      setShowAddForm(false);
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

  if (showAddForm) {
    return (
      <div className="mt-2 p-3 bg-slate-50 rounded-lg flex flex-col gap-2">
        <Select
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
        {selectedSectionType && getVariants(selectedSectionType).length > 0 && (
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
        )}
        <div className="flex gap-2">
          <button
            onClick={handleAddSection}
            disabled={!selectedSectionType || !selectedVariant}
            className="flex-1 p-2 rounded-lg bg-blue-600 text-white text-xs disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            إضافة
          </button>
          <button
            onClick={() => setShowAddForm(false)}
            className="p-2 rounded-lg bg-slate-200 text-slate-600 text-xs"
          >
            إلغاء
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowAddForm(true)}
      className="mb-0.5 w-full p-2 rounded-lg border-2 border-dashed border-slate-200 text-slate-500 text-xs flex items-center justify-center gap-1 hover:border-blue-400 hover:text-blue-500 transition-colors"
    >
      <Plus size={14} />
      إضافة قسم جديد
    </button>
  );
};

export default AddSectionBtn;
