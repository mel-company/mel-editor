import { CategoryType } from "../../../../types";
import React from "react";

const CategoriesSection = ({ categories }: { categories: CategoryType[] }) => {
  if (!categories || categories.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center text-slate-500 py-12">
          لا توجد تصنيفات لعرضها
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {categories.map((category, index) => {
          const imageUrl = category.thumbnail?.base64Content || category.thumbnail?.url || "";
          
          return (
            <div
              key={category.id || index}
              className="group flex flex-col items-center gap-3 p-6 bg-white border border-slate-200 rounded-xl hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer"
            >
              <div className="relative w-20 h-20 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <span className="text-2xl">📦</span>
                  </div>
                )}
              </div>
              <p className="text-center font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                {category.name}
              </p>
            </div>
          );
        })}
      </div>
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
        name: "ملابس",
        thumbnail: {
          url: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200",
        },
      },
      {
        id: "2",
        name: "أحذية",
        thumbnail: {
          url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200",
        },
      },
      {
        id: "3",
        name: "إلكترونيات",
        thumbnail: {
          url: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200",
        },
      },
      {
        id: "4",
        name: "إكسسوارات",
        thumbnail: {
          url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200",
        },
      },
      {
        id: "5",
        name: "عطور",
        thumbnail: {
          url: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=200",
        },
      },
      {
        id: "6",
        name: "ساعات",
        thumbnail: {
          url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200",
        },
      },
      {
        id: "7",
        name: "حقائب",
        thumbnail: {
          url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200",
        },
      },
      {
        id: "8",
        name: "نظارات",
        thumbnail: {
          url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200",
        },
      },
    ],
  },
];
