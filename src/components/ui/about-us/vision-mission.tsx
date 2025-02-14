import { Img } from "@/components";

export const VisionMission = () => {
  return (
    <div className="w-full text-light">
      <div className="flex w-full gap-8 bg-light">
        <Img src="/images/mission.png" alt="mission image" className="w-full min-h-300" cover />
        <div className="max-w-xs px-4 pt-4 pb-8 mb-8 space-y-2 bg-primary">
          <h4 className="text-3xl font-bold">Mission</h4>
          <p className="leading-snug text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam saepe non debitis distinctio rerum nisi maxime expedita quidem tenetur natus hic quisquam perferendis nostrum, odio
            necessitatibus! Ea doloremque officia eligendi.
          </p>
        </div>
      </div>
      <div className="flex w-full gap-8 bg-light">
        <div className="max-w-xs px-4 pt-4 pb-8 mt-8 space-y-2 bg-primary">
          <h4 className="text-3xl font-bold">Vision</h4>
          <p className="leading-snug text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam saepe non debitis distinctio rerum nisi maxime expedita quidem tenetur natus hic quisquam perferendis nostrum, odio
            necessitatibus! Ea doloremque officia eligendi.
          </p>
        </div>
        <Img src="/images/vision.png" alt="vision image" className="w-full min-h-300" cover />
      </div>
    </div>
  );
};
