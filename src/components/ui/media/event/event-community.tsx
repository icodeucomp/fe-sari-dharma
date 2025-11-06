/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { Button, Img, Motion, Pagination } from "@/components";

import { GoArrowRight } from "react-icons/go";
import { IoCalendarOutline } from "react-icons/io5";

import { convertDate } from "@/utils";
import { getEventCommunity } from "@/services/event-community.service";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper function untuk URL gambar
const getImageUrl = (path: string) => {
  if (!path) return "/images/placeholder.jpg";
  if (path.startsWith("http")) return path;
  return `${BASE_URL}/storage/${path}`;
};

const Card = ({ date, title, pathUrl, pathImg, id }: { pathImg: string; date: string; title: string; pathUrl: string; id: string }) => {
  const router = useRouter();
  return (
    <>
      <Img src={pathImg || "/images/placeholder.png"} alt={title} className="w-full rounded-lg h-60" cover />
      <div className="flex items-center gap-1 mt-2 text-xs sm:text-sm text-gray">
        <IoCalendarOutline />
        {convertDate(date)}
      </div>
      <h4 className="h-12 mt-2 text-base font-semibold sm:h-14 sm:text-lg text-dark line-clamp-2">{title}</h4>

      <Button onClick={() => router.push(`/media-informasi/event-community/${pathUrl}/${id}`)} className="flex items-center gap-2 mt-4 btn-outline group w-max">
        Lihat <GoArrowRight className="fill-primary group-hover:fill-light" size={20} />
      </Button>
    </>
  );
};

export const EventsCommunities = () => {
  const [page, setPage] = React.useState<number>(1);
  const [limit] = React.useState<number>(6);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>([]);
  const [totalPage, setTotalPage] = React.useState<number>(0);

  // Fungsi untuk mengambil data event community
  const fetchEventCommunity = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await getEventCommunity(page, limit);
      setData(response.data.data);
      setTotalPage(response.data.last_page);
    } catch (error) {
      console.error("Error fetching event community:", error);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  React.useEffect(() => {
    fetchEventCommunity();
  }, [fetchEventCommunity]);

  return (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <h3 className="w-full col-span-1 py-16 text-lg font-semibold text-center min-h-400 sm:text-2xl md:text-3xl sm:col-span-2 lg:col-span-3 text-gray/50">Loading...</h3>
        ) : data.length < 1 ? (
          <h3 className="w-full col-span-1 py-16 text-lg font-semibold text-center min-h-400 sm:text-2xl md:text-3xl sm:col-span-2 lg:col-span-3 text-gray/50">Event tidak ditemukan</h3>
        ) : (
          data.map((item: any, index: number) => (
            <Motion tag="div" initialY={50} animateY={0} duration={0.5} delay={index * 0.1} key={item.id}>
              <Card date={item.created_at} title={item.judul} pathUrl={item.slug} pathImg={getImageUrl(item.foto)} id={item.id} />
            </Motion>
          ))
        )}
      </div>

      <Motion tag="div" initialY={50} animateY={0} duration={0.8} delay={0.4} className="relative flex justify-center pt-10">
        <Pagination page={page} totalPage={totalPage} setPage={setPage} isNumber />
      </Motion>
    </>
  );
};
