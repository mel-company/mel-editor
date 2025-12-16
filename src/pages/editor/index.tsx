import EditorSideNav from "../../components/editor/side-nav";

const EditorPage = () => {
  return (
    <main
      dir="rtl"
      className="bg-slate-100 text-sm font-medium w-screen h-screen max-w-screen max-h-screen relative overflow-hidden"
    >
      <EditorSideNav />
    </main>
  );
};

export default EditorPage;
