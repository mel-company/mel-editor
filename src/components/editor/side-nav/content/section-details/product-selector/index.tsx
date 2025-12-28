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
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="sub-title">{"المنتجات المختارة"}</h3>
        <button
          onClick={() => setShowSelector(!showSelector)}
          className="text-xs text-blue-600 hover:text-blue-700"
        >
          {showSelector ? "إخفاء" : "اختيار منتجات"}
        </button>
      </div>

      {showSelector && (
        <div className="border border-slate-200 rounded-lg p-3 bg-white">
          {/* Filters */}
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilter("all")}
                className={classNames(
                  "px-3 py-1 rounded-md text-xs transition-colors",
                  {
                    "bg-blue-600 text-white": filter === "all",
                    "bg-slate-100 text-slate-700": filter !== "all",
                  }
                )}
              >
                الكل
              </button>
              <button
                onClick={() => setFilter("discount")}
                className={classNames(
                  "px-3 py-1 rounded-md text-xs transition-colors",
                  {
                    "bg-blue-600 text-white": filter === "discount",
                    "bg-slate-100 text-slate-700": filter !== "discount",
                  }
                )}
              >
                مع خصم
              </button>
              <button
                onClick={() => setFilter("category")}
                className={classNames(
                  "px-3 py-1 rounded-md text-xs transition-colors",
                  {
                    "bg-blue-600 text-white": filter === "category",
                    "bg-slate-100 text-slate-700": filter !== "category",
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
                className="w-full p-2 border border-slate-200 rounded-md text-xs"
              >
                <option value="">اختر التصنيف</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Product List */}
          <div className="max-h-64 overflow-y-auto space-y-2">
            {filteredProducts.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-4">
                لا توجد منتجات
              </p>
            ) : (
              filteredProducts.map((product) => {
                const isSelected = selectedProductIds.includes(product.id);
                return (
                  <div
                    key={product.id}
                    onClick={() => toggleProduct(product)}
                    className={classNames(
                      "flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors",
                      {
                        "bg-blue-50 border border-blue-200": isSelected,
                        "bg-slate-50 hover:bg-slate-100": !isSelected,
                      }
                    )}
                  >
                    <div className="w-10 h-10 border border-slate-200 bg-slate-100 rounded-md overflow-hidden flex-shrink-0">
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
                      <p className="text-xs font-medium text-slate-800 truncate">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-bold text-slate-900">
                          ${product.price}
                        </span>
                        {product.discount > 0 && (
                          <span className="text-xs text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                            خصم {product.discount}%
                          </span>
                        )}
                      </div>
                    </div>
                    <div
                      className={classNames(
                        "w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0",
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

          <div className="mt-3 pt-3 border-t border-slate-200">
            <p className="text-xs text-slate-600">
              المختار: {selectedProductIds.length} منتج
            </p>
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
