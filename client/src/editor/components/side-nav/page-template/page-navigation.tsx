import React from "react";
import { usePageStore } from "../../../../shared/store/editor/page";
import { PageType } from "../../../../shared/types";
import { FileText, Home, Info, Menu, ChevronRight } from "lucide-react";

const pageIcons: Record<PageType["type"], React.ComponentType<any>> = {
  home: Home,
  about: Info,
  content: FileText,
  menu: Menu,
};

export const PageNavigation: React.FC = () => {
  const { pages, currentPageId, setCurrentPageId } = usePageStore();

  if (pages.length === 0) {
    return (
      <div className="p-4 text-sm text-gray-500">
        جاري تحميل الصفحات...
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="px-4 pt-4 pb-2">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          الصفحات
        </h3>
      </div>
      
      <div className="space-y-1 px-2">
        {pages.map((page) => {
          const Icon = pageIcons[page.type] || FileText;
          const isActive = page.id === currentPageId;
          
          return (
            <button
              key={page.id}
              onClick={() => setCurrentPageId(page.id)}
              className={`
                w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg
                transition-all duration-200 text-sm font-medium
                ${
                  isActive
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-700 hover:bg-gray-50 border border-transparent"
                }
              `}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                <span className="truncate">{page.name}</span>
              </div>
              
              {isActive && (
                <ChevronRight className="w-4 h-4 text-blue-600 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
