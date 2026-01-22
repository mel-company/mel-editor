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
        <h3 className="title">{"الصفحة الحالية"}</h3>

        <select className="select select-sm rounded-lg" onChange={(e) => setCurrentPageId(e.target.value)}>
          {pages.map((page) => (
            <option key={page.id} value={page.id}>{page.name || pageTypeLabels[page.type]}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PageList;
