import React from "react";
import { SectionOptionType } from "../../../../types";

// Our Story 1: Text with Image
const OurStorySection1 = ({
  title,
  description,
  photos,
}: {
  title?: string;
  description?: string;
  photos?: any[];
}) => {
  const photoUrl = photos?.[0]?.url || photos?.[0]?.base64Content;

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {photoUrl && (
            <div className="order-2 md:order-1">
              <img
                src={photoUrl}
                alt={title || "قصتنا"}
                className="w-full h-auto rounded-2xl shadow-xl object-cover"
              />
            </div>
          )}
          <div className="order-1 md:order-2">
            {title && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 sm:mb-6">
                {title}
              </h2>
            )}
            {description && (
              <div
                className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, "<br />") }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Our Story 2: Centered Text
const OurStorySection2 = ({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) => {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
      <div className="max-w-4xl mx-auto text-center">
        {title && (
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 sm:mb-8">
            {title}
          </h2>
        )}
        {description && (
          <div
            className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, "<br />") }}
          />
        )}
      </div>
    </section>
  );
};

// Our Story 3: Timeline Style
const OurStorySection3 = ({
  title,
  description,
  photos,
}: {
  title?: string;
  description?: string;
  photos?: any[];
}) => {
  const photoUrl = photos?.[0]?.url || photos?.[0]?.base64Content;

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
      <div className="max-w-5xl mx-auto">
        {title && (
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-8 sm:mb-12 text-center">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {photoUrl && (
            <div>
              <img
                src={photoUrl}
                alt={title || "قصتنا"}
                className="w-full h-auto rounded-xl shadow-lg object-cover"
              />
            </div>
          )}
          <div className="flex flex-col justify-center">
            {description && (
              <div
                className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, "<br />") }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const our_story_sections: SectionOptionType[] = [
  {
    id: "1",
    title: "صورة ونص",
    component: OurStorySection1,
    thumbnail: {
      url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400",
    },
    content: [
      {
        id: "title",
        label: "العنوان",
        name: "title",
        type: "text",
        value: "قصتنا",
      },
      {
        id: "description",
        label: "الوصف",
        name: "description",
        type: "textarea",
        value: "نحن متجر متخصص في تقديم أفضل المنتجات والخدمات لعملائنا. بدأنا رحلتنا برؤية واضحة لتقديم تجربة تسوق استثنائية تجمع بين الجودة والسعر المناسب.",
      },
    ],
    photos: [{ id: "1", label: "الصورة", url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400" }],
  },
  {
    id: "2",
    title: "نص مركزي",
    component: OurStorySection2,
    thumbnail: {
      url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400",
    },
    content: [
      {
        id: "title",
        label: "العنوان",
        name: "title",
        type: "text",
        value: "قصتنا",
      },
      {
        id: "description",
        label: "الوصف",
        name: "description",
        type: "textarea",
        value: "نحن متجر متخصص في تقديم أفضل المنتجات والخدمات لعملائنا. بدأنا رحلتنا برؤية واضحة لتقديم تجربة تسوق استثنائية تجمع بين الجودة والسعر المناسب.",
      },
    ],
  },
  {
    id: "3",
    title: "تصميم زمني",
    component: OurStorySection3,
    thumbnail: {
      url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400",
    },
    content: [
      {
        id: "title",
        label: "العنوان",
        name: "title",
        type: "text",
        value: "قصتنا",
      },
      {
        id: "description",
        label: "الوصف",
        name: "description",
        type: "textarea",
        value: "نحن متجر متخصص في تقديم أفضل المنتجات والخدمات لعملائنا. بدأنا رحلتنا برؤية واضحة لتقديم تجربة تسوق استثنائية تجمع بين الجودة والسعر المناسب.",
      },
    ],
    photos: [{ id: "1", label: "الصورة", url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400" }],
  },
];

