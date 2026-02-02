import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TemplateJsonWrapper from "../../components/render/json-wrapper";
import EditorSideNav from "../../components/side-nav";
import { Loader2, Save, UploadCloud } from "lucide-react";
import { usePageStore } from "../../../shared/store/editor/page";
import { publishStore, generateStyles } from "@/shared/api/production";
import RenderTemplate from "@/editor/components/render";
import EditorTopNav from "@/editor/components/top-nav";


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

const SaveBtn = () => {

  const [saveStatus, setSaveStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSave = async () => {
    setSaveStatus("loading");
    try {
      await generateStyles();
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (e) {
      console.error(e);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };


  return (
    <div className="grid grid-cols-2 gap-1">
      <button
        onClick={handleSave}
        className={`cursor-pointer line-clamp-1 text-nowrap flex items-center justify-center gap-1 px-1 py-2 rounded-lg transition-all duration-200 font-medium text-white
                    ${saveStatus === "success" ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"}
                    ${saveStatus === "loading" ? "bg-blue-400 cursor-wait" : ""}
                    ${saveStatus === "error" ? "bg-red-600" : ""}`}
      >
        <Save className="w-4 h-4" />
        <span className="text-sm">
          {saveStatus === "success" ? "تم الحفظ" :
            saveStatus === "loading" ? "جاري الحفظ..." :
              saveStatus === "error" ? "فشل" : "حفظ"}
        </span>
      </button>

    </div>
  )
}


const EditorPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const currentPageId = usePageStore((state) => state.currentPageId);

  useEffect(() => {
    if (currentPageId) {
      const url = new URL(window.location.href);
      url.searchParams.set("pageId", currentPageId);
      window.history.replaceState({}, "", url);
    }
  }, [currentPageId]);

  useEffect(() => {
    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (view: "editor" | "store" | "dashboard") => {
    if (view === "store") {
      navigate("/store-view");
    } else if (view === "dashboard") {
      navigate("/dashboard");
    }
  };


  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          <p className="text-slate-600 font-medium">جاري تحميل المحرر...</p>
        </div>
      </div>
    );
  }

  return (
    <main
      dir="rtl"
      className="bg-slate-100 text-sm font-medium w-screen h-screen max-w-screen max-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <EditorSideNav onNavigate={handleNavigate} />
      <EditorTopNav />
      <RenderTemplate />

    </main>
  );
};

export default EditorPage;
