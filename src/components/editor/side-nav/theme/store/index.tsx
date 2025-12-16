import React, { useState } from "react";
import TextInput from "../../../../ui/input";
import { FileType, StoreType } from "../../../../../types";
import FileUploadInput from "../../../../ui/file-upload";
import FileUploadBar from "../../../../ui/file-upload/bar";

const EditorThemeStore = () => {
  const [data, setData] = useState<StoreType>({
    logo: {
      base64Content: "",
      name: "",
      url: "",
    },
    name: "",
    description: "",
  });

  const handleChange = (value: Partial<StoreType>) => {
    setData({
      ...data,
      ...value,
    });
  };

  return (
    <div className="edito-nav-section">
      <FileUploadBar
        label="الشعار"
        value={data?.logo}
        onChange={(file: FileType) => handleChange({ logo: file })}
      />
      <p className="text-sm text-slate-600">المتجر</p>
      <TextInput
        label="اسم المتجر"
        placeholder="اسم المتجر"
        value={data?.name}
        onChange={(e) => handleChange({ name: e.target.value })}
      />
      <TextInput
        label="وصف المتجر"
        placeholder="وصف المتجر"
        value={data?.description}
        onChange={(e) => handleChange({ description: e.target.value })}
        lg
      />
    </div>
  );
};

export default EditorThemeStore;
