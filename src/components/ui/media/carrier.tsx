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
      <div className="relative text-light text-xs">
        <span className="absolute left-0 bottom-0 rounded-se-md py-2 px-4 bg-secondary z-1">Divisi Medis</span>
        <Img src={pathImg || "/images/temp-4.png"} alt={title} className="w-full h-60" cover />
      </div>

      <div className="p-4 space-y-2">
        <h4 className="text-base font-semibold sm:text-lg text-dark line-clamp-2">{title}</h4>
        <Button onClick={() => router.push(`/media-informasi/paket-promo/${pathUrl}`)} className="flex items-center justify-center gap-2 btn-primary w-full">
          Lihat Lowongan
          <GoArrowRight className="fill-light -rotate-45" size={20} />
        </Button>
      </div>
    </>
  );
};

export const Carriers = () => {
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
          <Motion tag="div" initialY={50} animateY={0} duration={0.5} delay={index * 0.1} key={index} className="border border-gray/50 rounded-md overflow-hidden">
            <Card
              title={"Pelatihan CT Scan dan MRI dalam Mendeteksi Kerusakan Otak"}
              pathUrl={formatKebabCase("Pelatihan CT Scan dan MRI dalam Mendeteksi Kerusakan Otak")}
              pathImg={"/images/temp-4.png"}
            />
          </Motion>
        ))}
        {/* </>
          )} */}
      </div>

      <Motion tag="div" initialX={50} animateX={0} duration={0.8} delay={0.4} className="relative flex justify-center pt-10">
        <Pagination page={page} totalPage={totalPage} setPage={setPage} isNumber />
      </Motion>
    </>
  );
};
