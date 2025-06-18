"use client";

import * as React from "react";
import Link from "next/link";

// import { useMediaQuery } from "@/hooks";

import { Button, Img, Motion, Slider } from "@/components";
import { FaArrowRightLong } from "react-icons/fa6";

export const Healthy = () => {
  const [page, setPage] = React.useState<number>(10);
  // const [limit, setLimit] = React.useState<number>(3);

  // const isDesktop = useMediaQuery("(min-width: 1024px)");
  // const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
  // const isMobile = useMediaQuery("(min-width: 0px) and (max-width: 639px)");

  // React.useEffect(() => {
  //   if (isDesktop) {
  //     setLimit(3);
  //   } else if (isTablet) {
  //     setLimit(2);
  //   } else if (isMobile) {
  //     setLimit(1);
  //   }
  // }, [isDesktop, isTablet, isMobile]);

  return (
    <div className="bg-light-brown">
      <Slider
        page={page}
        setPage={setPage}
        title="Layanan Unggulan"
        description="Layanan kesehatan terjangkau dengan perawatan terbaik."
        totalPage={0}
        parentClassName="py-14 space-y-8"
        className="space-y-4"
        linkButton="/"
        loading={false}
      >
        {/* <Tab /> */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <Motion tag="div" initialY={30} animateY={0} duration={1} delay={index * 0.1} key={index} className="rounded-lg shadow-lg min-h-400 text-dark bg-light">
              <div className="relative">
                <h5 className="absolute bottom-0 left-0 px-4 py-1 text-sm z-1 text-light bg-secondary rounded-se-lg">*Berlaku s/d 31 Desember 2025</h5>
                <Img src={"/images/temp-2.png"} alt={"test"} className="w-full rounded-lg h-96" cover />
              </div>
              <div className="px-4 my-4 space-y-4">
                <h4 className="text-xl font-semibold sm:text-2xl line-clamp-1">consectetur adipisicing</h4>
                <p className="text-sm text-justify line-clamp-4">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur, sapiente? Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere harum nemo quod ad mollitia? Deserunt
                  dolor voluptas quis consequatur vel?
                </p>
                <Link href={`/`} className="block">
                  <Button className="flex items-center justify-center w-full gap-2 btn-primary group">
                    Lihat Paket
                    <FaArrowRightLong className="-rotate-45" />
                  </Button>
                </Link>
              </div>
            </Motion>
          ))}
        </div>
      </Slider>
    </div>
  );
};
