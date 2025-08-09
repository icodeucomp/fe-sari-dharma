"use client";

import { useEffect, useState } from "react";
import { getLayananUnggulan } from "@/services/layanan-unggulan.service";

import Link from "next/link";

import { Img, Motion } from "@/components";

import { LuTag } from "react-icons/lu";

import { convertDate, formatKebabCase } from "@/utils";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface Layanan {
  id: string | number;
  nama_layanan: string;
  deskripsi: string;
  foto: string;
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

const RecommendationEvent = ({ layanan, loading, error }: { layanan: Layanan[] | null; error: string | null; loading: boolean }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Icon path={mdiLoading} size={2} className="animate-spin text-primary" />
      </div>
    );
  }

  if (error || !layanan) {
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
        {layanan?.map((item, index) => (
          <Motion tag="div" initialY={50} animateY={0} duration={0.5} delay={index * 0.1} key={index} className="pb-4 space-y-2 border-b border-gray/30">
            <Img src={getImageUrl(item.foto) || "/images/temp-5.png"} alt="temp" className="w-full min-h-60" cover />
            <span className="flex items-center gap-2 px-4 py-2 text-xs rounded-md w-max bg-secondary text-light">
              <LuTag size={16} />
              Layanan Kesehatan
            </span>
            <div className="space-y-1 text-dark">
              <span className="text-sm font-light">{convertDate(item.created_at)}</span>
              <Link href={`/media-informasi/artikel-kesehatan/${formatKebabCase("Peran CT Scan dan MRI dalam Mendeteksi Stroke")}`}>
                <h3 className="font-semibold line-clamp-2">{item.nama_layanan}</h3>
              </Link>
            </div>
          </Motion>
        ))}
      </div>
    </div>
  );
};

export const Recommendation = () => {
  const [layanan, setLayanan] = useState<Layanan[] | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLayananDetail = async () => {
      try {
        setLoading(true);
        const response = await getLayananUnggulan(1, 999999);
        setLayanan(response.data.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching layanan detail:", err);
        setError("Failed to load layanan. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLayananDetail();
  }, []);
  return (
    <div className="pb-8 pr-2 space-y-4">
      <RecommendationEvent layanan={layanan} error={error} loading={loading} />
    </div>
  );
};
