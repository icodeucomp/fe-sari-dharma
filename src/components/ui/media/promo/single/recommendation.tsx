import { Button, Img, Motion } from "@/components";
import { FaArrowRightLong } from "react-icons/fa6";

import { LuTag } from "react-icons/lu";

const OthersPromo = () => {
  return (
    <div className="space-y-4 divide-y-2 divide-primary">
      <Motion tag="h4" initialY={50} animateY={0} duration={0.5} className="text-xl font-semibold text-primary">
        Paket Kesehatan Lainnya
      </Motion>
      <div className="pt-4 space-y-4">
        {[...Array(3)].map((_, index) => (
          <Motion tag="div" initialY={50} animateY={0} duration={0.5} delay={index * 0.1} key={index} className="pb-4 space-y-2 border-b border-gray/30">
            <Img src="/images/temp-5.png" alt="temp" className="w-full min-h-32" cover />
            <span className="flex items-center gap-2 px-4 py-2 text-xs rounded-md w-max bg-secondary text-light">
              <LuTag size={16} />
              General Checkup
            </span>
            <div className="space-y-2 text-dark">
              <span className="text-sm font-light">*Berlaku s/d 31 Desember 2025</span>
              <h3 className="font-semibold line-clamp-2">Pentingnya Tidur Berkualitas untuk Kesehatan Tubuh</h3>

              <p className="line-clamp-2 text-gray text-sm max-w-xs text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi non, doloremque eaque nostrum sapiente odit expedita voluptas fuga deserunt vitae?
              </p>

              <Button className="btn-outline flex items-center gap-2">
                Lihat Paket
                <FaArrowRightLong />
              </Button>
            </div>
          </Motion>
        ))}
      </div>
    </div>
  );
};

export const Recommendation = () => {
  return (
    <div className="pb-8 pr-2 space-y-4">
      <OthersPromo />
    </div>
  );
};
