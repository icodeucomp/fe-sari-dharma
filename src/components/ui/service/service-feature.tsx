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

      <h4 className="h-12 mt-2 text-base font-semibold sm:h-14 sm:text-lg text-dark line-clamp-2">{title}</h4>

      <Button onClick={() => router.push(`/media-informasi/form-management/${pathUrl}`)} className="flex items-center gap-2 mt-4 btn-outline group w-max">
        Lihat Form <GoArrowRight className="fill-primary group-hover:fill-light" size={20} />
      </Button>
    </>
  );
};

export const ServiceFeature = () => {
  const [page, setPage] = React.useState<number>(0);
  const [totalPage, setTotalPage] = React.useState<number>(10);

  React.useEffect(() => {
    if (page) {
      setTotalPage(page);
    }
  }, [page]);

  return (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* {articles?.data && articles?.data.length < 1 ? (
            <h3 className="w-full col-span-1 py-16 text-lg font-semibold text-center min-h-400 sm:text-2xl md:text-3xl sm:col-span-2 lg:col-span-3 text-gray/50">The articles is not found</h3>
          ) : (
            <> */}
        {[...Array(6)].map((_, index) => (
          <Motion tag="div" initialY={50} animateY={0} duration={0.5} delay={index * 0.1} key={index}>
            <Card title={"Surver Kepuasan"} pathUrl={formatKebabCase("survey kepuasan")} pathImg={"/images/temp-4.png"} />
          </Motion>
        ))}
        {/* </>
          )} */}
      </div>

      <Motion tag="div" initialY={50} animateY={0} duration={0.8} delay={0.4} className="relative flex justify-center pt-10">
        <Pagination page={page} totalPage={totalPage} setPage={setPage} isNumber />
      </Motion>
    </>
  );
};
