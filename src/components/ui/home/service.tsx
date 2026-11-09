"use client";

import * as React from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Link from "next/link";
import { useResponsiveLimit } from "@/hooks";
import { Button, Img, Motion, Slider } from "@/components";
import { FaArrowRightLong } from "react-icons/fa6";
import { getFeaturedService } from "@/services/featured-service.service";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const getImageUrl = (path: string) => {
  if (!path) return "/images/placeholder.jpg";
  if (path.startsWith("http")) return path;
  return `${BASE_URL}/storage/${path}`;
};

const normalizeAndTruncateDescription = (html: string, maxLength: number = 200) => {
  const plainText = html.replace(/<[^>]+>/g, "");

  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength).trim() + "...";
};

export const Service = () => {
  const [page, setPage] = React.useState<number>(1);
  const limit = useResponsiveLimit();
  const { data: response, isLoading: loading } = useQuery({
    queryKey: ["getFeaturedService", page, limit],
    queryFn: () => getFeaturedService(page, limit),
    placeholderData: keepPreviousData,
  });
  const data = response?.data.data ?? [];
  const totalPage = response?.data.last_page ?? 0;

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
        emptyTitle="Belum ada layanan unggulan"
        emptyDescription="Layanan unggulan klinik akan segera ditampilkan di sini."
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
            <Img src={getImageUrl(item.photo)} alt={item.name} className="w-full rounded-lg h-60" cover />
            <div className="px-4 my-4 space-y-4">
              <h4 className="text-xl font-semibold sm:text-2xl line-clamp-1">{item.name}</h4>
              <p className="text-sm line-clamp-2">{normalizeAndTruncateDescription(item.description)}</p>
              <Link href={`/featured-services/${item.slug}/${item.id}`} className="block">
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
