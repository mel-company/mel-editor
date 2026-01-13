import { usePageStore } from "../../../../../store/editor/page";
import { PageType } from "../../../../../types";
import classNames from "classnames";
import React from "react";
import Divider from "../../../../ui/divider";

const PageList = () => {
  const { pages, currentPageId, setCurrentPageId } = usePageStore();

  const pageTypeLabels: Record<PageType["type"], string> = {
    home: "الصفحة الرئيسية",
    about: "حول المتجر",
    content: "صفحة محتوى",
    menu: "القائمة",
  };

  return (
    <div className="h-full flex flex-col gap-4 mb-4">
      <div className="editor-nav-section">
        <Divider />
        <h3 className="title">{"الصفحات"}</h3>
        <div className="w-full gap-2 flex flex-col">
          {pages.map((page) => (
            <PageItem key={page.id} page={page} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageList;

const PageItem = ({ page }: { page: PageType }) => {
  const { currentPageId, setCurrentPageId } = usePageStore();

  const pageTypeLabels: Record<PageType["type"], string> = {
    home: "الصفحة الرئيسية",
    about: "حول المتجر",
    content: "صفحة محتوى",
    menu: "القائمة",
  };

  return (
    <div
      onClick={() => setCurrentPageId(page.id)}
      className={classNames(
        "w-full border-e-8 transition-all group p-1.5 rounded-lg bg-slate-50 flex items-center gap-1 relative cursor-pointer select-none",
        {
          "border-slate-200": currentPageId !== page.id,
          "border-blue-500": currentPageId === page.id,
        }
      )}
    >
      <span className="text-xs select-none flex-1">
        {page.name || pageTypeLabels[page.type]}
      </span>
    </div>
  );
};
