import EditorSectionDetails from "./section-details";
import Divider from "../../../ui/divider";

const ContentSide = () => {
  return (
    <div className="flex flex-col gap-4 h-full">
      <EditorSectionDetails />
      <Divider />
    </div>
  );
};

export default ContentSide;
