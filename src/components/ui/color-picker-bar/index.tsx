import classNames from "classnames";
import { useEffect } from "react";
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
  const [color, setColor] = useColor(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(color?.hex);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [color?.hex]);

  return (
    <div className="flex gap-1 select-none p-1.5 rounded-lg w-full justify-baseline bg-slate-50 items-center relative">
      <label
        onClick={() => setOpen("")}
        className="text-xs text-slate-500 w-full m-1"
      >
        {label}
      </label>
      <div
        role="button"
        onClick={() => setOpen(open === label ? "" : label)}
        className="flex items-center gap-1 uppercase font-medium"
      >
        <p>{value}</p>
        <div
          className="w-6 h-5 rounded-md"
          style={{ backgroundColor: value }}
        />
      </div>
      <div
        className={classNames(
          "absolute top-0 start-4 z-50 transition-all -translate-y-1/2 -translate-x-full duration-150 ease-in-out",
          {
            "opacity-100 pointer-events-auto scale-80": open === label,
            "opacity-0 pointer-events-none scale-50": open !== label,
          }
        )}
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
