import Link from "next/link";

import { Img, Motion } from "@/components";

import { LuTag } from "react-icons/lu";

import { convertDate, formatKebabCase } from "@/utils";

const RecommendationEvent = () => {
  return (
    <div className="space-y-4 divide-y-2 divide-primary">
      <Motion tag="h4" initialY={50} animateY={0} duration={0.5} className="text-xl font-semibold text-primary">
        Layanan Unggulan Lainnya
      </Motion>
      <div className="pt-4 space-y-4">
        {[...Array(3)].map((_, index) => (
          <Motion tag="div" initialY={50} animateY={0} duration={0.5} delay={index * 0.1} key={index} className="pb-4 space-y-2 border-b border-gray/30">
            <Img src="/images/temp-5.png" alt="temp" className="w-full min-h-32" cover />
            <span className="flex items-center gap-2 px-4 py-2 text-xs rounded-md w-max bg-secondary text-light">
              <LuTag size={16} />
              Edukasi Kesehatan
            </span>
            <div className="space-y-1 text-dark">
              <span className="text-sm font-light">{convertDate("2025-02-19")}</span>
              <Link href={`/media-informasi/artikel-kesehatan/${formatKebabCase("Peran CT Scan dan MRI dalam Mendeteksi Stroke")}`}>
                <h3 className="font-semibold line-clamp-2">Pentingnya Tidur Berkualitas untuk Kesehatan Tubuh</h3>
              </Link>
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
      <RecommendationEvent />
    </div>
  );
};
