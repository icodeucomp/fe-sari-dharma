"use client";

import * as React from "react";
import Link from "next/link";
import { useMediaQuery } from "@/hooks";
import { Button, Img, Motion, Slider } from "@/components";
import { FaArrowRightLong } from "react-icons/fa6";
import { getPaketKesehatan } from "@/services/paket-kesehatan.service";
import moment from "moment";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper function untuk URL gambar
const getImageUrl = (path: string) => {
  if (!path) return '/images/placeholder.jpg';
  if (path.startsWith('http')) return path;
  return `${BASE_URL}/storage/${path}`;
};

export const Healthy = () => {
  const [page, setPage] = React.useState<number>(1);
  const [limit, setLimit] = React.useState<number>(3);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>([]);
  const [totalPage, setTotalPage] = React.useState<number>(0);

  // Fungsi untuk mengambil data paket kesehatan
  const fetchPaketKesehatan = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await getPaketKesehatan({
        page,
        per_page: limit,
        promo: true // hanya ambil yang promo
      });
      setData(response.data.data);
      setTotalPage(response.data.last_page);
    } catch (error) {
      console.error('Error fetching paket kesehatan:', error);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  React.useEffect(() => {
    fetchPaketKesehatan();
  }, [fetchPaketKesehatan]);

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
  const isMobile = useMediaQuery("(min-width: 0px) and (max-width: 639px)");

  React.useEffect(() => {
    if (isDesktop) {
      setLimit(3);
    } else if (isTablet) {
      setLimit(2);
    } else if (isMobile) {
      setLimit(1);
    }
  }, [isDesktop, isTablet, isMobile]);

  return (
    <div className="bg-light-brown">
      <Slider
        page={page}
        setPage={setPage}
        title="Layanan Unggulan"
        description="Layanan kesehatan terjangkau dengan perawatan terbaik."
        totalPage={totalPage}
        parentClassName="py-14 space-y-8"
        className="space-y-4"
        loading={loading}
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((item: any, index: number) => (
            <Motion 
              tag="div" 
              initialY={30} 
              animateY={0} 
              duration={1} 
              delay={index * 0.1} 
              key={item.id} 
              className="rounded-lg shadow-lg min-h-400 text-dark bg-light"
            >
              <div className="relative">
                <h5 className="absolute bottom-0 left-0 px-4 py-1 text-sm z-1 text-light bg-secondary rounded-se-lg">
                  *Berlaku s/d {moment(item.berlaku_sampai).format('DD MMMM YYYY')}
                </h5>
                <Img 
                  src={getImageUrl(item.foto)} 
                  alt={item.nama_paket} 
                  className="w-full rounded-lg h-96" 
                  cover 
                />
              </div>
              <div className="px-4 my-4 space-y-4">
                <h4 className="text-xl font-semibold sm:text-2xl line-clamp-1">
                  {item.nama_paket}
                </h4>
                <p className="text-sm text-justify line-clamp-4">
                  {item.deskripsi}
                </p>
                <Link href={`/media-informasi/paket-promo/${item.slug}/${item.id}`} className="block">
                  <Button className="flex items-center justify-center w-full gap-2 btn-primary group">
                    Lihat Paket
                    <FaArrowRightLong className="-rotate-45" />
                  </Button>
                </Link>
              </div>
            </Motion>
          ))}
        </div>
      </Slider>
    </div>
  );
};
