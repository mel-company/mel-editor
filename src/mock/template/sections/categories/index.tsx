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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
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
              <p className="text-center text-xs sm:text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                {category.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Categories 2: Grid with Title
const CategoriesSection2 = ({ categories, content }: { categories: CategoryType[]; content?: { title?: string } }) => {
  if (!categories || categories.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        {content?.title && (
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">{content.title}</h2>
        )}
        <div className="text-center text-slate-500 py-12">
          لا توجد تصنيفات لعرضها
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {content?.title && (
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">{content.title}</h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {categories.map((category, index) => {
          const imageUrl = category.thumbnail?.base64Content || category.thumbnail?.url || "";
          
          return (
            <div
              key={category.id || index}
              className="group flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-lg hover:shadow-md hover:border-blue-400 transition-all duration-300 cursor-pointer"
            >
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center">
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
                    <span className="text-xl">📦</span>
                  </div>
                )}
              </div>
              <p className="text-center text-xs font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                {category.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Categories 3: Horizontal Scroll
const CategoriesSection3 = ({ categories, content }: { categories: CategoryType[]; content?: { title?: string } }) => {
  if (!categories || categories.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        {content?.title && (
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">{content.title}</h2>
        )}
        <div className="text-center text-slate-500 py-12">
          لا توجد تصنيفات لعرضها
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {content?.title && (
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">{content.title}</h2>
      )}
      <div className="overflow-x-auto pb-4 -mx-4 sm:mx-0 px-4 sm:px-0">
        <div className="flex gap-3 sm:gap-4 w-max">
          {categories.map((category, index) => {
            const imageUrl = category.thumbnail?.base64Content || category.thumbnail?.url || "";
            
            return (
              <div
                key={category.id || index}
                className="group flex flex-col items-center gap-3 p-5 bg-white border border-slate-200 rounded-xl hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer shrink-0 w-32"
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
                <p className="text-center text-xs sm:text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Categories 4: Large Cards
const CategoriesSection4 = ({ categories, content }: { categories: CategoryType[]; content?: { title?: string } }) => {
  if (!categories || categories.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        {content?.title && (
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">{content.title}</h2>
        )}
        <div className="text-center text-slate-500 py-12">
          لا توجد تصنيفات لعرضها
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {content?.title && (
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">{content.title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((category, index) => {
          const imageUrl = category.thumbnail?.base64Content || category.thumbnail?.url || "";
          
          return (
            <div
              key={category.id || index}
              className="group relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-square flex items-center justify-center p-8">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={category.name}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <span className="text-4xl">📦</span>
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white font-bold text-lg">{category.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Categories 5: List Style
const CategoriesSection5 = ({ categories, content }: { categories: CategoryType[]; content?: { title?: string } }) => {
  if (!categories || categories.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        {content?.title && (
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">{content.title}</h2>
        )}
        <div className="text-center text-slate-500 py-12">
          لا توجد تصنيفات لعرضها
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {content?.title && (
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">{content.title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {categories.map((category, index) => {
          const imageUrl = category.thumbnail?.base64Content || category.thumbnail?.url || "";
          
          return (
            <div
              key={category.id || index}
              className="group flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-lg hover:shadow-md hover:border-blue-400 transition-all duration-300 cursor-pointer"
            >
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center shrink-0">
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
                    <span className="text-xl">📦</span>
                  </div>
                )}
              </div>
              <p className="text-base font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
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
    title: "Categories - Grid",
    description: "شبكة تصنيفات دائرية",
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
  {
    id: "2",
    title: "Categories - Grid with Title",
    description: "شبكة تصنيفات مع عنوان",
    component: CategoriesSection2,
    thumbnail: {
      url: "https://cdn.shopify.com/s/files/1/0817/7988/4088/articles/fashion-ecommerce.jpg?v=1738095976",
    },
    content: [
      {
        id: "title",
        label: "العنوان",
        name: "title",
        type: "text",
        value: "التصنيفات",
      },
    ],
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
    ],
  },
  {
    id: "3",
    title: "Categories - Horizontal Scroll",
    description: "تصنيفات قابلة للتمرير أفقياً",
    component: CategoriesSection3,
    thumbnail: {
      url: "https://cdn.shopify.com/s/files/1/0817/7988/4088/articles/fashion-ecommerce.jpg?v=1738095976",
    },
    content: [
      {
        id: "title",
        label: "العنوان",
        name: "title",
        type: "text",
        value: "التصنيفات",
      },
    ],
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
    ],
  },
  {
    id: "4",
    title: "Categories - Large Cards",
    description: "بطاقات تصنيفات كبيرة",
    component: CategoriesSection4,
    thumbnail: {
      url: "https://cdn.shopify.com/s/files/1/0817/7988/4088/articles/fashion-ecommerce.jpg?v=1738095976",
    },
    content: [
      {
        id: "title",
        label: "العنوان",
        name: "title",
        type: "text",
        value: "التصنيفات",
      },
    ],
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
    ],
  },
  {
    id: "5",
    title: "Categories - List",
    description: "قائمة تصنيفات أفقية",
    component: CategoriesSection5,
    thumbnail: {
      url: "https://cdn.shopify.com/s/files/1/0817/7988/4088/articles/fashion-ecommerce.jpg?v=1738095976",
    },
    content: [
      {
        id: "title",
        label: "العنوان",
        name: "title",
        type: "text",
        value: "التصنيفات",
      },
    ],
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
    ],
  },
];
