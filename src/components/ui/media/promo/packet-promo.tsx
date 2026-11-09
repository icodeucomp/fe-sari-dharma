"use client";

import * as React from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button, EmptyState, Img, LoadingState, Motion, Pagination } from "@/components";
import { GoArrowRight } from "react-icons/go";
import { getHealthPackage } from "@/services/health-package.service";
import moment from "moment";

const getImageUrl = (path: string) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  if (!path) return "/images/temp-4.png";
  if (path.startsWith("http")) return path;
  return `${BASE_URL}/storage/${path}`;
};

const Card = ({
  id,
  title,
  description,
  pathUrl,
  pathImg,
  expiredDate,
}: {
  id: string;
  pathImg: string;
  title: string;
  description: string;
  pathUrl: string;
  expiredDate: string;
}) => {
  const router = useRouter();
  return (
    <>
      <div className="relative text-light text-xs">
        <span className="absolute left-0 bottom-0 rounded-se-md py-2 px-4 bg-secondary z-1">
          *Berlaku s/d {moment(expiredDate).format("DD MMMM YYYY")}
        </span>
        <Img src={getImageUrl(pathImg)} alt={title} className="w-full h-60" cover />
      </div>

      <div className="p-4 space-y-2">
        <h4 className="h-12 text-base font-semibold sm:h-14 sm:text-lg text-dark line-clamp-2">{title}</h4>

        <p className="text-gray leading-snug sm:leading-normal line-clamp-5 text-sm text-justify">{description}</p>

        <Button
          onClick={() => router.push(`/media-information/promo-packages/${pathUrl}/${id}`)}
          className="flex items-center justify-center gap-2 btn-primary w-full"
        >
          Lihat Paket <GoArrowRight className="fill-light -rotate-45" size={20} />
        </Button>
      </div>
    </>
  );
};

export const PacketsPromos = () => {
  const [page, setPage] = React.useState<number>(1);
  const { data: response, isLoading: loading } = useQuery({
    queryKey: ["getHealthPackage", page],
    queryFn: () => getHealthPackage({ page, per_page: 6, promo: true }),
    placeholderData: keepPreviousData,
  });
  const data = response?.data.data ?? [];
  const totalPage = response?.data.last_page ?? 0;

  if (loading) {
    return <LoadingState />;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data.length === 0 ? (
          <EmptyState title="Belum ada paket promo" description="Paket dan promo kesehatan terbaru akan ditampilkan di sini." />
        ) : (
          <>
            {data.map((item: any, index: number) => (
              <Motion
                tag="div"
                initialY={50}
                animateY={0}
                duration={0.5}
                delay={index * 0.1}
                key={item.id}
                className="border border-gray/50 rounded-md overflow-hidden"
              >
                <Card
                  id={item.id}
                  title={item.name}
                  description={item.description}
                  pathUrl={item.slug}
                  pathImg={item.photo}
                  expiredDate={item.valid_until}
                />
              </Motion>
            ))}
          </>
        )}
      </div>

      <Motion tag="div" initialY={50} animateY={0} duration={0.8} delay={0.4} className="relative flex justify-center pt-10">
        <Pagination page={page} totalPage={totalPage} setPage={setPage} isNumber />
      </Motion>
    </>
  );
};
