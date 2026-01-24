import EditorThemeStore from "./store";
import EditorThemeFonts from "./fonts";
import EditorThemeColors from "./colors";
import EditorStoreSettings from "./store-settings";
import Divider from "../../../ui/divider";

const ThemeSide = () => {
  return (
    <div className="flex flex-col gap-4 h-full overflow-x-hidden">
      <EditorStoreSettings />
      {/* <Divider /> */}
      {/* <EditorThemeStore /> */}
      {/* <Divider /> */}
      <EditorThemeFonts />
      {/* <Divider /> */}
      <EditorThemeColors />
    </div>
  );
};

export default ThemeSide;
