import EditorSectionDetails from "./section-details";
import PageList from "./page-list";
import React from "react";
const ContentSide = () => {
  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto">
      <PageList />
      <EditorSectionDetails />
    </div>
  );
};

export default ContentSide;
