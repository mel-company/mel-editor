import { useState } from "react";
import ColorPickerBar from "../../../../ui/color-picker-bar";

const EditorThemeColors = () => {
  const [open, setOpen] = useState("");

  const [data, setData] = useState({
    primary: "#4272FF",
    secondary: "#ACBA12",
    text: "#1D293D",
  });
  return (
    <div className="edito-nav-section">
      <ColorPickerBar
        label="الرئيسي"
        value={data.primary}
        onChange={(value) => setData({ ...data, primary: value })}
        open={open}
        setOpen={setOpen}
      />
      <ColorPickerBar
        label="الثانوي"
        value={data.secondary}
        onChange={(value) => setData({ ...data, secondary: value })}
        open={open}
        setOpen={setOpen}
      />
      <ColorPickerBar
        label="النصوص"
        value={data.text}
        onChange={(value) => setData({ ...data, text: value })}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default EditorThemeColors;
