"use client";

import * as React from "react";

import Link from "next/link";

import { useMediaQuery } from "@/hooks";

import { Button, Img, Motion, Slider } from "@/components";
import { FaArrowRightLong } from "react-icons/fa6";

export const Service = () => {
  const [page, setPage] = React.useState<number>(10);
  const [limit, setLimit] = React.useState<number>(3);
  const [totalPage, setTotalPage] = React.useState<number>(0);

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
  const isMobile = useMediaQuery("(min-width: 0px) and (max-width: 639px)");

  React.useEffect(() => {
    if (isDesktop) {
      setLimit(3);
    } else if (isTablet) {
      setLimit(2);
    } else if (isMobile) {
      setLimit(1);
    }
  }, [isDesktop, isTablet, isMobile]);

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
        loading={false}
      >
        {Array.from({ length: 3 }, (_, index) => (
          <Motion tag="div" initialY={30} animateY={0} duration={1} delay={index * 0.1} key={index} className="rounded-lg shadow-lg min-h-400 text-dark bg-light">
            <Img src={"/images/temp-2.png"} alt={"test"} className="w-full rounded-lg h-60" cover />
            <div className="px-4 my-4 space-y-4">
              <h4 className="text-xl font-semibold sm:text-2xl line-clamp-1">consectetur adipisicing</h4>
              <p className="text-sm line-clamp-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur, sapiente?</p>
              <Link href={`/`} className="block">
                <Button className="flex items-center gap-2 btn-primary group">
                  Learn More
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
