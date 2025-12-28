import { usePageStore } from "../../../../../store/editor/page";
import { useStoreSettingsStore } from "../../../../../store/editor/store-settings";
import { PageType } from "../../../../../types";
import classNames from "classnames";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import React from "react";
import Divider from "../../../../ui/divider";

const MAX_PAGES = 4;
const PageList = () => {
  const { pages, currentPageId, setCurrentPageId, addPage, deletePage } =
    usePageStore();
  const { storeSettings, updateStoreSettings } = useStoreSettingsStore();
  const [open, setOpen] = useState(false);

  const pageTypeLabels: Record<PageType["type"], string> = {
    home: "الصفحة الرئيسية",
    about: "حول المتجر",
    content: "صفحة محتوى",
    menu: "القائمة",
  };

  const handleAddPage = (type: PageType["type"]) => {
    if (pages.length >= MAX_PAGES) {
      alert(`الحد الأقصى ${MAX_PAGES} صفحات فقط`);
      setOpen(false);
      return;
    }
    const newPage: PageType = {
      id: crypto.randomUUID(),
      name: pageTypeLabels[type],
      type,
      sections: [],
    };
    addPage(newPage);

    // Auto-add navigation link for the new page
    const currentLinks = storeSettings.header?.navigationLinks || [];
    const newLink = {
      id: crypto.randomUUID(),
      label: newPage.name,
      url: `/${newPage.id}`,
      pageId: newPage.id,
    };
    updateStoreSettings({
      header: {
        ...storeSettings.header,
        navigationLinks: [...currentLinks, newLink],
      },
    });

    setOpen(false);
  };

  const availablePageTypes: PageType["type"][] = ["content"];

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
        <button
          onClick={() => {
            if (pages.length >= MAX_PAGES) {
              alert(`الحد الأقصى ${MAX_PAGES} صفحات فقط`);
              return;
            }
            setOpen(!open);
          }}
          disabled={pages.length >= MAX_PAGES}
          className="w-full border-2 border-dashed border-slate-200 mt-1 text-slate-500 transition-colors cursor-pointer py-2.5 rounded-lg bg-slate-50/50 hover:bg-slate-50 active:bg-slate-50/50 text-center text-xs disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pages.length >= MAX_PAGES
            ? `الحد الأقصى ${MAX_PAGES} صفحات`
            : "اضافة صفحة"}
        </button>

        <div
          className={classNames(
            "relative ease-in-out duration-150 transition-all z-50 flex flex-col gap-1.5 mt-2",
            {
              "opacity-0 scale-90 pointer-events-none h-0": !open,
              "opacity-100 scale-100": open,
            }
          )}
        >
          {availablePageTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleAddPage(type)}
              className="p-2 gap-2 flex items-center justify-between rounded-lg bg-slate-50 text-xs hover:bg-slate-100 transition-colors"
            >
              <span>{pageTypeLabels[type]}</span>
              <Plus size={16} className="text-blue-600" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageList;

const PageItem = ({ page }: { page: PageType }) => {
  const { currentPageId, setCurrentPageId, deletePage } = usePageStore();
  const { storeSettings, updateStoreSettings } = useStoreSettingsStore();

  const pageTypeLabels: Record<PageType["type"], string> = {
    home: "الصفحة الرئيسية",
    about: "حول المتجر",
    content: "صفحة محتوى",
    menu: "القائمة",
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Allow deletion of any page except home page
    if (page.type !== "home") {
      deletePage(page.id);
      // Navigation link removal is handled in deletePage store action
    }
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
      {page.type !== "home" && (
        <button
          onClick={handleDelete}
          className="p-1.5 bg-white transition-all text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md"
        >
          <Trash2 size={14} />
        </button>
      )}
    </div>
  );
};
