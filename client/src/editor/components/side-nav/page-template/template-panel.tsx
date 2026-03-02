import React from "react";
import { usePageStore } from "../../../../shared/store/editor/page";
import { TemplateSelector } from "./template-selector";
import { PageNavigation } from "./page-navigation";

export const TemplatePanel: React.FC = () => {
  const { getCurrentPage } = usePageStore();

  const currentPage = getCurrentPage();

  if (!currentPage) {
    return (
      <div className="space-y-4">
        <PageNavigation />
        <div className="p-4 text-sm text-gray-500">
          No page selected
        </div>
      </div>
    );
  }

  if (currentPage.type === "home") {
    return (
      <div className="space-y-4">
        <PageNavigation />
        <div className="p-4 text-sm text-gray-500 bg-amber-50 border border-amber-200 rounded-lg mx-4">
          <p className="font-medium text-amber-900 mb-1">الصفحة الرئيسية</p>
          <p className="text-xs text-amber-700">
            الصفحة الرئيسية تستخدم المحرر العميق. انتقل إلى صفحة أخرى لاستخدام محدد القوالب.
          </p>
        </div>
      </div>
    );
  }

  // Show template selector for pages with variants (product-detail, checkout, etc.)
  const hasTemplateVariants = currentPage.templateVariants && currentPage.templateVariants.length > 0;

  return (
    <div className="space-y-4">
      <PageNavigation />

      <div className="border-t border-gray-200"></div>

      {hasTemplateVariants ? (
        <>
          <div className="px-4 pb-2">
            <h2 className="text-sm font-bold text-gray-900">تصميمات الصفحة</h2>
            <p className="text-xs text-gray-600 mt-1">
              اختر تصميم مناسب لهذه الصفحة
            </p>
          </div>
          <TemplateSelector page={currentPage} />
        </>
      ) : (
        <div className="p-4 text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-lg mx-4">
          <p className="font-medium text-gray-900 mb-1">{currentPage.name}</p>
          <p className="text-xs text-gray-600">
            لا توجد تصميمات متاحة لهذه الصفحة
          </p>
        </div>
      )}
    </div>
  );
};
