import TextInput from "../../../../ui/input";
import FileUploadBar from "../../../../ui/file-upload/bar";
import useSectionDetails from "../../../../../hooks/editor-section-details";

export const SectionPropsComponent = (props: any) => {
  const { handleTextChange } = useSectionDetails();

  switch (props.type) {
    case "text":
      return (
        <TextInput
          {...props}
          onChange={(e: any) => handleTextChange(e.target.value, props.name)}
        />
      );
    case "textarea":
      return (
        <TextInput
          {...props}
          lg
          onChange={(e: any) => handleTextChange(e.target.value, props.name)}
        />
      );
    case "file":
      return <FileUploadBar {...props} />;
    default:
      return (
        <TextInput
          {...props}
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
