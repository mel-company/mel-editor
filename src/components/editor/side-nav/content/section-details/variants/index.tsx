import useStoreDetails from "../../../../../../hooks/editor-section-details";
import React from "react";
const SectionVariants = () => {
  const { section, setSection } = useStoreDetails();
  const options = section?.options;

  if (!section || !options || options?.length <= 1) return null;

  return (
    <div className="editor-nav-section">
      <h4 className="sub-title">{"شكل القسم"}</h4>
      <select
        value={section?.section_id}
        onChange={(e) => setSection({ ...section, section_id: e.target.value })}
        className="select border-none rounded-lg bg-slate-50 active:border-none active:outline-none focus:border-none focus:outline-none focus:ring-0"
      >
        {options?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SectionVariants;
