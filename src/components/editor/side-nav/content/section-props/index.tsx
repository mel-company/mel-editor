import TextInput from "../../../../ui/input";
import FileUploadBar from "../../../../ui/file-upload/bar";

export const SectionPropsComponent = (props: any) => {
  switch (props.type) {
    case "text":
      return <TextInput {...props} />;
    case "textarea":
      return <TextInput {...props} lg />;
    case "file":
      return <FileUploadBar {...props} />;
    default:
      return <TextInput {...props} />;
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
