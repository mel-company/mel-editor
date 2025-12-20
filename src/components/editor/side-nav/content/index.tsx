import EditorSectionDetails from "./section-details";
import EditorSectionList from "./section-list";

const ContentSide = () => {
  return (
    <div className="flex flex-col gap-4 h-full">
      <EditorSectionDetails />
      <EditorSectionList />
    </div>
  );
};

export default ContentSide;
