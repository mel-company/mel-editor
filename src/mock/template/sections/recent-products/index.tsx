import { ProductType } from "../../../../types";

const RecentProducts = ({
  content,
  products,
  view_all_link,
}: {
  content: { title: string };
  products: ProductType[];
  view_all_link: string;
}) => {
  return (
    <div className="container">
      <h2>{content.title}</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((product, index) => (
          <div key={index}>
            <img
              src={product.thumbnail.url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <p>{product.name}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
      <a href={view_all_link} className="text-slate-500">
        مشاهدة الكل
      </a>
    </div>
  );
};

const RecentProductsCarousel = ({
  content,
  products,
  view_all_link,
}: {
  content: { title: string };
  products: ProductType[];
  view_all_link: string;
}) => {
  return (
    <div className="container">
      <h2>{content.title}</h2>
      <div className="carousel w-full">
        {products?.map((product, index) => (
          <div key={index}>
            <img
              src={product.thumbnail.url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <p>{product.name}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
      <a href={view_all_link} className="text-slate-500">
        مشاهدة الكل
      </a>
    </div>
  );
};

export const recent_products_sections = [
  {
    id: "1",
    title: "Recent Products",
    component: RecentProducts,
    thumbnail: {
      url: "https://cdn.dribbble.com/userupload/43792476/file/original-2dc4c0056ba1870f72cc179f989655b4.jpg?resize=400x0",
    },
    content: [
      {
        id: "title",
        label: "Title",
        name: "title",
        type: "text",
        value: "Recent Products",
      },
    ],
    products: [],
    view_all_link: "",
  },
  {
    id: "2",
    title: "Recent Products",
    thumbnail: {
      url: "https://cdn.dribbble.com/userupload/43792476/file/original-2dc4c0056ba1870f72cc179f989655b4.jpg?resize=400x0",
    },
    component: RecentProductsCarousel,
    content: [
      {
        id: "title",
        label: "Title",
        name: "title",
        type: "text",
        value: "Recent Products",
      },
    ],
    products: [],
    view_all_link: "",
  },
];
