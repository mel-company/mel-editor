import { CategoryType } from "../../../../types";

const CategoriesSection = ({ categories }: { categories: CategoryType[] }) => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {categories.map((category, index) => (
        <div
          key={index}
          className="flex items-center gap-2 p-4 border border-slate-100 rounded-lg"
        >
          <img src={category.thumbnail.url} alt={category.name} />
          <p className="text-xl font-bold">{category.name}</p>
        </div>
      ))}
    </div>
  );
};

export const categories_sections = [
  {
    id: "1",
    title: "Categories",
    component: CategoriesSection,
    categories: [
      {
        id: "1",
        name: "Category 1",
        thumbnail: {
          url: "https://via.placeholder.com/150",
        },
      },
      {
        id: "2",
        name: "Category 2",
        thumbnail: {
          url: "https://via.placeholder.com/150",
        },
      },
      {
        id: "3",
        name: "Category 3",
        thumbnail: {
          url: "https://via.placeholder.com/150",
        },
      },
      {
        id: "4",
        name: "Category 4",
        thumbnail: {
          url: "https://via.placeholder.com/150",
        },
      },
    ],
  },
];
