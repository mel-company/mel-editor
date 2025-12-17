import useSectionDetails from "../../../../../../hooks/editor-section-details";
import { SectionPropsComponent } from "../../section-props";

const SectionContent = () => {
  const { handleTextChange, section } = useSectionDetails();

  return (
    <>
      {section?.content?.map((item) => {
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
