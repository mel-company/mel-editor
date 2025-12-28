import useSectionDetails from "../../../../../../hooks/editor-section-details";
import { SectionPropsComponent } from "../../section-props";
import React from "react";
const SectionContent = () => {
  const { section } = useSectionDetails();

  const content = section?.options?.find(
    (option) => option.id === section?.section_id
  )?.content;

  if (!content || (Array.isArray(content) && content.length === 0)) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      {Array.isArray(content) &&
        content.map((item: { name: string; value: string; id: string }) => {
          return <SectionPropsComponent key={item.id} {...item} />;
        })}
    </div>
  );
};

export default SectionContent;
