import classNames from "classnames";
import { useEffect, useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

const ColorPickerBar = ({
  label = "عنوان",
  value,
  onChange,
  open,
  setOpen,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  open: string;
  setOpen: (value: string) => void;
}) => {
  const [color, setColor] = useColor(value || "#000000");

  // Update color when value prop changes from outside
  useEffect(() => {
    if (value && color?.hex !== value) {
      try {
        setColor({ hex: value, rgb: undefined, hsv: undefined });
      } catch (e) {
        // Ignore errors
      }
    }
  }, [value]);

  // Notify parent when color changes
  useEffect(() => {
    if (!color?.hex) return;
    
    const handler = setTimeout(() => {
      if (color.hex && color.hex !== value) {
        onChange(color.hex);
      }
    }, 100);

    return () => {
      clearTimeout(handler);
    };
  }, [color?.hex]);

  const isOpen = open === label;

  return (
    <div className="flex flex-col gap-2 select-none p-2 rounded-lg w-full bg-slate-50 relative">
      <div className="flex items-center justify-between">
        <label className="text-xs text-slate-600 font-medium">
          {label}
        </label>
        <div
          role="button"
          onClick={() => setOpen(isOpen ? "" : label)}
          className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 px-2 py-1 rounded transition-colors"
        >
          <div
            className="w-8 h-8 rounded border-2 border-slate-300"
            style={{ backgroundColor: value || "#000000" }}
          />
          <p className="text-xs font-mono uppercase font-medium text-slate-700">
            {value || "#000000"}
          </p>
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 bg-white rounded-lg shadow-xl border border-slate-200 p-2">
          <ColorPicker
            color={color}
            onChange={setColor}
            hideInput={["rgb", "hsv"]}
            height={140}
          />
        </div>
      )}
    </div>
  );
};

export default ColorPickerBar;
