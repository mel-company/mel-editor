import EditorThemeStore from "./store";
import EditorThemeFonts from "./fonts";
import EditorThemeColors from "./colors";
import Divider from "../../../ui/divider";

const ThemeSide = () => {
  return (
    <div className="flex flex-col gap-4 h-full">
      <Divider />
      <EditorThemeStore />
      <Divider />
      <EditorThemeFonts />
      <Divider />
      <EditorThemeColors />
    </div>
  );
};

export default ThemeSide;
