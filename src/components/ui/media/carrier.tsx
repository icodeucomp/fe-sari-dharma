/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { Button, Img, Motion, Pagination } from "@/components";
import { GoArrowRight } from "react-icons/go";
import { getKarir } from "@/services/karir.service";

// Helper function untuk URL gambar
const getImageUrl = (path: string) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  if (!path) return "/images/temp-4.png";
  if (path.startsWith("http")) return path;
  return `${BASE_URL}/storage/${path}`;
};

const Card = ({ divisi, posisi, pathUrl, pathImg }: { pathImg: string; divisi: string; posisi: string; pathUrl: string }) => {
  return (
    <>
      <div className="relative text-light text-xs">
        <span className="absolute left-0 bottom-0 rounded-se-md py-2 px-4 bg-secondary z-1">{divisi}</span>
        <Img src={getImageUrl(pathImg)} alt={posisi} className="w-full h-60" cover />
      </div>

      <div className="p-4 space-y-2">
        <h4 className="text-base font-semibold sm:text-lg text-dark line-clamp-2">{posisi}</h4>
        <Button onClick={() => window.open(pathUrl, "_blank")} className="flex items-center justify-center gap-2 btn-primary w-full">
          Lihat Lowongan
          <GoArrowRight className="fill-light -rotate-45" size={20} />
        </Button>
      </div>
    </>
  );
};

export const Carriers = () => {
  const [page, setPage] = React.useState<number>(1);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>([]);
  const [totalPage, setTotalPage] = React.useState<number>(0);

  // Fungsi untuk mengambil data karir
  const fetchKarir = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await getKarir({
        page,
        per_page: 6,
      });
      setData(response.data.data);
      setTotalPage(response.data.last_page);
    } catch (error) {
      console.error("Error fetching karir:", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  React.useEffect(() => {
    fetchKarir();
  }, [fetchKarir]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data.length === 0 ? (
          <h3 className="w-full col-span-1 py-16 text-lg font-semibold text-center min-h-400 sm:text-2xl md:text-3xl sm:col-span-2 lg:col-span-3 text-gray/50">Lowongan tidak ditemukan</h3>
        ) : (
          <>
            {data.map((item: any, index: number) => (
              <Motion tag="div" initialY={50} animateY={0} duration={0.5} delay={index * 0.1} key={item.id} className="border border-gray/50 rounded-md overflow-hidden">
                <Card divisi={item.divisi} posisi={item.posisi} pathUrl={item.link_pendaftaran} pathImg={item.foto} />
              </Motion>
            ))}
          </>
        )}
      </div>

      <Motion tag="div" initialY={50} animateY={0} duration={0.8} delay={0.4} className="relative flex justify-center pt-10">
        <Pagination page={page} totalPage={totalPage} setPage={setPage} isNumber />
      </Motion>
    </>
  );
};
