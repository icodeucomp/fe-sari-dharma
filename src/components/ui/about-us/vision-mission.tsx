import { Img } from "@/components";

export const VisionMission = () => {
  return (
    <div className="w-full text-light">
      <div className="flex flex-col lg:flex-row w-full lg:gap-4 xl:gap-8 bg-light">
        <Img src="/images/mission.webp" alt="mission image" className="w-full min-h-72 xl:min-h-300" cover />
        <div className="flex flex-col items-center justify-center w-full lg:max-w-72 xl:max-w-xs px-4 pt-4 pb-8 mb-4 xl:mb-8 space-y-2 bg-primary">
          <h4 className="text-2xl sm:text-3xl font-bold">Misi</h4>
          <p className="text-sm sm:text-base leading-snug text-center">
            Mempersembahkan pelayanan kesehatan yang berkualitas disertai semangat inovasi berkesinambungan dan transformasi ke arah yang lebih baik.
          </p>
        </div>
      </div>
      <div className="flex flex-col-reverse lg:flex-row w-full lg:gap-4 xl:gap-8 bg-light">
        <div className="flex flex-col items-center justify-center w-full lg:max-w-72 xl:max-w-xs px-4 pt-4 pb-8 lg:mt-4 xl:mt-8 space-y-2 bg-primary">
          <h4 className="text-2xl sm:text-3xl font-bold">Visi</h4>
          <p className="text-sm sm:text-base leading-snug text-center">
            Menjadi Klinik yang berkualitas dan terbaik dengan Unggulan Penyakit Dalam & Jantung didukung pelayanan kesehatan yang komprehensif di tahun 2027.
          </p>
        </div>
        <Img src="/images/vision.webp" alt="vision image" className="w-full min-h-72 xl:min-h-300" cover />
      </div>
    </div>
  );
};
