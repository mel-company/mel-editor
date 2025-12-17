const HeroSection1 = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <header className="container min-h-screen flex items-center justify-center">
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
  photos: string[];
}) => {
  return (
    <header className="container min-h-screen flex flex-col md:flex-row items-center justify-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-xl">{description}</p>
      </div>
      <div className="w-full px-16 md:w-1/4 overflow-hidden rounded-lg">
        <img
          src={photos[0]}
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
    content: {
      title: "Hero Section",
      description: "Hero Section",
    },
  },
  {
    id: "2",
    title: "Hero",
    component: HeroSection2,
    photos: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
    content: {
      title: "Hero Section",
      description: "Hero Section",
    },
  },
];
