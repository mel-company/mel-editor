import { useEffect, useState, useRef } from "react";
import { ColorPicker } from "react-color-palette";
import "react-color-palette/css";

// Helper function to convert hex to RGB
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }
    : { r: 0, g: 0, b: 0 };
};

// Helper function to convert RGB to HSV
const rgbToHsv = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const v = max;

  const d = max - min;
  s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0;
  } else {
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return { h: h * 360, s: s * 100, v: v * 100 };
};

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
  const hexValue = value || "#000000";
  const rgb = hexToRgb(hexValue);
  const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pickerPos, setPickerPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const [color, setColor] = useState({
    hex: hexValue,
    rgb: { r: rgb.r, g: rgb.g, b: rgb.b, a: 1 },
    hsv: { h: hsv.h, s: hsv.s, v: hsv.v, a: 1 },
  });

  // Update color when value prop changes from outside
  useEffect(() => {
    if (value && color?.hex !== value) {
      try {
        const newRgb = hexToRgb(value);
        const newHsv = rgbToHsv(newRgb.r, newRgb.g, newRgb.b);
        setColor({
          hex: value,
          rgb: { r: newRgb.r, g: newRgb.g, b: newRgb.b, a: 1 },
          hsv: { h: newHsv.h, s: newHsv.s, v: newHsv.v, a: 1 },
        });
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
  const pickerRef = useRef<HTMLDivElement>(null);

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        containerRef.current &&
        pickerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setOpen("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setOpen]);

  const handleOpen = () => {
    if (isOpen) {
      setOpen("");
    } else {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setPickerPos({ top: rect.top + rect.height / 2, left: rect.left });
      }
      setOpen(label);
    }
  };

  return (
    <div ref={containerRef} className="flex flex-col gap-2 select-none p-2 rounded-lg w-full bg-slate-50 relative">
      <div className="flex items-center justify-between gap-1.5">
        <label className="text-xs text-slate-600 font-medium grow">
          {label}
        </label>

        <p className="text-sm font-mono uppercase font-medium text-slate-700">
          {value || "#000000"}
        </p>
        <button
          onClick={handleOpen}
          className="w-7 h-7 rounded-md border border-slate-200 cursor-pointer active:scale-90 transition-transform duration-200 ease-in-out"
          style={{ backgroundColor: value || "#000000" }}
        />
      </div>
      <div
        ref={pickerRef}
        className={`fixed z-50 rounded-lg shadow-xl -translate-y-1/2 -translate-x-[calc(100%+0.5rem)] transition-opacity duration-150 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        style={{ top: pickerPos.top, left: pickerPos.left }}
      >
        <ColorPicker
          color={color}
          onChange={setColor}
          hideInput={["rgb", "hsv"]}
          height={140}
        />
      </div>
    </div>
  );
};

export default ColorPickerBar;
