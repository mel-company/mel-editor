import { useState, useMemo, useEffect } from "react";
import { CategoryType, SectionOptionType } from "../../../../../../shared/types";
import useSectionDetails from "../../../../../hooks/editor-section-details";
import { Check, X, Search, Tag } from "lucide-react";
import classNames from "classnames";
import { fetchAPI } from "../../../../../../shared/api/fetchy";
import { imageLink } from "@/shared/api/imageLink";

const CategorySelector = () => {
  const { section, option, setSection } = useSectionDetails();
  const [showSelector, setShowSelector] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [categories, setCategories] = useState<CategoryType[]>([]);

  const fetchCategories = async () => {
    try {
      const result = await fetchAPI({ endPoint: "/category/public" });
      console.log("Categories fetched:", result);
      setCategories(result?.data || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (!section || !option) return null;

  // Get current selected categories
  const selectedCategoryIds = option.categories?.map((c: CategoryType) => c.id) || [];

  // Filter categories based on search
  const filteredCategories = useMemo(() => {
    if (!searchTerm) return categories;
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return categories.filter(
      (c) => c.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [searchTerm, categories]);



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

    setSection({
      ...section,
      options: newOptions,
      target_id: section.target_id || section.id || section.section_id
    });
  };


  const clearAllSelectedCategories = () => {
    const newOptions = section.options?.map((op: SectionOptionType) => {
      if (op.id === section.section_id) {
        return { ...op, categories: [] };
      }
      return op;
    });
    setSection({
      ...section,
      options: newOptions,
      target_id: section.target_id || section.id || section.section_id
    });
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
          <div className="max-h-64 overflow-y-auto ">
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
                      "flex items-center gap-1.5 py-2 cursor-pointer transition-all border-b",
                      {
                        "bg-blue-50 border-blue-400 shadow-sm": isSelected,
                        "bg-white border-slate-200 hover:border-blue-300 hover:bg-blue-50": !isSelected,
                      }
                    )}
                  >
                    <div className="w-8 h-8 border border-slate-200 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                      {category?.image ? (
                        <img
                          src={imageLink(category.image)}
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
                      <p className="text-xs text-slate-900 mb-1 truncate">
                        {category.name}
                      </p>
                    </div>
                    <div
                      className={classNames(
                        "w-4 h-4 rounded border flex items-center justify-center shrink-0",
                        {
                          "bg-blue-600 border-blue-600": isSelected,
                          "border-slate-200": !isSelected,
                        }
                      )}
                    >
                      {isSelected && <Check size={10} strokeWidth={3} className="text-white" />}
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
              <div className="w-8 h-8 border border-slate-200 bg-slate-100 rounded overflow-hidden shrink-0">
                {category?.image ? (
                  <img
                    src={imageLink(category.image)}
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


    </div>
  );
};

export default CategorySelector;

