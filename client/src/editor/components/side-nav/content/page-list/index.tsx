import { usePageStore } from "@/shared/store/editor/page";
import { PageType } from "@/shared/types";

const PageList = () => {
  const { pages, currentPageId, setCurrentPageId } = usePageStore();

  const pageTypeLabels: Record<PageType["type"], string> = {
    home: "الصفحة الرئيسية",
    about: "حول المتجر",
    content: "صفحة محتوى",
    menu: "القائمة",
  };

  // Debug: log pages count
  console.log("[PageList] Pages count:", pages.length, "Current page:", currentPageId);

  if (pages.length === 0) {
    return (
      <div className="h-full flex flex-col gap-4 mb-4">
        <div className="editor-nav-section">
          <h3 className="title">{"الصفحة الحالية"}</h3>
          <p className="text-sm text-gray-500">جاري تحميل الصفحات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-4 mb-4">
      <div className="editor-nav-section">
        <h3 className="title">{"الصفحة الحالية"}</h3>

        <select
          className="select select-sm select-bordered rounded-lg w-full px-3 py-2"
          value={currentPageId}
          onChange={(e) => setCurrentPageId(e.target.value)}
        >
          {pages.map((page) => (
            <option key={page.id} value={page.id}>{page.name || pageTypeLabels[page.type]}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PageList;
