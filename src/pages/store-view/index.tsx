import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTemplateStructure } from "../../hooks/use-template-structure";
import { usePageStore } from "../../store/editor/page";
import StoreView from "../../components/store-view";
import CartPage from "../cart";
import { ArrowLeft, ExternalLink } from "lucide-react";

const StoreViewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pages, currentPageId, storeSettings, isLoading } = useTemplateStructure();
  const { setCurrentPageId } = usePageStore();
  const [viewPageId, setViewPageId] = useState(currentPageId || pages[0]?.id);
  const isCartPage = location.pathname === "/store-view/cart" || location.pathname === "/cart";

  useEffect(() => {
    // Set initial page if not set
    if (!viewPageId && pages.length > 0 && !isCartPage) {
      setViewPageId(pages[0].id);
    }
  }, [pages, viewPageId, isCartPage]);

  const handlePageChange = (pageId: string) => {
    setViewPageId(pageId);
  };




  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white" dir="rtl">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500">جاري تحميل المتجر...</p>
        </div>
      </div>
    );
  }

  // If no pages, redirect to template selector
  if (pages.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100" dir="rtl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">
            لا توجد صفحات لعرضها
          </h1>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            اختيار قالب
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Top Bar - Edit Button */}
      <div className="bg-slate-800 text-white px-3 sm:px-4 py-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => navigate("/editor")}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-xs sm:text-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">العودة للمحرر</span>
            <span className="sm:hidden">رجوع</span>
          </button>
          <span className="text-xs sm:text-sm text-slate-300">عرض المتجر</span>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
          <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">معاينة المتجر</span>
          <span className="sm:hidden">معاينة</span>
        </div>
      </div>

      {/* Store View or Cart Page */}
      {isCartPage ? (
        <div className="min-h-screen">
          <CartPage />
        </div>
      ) : (
        <StoreView
          pages={pages}
          currentPageId={viewPageId}
          storeSettings={storeSettings}
          onPageChange={handlePageChange}
          hideFooter={false}
        />
      )}
    </div>
  );
};

export default StoreViewPage;

