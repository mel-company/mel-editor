import useStoreDetails from "@/editor/hooks/editor-section-details";
import { Select } from "@/shared/components/ui/select";
import { SectionOptionType } from "@/shared/types";

const SectionVariants = () => {
  const { section, setSection } = useStoreDetails();
  const options = section?.options;

  if (!section || !options || options?.length <= 1) return null;

  return (
    <div className="editor-nav-section">
      <h4 className="sub-title">{"شكل القسم"}</h4>
      <Select
        value={section?.section_id}
        onChange={(e) => setSection({ ...section, section_id: e.target.value })}
      >
        {options?.map((option: SectionOptionType) => (
          <option key={option.id} value={option.id}>
            {option.title}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default SectionVariants;
