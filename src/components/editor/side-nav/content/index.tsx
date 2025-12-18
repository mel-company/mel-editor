import EditorSectionDetails from "./section-details";
import Divider from "../../../ui/divider";
import EditorSectionList from "./section-list";

const ContentSide = () => {
  return (
    <div className="flex flex-col gap-4 h-full">
      <EditorSectionDetails />
      <Divider />
      <EditorSectionList />
    </div>
  );
};

export default ContentSide;
