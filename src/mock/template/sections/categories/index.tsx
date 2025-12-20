import { CategoryType } from "../../../../types";

const CategoriesSection = ({ categories }: { categories: CategoryType[] }) => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-5 p-4">
      {categories.map((category, index) => (
        <div
          key={index}
          className="group flex flex-col items-center gap-2 p-4 border border-slate-100 rounded-lg "
        >
          <img
            className="group-hover:scale-105 transition-all ease-in-out duration-300"
            src={category.thumbnail.url}
            alt={category.name}
          />
          <p className="text-lg">{category.name}</p>
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
    thumbnail: {
      url: "https://cdn.shopify.com/s/files/1/0817/7988/4088/articles/fashion-ecommerce.jpg?v=1738095976",
    },
    categories: [
      {
        id: "1",
        name: "Category 1",
        thumbnail: {
          url: "https://www.next.co.uk/cms/resource/blob/1237324/d01f2c1d45eddfa0c42476f23b566003/040925-roundel-1-mens-data.jpg",
        },
      },
      {
        id: "2",
        name: "Category 2",
        thumbnail: {
          url: "https://www.next.co.uk/cms/resource/blob/1237332/7a934650ca64e46cd9019b84126843bc/040925-roundel-5-mens-data.jpg",
        },
      },
      {
        id: "3",
        name: "Category 3",
        thumbnail: {
          url: "https://www.next.co.uk/cms/resource/blob/1237422/7b04c40f1c429cf34c4f2d2885b23336/040925-roundel-10-mens-data.jpg",
        },
      },
      {
        id: "4",
        name: "Category 4",
        thumbnail: {
          url: "https://www.next.co.uk/cms/resource/blob/1237338/74efe5faabbcd4638ac78b44587fe9dc/040925-roundel-9-mens-data.jpg",
        },
      },
      {
        id: "5",
        name: "Category 5",
        thumbnail: {
          url: "https://www.next.co.uk/cms/resource/blob/1237334/926678c6cf713916d5b84462d4a54efc/040925-roundel-7-mens-data.jpg",
        },
      },
    ],
  },
];
