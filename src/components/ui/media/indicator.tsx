"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { Button, Img, Motion, Pagination } from "@/components";

import { GoArrowRight } from "react-icons/go";

import { formatKebabCase } from "@/utils";

const Card = ({ title, pathUrl, pathImg }: { pathImg: string; title: string; pathUrl: string }) => {
  const router = useRouter();
  return (
    <>
      <Img src={pathImg || "/images/temp-4.png"} alt={title} className="w-full rounded-lg h-60" cover />

      <h4 className="mt-2 text-base font-semibold sm:text-lg text-dark line-clamp-1">{title}</h4>

      <Button onClick={() => router.push(`/media-information/community-events/${pathUrl}`)} className="flex items-center gap-2 mt-4 btn-outline group w-max">
        Lihat Selengkapnya <GoArrowRight className="fill-primary group-hover:fill-light" size={20} />
      </Button>
    </>
  );
};

export const Indicators = () => {
  const [page, setPage] = React.useState<number>(0);
  const totalPage = page || 10;

  return (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <Motion tag="div" initialY={50} animateY={0} duration={0.5} delay={index * 0.1} key={index}>
            <Card title={"Indikator Mutu 2021"} pathUrl={formatKebabCase("quality-indicator-2021")} pathImg={"/images/temp-4.png"} />
          </Motion>
        ))}
      </div>

      <Motion tag="div" initialY={50} animateY={0} duration={0.8} delay={0.4} className="relative flex justify-center pt-10">
        <Pagination page={page} totalPage={totalPage} setPage={setPage} isNumber />
      </Motion>
    </>
  );
};
