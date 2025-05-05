/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import Link from "next/link";
import { useMediaQuery } from "@/hooks";
import { Button, Img, Motion, Slider } from "@/components";
import { FaArrowRightLong } from "react-icons/fa6";
import { getLayananUnggulan } from "@/services/layanan-unggulan.service";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Fungsi helper untuk memformat URL gambar
const getImageUrl = (path: string) => {
  if (!path) return '/images/placeholder.jpg'; // gambar default jika path kosong
  if (path.startsWith('http')) return path; // jika sudah URL lengkap
  return `${BASE_URL}/storage/${path}`; // tambahkan /storage/ untuk akses file
};

// Fungsi untuk menormalisasi HTML dan membatasi karakter
const normalizeAndTruncateDescription = (html: string, maxLength: number = 200) => {
  // Hapus semua tag HTML
  const plainText = html.replace(/<[^>]+>/g, '');
  
  // Batasi karakter dan tambahkan ... jika melebihi batas
  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength).trim() + '...';
};

export const Service = () => {
  const [page, setPage] = React.useState<number>(1);
  const [limit, setLimit] = React.useState<number>(3);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>([]);
  const [totalPage, setTotalPage] = React.useState<number>(0);

  // Fungsi untuk mengambil data layanan unggulan
  const fetchLayananUnggulan = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await getLayananUnggulan(page, limit);
      setData(response.data.data);
      setTotalPage(response.data.last_page);
    } catch (error) {
      console.error('Error fetching layanan unggulan:', error);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  React.useEffect(() => {
    fetchLayananUnggulan();
  }, [fetchLayananUnggulan]);

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
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        loading={loading}
      >
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
            <Img 
              src={getImageUrl(item.foto)} 
              alt={item.nama_layanan} 
              className="w-full rounded-lg h-60" 
              cover 
            />
            <div className="px-4 my-4 space-y-4">
              <h4 className="text-xl font-semibold sm:text-2xl line-clamp-1">
                {item.nama_layanan}
              </h4>
              <p className="text-sm line-clamp-2">
                {normalizeAndTruncateDescription(item.deskripsi)}
              </p>
              <Link href={`/layanan/${item.slug}`} className="block">
                <Button className="flex items-center gap-2 btn-primary group">
                  Selengkapnya
                  <FaArrowRightLong className="-rotate-45" />
                </Button>
              </Link>
            </div>
          </Motion>
        ))}
      </Slider>
    </div>
  );
};
