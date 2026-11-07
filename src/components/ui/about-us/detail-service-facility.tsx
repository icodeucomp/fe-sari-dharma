"use client";

import { Img } from "@/components/image";
import { useQuery } from "@tanstack/react-query";
import { getDetailFacilityService } from "@/services/facility-service.service";
import { useParams } from "next/navigation";
import { useState } from "react";
import { IoChevronBack, IoChevronForward, IoClose } from "react-icons/io5";

interface FacilityData {
  name: string;
  overview_description: string;
  header_photo: string;
  other_photo: string;
  services: string;
}

interface ImageCarouselProps {
  images: string[];
  onImageClick: (index: number) => void;
}

interface LightboxModalProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

interface MotionProps {
  children: React.ReactNode;
  className?: string;
  tag?: keyof React.JSX.IntrinsicElements;
  [key: string]: any;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Motion: React.FC<MotionProps> = ({ children, className, tag: Tag = "div", ...props }) => (
  <Tag className={className} {...props}>
    {children}
  </Tag>
);

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => (
  <button className={`px-4 py-2 rounded-lg transition-all ${className}`} {...props}>
    {children}
  </button>
);

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextSlide = (): void => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (): void => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-64 rounded-lg overflow-hidden group">
      <Img src={images[currentIndex]} alt={`Gallery ${currentIndex + 1}`} className="w-full h-64" cover={true} />
      <div className="absolute inset-0 cursor-pointer" onClick={() => onImageClick(currentIndex)} />

      {images.length > 1 && (
        <>
          <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <IoChevronBack size={24} />
          </button>
          <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <IoChevronForward size={24} />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <button key={idx} onClick={() => setCurrentIndex(idx)} className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? "bg-white w-8" : "bg-white/50"}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const LightboxModal: React.FC<LightboxModalProps> = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);

  const nextSlide = (): void => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (): void => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <button onClick={onClose} className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-10">
        <IoClose size={32} />
      </button>

      <button onClick={prevSlide} className="absolute left-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-10">
        <IoChevronBack size={48} />
      </button>

      <div className="relative w-full max-w-5xl h-[90vh]">
        <Img src={images[currentIndex]} alt={`Gallery ${currentIndex + 1}`} className="w-full h-full" cover={false} />
      </div>

      <button onClick={nextSlide} className="absolute right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-10">
        <IoChevronForward size={48} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-lg">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export const DetailServiceFacility: React.FC = () => {
  const params = useParams<{ slug: string; id: string }>();
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  const { data, isLoading } = useQuery({
    queryKey: ["facility-service-detail", params.slug, params.id],
    queryFn: () => getDetailFacilityService(params.slug, params.id),
    select: (response): FacilityData => ({
      ...response.data,
      header_photo: `${process.env.NEXT_PUBLIC_API_URL}/storage/${response.data.header_photo}`,
      other_photo: `${process.env.NEXT_PUBLIC_API_URL}/storage/${response.data.other_photo}`,
    }),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="loader"></div>
      </div>
    );
  }

  const allPhotos: string[] = data?.other_photo ? [data.header_photo, ...data.other_photo.split(",").filter(Boolean)] : [data?.header_photo || ""];

  const handleImageClick = (index: number): void => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8 text-dark">
        <Motion className="space-y-4">
          <h1 className="heading">{data?.name}</h1>
          <p className="text-lg leading-relaxed">{data?.overview_description}</p>
        </Motion>

        <div className="grid lg:grid-cols-2 gap-8">
          <Motion className="space-y-6">
            <div className="relative rounded-lg overflow-hidden shadow-xl group cursor-pointer" onClick={() => handleImageClick(0)}>
              <Img src={allPhotos[0]} alt={data?.name || "Facility"} className="w-full h-80" cover={true} />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
              <span className="absolute bottom-4 left-4 bg-primary text-white px-6 py-2 rounded text-sm font-semibold shadow-lg">Foto Utama</span>
            </div>

            <div className="bg-white">
              <h2 className="text-2xl font-bold mb-4">Aktivitas & Kegiatan</h2>
              <div className="max-w-none" dangerouslySetInnerHTML={{ __html: data?.services || "" }} />
            </div>
          </Motion>

          <Motion className="space-y-6">
            <div className="bg-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Galeri Foto</h2>
                <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-semibold">{allPhotos.length} Foto</span>
              </div>

              <ImageCarousel images={allPhotos} onImageClick={handleImageClick} />

              <div className="mt-6 grid grid-cols-4 gap-2">
                {allPhotos.slice(0, 4).map((photo, idx) => (
                  <button key={idx} onClick={() => handleImageClick(idx)} className="relative aspect-square rounded-lg overflow-hidden hover:opacity-75 transition-opacity">
                    <Img src={photo} alt={`Thumbnail ${idx + 1}`} className="w-full h-full" cover={true} />
                    {idx === 3 && allPhotos.length > 4 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">+{allPhotos.length - 4}</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <Button onClick={() => handleImageClick(0)} className="w-full mt-6 bg-primary/90 text-white hover:bg-primary font-semibold shadow-lg">
                Lihat Semua Foto
              </Button>
            </div>
          </Motion>
        </div>
      </div>

      {lightboxOpen && <LightboxModal images={allPhotos} initialIndex={lightboxIndex} onClose={() => setLightboxOpen(false)} />}
    </div>
  );
};
