import TextInput from "../../../../ui/input";
import FileUploadBar from "../../../../ui/file-upload/bar";
import useSectionDetails from "../../../../../hooks/editor-section-details";

export const SectionPropsComponent = (props: any) => {
  const { handleTextChange } = useSectionDetails();

  // Ensure value is always a string
  const value = props.value || "";
  const placeholder = props.placeholder || props.label || "";
  const label = props.label || "";

  switch (props.type) {
    case "text":
      return (
        <TextInput
          label={label}
          placeholder={placeholder}
          value={value}
          onChange={(e: any) => handleTextChange(e.target.value, props.name)}
        />
      );
    case "textarea":
      return (
        <TextInput
          label={label}
          placeholder={placeholder}
          value={value}
          lg
          onChange={(e: any) => handleTextChange(e.target.value, props.name)}
        />
      );
    case "file":
      return <FileUploadBar {...props} />;
    default:
      return (
        <TextInput
          label={label}
          placeholder={placeholder}
          value={value}
          onChange={(e: any) => handleTextChange(e.target.value, props.name)}
        />
      );
  }
};

export const sectionProps = [
  {
    type: "text",
    component: TextInput,
  },
  {
    type: "file",
    component: FileUploadBar,
  },
];
