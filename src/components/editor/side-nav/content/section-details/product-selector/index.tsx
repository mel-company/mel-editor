import { useState } from "react";
import React from "react";
import { ProductType } from "../../../../../../types";
import { mockProducts } from "../../../../../../mock/products";
import useSectionDetails from "../../../../../../hooks/editor-section-details";
import { Check, X } from "lucide-react";
import classNames from "classnames";

const ProductSelector = () => {
  const { section, option, setSection } = useSectionDetails();
  const [showSelector, setShowSelector] = useState(false);
  const [filter, setFilter] = useState<"all" | "discount" | "category">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  if (!section || !option) return null;

  // Get current selected products
  const selectedProductIds = option.products?.map((p: ProductType) => p.id) || [];

  // Filter products
  let filteredProducts = mockProducts;
  if (filter === "discount") {
    filteredProducts = mockProducts.filter((p) => p.discount > 0);
  } else if (filter === "category" && selectedCategory) {
    filteredProducts = mockProducts.filter((p) => p.category === selectedCategory);
  }

  // Apply search filter
  if (searchTerm) {
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Get unique categories
  const categories = Array.from(new Set(mockProducts.map((p) => p.category)));

  const toggleProduct = (product: ProductType) => {
    const currentProducts: ProductType[] = option.products || [];
    const isSelected = selectedProductIds.includes(product.id);

    let newProducts: ProductType[];
    if (isSelected) {
      newProducts = currentProducts.filter((p) => p.id !== product.id);
    } else {
      newProducts = [...currentProducts, product];
    }

    const newOptions = section.options?.map((op) => {
      if (op.id === section.section_id) {
        return { ...op, products: newProducts };
      }
      return op;
    });

    setSection({ ...section, options: newOptions });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-xs text-slate-600">المنتجات المحددة</p>
          <p className="text-xs font-semibold text-slate-800">
            {selectedProductIds.length} منتج محدد
          </p>
        </div>
        <button
          onClick={() => setShowSelector(!showSelector)}
          className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
            showSelector
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
              <span>اختيار منتجات</span>
            </>
          )}
        </button>
      </div>

      {showSelector && (
        <div className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm">
          {/* Filters */}
          <div className="flex flex-col gap-3 mb-4">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilter("all")}
                className={classNames(
                  "px-4 py-2 rounded-lg text-xs font-medium transition-all",
                  {
                    "bg-blue-600 text-white shadow-sm": filter === "all",
                    "bg-slate-100 text-slate-700 hover:bg-slate-200": filter !== "all",
                  }
                )}
              >
                الكل ({mockProducts.length})
              </button>
              <button
                onClick={() => setFilter("discount")}
                className={classNames(
                  "px-4 py-2 rounded-lg text-xs font-medium transition-all",
                  {
                    "bg-blue-600 text-white shadow-sm": filter === "discount",
                    "bg-slate-100 text-slate-700 hover:bg-slate-200": filter !== "discount",
                  }
                )}
              >
                مع خصم ({mockProducts.filter((p) => p.discount > 0).length})
              </button>
              <button
                onClick={() => setFilter("category")}
                className={classNames(
                  "px-4 py-2 rounded-lg text-xs font-medium transition-all",
                  {
                    "bg-blue-600 text-white shadow-sm": filter === "category",
                    "bg-slate-100 text-slate-700 hover:bg-slate-200": filter !== "category",
                  }
                )}
              >
                حسب التصنيف
              </button>
            </div>

            {filter === "category" && (
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2.5 border-2 border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">اختر التصنيف</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat} ({mockProducts.filter((p) => p.category === cat).length})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="ابحث عن منتج بالاسم أو الوصف..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-2 text-xs text-blue-600 hover:text-blue-700"
              >
                إلغاء البحث
              </button>
            )}
          </div>

          {/* Product List - Grid Layout */}
          <div className="max-h-96 overflow-y-auto">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-slate-500">لا توجد منتجات</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2">
                {filteredProducts.map((product) => {
                  const isSelected = selectedProductIds.includes(product.id);
                  return (
                    <div
                      key={product.id}
                      onClick={() => toggleProduct(product)}
                      className={classNames(
                        "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border-2",
                        {
                          "bg-blue-50 border-blue-400 shadow-sm": isSelected,
                          "bg-white border-slate-200 hover:border-blue-300 hover:bg-blue-50": !isSelected,
                        }
                      )}
                    >
                      <div className="w-16 h-16 border-2 border-slate-200 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                        {product.thumbnail?.url ? (
                          <img
                            src={product.thumbnail.url}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                            IMG
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 mb-1 truncate">
                          {product.name}
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-green-600">
                            {product.price} ر.س
                          </span>
                          {product.discount > 0 && (
                            <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded font-medium">
                              خصم {product.discount}%
                            </span>
                          )}
                          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            الكمية: {product.stock}
                          </span>
                        </div>
                        {product.category && (
                          <p className="text-xs text-slate-500 mt-1">
                            {product.category}
                          </p>
                        )}
                      </div>
                      <div
                        className={classNames(
                          "w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all",
                          {
                            "bg-blue-600 border-blue-600 shadow-sm": isSelected,
                            "border-slate-300 bg-white": !isSelected,
                          }
                        )}
                      >
                        {isSelected && <Check size={14} className="text-white" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200 bg-blue-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-800">
                المختار: {selectedProductIds.length} منتج
              </p>
              {selectedProductIds.length > 0 && (
                <button
                  onClick={() => {
                    // Clear all selections
                    const newOptions = section.options?.map((op) => {
                      if (op.id === section.section_id) {
                        return { ...op, products: [] };
                      }
                      return op;
                    });
                    setSection({ ...section, options: newOptions });
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-medium"
                >
                  إلغاء الكل
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Selected Products Preview */}
      {!showSelector && selectedProductIds.length > 0 && (
        <div className="space-y-2">
          {option.products?.slice(0, 3).map((product: ProductType) => (
            <div
              key={product.id}
              className="flex items-center gap-2 p-2 bg-slate-50 rounded-md"
            >
              <div className="w-8 h-8 border border-slate-200 bg-slate-100 rounded overflow-hidden">
                {product.thumbnail?.url ? (
                  <img
                    src={product.thumbnail.url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>
              <p className="text-xs text-slate-700 flex-1 truncate">
                {product.name}
              </p>
            </div>
          ))}
          {selectedProductIds.length > 3 && (
            <p className="text-xs text-slate-500 text-center">
              و {selectedProductIds.length - 3} منتجات أخرى
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSelector;
