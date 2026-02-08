import { useState, useEffect } from "react";
import EditoNavHeader from "./header";
import ThemeSide from "./theme";
import ContentSide from "./content";
import ElementsSide from "./elements";
import EditorSectionList from "./content/section-list";
import { TemplatePanel } from "./page-template";
import { useStoreSettingsStore } from "../../../shared/store/editor/store-settings";
import { useSectionStore } from "../../../shared/store/editor/section";
import { usePageStore } from "../../../shared/store/editor/page";

const EditorSideNav = ({
  onNavigate,
}: {
  onNavigate?: (view: "editor" | "store" | "dashboard") => void;
}) => {
  const { storeSettings } = useStoreSettingsStore();
  const { activeSectionId, activeElementType } = useSectionStore();
  const { getCurrentPage } = usePageStore();
  const isRestaurant = storeSettings.type === "restaurant";
  const currentPage = getCurrentPage();
  const isHomePage = currentPage?.type === "home";
  const [side, setSide] = useState(isRestaurant ? "theme" : "theme");

  // Auto-switch to content tab when a section, navigation, or footer is selected (home page only)
  useEffect(() => {
    if (!isRestaurant && isHomePage && (
      (activeSectionId && activeElementType === "section") ||
      activeElementType === "navigation" ||
      activeElementType === "footer"
    )) {
      setSide("content");
    }
  }, [activeSectionId, activeElementType, isRestaurant, isHomePage]);

  // Auto-switch to layout tab for non-home pages
  useEffect(() => {
    if (!isRestaurant && !isHomePage && currentPage) {
      setSide("layout");
    }
  }, [isRestaurant, isHomePage, currentPage]);

  return (
    <article className="p-4 editor pb-2.5 bg-white flex flex-col gap-2.5 w-64 min-w-64 h-full overflow-hidden no-scrollbar shrink-0 z-50">
      <EditoNavHeader
        side={side}
        setSide={setSide}
        onNavigate={onNavigate}
        isRestaurant={isRestaurant}
      />
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
        {isRestaurant ? (
          // Restaurant: Only show theme (colors)
          <ThemeSide />
        ) : // E-commerce: Show all options
          side === "layout" ? (
            <TemplatePanel />
          ) : side === "content" ? (
            <ContentSide />
          ) : side === "elements" ? (
            <ElementsSide />
          ) : (
            <ThemeSide />
          )}
      </div>
      {!isRestaurant && side === "content" && isHomePage && <EditorSectionList />}
    </article>
  );
};

export default EditorSideNav;
