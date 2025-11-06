import Link from "next/link";

import { Button, Container, Img, Motion } from "@/components";

import { FaArrowRightLong } from "react-icons/fa6";

export const Overview = () => {
  const images: string[] = ["/images/sari-dharma-photo-4.webp", "/images/sari-dharma-photo-1.webp", "/images/sari-dharma-photo-2.webp"];

  return (
    <Container className="flex flex-col-reverse gap-4 sm:gap-8 py-10 sm:py-16 md:py-20 lg:flex-row">
      <Motion tag="div" initialY={-50} animateY={0} duration={0.4} className="flex-1 space-y-4">
        <div className="space-y-2">
          <h2 className="text-base sm:text-lg md:text-2xl font-medium lg:text-3xl text-dark">Temukan Perawatan Kesehatan Terbaik di</h2>
          <h2 className="text-2xl sm:text-3xl font-bold md:text-5xl text-primary text-justify sm:text-start">Klinik Utama Rawat Inap Sari Dharma</h2>
        </div>
        <p className="text-sm text-justify sm:text-base text-dark/80 leading-snug md:leading-normal">
          Klinik Utama Rawat Inap Sari Dharma adalah solusi terbaik untuk kebutuhan layanan kesehatan Anda. Kami menghadirkan perawatan medis yang profesional, aman, dan nyaman bagi seluruh keluarga.
          Dengan fasilitas modern dan tim tenaga medis berpengalaman, kami berkomitmen memberikan pelayanan kesehatan terbaik di lingkungan yang ramah dan mendukung proses penyembuhan.
        </p>
        <p className="text-sm text-justify sm:text-base text-dark/80 leading-snug md:leading-normal">
          Kami menyediakan berbagai layanan rawat inap, konsultasi dokter umum dan spesialis, serta layanan laboratorium dan farmasi. Percayakan kesehatan Anda kepada kami, karena kepuasan dan
          kesembuhan pasien adalah prioritas utama kami.
        </p>
        <Link href="/tentang-kami/ikhtisar" className="block">
          <Button className="flex items-center gap-2 w-max btn-outline group">
            Tentang Kami
            <FaArrowRightLong className="-rotate-45" />
          </Button>
        </Link>
      </Motion>
      <Motion tag="div" initialY={50} animateY={0} duration={0.8} delay={0.4} className="relative grid flex-1 grid-cols-2 grid-rows-2 gap-2 sm:gap-4 min-h-200 sm:min-h-300 lg:min-h-400">
        {images.map((item, index) => (
          <Img key={index} src={item} alt="image profile Klinik Utama Rawat Inap Sari Dharma" className={`w-full rounded-lg overflow-hidden lg:h-full ${index === 0 && "row-span-2"}`} cover />
        ))}
      </Motion>
    </Container>
  );
};
