import EditorSectionDetails from "./section-details";
import PageList from "./page-list";

const ContentSide = () => {
  return (
    <div className="flex flex-col gap-2">
      <PageList />
      <EditorSectionDetails />
    </div>
  );
};

export default ContentSide;
