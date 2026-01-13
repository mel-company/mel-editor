import React, { useState } from "react";
import ColorPickerBar from "../../../../../ui/color-picker-bar";
import { useStoreSettingsStore } from "../../../../../../store/editor/store-settings";

const NavigationStyles = () => {
  const { storeSettings, updateStoreSettings } = useStoreSettingsStore();
  const [open, setOpen] = useState("");

  const headerStyles = storeSettings.header?.styles || {
    backgroundColor: "#FFFFFF",
    textColor: "#1D293D",
  };

  const updateHeaderStyles = (newStyles: Partial<typeof headerStyles>) => {
    updateStoreSettings({
      header: {
        ...storeSettings.header,
        styles: {
          ...headerStyles,
          ...newStyles,
        },
      },
    });
  };

  return (
    <div className="editor-nav-section">
      <h3 className="title">{"أنماط شريط التنقل"}</h3>
      
      <div className="flex flex-col gap-3">
        <div>
          <h4 className="sub-title mb-2">{"لون الخلفية"}</h4>
          <ColorPickerBar
            label="الخلفية"
            value={headerStyles.backgroundColor || "#FFFFFF"}
            onChange={(value) => updateHeaderStyles({ backgroundColor: value })}
            open={open}
            setOpen={setOpen}
          />
        </div>

        <div>
          <h4 className="sub-title mb-2">{"لون النص"}</h4>
          <ColorPickerBar
            label="النص"
            value={headerStyles.textColor || "#1D293D"}
            onChange={(value) => updateHeaderStyles({ textColor: value })}
            open={open}
            setOpen={setOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default NavigationStyles;

