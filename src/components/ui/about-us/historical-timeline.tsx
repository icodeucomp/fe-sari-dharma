import { Img, Button } from "@/components";

interface TimelineItemProps {
  period: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  isLeft?: boolean;
}

interface TimelineData {
  period: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  isLeft: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ period, description, image, imageAlt, isLeft = false }) => {
  return (
    <div className="mb-8 md:mb-16">
      <div className={`hidden md:flex items-center ${isLeft ? "md:flex-row-reverse" : ""}`}>
        <div className={`w-1/2 ${isLeft ? "pl-6 lg:pl-8" : "pr-6 lg:pr-8 text-right"}`}>
          <h3 className="text-xl lg:text-2xl font-bold text-primary mb-2 lg:mb-3">{period}</h3>
          <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-4">{description}</p>
          <Button className="btn-primary">View details</Button>
        </div>

        <div className="relative flex flex-col items-center px-4">
          <div className="w-4 h-4 bg-primary rounded-full border-4 border-light shadow-lg z-10"></div>
        </div>

        <div className={`w-1/2 ${isLeft ? "pr-6 lg:pr-8" : "pl-6 lg:pl-8"}`}>
          <Img src={image} alt={imageAlt} className="w-full h-48 lg:h-64 hover:scale-105 transition-transform duration-300 rounded" cover />
        </div>
      </div>

      <div className="md:hidden">
        <div className="flex">
          <div className="relative flex flex-col items-center mr-4 sm:mr-6">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-primary rounded-full border-2 sm:border-4 border-light shadow-md z-10 flex-shrink-0"></div>
            <div className="w-0.5 bg-primary flex-1 mt-2"></div>
          </div>

          <div className="flex-1 pb-8">
            <div className="bg-light p-4 sm:p-5 rounded-lg shadow-md mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-2">{period}</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">{description}</p>
              <Button className="btn-primary">View details</Button>
            </div>

            <Img src={image} alt={imageAlt} className="w-full h-40 sm:h-60" cover />
          </div>
        </div>
      </div>
    </div>
  );
};

export const HistoricalTimeline: React.FC = () => {
  const timelineData: TimelineData[] = [
    {
      period: "1978 ~ Present",
      title: "Modern Era",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.",
      image: "/images/temp-1.png",
      imageAlt: "Modern architectural building representing the present era",
      isLeft: false,
    },
    {
      period: "1945~1978",
      title: "Post-War Development",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. When an unknown printer took a galley of type and scrambled it to make a type specimen book during post-war reconstruction.",
      image: "/images/temp-1.png",
      imageAlt: "Post-war hospital and medical facility development",
      isLeft: true,
    },
    {
      period: "1910~1945",
      title: "Early Modern Period",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      image: "/images/temp-1.png",
      imageAlt: "Early modern period medical and institutional facilities",
      isLeft: false,
    },
    {
      period: "1885~1910",
      title: "Foundation Period",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Various versions have evolved over the years, sometimes by accident, sometimes on purpose during the foundation years.",
      image: "/images/temp-1.png",
      imageAlt: "Historical foundation period buildings and architecture",
      isLeft: true,
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="heading">Linimasa Historikal</h1>

      <div className="relative">
        <div className="hidden md:block absolute left-1/2 transform -translate-x-px w-0.5 bg-primary h-full"></div>

        <div className="space-y-16">
          {timelineData.map((item: TimelineData, index: number) => (
            <TimelineItem key={index} period={item.period} title={item.title} description={item.description} image={item.image} imageAlt={item.imageAlt} isLeft={item.isLeft} />
          ))}
        </div>
      </div>
    </div>
  );
};
