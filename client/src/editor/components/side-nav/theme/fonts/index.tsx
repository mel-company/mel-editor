import SelectList from "../../../../../shared/components/ui/select-list";
import { fontList } from "../../../../../shared/utils/fonts";
import React from "react";
import { useStoreSettingsStore } from "../../../../../shared/store/editor/store-settings";

const EditorThemeFonts = () => {
  const { storeSettings, setFonts } = useStoreSettingsStore();
  const fonts = storeSettings.fonts || {
    heading: fontList[0],
    body: fontList[0],
  };

  return (
    <div className="editor-nav-section">
      <h3 className="title">{"الخطوط"}</h3>
      <h4 className="sub-title">{"العنوان"}</h4>
      <SelectList
        options={fontList}
        selected={fonts.heading}
        setSelected={(value: string) => setFonts({ ...fonts, heading: value })}
      />
      <h4 className="sub-title">{"النصوص"}</h4>
      <SelectList
        options={fontList}
        selected={fonts.body}
        setSelected={(value: string) => setFonts({ ...fonts, body: value })}
      />
    </div>
  );
};

export default EditorThemeFonts;
