import { useState } from "react";
import ColorPickerBar from "../../../../../../shared/components/ui/color-picker-bar";
import useSectionDetails from "../../../../../hooks/editor-section-details";
import { useSectionStore } from "../../../../../../shared/store/editor/section";
import Divider from "../../../../../../shared/components/ui/divider";
import {
  Palette,
  Move,
  Layers,
  Type,
  Box,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const SectionStyles = () => {
  const { section, option } = useSectionDetails();
  const { setSection } = useSectionStore();
  const [open, setOpen] = useState("");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    colors: true,
    typography: false,
    spacing: false,
    borders: false,
    effects: false,
  });

  if (!section) return null;

  const styles = section.styles || {};

  const updateStyles = (newStyles: Partial<typeof styles>) => {
    const updatedSection = {
      ...section,
      styles: {
        ...styles,
        ...newStyles,
      },
    };
    setSection(updatedSection);
  };

  const toggleSection = (sectionKey: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  // Get section type label
  const getSectionTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      hero: "قسم العلوي الرئيسي",
      categories: "قسم التصنيفات",
      recentProducts: "قسم المنتجات",
      menu: "قسم القائمة",
      ourStory: "قسم قصتنا",
      contact: "قسم اتصل بنا",
    };
    return labels[type] || type;
  };

  const SectionHeader = ({
    icon: Icon,
    title,
    sectionKey,
    color,
  }: {
    icon: any;
    title: string;
    sectionKey: string;
    color: string;
  }) => (
    <button
      onClick={() => toggleSection(sectionKey)}
      className="w-full flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors"
    >
      <div className="flex items-center gap-2">
        <Icon className={`w-4 h-4 ${color}`} />
        <h4 className="sub-title">{title}</h4>
      </div>
      {expandedSections[sectionKey] ? (
        <ChevronUp className="w-4 h-4 text-slate-400" />
      ) : (
        <ChevronDown className="w-4 h-4 text-slate-400" />
      )}
    </button>
  );

  return (
    <div className="editor-nav-section">
      <div className="flex items-center gap-2 mb-3">
        <Layers className="w-4 h-4 text-blue-600" />
        <h3 className="title">{"تخصيص القسم"}</h3>
      </div>

      {/* Section Info */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-xs text-slate-600 mb-1">القسم الحالي:</p>
        <p className="text-sm font-semibold text-slate-800">
          {option?.title || getSectionTypeLabel(section.type)}
        </p>
      </div>

      <Divider />

      {/* Colors Section */}
      <div className="mt-4">
        <SectionHeader
          icon={Palette}
          title="الألوان"
          sectionKey="colors"
          color="text-purple-600"
        />
        {expandedSections.colors && (
          <div className="flex flex-col gap-3 mt-3">
            <div>
              <label className="text-xs text-slate-600 mb-1.5 block">
                لون الخلفية
              </label>
              <ColorPickerBar
                label="الخلفية"
                value={styles.backgroundColor || "#FFFFFF"}
                onChange={(value) => updateStyles({ backgroundColor: value })}
                open={open}
                setOpen={setOpen}
              />
            </div>

            <div>
              <label className="text-xs text-slate-600 mb-1.5 block">
                لون النص الأساسي
              </label>
              <ColorPickerBar
                label="النص"
                value={styles.textColor || "#1D293D"}
                onChange={(value) => updateStyles({ textColor: value })}
                open={open}
                setOpen={setOpen}
              />
            </div>

            <div>
              <label className="text-xs text-slate-600 mb-1.5 block">
                لون العناوين
              </label>
              <ColorPickerBar
                label="العناوين"
                value={styles.headingColor || styles.textColor || "#1D293D"}
                onChange={(value) => updateStyles({ headingColor: value })}
                open={open}
                setOpen={setOpen}
              />
            </div>

            <div>
              <label className="text-xs text-slate-600 mb-1.5 block">
                لون الأزرار
              </label>
              <ColorPickerBar
                label="الأزرار"
                value={styles.buttonColor || "#4272FF"}
                onChange={(value) => updateStyles({ buttonColor: value })}
                open={open}
                setOpen={setOpen}
              />
            </div>

            <div>
              <label className="text-xs text-slate-600 mb-1.5 block">
                لون نص الأزرار
              </label>
              <ColorPickerBar
                label="نص الأزرار"
                value={styles.buttonTextColor || "#FFFFFF"}
                onChange={(value) => updateStyles({ buttonTextColor: value })}
                open={open}
                setOpen={setOpen}
              />
            </div>

            <div>
              <label className="text-xs text-slate-600 mb-1.5 block">
                لون الحدود
              </label>
              <ColorPickerBar
                label="الحدود"
                value={styles.borderColor || "#E2E8F0"}
                onChange={(value) => updateStyles({ borderColor: value })}
                open={open}
                setOpen={setOpen}
              />
            </div>
          </div>
        )}
      </div>

      <Divider />

      {/* Typography Section */}
      <div className="mt-4">
        <SectionHeader
          icon={Type}
          title="الخطوط والأحجام"
          sectionKey="typography"
          color="text-blue-600"
        />
        {expandedSections.typography && (
          <div className="flex flex-col gap-3 mt-3">
            <div>
              <label className="text-xs text-slate-600 mb-1.5 block">
                حجم خط العناوين
              </label>
              <input
                type="text"
                value={styles.headingFontSize || ""}
                onChange={(e) =>
                  updateStyles({ headingFontSize: e.target.value })
                }
                placeholder="مثال: 2rem أو 32px"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            <div>
              <label className="text-xs text-slate-600 mb-1.5 block">
                وزن خط العناوين
              </label>
              <select
                value={styles.headingFontWeight || "bold"}
                onChange={(e) =>
                  updateStyles({ headingFontWeight: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="normal">عادي</option>
                <option value="medium">متوسط</option>
                <option value="semibold">نصف عريض</option>
                <option value="bold">عريض</option>
                <option value="extrabold">عريض جداً</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-600 mb-1.5 block">
                حجم خط النص
              </label>
              <input
                type="text"
                value={styles.textFontSize || ""}
                onChange={(e) => updateStyles({ textFontSize: e.target.value })}
                placeholder="مثال: 1rem أو 16px"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            <div>
              <label className="text-xs text-slate-600 mb-1.5 block">
                وزن خط النص
              </label>
              <select
                value={styles.textFontWeight || "normal"}
                onChange={(e) =>
                  updateStyles({ textFontWeight: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="normal">عادي</option>
                <option value="medium">متوسط</option>
                <option value="semibold">نصف عريض</option>
                <option value="bold">عريض</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <Divider />

      {/* Spacing Section */}
      <div className="mt-4">
        <SectionHeader
          icon={Move}
          title="المسافات"
          sectionKey="spacing"
          color="text-green-600"
        />
        {expandedSections.spacing && (
          <div className="flex flex-col gap-3 mt-3">
            <div>
              <label className="text-xs text-slate-600 mb-1.5 block">
                المسافات الداخلية (Padding) - جميع الجوانب
              </label>
              <input
                type="text"
                value={styles.padding || ""}
                onChange={(e) => updateStyles({ padding: e.target.value })}
                placeholder="مثال: 20px أو 1rem 2rem"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-slate-600 mb-1.5 block">
                  من الأعلى
                </label>
                <input
                  type="text"
                  value={styles.paddingTop || ""}
                  onChange={(e) => updateStyles({ paddingTop: e.target.value })}
                  placeholder="20px"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-600 mb-1.5 block">
                  من الأسفل
                </label>
                <input
                  type="text"
                  value={styles.paddingBottom || ""}
                  onChange={(e) =>
                    updateStyles({ paddingBottom: e.target.value })
                  }
                  placeholder="20px"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-600 mb-1.5 block">
                  من اليمين
                </label>
                <input
                  type="text"
                  value={styles.paddingRight || ""}
                  onChange={(e) =>
                    updateStyles({ paddingRight: e.target.value })
                  }
                  placeholder="20px"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-600 mb-1.5 block">
                  من اليسار
                </label>
                <input
                  type="text"
                  value={styles.paddingLeft || ""}
                  onChange={(e) =>
                    updateStyles({ paddingLeft: e.target.value })
                  }
                  placeholder="20px"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-600 mb-1.5 block">
                المسافات الخارجية (Margin) - جميع الجوانب
              </label>
              <input
                type="text"
                value={styles.margin || ""}
                onChange={(e) => updateStyles({ margin: e.target.value })}
                placeholder="مثال: 20px أو 1rem 2rem"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-slate-600 mb-1.5 block">
                  من الأعلى
                </label>
                <input
                  type="text"
                  value={styles.marginTop || ""}
                  onChange={(e) => updateStyles({ marginTop: e.target.value })}
                  placeholder="20px"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-600 mb-1.5 block">
                  من الأسفل
                </label>
                <input
                  type="text"
                  value={styles.marginBottom || ""}
                  onChange={(e) => updateStyles({ marginBottom: e.target.value })}
                  placeholder="20px"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-600 mb-1.5 block">
                  من اليمين
                </label>
                <input
                  type="text"
                  value={styles.marginRight || ""}
                  onChange={(e) => updateStyles({ marginRight: e.target.value })}
                  placeholder="20px"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-600 mb-1.5 block">
                  من اليسار
                </label>
                <input
                  type="text"
                  value={styles.marginLeft || ""}
                  onChange={(e) => updateStyles({ marginLeft: e.target.value })}
                  placeholder="20px"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <Divider />

      {/* Borders Section */}
      <div className="mt-4">
        <SectionHeader
          icon={Box}
          title="الحدود"
          sectionKey="borders"
          color="text-orange-600"
        />
        {expandedSections.borders && (
          <div className="flex flex-col gap-3 mt-3">
            <div>
              <label className="text-xs text-slate-600 mb-1.5 block">
                عرض الحدود
              </label>
              <input
                type="text"
                value={styles.borderWidth || ""}
                onChange={(e) => updateStyles({ borderWidth: e.target.value })}
                placeholder="مثال: 1px أو 2px"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            <div>
              <label className="text-xs text-slate-600 mb-1.5 block">
                نوع الحدود
              </label>
              <select
                value={styles.borderStyle || "solid"}
                onChange={(e) => updateStyles({ borderStyle: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="none">بدون</option>
                <option value="solid">خط مستمر</option>
                <option value="dashed">خط متقطع</option>
                <option value="dotted">نقاط</option>
                <option value="double">مزدوج</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-600 mb-1.5 block">
                زوايا دائرية
              </label>
              <input
                type="text"
                value={styles.borderRadius || ""}
                onChange={(e) => updateStyles({ borderRadius: e.target.value })}
                placeholder="مثال: 8px أو 0.5rem"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
          </div>
        )}
      </div>

      <Divider />

      {/* Effects Section */}
      <div className="mt-4">
        <SectionHeader
          icon={Sparkles}
          title="التأثيرات"
          sectionKey="effects"
          color="text-pink-600"
        />
        {expandedSections.effects && (
          <div className="flex flex-col gap-3 mt-3">
            <div>
              <label className="text-xs text-slate-600 mb-1.5 block">
                الظل (Box Shadow)
              </label>
              <input
                type="text"
                value={styles.boxShadow || ""}
                onChange={(e) => updateStyles({ boxShadow: e.target.value })}
                placeholder="مثال: 0 4px 6px rgba(0,0,0,0.1)"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            <div>
              <label className="text-xs text-slate-600 mb-1.5 block">
                الشفافية (Opacity)
              </label>
              <input
                type="number"
                min="0"
                max="1"
                step="0.1"
                value={styles.opacity || "1"}
                onChange={(e) => updateStyles({ opacity: e.target.value })}
                placeholder="0.0 - 1.0"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
              <p className="text-xs text-slate-400 mt-1">
                من 0 (شفاف تماماً) إلى 1 (معتم تماماً)
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Preview Info */}
      <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
        <p className="text-xs text-slate-500 text-center">
          💡 النقر على القسم في المعاينة لتطبيق التعديلات
        </p>
      </div>
    </div>
  );
};

export default SectionStyles;

