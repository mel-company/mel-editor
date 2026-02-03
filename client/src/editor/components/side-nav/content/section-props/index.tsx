import TextInput from "../../../../../shared/components/ui/input";
import FileUploadBar from "../../../../../shared/components/ui/file-upload/bar";
import useSectionDetails from "../../../../hooks/editor-section-details";

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
    case "image":
    case "file":
      // Convert string URL to FileType object for FileUploadBar
      const fileValue: any = typeof value === "string" && value
        ? { url: value, base64Content: value.startsWith("data:") ? value : undefined }
        : undefined;

      return (
        <FileUploadBar
          label={label}
          value={fileValue}
          onChange={(file: any) => {
            // Convert FileType back to string URL for storage
            const url = file.base64Content || file.url || "";
            handleTextChange(url, props.name);
          }}
        />
      );
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
