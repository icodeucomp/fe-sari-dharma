"use client";

import { Button, Img, Motion, Slider } from "@/components";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { getCertificationAward } from "@/services/certification-award.service";
import { useResponsiveLimit } from "@/hooks";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const getImageUrl = (path: string) => {
  if (!path) return "/images/placeholder.jpg";
  if (path.startsWith("http")) return path;
  return `${BASE_URL}/storage/${path}`;
};

export const Certification = () => {
  const [page, setPage] = useState<number>(1);
  const limit = useResponsiveLimit();
  const { data: response, isLoading: loading } = useQuery({
    queryKey: ["getCertificationAward", page, limit],
    queryFn: () => getCertificationAward(page, limit),
    placeholderData: keepPreviousData,
  });
  const data = response?.data.data ?? [];
  const totalPage = response?.data.last_page ?? 0;

  return (
    <Slider
      title="Sertifikasi & Penghargaan"
      description="Explore our certifications and awards"
      page={page}
      setPage={setPage}
      totalPage={totalPage}
      parentClassName="space-y-8 px-0!"
      className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
      loading={loading}
      emptyTitle="Belum ada sertifikasi atau penghargaan"
      emptyDescription="Sertifikasi dan penghargaan klinik akan ditampilkan di sini."
    >
      {data.map((item: any, index: number) => (
        <Motion tag="div" initialY={30} animateY={0} duration={1} delay={index * 0.1} key={item.id} className="rounded-lg text-dark bg-light">
          <Img src={getImageUrl(item.photo)} alt={item.title} className="w-full rounded-lg h-52" cover />
          <div className="my-4 space-y-4">
            <h4 className="text-xl font-semibold line-clamp-2">{item.title}</h4>
            <div className="flex gap-2">
              <Link href="#" className="block">
                <Button className="flex items-center gap-2 btn-primary group">View Details</Button>
              </Link>
            </div>
          </div>
        </Motion>
      ))}
    </Slider>
  );
};
