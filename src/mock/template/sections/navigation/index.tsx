import { FileType } from "../../../../types";
import { ShoppingCart } from "lucide-react";

export const Navigation1 = ({ logo }: { logo: FileType }) => {
  return (
    <nav className="w-full border-b border-slate-100 py-8 flex items-center justify-between">
      <img src={logo?.url} alt="logo" />
      <button>
        <ShoppingCart />
      </button>
    </nav>
  );
};

export const navigation_sections = [
  {
    id: "1",
    title: "Navigation",
    component: Navigation1,
    photos: {
      logo: {
        url: "https://via.placeholder.com/150",
      },
    },
  },
];
