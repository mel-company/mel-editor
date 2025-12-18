import { FileType, SectionOptionType } from "../../../../types";
import { ShoppingCart } from "lucide-react";

export const Navigation1 = ({ logo }: { logo: FileType }) => {
  return (
    <nav className="w-full border-b sticky top-0 z-50 border-slate-100 py-8 flex items-center justify-between">
      <img className="h-8" src={logo?.url} alt="logo" />
      <button>
        <ShoppingCart />
      </button>
    </nav>
  );
};

export const navigation_sections: SectionOptionType[] = [
  {
    id: "1",
    title: "Navigation",
    component: Navigation1,
    photos: {
      logo: {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Xiaomi_logo_%282021-%29.svg/1024px-Xiaomi_logo_%282021-%29.svg.png",
      },
    },
  },
];
