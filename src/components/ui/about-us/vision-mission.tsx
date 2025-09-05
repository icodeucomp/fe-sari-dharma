import { Img } from "@/components";

export const VisionMission = () => {
  return (
    <div className="w-full text-light">
      <div className="flex w-full gap-8 bg-light">
        <Img src="/images/mission.png" alt="mission image" className="w-full min-h-300" cover />
        <div className="flex flex-col items-center justify-center max-w-xs px-4 pt-4 pb-8 mb-8 space-y-2 bg-primary">
          <h4 className="text-3xl font-bold">Misi</h4>
          <p className="leading-snug text-center">Mempersembahkan pelayanan kesehatan yang berkualitas disertai semangat inovasi berkesinambungan dan transformasi ke arah yang lebih baik.</p>
        </div>
      </div>
      <div className="flex w-full gap-8 bg-light">
        <div className="flex flex-col items-center justify-center max-w-xs px-4 pt-4 pb-8 mt-8 space-y-2 bg-primary">
          <h4 className="text-3xl font-bold">Visi</h4>
          <p className="leading-snug text-center">Menjadi Klinik yang berkualiras dan terbaik dengan Unggulan Penyakit Dalam & Jantung didukung pelayanan kesehatan yang komprehensif di tahun 2027.</p>
        </div>
        <Img src="/images/vision.png" alt="vision image" className="w-full min-h-300" cover />
      </div>
    </div>
  );
};
