"use client";

import * as React from "react";
import { Img, Motion, Pagination } from "@/components";
import Link from "next/link";
import { getLayananFasilitas } from "@/services/layanan-fasilitas.service";

// Helper function untuk format URL gambar
const getImageUrl = (path: string) => {
  if (!path) return '/images/placeholder.jpg';
  if (path.startsWith('http')) return path;
  return `${process.env.NEXT_PUBLIC_API_URL}/storage/${path}`;
};

export const ServiceFacility = () => {
  const [page, setPage] = React.useState<number>(1);
  const [limit] = React.useState<number>(10);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any[]>([]);
  const [totalPage, setTotalPage] = React.useState<number>(1);
  const [activeIndex, setActiveIndex] = React.useState<number[]>([]);

  // Fungsi untuk fetch data layanan fasilitas
  const fetchLayananFasilitas = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await getLayananFasilitas(page, limit);
      setData(response.data.data);
      setTotalPage(response.data.last_page);
      setActiveIndex(new Array(response.data.data.length).fill(0));
    } catch (error) {
      console.error('Error fetching layanan fasilitas:', error);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  React.useEffect(() => {
    fetchLayananFasilitas();
  }, [fetchLayananFasilitas]);

  const handleImageChange = (sectionIndex: number, imageIndex: number) => {
    setActiveIndex((prevIndexes) => {
      const newIndexes = [...prevIndexes];
      newIndexes[sectionIndex] = imageIndex;
      return newIndexes;
    });
  };

  if (loading) {
    return <div className="text-center py-10">Memuat data...</div>;
  }

  return (
    <div className="space-y-10">
      <Motion tag="div" initialX={-50} animateX={0} duration={0.3} className="pb-8 space-y-2 leading-relaxed text-justify border-b-2 border-gray/20">
        <h2 className="heading">Daftar Layanan & Fasilitas</h2>
        <p className="subheading">Layanan fasilitas terbaik untuk kesehatan Anda</p>
      </Motion>
      <div className="space-y-8">
        {data.map((item, sectionIndex) => (
          <Motion 
            key={item.id} 
            tag="div" 
            initialX={-50} 
            animateX={0} 
            duration={0.3 * sectionIndex} 
            delay={0.2 * sectionIndex} 
            className="grid grid-cols-2 gap-8 pb-6 border-b-2 border-gray/20"
          >
            <div className="space-y-6">
              <Img 
                src={activeIndex[sectionIndex] === 0 ? getImageUrl(item.foto_header) : getImageUrl(item.foto_lainnya)} 
                alt={item.nama_fasilitas} 
                className="w-full min-h-56" 
                cover 
              />
              <div className="flex justify-center gap-1 mt-12">
                {[item.foto_header, item.foto_lainnya].map((_, imageIndex) => (
                  <button
                    key={imageIndex}
                    onClick={() => handleImageChange(sectionIndex, imageIndex)}
                    className={`duration-300 min-w-3 min-h-3 rounded-full border-2 hover:bg-secondary ${
                      activeIndex[sectionIndex] === imageIndex ? "bg-secondary border-secondary" : "bg-light border-gray"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Link href={`/tentang-kami/layanan-fasilitas/${item.slug}/${item.id}`}>
                <h4 className="text-3xl font-semibold text-primary">{item.nama_fasilitas}</h4>
              </Link>
              <p className="leading-relaxed text-justify">
              {item.deskripsi_overview.length > 300 ? `${item.deskripsi_overview.slice(0, 300)}...` : item.deskripsi_overview}
              </p>
            </div>
          </Motion>
        ))}
      </div>
      <Pagination page={page} totalPage={totalPage} setPage={setPage} isNumber />
    </div>
  );
};
