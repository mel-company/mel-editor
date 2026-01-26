import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TemplateJsonWrapper from "../../components/render/json-wrapper";
import EditorSideNav from "../../components/side-nav";
import { Loader2 } from "lucide-react";
import { usePageStore } from "../../../shared/store/editor/page";

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
      <TemplateJsonWrapper />
    </main>
  );
};

export default EditorPage;
