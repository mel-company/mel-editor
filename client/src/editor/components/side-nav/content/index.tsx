import EditorSectionDetails from "./section-details";
import PageList from "./page-list";
import EditorSectionList from "./section-list";

const ContentSide = () => {
  return (
    <div className="flex flex-col max-h-screen h-screen justify-between">
      <div className="flex flex-col gr ow gap-2 overflow-y-auto no-scrollbar pb-8 mt-8">
        <PageList />
        <EditorSectionDetails />
      </div>

      <EditorSectionList />
    </div>
  );
};

export default ContentSide;
