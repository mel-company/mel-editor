import { useEffect } from "react";
import { mockTemplate } from "../../../mock/template";
import { useSectionStore } from "../../../store/editor/section";

const RenderTemplate = () => {
  const template = mockTemplate;
  const { setSections } = useSectionStore();

  useEffect(() => {
    setSections(template.sections);
  }, [template.sections]);

  return <div>RenderTemplate</div>;
};

export default RenderTemplate;
