const HeroSection1 = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <header className="container min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="text-xl">{description}</p>
    </header>
  );
};

const HeroSection2 = ({
  title,
  description,
  photos,
}: {
  title: string;
  description: string;
  photos: any[];
}) => {
  return (
    <header className="container min-h-screen flex flex-col md:flex-row items-center justify-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-xl">{description}</p>
      </div>
      <div className="w-full px-16 md:w-1/4 overflow-hidden rounded-lg">
        <img
          src={photos?.[0]?.url}
          className="w-full h-full object-cover"
          alt="photo"
        />
      </div>
    </header>
  );
};

export const hero_sections = [
  {
    id: "1",
    title: "Hero",
    component: HeroSection1,
    thumbnail: {
      url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300&vertical=center",
    },
    content: {
      title: "Hero Section",
      description: "Hero Section",
    },
  },
  {
    id: "2",
    title: "Hero",
    thumbnail: {
      url: "https://cdn.dribbble.com/userupload/17671963/file/original-3adc590720f59beeb44b8fa8876e4837.jpg?crop=107x0-2529x1816&format=webp&resize=400x300&vertical=center",
    },
    component: HeroSection2,
    photos: [
      {
        url: "https://img.freepik.com/free-photo/smiley-man-posing-grey-wall_23-2148448892.jpg?semt=ais_hybrid&w=740&q=80",
      },
    ],
    content: {
      title: "Hero Section",
      description: "Hero Section",
    },
  },
];
