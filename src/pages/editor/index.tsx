import { useNavigate } from "react-router-dom";
import TemplateJsonWrapper from "../../components/editor/render/json-wrapper";
import EditorSideNav from "../../components/editor/side-nav";

const EditorPage = () => {
  const navigate = useNavigate();

  const handleNavigate = (view: "editor" | "store" | "dashboard") => {
    if (view === "store") {
      navigate("/store-view");
    } else if (view === "dashboard") {
      navigate("/dashboard");
    }
  };

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
