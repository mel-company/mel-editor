import useSectionDetails from "../../../../../../hooks/editor-section-details";
import { SectionPropsComponent } from "../../section-props";

const SectionContent = () => {
  const { handleTextChange, section } = useSectionDetails();

  const content = section?.options?.find(
    (s) => s.id === section?.section_id
  )?.content;

  return (
    <>
      {content?.map((item) => {
        return (
          <SectionPropsComponent
            key={item.id}
            onChange={handleTextChange}
            {...item}
          />
        );
      })}
    </>
  );
};

export default SectionContent;
