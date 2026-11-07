"use client";

import { useQuery } from "@tanstack/react-query";
import { getFeaturedService } from "@/services/featured-service.service";

import Link from "next/link";

import { Img, Motion } from "@/components";

import { LuTag } from "react-icons/lu";

import { convertDate } from "@/utils";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface Service {
  id: string | number;
  name: string;
  description: string;
  photo: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

const getImageUrl = (path: string) => {
  if (!path) return "/images/placeholder.jpg";
  if (path.startsWith("http")) return path;

  const debug = `${BASE_URL}/storage/${path}`;
  return debug;
};

const RecommendationEvent = ({ service, loading, error }: { service: Service[] | null; error: string | null; loading: boolean }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Icon path={mdiLoading} size={2} className="animate-spin text-primary" />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error || "Data tidak ditemukan"}</p>
      </div>
    );
  }
  return (
    <div className="space-y-4 divide-y-2 divide-primary">
      <Motion tag="h4" initialY={50} animateY={0} duration={0.5} className="text-xl font-semibold text-primary">
        Layanan Unggulan Lainnya
      </Motion>
      <div className="pt-4 space-y-4">
        {service?.map((item, index) => (
          <Motion tag="div" initialY={50} animateY={0} duration={0.5} delay={index * 0.1} key={index} className="pb-4 space-y-2 border-b border-gray/30">
            <Img src={getImageUrl(item.photo) || "/images/temp-5.png"} alt="temp" className="w-full min-h-60" cover />
            <span className="flex items-center gap-2 px-4 py-2 text-xs rounded-md w-max bg-secondary text-light">
              <LuTag size={16} />
              Layanan Kesehatan
            </span>
            <div className="space-y-1 text-dark">
              <span className="text-sm font-light">{convertDate(item.created_at)}</span>
              <Link href={`/featured-services/${item.slug}/${item.id}`}>
                <h3 className="font-semibold line-clamp-2">{item.name}</h3>
              </Link>
            </div>
          </Motion>
        ))}
      </div>
    </div>
  );
};

export const Recommendation = () => {
  const {
    data: service,
    isLoading: loading,
    isError,
  } = useQuery({
    queryKey: ["featured-services", "all"],
    queryFn: () => getFeaturedService(1, 999999),
    select: (response) => response.data.data as Service[],
  });
  const error = isError ? "Failed to load layanan. Please try again later." : null;
  return (
    <div className="pb-8 pr-2 space-y-4">
      <RecommendationEvent service={service ?? null} error={error} loading={loading} />
    </div>
  );
};
