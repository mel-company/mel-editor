import RenderTemplate from "../../components/editor/render";
import EditorSideNav from "../../components/editor/side-nav";

const EditorPage = () => {
  return (
    <main
      dir="rtl"
      className="bg-slate-100 text-sm font-medium w-screen h-screen max-w-screen max-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <EditorSideNav />
      <RenderTemplate />
    </main>
  );
};

export default EditorPage;
