import EditorSectionDetails from "./section-details";
import PageList from "./page-list";
import EditorSectionList from "./section-list";

const ContentSide = () => {
  return (
    <div className="flex flex-col gap-4 h-svh justify-between">
      <div className="flex flex-col gap-2 overflow-y-auto">
        <PageList />
        <EditorSectionDetails />
      </div>
      
      <EditorSectionList />
    </div>
  );
};

export default ContentSide;
