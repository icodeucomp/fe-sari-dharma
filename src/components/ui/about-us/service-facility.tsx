"use client";

import * as React from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { EmptyState, Img, LoadingState, Motion, Pagination } from "@/components";
import Link from "next/link";
import { getFacilityService } from "@/services/facility-service.service";

const getImageUrl = (path: string) => {
  if (!path) return "/images/placeholder.jpg";
  if (path.startsWith("http")) return path;
  return `${process.env.NEXT_PUBLIC_API_URL}/storage/${path}`;
};

export const ServiceFacility = () => {
  const [page, setPage] = React.useState<number>(1);
  const [limit] = React.useState<number>(10);
  const { data: response, isLoading: loading } = useQuery({
    queryKey: ["getFacilityService", page, limit],
    queryFn: () => getFacilityService(page, limit),
    placeholderData: keepPreviousData,
  });
  const data: any[] = response?.data.data ?? [];
  const totalPage = response?.data.last_page ?? 1;
  const [activeIndex, setActiveIndex] = React.useState<Record<number, number>>({});

  const handleImageChange = (sectionIndex: number, imageIndex: number) => {
    setActiveIndex((prev) => ({ ...prev, [sectionIndex]: imageIndex }));
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-10">
      <Motion tag="div" initialY={-50} animateY={0} duration={0.3} className="pb-8 space-y-2 leading-relaxed text-justify border-b-2 border-gray/20">
        <h2 className="heading">Daftar Layanan & Fasilitas</h2>
        <p className="subheading">Layanan fasilitas terbaik untuk kesehatan Anda</p>
      </Motion>
      <div className="space-y-8">
        {data.length === 0 && <EmptyState title="Belum ada layanan & fasilitas" description="Daftar layanan dan fasilitas klinik akan segera tersedia." />}
        {data.map((item, sectionIndex) => (
          <Motion
            key={item.id}
            tag="div"
            initialY={-50}
            animateY={0}
            duration={0.2 * sectionIndex}
            delay={0.01 * sectionIndex}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-6 border-b-2 border-gray/20"
          >
            <div className="space-y-6">
              <Img src={activeIndex[sectionIndex] === 0 ? getImageUrl(item.header_photo) : getImageUrl(item.other_photo)} alt={item.name} className="w-full min-h-56" cover />
              <div className="flex justify-center gap-1 mt-12">
                {[item.header_photo, item.other_photo].map((_, imageIndex) => (
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
              <Link href={`/about-us/facility-services/${item.slug}/${item.id}`}>
                <h4 className="text-2xl sm:text-3xl font-semibold text-primary">{item.name}</h4>
              </Link>
              <p className="leading-relaxed text-justify text-sm sm:text-base">{item.overview_description.length > 300 ? `${item.overview_description.slice(0, 300)}...` : item.overview_description}</p>
            </div>
          </Motion>
        ))}
      </div>
      <Pagination page={page} totalPage={totalPage} setPage={setPage} isNumber />
    </div>
  );
};
