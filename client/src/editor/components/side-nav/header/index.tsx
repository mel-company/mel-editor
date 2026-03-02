import classNames from "classnames";
import React from "react";
import { usePageStore } from "../../../../shared/store/editor/page";

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
  const { getCurrentPage } = usePageStore();
  const currentPage = getCurrentPage();
  const isHomePage = currentPage?.type === "home";

  const options = isRestaurant
    ? [
      {
        label: "الثيم",
        value: "theme",
      },
    ]
    : isHomePage
      ? [
        {
          label: "الثيم",
          value: "theme",
        },
        {
          label: "المحتوى",
          value: "content",
        }
      ]
      : [
        {
          label: "الثيم",
          value: "theme",
        },
        {
          label: "التخطيطات",
          value: "layout",
        }
      ];



  return (
    <div className="flex flex-col gap-2 z-10 bg-white">
      <div
        className={`grid p-1 w-full bg-slate-50 rounded-xl ${isRestaurant ? "grid-cols-1" : "grid-cols-2"
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

    </div>
  );
};

export default EditoNavHeader;
