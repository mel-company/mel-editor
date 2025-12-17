import { useEffect } from "react";
import { mockTemplate } from "../../../mock/template";
import { useSectionStore } from "../../../store/editor/section";
import { SectionType } from "../../../types";

const RenderTemplate = () => {
  const template = mockTemplate;
  const { sections, setSections, activeSectionId, setActiveSectionId } =
    useSectionStore();

  useEffect(() => {
    setSections(template.sections);
  }, [template.sections]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full h-full  max-h-[90vh] max-w-11/12 overflow-y-auto overflow-x-hidden bg-white rounded-2xl">
        {sections.map((section) => (
          <div
            key={section.id}
            onClick={() => setActiveSectionId(section.id)}
            className={`
              cursor-pointer transition-all duration-200
              ${
                section.id === activeSectionId
                  ? "outline-2 outline-blue-500"
                  : ""
              }
            `}
          >
            <Section section={section} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RenderTemplate;

const Section = ({ section }: { section: SectionType }) => {
  const selected_options = section.options?.find(
    (option) => option.id === section.section_id
  );
  const Component = selected_options?.component as any;

  if (!Component) return null;

  const { component: _Component, ...restOptions } = (selected_options ||
    {}) as any;

  let props = { ...restOptions };

  if (restOptions.content) {
    props = { ...props, ...restOptions.content };
  }

  if (restOptions.photos && !Array.isArray(restOptions.photos)) {
    props = { ...props, ...restOptions.photos };
  }

  return <Component {...props} />;
};
