import { useEffect, useState } from "react";
import { ProductType, SectionOptionType } from "../../../../../../shared/types";
import { mockProducts } from "@templates/home/sections/products";
import useSectionDetails from "../../../../../hooks/editor-section-details";
import { Check } from "lucide-react";
import classNames from "classnames";
import { imageLink } from "@/shared/api/imageLink";

const ProductSelector = () => {
  const { section, option, setSection } = useSectionDetails();
  const [showSelector, setShowSelector] = useState(false);
  const [filter, setFilter] = useState<"all" | "discount" | "category">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [products, setProducts] = useState<ProductType[]>(mockProducts)

  const fetchProducts = async () => {
    try {
      const products = await fetch(`${import.meta.env.VITE_API_BASE_URL}/product/by-store-domain/cursor?store=azyaa&limit=20`)
      const result = await products.json()
      console.log(result)
      console.log("productsx")
      console.log(result?.data)
      setProducts(result?.data)
    } catch (error) {
      console.error("Failed to fetch products:", error)
    }
  }


  useEffect(() => {
    fetchProducts()
  }, [])

  if (!section || !option) return null;

  // Get current selected products
  const selectedProductIds = option.products?.map((p: ProductType) => p.id) || [];
  const selectedProducts: ProductType[] = option.products || [];

  // Filter products
  let filteredProducts = products;
  if (filter === "discount") {
    filteredProducts = products.filter((p) => p?.variants?.some((v: any) => v.price < p.price));
  } else if (filter === "category" && selectedCategory) {
    filteredProducts = products.filter((p) => p?.categories?.some((cat: any) => cat.name === selectedCategory));
  }

  // Apply search filter
  if (searchTerm) {
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.categories?.some((cat: any) => cat.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }

  // Get unique categories
  const categories = Array.from(new Set(products.flatMap((p) => p?.categories?.map((cat: any) => cat.name) || [])));

  const toggleProduct = (product: ProductType) => {
    const currentProducts: ProductType[] = option.products || [];
    const isSelected = selectedProductIds.includes(product?.id);

    let newProducts: ProductType[];
    if (isSelected) {
      newProducts = currentProducts.filter((p) => p.id !== product?.id);
    } else {
      newProducts = [...currentProducts, product];
    }

    const newOptions = section.options?.map((op: SectionOptionType) => {
      if (op.id === section.section_id) {
        return { ...op, products: newProducts };
      }
      return op;
    });

    setSection({ ...section, options: newOptions });
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <h3 className="text-sm font-semibold text-slate-700">المنتجات</h3>

      {/* Selected Products List - Pill Style */}
      {!showSelector && <div className="flex flex-col gap-2">
        {selectedProducts.map((product: ProductType) => (
          <div
            key={product?.id}
            className="flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-xl w-full"
          >
            {/* Product Thumbnail */}
            <div className="w-10 h-10 bg-slate-200 rounded-lg overflow-hidden shrink-0">
              {imageLink(product?.image) ? (
                <img
                  src={imageLink(product?.image)}
                  alt={product?.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                  IMG
                </div>
              )}
            </div>
            {/* Product Name */}
            <div className="space-y-1">
              <p className="flex-1 text-xs font-medium text-slate-700 line-clamp-1">
                {product?.title}
              </p>
              <p className="flex-1 text-xs font-medium text-slate-500">
                {product?.price}
              </p></div>


          </div>
        ))}

        {/* Empty State */}
        {selectedProducts.length === 0 && (
          <p className="text-xs text-slate-400 text-center py-4">
            لا توجد منتجات محددة
          </p>
        )}
      </div>
      }


      {showSelector && (
        <div className="">
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
                الكل ({products.length})
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
                مع خصم ({products.filter((p) => p?.variants?.some((v: any) => v.price < p.price)).length})
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
                    {cat} ({products.filter((p) => p?.category === cat).length})
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

          {/* Product List - Enhanced Grid Layout */}
          <div className="max-h-96 overflow-y-auto space-y-2">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-3 bg-slate-100 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-slate-300 rounded"></div>
                </div>
                <p className="text-sm text-slate-500 font-medium">لا توجد منتجات</p>
                <p className="text-xs text-slate-400 mt-1">جرب تغيير الفلتر أو البحث</p>
              </div>
            ) : (
              <div>
                {filteredProducts.map((product) => {
                  const isSelected = selectedProductIds.includes(product?.id);
                  return (
                    <div
                      key={product?.id}
                      onClick={() => toggleProduct(product)}
                      className={"group hover:bg-slate-50 select-none py-3 border-b relative overflow-hidden cursor-pointer transition-all duration-200"}
                    >
                      <div className="flex items-center gap-1">
                        {/* Compact Product Image */}
                        <div className="relative">
                          <div className="w-10 h-10 relative border border-slate-200 bg-slate-100 rounded-xl overflow-hidden shrink-0 group-hover:border-blue-300 transition-colors">
                            {isSelected && <SelectChecker />}  {imageLink(product?.image) ? (

                              <img
                                src={imageLink(product?.image)}
                                alt={product?.title}
                                className="w-full h-full object-cover"
                              />

                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-400">
                                <div className="w-5 h-5 bg-slate-300 rounded"></div>
                              </div>
                            )}
                          </div>
                          {product?.variants?.some((v: any) => v.price < product.price) && (
                            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1 py-0.5 rounded-full shadow">
                              خصم
                            </div>
                          )}
                        </div>

                        {/* Compact Product Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-slate-900 truncate mb-0.5">
                            {product?.title}
                          </p>
                          <span className="text-xs text-slate-600">
                            {product?.price}
                          </span>
                        </div>


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
                    const newOptions = section.options?.map((op: SectionOptionType) => {
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
      <button
        onClick={() => setShowSelector(!showSelector)}
        className="w-full py-2.5 text-sm font-medium text-blue-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
      >
        {showSelector ? "حفظ المنتجات" : "تعديل المنتجات"}

      </button>

    </div>
  );
};

export default ProductSelector;


const SelectChecker = () =>
  <div className={"bg-gradient-to-t from-blue-700/80 to-blue-600/5 w-full h-full absolute top-0 end-0 flex items-center justify-center shrink-0 transition-all"}>
    <Check size={16} className="text-white" />
  </div>