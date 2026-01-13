import { useState, useEffect } from "react";
import React from "react";
import EditoNavHeader from "./header";
import ThemeSide from "./theme";
import ContentSide from "./content";
import ElementsSide from "./elements";
import { useStoreSettingsStore } from "../../../store/editor/store-settings";
import { useSectionStore } from "../../../store/editor/section";

const EditorSideNav = ({
  onNavigate,
}: {
  onNavigate?: (view: "editor" | "store" | "dashboard") => void;
}) => {
  const { storeSettings } = useStoreSettingsStore();
  const { activeSectionId, activeElementType } = useSectionStore();
  const isRestaurant = storeSettings.type === "restaurant";
  const [side, setSide] = useState(isRestaurant ? "theme" : "theme");

  // Auto-switch to content tab when a section is selected
  useEffect(() => {
    if (activeSectionId && activeElementType === "section" && !isRestaurant) {
      setSide("content");
    }
  }, [activeSectionId, activeElementType, isRestaurant]);

  return (
    <article className="p-4 editor pb-0 bg-white flex flex-col gap-2.5 w-64 h-screen sticky top-0 start-0 z-50">
      <EditoNavHeader
        side={side}
        setSide={setSide}
        onNavigate={onNavigate}
        isRestaurant={isRestaurant}
      />
      {isRestaurant ? (
        // Restaurant: Only show theme (colors)
        <ThemeSide />
      ) : // E-commerce: Show all options
      side === "content" ? (
        <ContentSide />
      ) : side === "elements" ? (
        <ElementsSide />
      ) : (
        <ThemeSide />
      )}
    </article>
  );
};

export default EditorSideNav;
