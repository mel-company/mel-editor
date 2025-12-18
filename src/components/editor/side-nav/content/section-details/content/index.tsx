import useSectionDetails from "../../../../../../hooks/editor-section-details";
import { SectionPropsComponent } from "../../section-props";

const SectionContent = () => {
  const { section } = useSectionDetails();

  const content = section?.options?.find(
    (s) => s.id === section?.section_id
  )?.content;

  return (
    <>
      {content?.map((item: { name: string; value: string; id: string }) => {
        return <SectionPropsComponent key={item.id} {...item} />;
      })}
    </>
  );
};

export default SectionContent;
