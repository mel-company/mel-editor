import { useState } from "react";
import { SectionPropsComponent } from "../section-props";

const section = {
  id: "1",
  title: "",
  description: "",
  image: "",
  props: [
    { type: "text", label: "عنوان القسم", name: "title", value: "" },
    { type: "text", label: "وصف القسم", name: "description", value: "" },
    { type: "file", label: "صورة القسم", name: "image", value: "" },
  ],
};

const EditorSectionDetails = () => {
  const [data, setData] = useState(section.props);

  const handleChange = (value: string, name: string) => {
    setData((prev) => {
      return prev.map((item) => {
        if (item.name === name) {
          return { ...item, value };
        }
        return item;
      });
    });
  };

  return (
    <div className="editor-nav-section">
      <h3 className="title">{"تفاصيل القسم"}</h3>
      {data.map((item) => {
        return (
          <SectionPropsComponent
            key={item.name}
            onChange={handleChange}
            {...item}
          />
        );
      })}
    </div>
  );
};

export default EditorSectionDetails;
