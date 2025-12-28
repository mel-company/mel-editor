import React, { useState } from "react";
import ColorPickerBar from "../../../../../ui/color-picker-bar";
import useSectionDetails from "../../../../../../hooks/editor-section-details";
import { useSectionStore } from "../../../../../../store/editor/section";

const SectionStyles = () => {
  const { section } = useSectionDetails();
  const { setSection } = useSectionStore();
  const [open, setOpen] = useState("");

  if (!section) return null;

  const styles = section.styles || {
    backgroundColor: "#FFFFFF",
    textColor: "#1D293D",
    padding: "0",
    margin: "0",
  };

  const updateStyles = (newStyles: Partial<typeof styles>) => {
    const updatedSection = {
      ...section,
      styles: {
        ...styles,
        ...newStyles,
      },
    };
    setSection(updatedSection);
  };

  return (
    <div className="editor-nav-section">
      <h3 className="title">{"أنماط القسم"}</h3>
      
      <div className="flex flex-col gap-3">
        <div>
          <h4 className="sub-title mb-2">{"لون الخلفية"}</h4>
          <ColorPickerBar
            label="الخلفية"
            value={styles.backgroundColor || "#FFFFFF"}
            onChange={(value) => updateStyles({ backgroundColor: value })}
            open={open}
            setOpen={setOpen}
          />
        </div>

        <div>
          <h4 className="sub-title mb-2">{"لون النص"}</h4>
          <ColorPickerBar
            label="النص"
            value={styles.textColor || "#1D293D"}
            onChange={(value) => updateStyles({ textColor: value })}
            open={open}
            setOpen={setOpen}
          />
        </div>

        <div>
          <h4 className="sub-title mb-2">{"المسافات الداخلية (Padding)"}</h4>
          <input
            type="text"
            value={styles.padding || "0"}
            onChange={(e) => updateStyles({ padding: e.target.value })}
            placeholder="مثال: 20px أو 1rem"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <h4 className="sub-title mb-2">{"المسافات الخارجية (Margin)"}</h4>
          <input
            type="text"
            value={styles.margin || "0"}
            onChange={(e) => updateStyles({ margin: e.target.value })}
            placeholder="مثال: 20px أو 1rem"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default SectionStyles;

