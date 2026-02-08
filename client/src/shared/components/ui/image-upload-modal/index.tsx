import { useState } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { FileType, ProductType, CategoryType } from "../../../types";
import { useR2Upload } from "../../../hooks/use-r2-upload";
import { mockProducts } from "@templates/data/products";
import { mockCategories } from "@templates/data/categories";

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (file: FileType) => void;
  label?: string;
}

const ImageUploadModal = ({
  isOpen,
  onClose,
  onConfirm,
  label = "إضافة صورة",
}: ImageUploadModalProps) => {
  const [step, setStep] = useState<"upload" | "category" | "product" | "preview">("upload");
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

  const { uploadState, handleFileChange, clear } = useR2Upload({
    onUpload: () => { },
    maxSizeMB: 5,
    acceptedTypes: ["image/*"],
  });

  const displayImage = uploadState.file?.url;

  // Get categories from store settings or use mock
  const categories = mockCategories || [];
  const products = selectedCategory
    ? mockProducts.filter((p) => p.category === selectedCategory.name)
    : mockProducts;

  const handleNext = () => {
    if (step === "upload" && displayImage) {
      setStep("category");
    } else if (step === "category") {
      setStep("product");
    } else if (step === "product") {
      setStep("preview");
    }
  };

  const handleConfirm = () => {
    if (uploadState.file) {
      onConfirm(uploadState.file);
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedProduct(null);
    clear();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">{label}</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Upload Image */}
          {step === "upload" && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={handleFileChange}
                  disabled={uploadState.isLoading}
                />
                {uploadState.isLoading ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <div>
                      <p className="text-sm font-medium text-slate-700 mb-1">
                        جاري الرفع...
                      </p>
                      <p className="text-xs text-slate-500">
                        {uploadState.uploadProgress}% مكتمل
                      </p>
                    </div>
                  </div>
                ) : displayImage ? (
                  <div className="relative group">
                    <img
                      src={displayImage}
                      alt="Preview"
                      className="max-h-64 mx-auto rounded-lg border border-slate-200"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        clear();
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-4 bg-blue-50 rounded-full">
                      <Upload className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700 mb-1">
                        اضغط أو اسحب الصورة هنا
                      </p>
                      <p className="text-xs text-slate-500">
                        PNG, JPG, GIF حتى 5MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
              {uploadState.error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600">{uploadState.error}</p>
                </div>
              )}
              {displayImage && !uploadState.isLoading && (
                <button
                  onClick={handleNext}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  التالي
                </button>
              )}
            </div>
          )}

          {/* Step 2: Select Category (Optional) */}
          {step === "category" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  اختر التصنيف (اختياري)
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  يمكنك ربط الصورة بتصنيف معين
                </p>
                <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`p-3 rounded-lg border-2 text-right transition-all ${selectedCategory === null
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 hover:border-blue-300"
                      }`}
                  >
                    <p className="text-sm font-medium text-slate-900">بدون تصنيف</p>
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category)}
                      className={`p-3 rounded-lg border-2 text-right transition-all ${selectedCategory?.id === category.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 hover:border-blue-300"
                        }`}
                    >
                      <p className="text-sm font-medium text-slate-900">
                        {category.name}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep("upload")}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  السابق
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  التالي
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Select Product (Optional) */}
          {step === "product" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  اختر المنتج (اختياري)
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  {selectedCategory
                    ? `المنتجات في تصنيف "${selectedCategory.name}"`
                    : "جميع المنتجات"}
                </p>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className={`w-full p-3 rounded-lg border-2 text-right transition-all ${selectedProduct === null
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 hover:border-blue-300"
                      }`}
                  >
                    <p className="text-sm font-medium text-slate-900">بدون منتج</p>
                  </button>
                  {products.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => setSelectedProduct(product)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 text-right transition-all ${selectedProduct?.id === product.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 hover:border-blue-300"
                        }`}
                    >
                      <div className="w-12 h-12 border border-slate-200 rounded-lg overflow-hidden flex-shrink-0">
                        {product.thumbnail?.url ? (
                          <img
                            src={product.thumbnail.url}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-100">
                            <ImageIcon className="w-6 h-6 text-slate-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 text-right">
                        <p className="text-sm font-medium text-slate-900">
                          {product.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {product.price} ر.س - متوفر: {product.stock}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep("category")}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  السابق
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  التالي
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Preview */}
          {step === "preview" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  معاينة الصورة
                </h3>
                {displayImage && (
                  <div className="border-2 border-slate-200 rounded-xl p-4 bg-slate-50">
                    <div className="relative">
                      <img
                        src={displayImage}
                        alt="Preview"
                        className="w-full h-auto rounded-lg max-h-96 object-contain mx-auto"
                      />
                    </div>
                    <div className="mt-4 space-y-2 text-sm">
                      {selectedCategory && (
                        <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                          <span className="text-slate-600">التصنيف:</span>
                          <span className="font-medium text-slate-900">
                            {selectedCategory.name}
                          </span>
                        </div>
                      )}
                      {selectedProduct && (
                        <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                          <span className="text-slate-600">المنتج:</span>
                          <span className="font-medium text-slate-900">
                            {selectedProduct.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep("product")}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  السابق
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  تأكيد الإضافة
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;

