import { usePageStore } from "../store/editor/page";
import { useStoreSettingsStore } from "../store/editor/store-settings";
import { useSectionStore } from "../store/editor/section";

export const exportToJSON = () => {
  const pageStore = usePageStore.getState();
  const storeSettings = useStoreSettingsStore.getState();
  const sectionStore = useSectionStore.getState();

  const data = {
    storeSettings: storeSettings.storeSettings,
    pages: pageStore.pages.map((page) => ({
      id: page.id,
      name: page.name,
      type: page.type,
      sections: page.sections,
    })),
    currentPageId: pageStore.currentPageId,
    exportedAt: new Date().toISOString(),
    version: "1.0.0",
  };

  return JSON.stringify(data, null, 2);
};

export const downloadJSON = (filename: string = "editor-export.json") => {
  const jsonString = exportToJSON();
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const importFromJSON = (jsonString: string) => {
  try {
    const data = JSON.parse(jsonString);
    
    if (data.storeSettings) {
      useStoreSettingsStore.getState().setStoreSettings(data.storeSettings);
    }
    
    if (data.pages) {
      usePageStore.getState().setPages(data.pages);
      if (data.currentPageId) {
        usePageStore.getState().setCurrentPageId(data.currentPageId);
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error("Failed to import JSON:", error);
    return { success: false, error };
  }
};
