/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'; 

import { Background, Button, Motion } from "@/components";
import { getDetailLayananFasilitas } from "@/services/layanan-fasilitas.service";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";


export const DetailServiceFacility = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  // Fungsi untuk mengambil detail layanan fasilitas
  const fetchData = async () => {
    try {
      const slug = params.slug as string;
      const id = params.id as string;
      const response = await getDetailLayananFasilitas(slug, id);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Menambahkan empty dependency array

  if (isLoading) {
    return <div className="animate-pulse bg-gray-200 h-96 rounded-lg" />;
  }

  // Split foto_lainnya menjadi array jika ada multiple foto
  const additionalPhotos = data?.foto_lainnya ? data.foto_lainnya.split(',') : [];

  return (
    <div className="space-y-4">
      <Motion tag="h2" initialY={50} animateY={0} duration={0.3} className="heading">
        {data?.nama_fasilitas}
      </Motion>
      <Motion tag="div" initialY={50} animateY={0} duration={0.6} delay={0.3}>
        {data?.deskripsi_overview}
      </Motion>
      <Motion tag="div" initialY={50} animateY={0} duration={0.9} delay={0.6} className="grid grid-cols-2 gap-8">
        <div className="space-y-2">
          <Background 
            src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${data?.foto_header}`} 
            alt={data?.nama_fasilitas} 
            className="w-full min-h-56 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gray/20 w-full h-full" />
            <span className="absolute bottom-0 left-0 rounded-se-md bg-secondary px-8 py-2">
              Foto Utama
            </span>
          </Background>
          <h3 className="text-xl font-semibold line-clamp-1">Aktivitas & Kegiatan</h3>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: data?.layanan_fasilitas }} />
        </div>
        <div className="space-y-2">
          <Background 
            src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${additionalPhotos[0] || data?.foto_header}`} 
            alt={data?.nama_fasilitas} 
            className="w-full min-h-56 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gray/20 w-full h-full" />
            <span className="absolute bottom-0 left-0 rounded-se-md bg-secondary px-8 py-2">
              {2} Foto
            </span>
          </Background>
          <h3 className="text-xl font-semibold line-clamp-1">Galeri Foto</h3>
          <Button className="border border-primary text-primary hover:bg-primary hover:text-light">
            Lihat Semua
          </Button>
        </div>
      </Motion>
    </div>
  );
};
