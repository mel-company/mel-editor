import classNames from "classnames";
import React from "react";



const EditoNavHeader = ({
  side,
  setSide,
  isRestaurant = false,
}: {
  side: string;
  setSide: React.Dispatch<React.SetStateAction<string>>;
  onNavigate?: (view: "editor" | "store" | "dashboard") => void;
  isRestaurant?: boolean;
}) => {
  const options = isRestaurant
    ? [
      {
        label: "الثيم",
        value: "theme",
      },
    ]
    : [
      {
        label: "الثيم",
        value: "theme",
      },
      {
        label: "المحتوى",
        value: "content",
      },
      {
        label: "العناصر",
        value: "elements",
      },
    ];



  return (
    <div className="flex flex-col gap-2 sticky top-0 z-10 bg-white">
      <div
        className={`grid p-1 w-full bg-slate-50 rounded-xl ${isRestaurant ? "grid-cols-1" : "grid-cols-3"
          }`}
      >
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => setSide(option.value)}
            className={classNames(
              "w-full text-xs transition-all py-2 rounded-lg text-center font-medium",
              {
                "bg-white text-blue-500": option.value === side,
                "bg-slate-50 text-slate-500": option.value !== side,
              }
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
      {/* <div className="grid grid-cols-2 gap-1">
        <button
          onClick={() => onNavigate?.("dashboard")}
          className="cursor-pointer flex line-clamp-1 text-nowrap items-center justify-center gap-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors font-medium"
        >
          <Home className="w-4 h-4 min-w-4 min-h-4" />
          <span className="text-sm">الرئيسية</span>
        </button>
        <button
          onClick={() => onNavigate?.("store")}
          className="cursor-pointer line-clamp-1 text-nowrap flex items-center justify-center gap-1 px-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors font-medium"
        >
          <Eye className="w-4 h-4" />
          <span className="text-sm">معاينة</span>
        </button>
      </div> */}


      {/* <ExportButton /> */}
    </div>
  );
};

export default EditoNavHeader;
