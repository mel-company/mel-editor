import { useState, useMemo } from "react";
import { CategoryType, FileType, SectionOptionType } from "../../../../../../shared/types";
import { mockCategories } from "@templates/data/categories";
import useSectionDetails from "../../../../../hooks/editor-section-details";
import { Check, X, Search, Tag, Plus, Image as ImageIcon } from "lucide-react";
import classNames from "classnames";
import FileUploadBar from "../../../../../../shared/components/ui/file-upload/bar";

const CategorySelector = () => {
  const { section, option, setSection } = useSectionDetails();
  const [showSelector, setShowSelector] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState<FileType | undefined>(undefined);

  if (!section || !option) return null;

  // Get current selected categories
  const selectedCategoryIds = option.categories?.map((c: CategoryType) => c.id) || [];

  // Filter categories based on search
  const filteredCategories = useMemo(() => {
    if (!searchTerm) return mockCategories;
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return mockCategories.filter(
      (c) => c.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [searchTerm]);

  // Get all available categories (combine selected and mock)
  const allCategories = useMemo(() => {
    const selected = option.categories || [];
    const mock = mockCategories.filter(
      (c) => !selected.some((s: CategoryType) => s.id === c.id)
    );
    return [...selected, ...mock];
  }, [option.categories]);

  const toggleCategory = (category: CategoryType) => {
    const currentCategories: CategoryType[] = option.categories || [];
    const isSelected = selectedCategoryIds.includes(category.id);

    let newCategories: CategoryType[];
    if (isSelected) {
      newCategories = currentCategories.filter((c) => c.id !== category.id);
    } else {
      newCategories = [...currentCategories, category];
    }

    const newOptions = section.options?.map((op: SectionOptionType) => {
      if (op.id === section.section_id) {
        return { ...op, categories: newCategories };
      }
      return op;
    });

    setSection({ ...section, options: newOptions });
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;

    const newCategory: CategoryType = {
      id: `custom-${Date.now()}`,
      name: newCategoryName,
      thumbnail: newCategoryImage
        ? {
          url: newCategoryImage.url || "",
          base64Content: newCategoryImage.base64Content || "",
        }
        : undefined as any,
    };

    const currentCategories: CategoryType[] = option.categories || [];
    const newCategories = [...currentCategories, newCategory];

    const newOptions = section.options?.map((op: SectionOptionType) => {
      if (op.id === section.section_id) {
        return { ...op, categories: newCategories };
      }
      return op;
    });

    setSection({ ...section, options: newOptions });
    setNewCategoryName("");
    setNewCategoryImage(undefined);
    setShowAddModal(false);
  };

  const clearAllSelectedCategories = () => {
    const newOptions = section.options?.map((op: SectionOptionType) => {
      if (op.id === section.section_id) {
        return { ...op, categories: [] };
      }
      return op;
    });
    setSection({ ...section, options: newOptions });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 mb-3">
        <Tag className="w-4 h-4 text-blue-600" />
        <h4 className="sub-title">{"تعديل التصنيفات"}</h4>
      </div>
      <p className="text-xs text-slate-500 mb-2">
        اختر التصنيفات التي تريد عرضها في هذا القسم.
      </p>

      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-xs text-slate-600">التصنيفات المحددة</p>
          <p className="text-xs font-semibold text-slate-800">
            {selectedCategoryIds.length} تصنيف محدد
          </p>
        </div>
        <div className="flex gap-2">
          {selectedCategoryIds.length > 0 && (
            <button
              onClick={clearAllSelectedCategories}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
            >
              <X size={14} />
              <span>إلغاء الكل</span>
            </button>
          )}
          <button
            onClick={() => setShowSelector(!showSelector)}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${showSelector
              ? "bg-slate-100 text-slate-700 border-slate-300"
              : "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
              }`}
          >
            {showSelector ? (
              <>
                <X size={14} />
                <span>إخفاء</span>
              </>
            ) : (
              <>
                <Check size={14} />
                <span>اختيار تصنيفات</span>
              </>
            )}
          </button>
        </div>
      </div>

      {showSelector && (
        <div className="border border-slate-200 rounded-lg p-3 bg-white">
          {/* Add New Category Button */}
          {/* <button
            onClick={() => setShowAddModal(true)}
            className="w-full mb-4 flex items-center justify-center gap-2 px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 rounded-lg transition-colors text-sm font-medium"
          >
            <Plus size={16} />
            <span>إضافة تصنيف جديد</span>
          </button> */}

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="ابحث عن تصنيف..."
              className="w-full pl-10 pr-4 py-2 border-2 border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category List */}
          <div className="max-h-64 overflow-y-auto space-y-2">
            {filteredCategories.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-4">
                لا توجد تصنيفات
              </p>
            ) : (
              filteredCategories.map((category) => {
                const isSelected = selectedCategoryIds.includes(category.id);
                return (
                  <div
                    key={category.id}
                    onClick={() => toggleCategory(category)}
                    className={classNames(
                      "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border-2",
                      {
                        "bg-blue-50 border-blue-400 shadow-sm": isSelected,
                        "bg-white border-slate-200 hover:border-blue-300 hover:bg-blue-50": !isSelected,
                      }
                    )}
                  >
                    <div className="w-16 h-16 border-2 border-slate-200 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                      {category.thumbnail?.url || category.thumbnail?.base64Content ? (
                        <img
                          src={category.thumbnail.url || category.thumbnail.base64Content}
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                          <Tag className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 mb-1 truncate">
                        {category.name}
                      </p>
                    </div>
                    <div
                      className={classNames(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                        {
                          "bg-blue-600 border-blue-600": isSelected,
                          "border-slate-300": !isSelected,
                        }
                      )}
                    >
                      {isSelected && <Check size={12} className="text-white" />}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Selected Categories Preview */}
      {!showSelector && selectedCategoryIds.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-slate-600 font-medium mb-1">التصنيفات المحددة حالياً:</p>
          {option.categories?.slice(0, 3).map((category: CategoryType) => (
            <div
              key={category.id}
              className="flex items-center gap-2 p-2 bg-slate-50 rounded-md border border-slate-200"
            >
              <div className="w-8 h-8 border border-slate-200 bg-slate-100 rounded overflow-hidden flex-shrink-0">
                {category.thumbnail?.url || category.thumbnail?.base64Content ? (
                  <img
                    src={category.thumbnail.url || category.thumbnail.base64Content}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Tag className="w-4 h-4 text-slate-400" />
                  </div>
                )}
              </div>
              <p className="text-xs text-slate-700 flex-1 truncate">
                {category.name}
              </p>
            </div>
          ))}
          {selectedCategoryIds.length > 3 && (
            <p className="text-xs text-slate-500 text-center">
              و {selectedCategoryIds.length - 3} تصنيفات أخرى
            </p>
          )}
        </div>
      )}

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">إضافة تصنيف جديد</h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewCategoryName("");
                  setNewCategoryImage(undefined);
                }}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  اسم التصنيف
                </label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="أدخل اسم التصنيف"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  صورة التصنيف (اختياري)
                </label>
                <FileUploadBar
                  label="رفع صورة"
                  value={newCategoryImage}
                  onChange={(file) => setNewCategoryImage(file)}
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setNewCategoryName("");
                    setNewCategoryImage(undefined);
                  }}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleAddCategory}
                  disabled={!newCategoryName.trim()}
                  className={`flex-1 font-medium py-3 px-6 rounded-lg transition-colors ${newCategoryName.trim()
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                >
                  إضافة
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySelector;

