import { useState } from "react";
import EditoNavHeader from "./header";
import ThemeSide from "./theme";

const EditorSideNav = () => {
  const [side, setSide] = useState("theme");
  return (
    <article className="p-4 editor pb-0 bg-white flex flex-col gap-2.5 w-64 h-screen fixed top-0 start-0 z-50">
      <EditoNavHeader side={side} setSide={setSide} />
      {side === "content" ? <ThemeSide /> : <ThemeSide />}
    </article>
  );
};

export default EditorSideNav;
