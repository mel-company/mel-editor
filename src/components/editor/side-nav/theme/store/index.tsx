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
    type: "e-commerce",
    header: {
      logo: {
        base64Content: "",
        name: "",
        url: "",
      },
      navigationLinks: [],
    },
    footer: {
      logo: {},
      text: "",
      links: [],
    },
  });

  const handleChange = (value: Partial<StoreType>) => {
    setData({
      ...data,
      ...value,
    });
  };

  return null; // Component is empty, return null for now
};

export default EditorThemeStore;
