import { useState } from "react";
import SelectList from "../../../../ui/select-list";
import { fontList } from "../../../../../utils/fonts";

const EditorThemeFonts = () => {
  const [data, setData] = useState({
    heading: fontList[0],
    body: fontList[0],
  });
  return (
    <div className="editor-nav-section">
      <h3 className="title">{"الخطوط"}</h3>
      <h4 className="sub-title">{"العنوان"}</h4>
      <SelectList
        options={fontList}
        selected={data.heading}
        setSelected={(value: string) => setData({ ...data, heading: value })}
      />
      <h4 className="sub-title">{"النصوص"}</h4>
      <SelectList
        options={fontList}
        selected={data.body}
        setSelected={(value: string) => setData({ ...data, body: value })}
      />
    </div>
  );
};

export default EditorThemeFonts;
