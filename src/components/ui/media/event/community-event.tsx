"use client";

import * as React from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

import { Button, Img, Motion, Pagination } from "@/components";

import { GoArrowRight } from "react-icons/go";
import { IoCalendarOutline } from "react-icons/io5";

import { convertDate } from "@/utils";
import { getCommunityEvent } from "@/services/community-event.service";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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

      <Button onClick={() => router.push(`/media-information/community-events/${pathUrl}/${id}`)} className="flex items-center gap-2 mt-4 btn-outline group w-max">
        Lihat <GoArrowRight className="fill-primary group-hover:fill-light" size={20} />
      </Button>
    </>
  );
};

export const EventsCommunities = () => {
  const [page, setPage] = React.useState<number>(1);
  const [limit] = React.useState<number>(6);
  const { data: response, isLoading: loading } = useQuery({
    queryKey: ["getCommunityEvent", page, limit],
    queryFn: () => getCommunityEvent(page, limit),
    placeholderData: keepPreviousData,
  });
  const data = response?.data.data ?? [];
  const totalPage = response?.data.last_page ?? 0;

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
              <Card date={item.created_at} title={item.title} pathUrl={item.slug} pathImg={getImageUrl(item.photo)} id={item.id} />
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
