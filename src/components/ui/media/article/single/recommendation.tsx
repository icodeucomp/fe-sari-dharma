import Link from "next/link";

import { Button, Img, Motion } from "@/components";

import { LuTag } from "react-icons/lu";

import { convertDate, formatKebabCase } from "@/utils";

const Doctor = () => {
  return (
    <div className="space-y-4 divide-y-2 divide-primary">
      <Motion tag="h4" initialY={50} animateY={0} duration={0.5} className="text-xl font-semibold text-primary">
        Dokter Spesialis Terkait
      </Motion>
      <div className="pt-4 space-y-4">
        {[...Array(3)].map((_, index) => (
          <Motion tag="div" initialY={50} animateY={0} duration={0.5} delay={index * 0.1} key={index} className="flex items-center gap-4 pb-4 border-b border-gray/30">
            <Img src="/images/temp-5.png" alt="temp" className="min-w-20 min-h-28" cover />
            <div className="flex flex-col gap-4 text-dark">
              <h5 className="font-semibold">dr. Bambang Sutoyo, Sp.A</h5>
              <div className="w-full space-y-2 max-w-40">
                <Button className="btn-outline !py-1 w-full">View Schedule</Button>
                <Button className="btn-primary !py-1 w-full">Appointment</Button>
              </div>
            </div>
          </Motion>
        ))}
      </div>
    </div>
  );
};

const Article = () => {
  return (
    <div className="space-y-4 divide-y-2 divide-primary">
      <Motion tag="div" initialY={50} animateY={0} duration={0.5} delay={0.3} className="text-xl font-semibold text-primary">
        Artikel Terkait
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
    <div className="pb-8 space-y-4">
      <Doctor />
      <Article />
    </div>
  );
};
