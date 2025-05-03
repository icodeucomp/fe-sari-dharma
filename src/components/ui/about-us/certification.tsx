'use client';

import { Button, Img, Motion, Slider } from "@/components";
import Link from "next/link";
import Icon from '@mdi/react';
import { mdiFileDocumentOutline } from '@mdi/js';
import { useCallback, useEffect, useState } from "react";
import { getSertifikasiPenghargaan } from "@/services/sertifikasi-penghargaan.service";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Helper function untuk mendapatkan URL gambar
 */
const getImageUrl = (path: string) => {
  if (!path) return '/images/placeholder.jpg';
  if (path.startsWith('http')) return path;
  return `${BASE_URL}/storage/${path}`;
};

export const Certification = () => {
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(3);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [totalPage, setTotalPage] = useState<number>(0);

  const fetchSertifikasi = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getSertifikasiPenghargaan(page, limit);
      setData(response.data.data);
      setTotalPage(response.data.last_page);
    } catch (error) {
      console.error('Error fetching sertifikasi:', error);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchSertifikasi();
  }, [fetchSertifikasi]);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Motion tag="h4" initialX={-50} animateX={0} duration={0.3} className="heading">
          Sertifikasi & Penghargaan
        </Motion>
      </div>
      <Slider
        page={page}
        setPage={setPage}
        totalPage={totalPage}
        parentClassName="space-y-8"
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
            className="rounded-lg text-dark bg-light"
          >
            <Img 
              src={getImageUrl(item.foto)} 
              alt={item.judul} 
              className="w-full rounded-lg h-52" 
              cover 
            />
            <div className="my-4 space-y-4">
              <h4 className="text-xl font-semibold line-clamp-2">{item.judul}</h4>
              <div className="flex gap-2">
                <Link href={`/sertifikasi/${item.slug}`} className="block">
                  <Button className="flex items-center gap-2 btn-primary group">View Details</Button>
                </Link>
              </div>
            </div>
          </Motion>
        ))}
      </Slider>
    </div>
  );
};
