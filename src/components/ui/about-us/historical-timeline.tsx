import { Img } from "@/components";

interface TimelineItemProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  isLeft?: boolean;
}

interface TimelineData {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  isLeft: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ title, description, image, imageAlt, isLeft = false }) => {
  return (
    <div className="mb-8 md:mb-16">
      <div className={`hidden md:flex items-center ${isLeft ? "md:flex-row-reverse" : ""}`}>
        <div className={`w-1/2 ${isLeft ? "pl-6 lg:pl-8" : "pr-6 lg:pr-8 text-right"}`}>
          <h3 className="mb-2 text-xl font-bold lg:text-2xl text-primary lg:mb-3">{title}</h3>
          <p className="mb-4 text-sm leading-relaxed text-gray-600 lg:text-base">{description}</p>
        </div>

        <div className="relative flex flex-col items-center px-4">
          <div className="z-10 w-4 h-4 border-4 rounded-full shadow-lg bg-primary border-light"></div>
        </div>

        <div className={`w-1/2 ${isLeft ? "pr-6 lg:pr-8" : "pl-6 lg:pl-8"}`}>
          <Img src={image} alt={imageAlt} className="w-full h-48 transition-transform duration-300 rounded lg:h-64 hover:scale-105" cover />
        </div>
      </div>

      <div className="md:hidden">
        <div className="flex">
          <div className="relative flex flex-col items-center mr-4 sm:mr-6">
            <div className="z-10 flex-shrink-0 w-3 h-3 border-2 rounded-full shadow-md sm:w-4 sm:h-4 bg-primary sm:border-4 border-light"></div>
            <div className="w-0.5 bg-primary flex-1 mt-2"></div>
          </div>

          <div className="flex-1 pb-8">
            <div className="p-4 mb-4 rounded-lg shadow-md bg-light sm:p-5">
              <h3 className="mb-2 text-lg font-bold sm:text-xl text-primary">{title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-gray-600 sm:text-base">{description}</p>
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
      title: "2017 - Awal Berdirinya Klinik ",
      description:
        "Klinik Utama Rawat Inap Sari Dharma berdiri pada 2017 untuk meningkatkan kesehatan masyarakat Denpasar dan Bali. Klinik ini menyediakan layanan rawat jalan, rawat inap, laboratorium, dan radiologi, dengan dukungan tenaga medis kompeten serta peralatan modern. Saat ini, klinik memiliki 3 kelas rawat inap dengan 5 tempat tidur, didukung 25 dokter spesialis, perawat, analis, dan radiografer. Sejak awal, klinik berkomitmen memberikan layanan kesehatan cepat, nyaman, dan profesional bagi masyarakat.",
      image: "/images/temp-1.png",
      imageAlt: "Modern architectural building representing the present era",
      isLeft: false,
    },
    {
      title: "2019 - Menjadi Mitra BPJS Kesehatan",
      description:
        "Sebagai wujud partisipasi dalam program Jaminan Kesehatan Nasional, pada tahun 2019 Klinik Utama Sari Dharma resmi menjalin kerjasama dengan BPJS Kesehatan. Hal ini membuka akses pelayanan kesehatan yang lebih luas dan terjangkau bagi peserta JKN-KIS di wilayah Denpasar.",
      image: "/images/temp-1.png",
      imageAlt: "Post-war hospital and medical facility development",
      isLeft: true,
    },
    {
      title: "2023 - Meraih Akreditasi Paripurna ",
      description:
        "Klinik Utama Rawat Inap Sari Dharma berkomitmen terhadap Mutu Pelayanan Kesehatan dan Keselamatan Pasien dibuktikan dengan diraihnya sertifikat Akreditasi Paripurna dari Lembaga Akreditasi Fasyankes Seluruh Indonesia (LASKESI) pada tahun 2023. Capaian ini menjadi bukti nyata bahwa Klinik Sari Dharma senantiasa mengedepankan standar pelayanan terbaik dalam setiap aspek pelayanannya yang sudah sesuai dengan standar yang berlaku. ",
      image: "/images/temp-1.png",
      imageAlt: "Early modern period medical and institutional facilities",
      isLeft: false,
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="heading">Linimasa Historikal</h1>

      <div className="relative">
        <div className="hidden md:block absolute left-1/2 transform -translate-x-px w-0.5 bg-primary h-full"></div>

        <div className="space-y-16">
          {timelineData.map((item: TimelineData, index: number) => (
            <TimelineItem key={index} title={item.title} description={item.description} image={item.image} imageAlt={item.imageAlt} isLeft={item.isLeft} />
          ))}
        </div>
      </div>
    </div>
  );
};
