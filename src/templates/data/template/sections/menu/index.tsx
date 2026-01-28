import { ProductType, SectionOptionType } from "../../../../../shared/types";
import React from "react";
const MenuItems = ({
  content,
  products,
  view_all_link,
}: {
  content: { title: string };
  products: ProductType[];
  view_all_link: string;
}) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">{content.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={product.thumbnail.url}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">
                    {product.price} ر.س
                  </span>
                  {product.discount > 0 && (
                    <span className="text-sm text-slate-400 line-through">
                      {product.price + product.discount} ر.س
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-500">
                  متوفر: {product.stock} قطعة
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MenuItemsGrid = ({
  content,
  products,
  view_all_link,
  photos,
}: {
  content: { title: string };
  products: ProductType[];
  view_all_link: string;
  photos: Array<{ id: string; label: string; url: string }>;
}) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold mb-4 text-center">{content.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {products.map((product, index) => (
          <div
            key={index}
            className="flex gap-4 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img
              src={product.thumbnail.url}
              alt={product.name}
              className="w-32 h-32 object-cover shrink-0"
            />
            <div className="p-4 flex-1">
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-slate-600 text-sm mb-4">{product.description}</p>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">
                    {product.price} ر.س
                  </span>
                  {product.discount > 0 && (
                    <span className="text-sm text-slate-400 line-through">
                      {product.price + product.discount} ر.س
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-500">
                  متوفر: {product.stock} قطعة
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MenuItemsList = ({
  content,
  products,
  view_all_link,
}: {
  content: { title: string };
  products: ProductType[];
  view_all_link: string;
}) => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h2 className="text-3xl font-bold mb-8 text-center">{content.title}</h2>
      <div className="space-y-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="flex items-center gap-6 bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
          >
            <img
              src={product.thumbnail.url}
              alt={product.name}
              className="w-24 h-24 object-cover rounded-lg shrink-0"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
              <p className="text-slate-600 text-sm">{product.description}</p>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-green-600 block">
                {product.price} ر.س
              </span>
              {product.discount > 0 && (
                <span className="text-sm text-slate-400 line-through">
                  {product.price + product.discount} ر.س
                </span>
              )}
              <span className="text-xs text-slate-500 mt-1 block">
                متوفر: {product.stock} قطعة
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const menu_sections: SectionOptionType[] = [
  {
    id: "1",
    title: "Menu Items",
    component: MenuItems,
    thumbnail: {
      url: "https://cdn.dribbble.com/userupload/43792476/file/original-2dc4c0056ba1870f72cc179f989655b4.jpg?resize=400x0",
    },
    content: [
      {
        id: "title",
        label: "Title",
        name: "title",
        type: "text",
        value: "قائمة الطعام",
      },
    ],
    products: [],
    view_all_link: "",
  },
  {
    id: "2",
    title: "Menu Grid",
    component: MenuItemsGrid,
    thumbnail: {
      url: "https://cdn.dribbble.com/userupload/43792476/file/original-2dc4c0056ba1870f72cc179f989655b4.jpg?resize=400x0",
    },
    content: [
      {
        id: "title",
        label: "Title",
        name: "title",
        type: "text",
        value: "قائمة الطعام",
      },
    ],
    products: [],
    view_all_link: "",
  },
  {
    id: "3",
    title: "Menu List",
    component: MenuItemsList,
    thumbnail: {
      url: "https://cdn.dribbble.com/userupload/43792476/file/original-2dc4c0056ba1870f72cc179f989655b4.jpg?resize=400x0",
    },
    content: [
      {
        id: "title",
        label: "Title",
        name: "title",
        type: "text",
        value: "قائمة الطعام",
      },
    ],
    products: [],
    view_all_link: "",
  },
];

