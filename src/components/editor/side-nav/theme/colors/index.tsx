import { useState } from "react";
import React from "react";
import ColorPickerBar from "../../../../ui/color-picker-bar";
import { useStoreSettingsStore } from "../../../../../store/editor/store-settings";

const EditorThemeColors = () => {
  const [open, setOpen] = useState("");
  const { storeSettings, setColors } = useStoreSettingsStore();
  const colors = storeSettings.colors || {
    primary: "#4272FF",
    secondary: "#ACBA12",
    text: "#1D293D",
  };

  return (
    <div className="editor-nav-section">
      <h3 className="title">{"الألوان"}</h3>
      <ColorPickerBar
        label="الرئيسي"
        value={colors.primary}
        onChange={(value) => setColors({ ...colors, primary: value })}
        open={open}
        setOpen={setOpen}
      />
      <ColorPickerBar
        label="الثانوي"
        value={colors.secondary}
        onChange={(value) => setColors({ ...colors, secondary: value })}
        open={open}
        setOpen={setOpen}
      />
      <ColorPickerBar
        label="النصوص"
        value={colors.text}
        onChange={(value) => setColors({ ...colors, text: value })}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default EditorThemeColors;
