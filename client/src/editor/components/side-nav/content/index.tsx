import EditorSectionDetails from "./section-details";
import PageList from "./page-list";
import EditorSectionList from "./section-list";

const ContentSide = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-2 overflow-y-auto no-scrollbar pb-8 mt-8">
        <PageList />
        <EditorSectionDetails />
      </div>

      <EditorSectionList />
    </div>
  );
};

export default ContentSide;
