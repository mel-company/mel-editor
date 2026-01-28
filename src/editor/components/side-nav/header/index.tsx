import classNames from "classnames";
import React from "react";
import { Eye, Home, Save, UploadCloud } from "lucide-react";
import ExportButton from "./export-btn";
import { publishStore } from "../../../../shared/api/production";
import { useState } from "react";

const PublishButton = () => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handlePublish = async () => {
    if (!showConfirm) {
      setShowConfirm(true);
      // Auto-hide confirmation after 3 seconds if not clicked again
      setTimeout(() => setShowConfirm(false), 3000);
      return;
    }

    setIsPublishing(true);
    setShowConfirm(false);
    setStatus("idle");

    try {
      await publishStore();
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Publish error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    } finally {
      setIsPublishing(false);
    }
  };

  let buttonText = "نشر";
  let buttonColor = "bg-indigo-600 hover:bg-indigo-700";

  if (isPublishing) {
    buttonText = "جاري النشر...";
    buttonColor = "bg-indigo-400 cursor-wait";
  } else if (showConfirm) {
    buttonText = "متأكد؟";
    buttonColor = "bg-orange-500 hover:bg-orange-600";
  } else if (status === "success") {
    buttonText = "تم بنجاح!";
    buttonColor = "bg-green-600";
  } else if (status === "error") {
    buttonText = "فشل النشر";
    buttonColor = "bg-red-600";
  }

  return (
    <button
      onClick={handlePublish}
      disabled={isPublishing}
      className={`cursor-pointer line-clamp-1 text-nowrap flex items-center justify-center gap-1 px-1 py-2 rounded-lg transition-all duration-200 font-medium text-white ${buttonColor}`}
    >
      {!isPublishing && status === "idle" && !showConfirm && <UploadCloud className="w-4 h-4" />}
      <span className="text-sm">{buttonText}</span>
    </button>
  );
};

const EditoNavHeader = ({
  side,
  setSide,
  onNavigate,
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

  const [saveStatus, setSaveStatus] = useState<"idle" | "success">("idle");

  const handleSave = () => {
    setSaveStatus("success");
    // Auto-save is active in background, this is just visual feedback
    setTimeout(() => setSaveStatus("idle"), 2000);
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`grid p-1 w-full bg-slate-50 rounded-xl relative ${isRestaurant ? "grid-cols-1" : "grid-cols-3"
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
      <div className="grid grid-cols-2 gap-1">
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
      </div>

      <div className="grid grid-cols-2 gap-1">
        <button
          onClick={handleSave}
          className={`cursor-pointer line-clamp-1 text-nowrap flex items-center justify-center gap-1 px-1 py-2 rounded-lg transition-all duration-200 font-medium text-white
                    ${saveStatus === "success" ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          <Save className="w-4 h-4" />
          <span className="text-sm">{saveStatus === "success" ? "تم الحفظ" : "حفظ"}</span>
        </button>

        <PublishButton />
      </div>
      {/* <ExportButton /> */}
    </div>
  );
};

export default EditoNavHeader;
