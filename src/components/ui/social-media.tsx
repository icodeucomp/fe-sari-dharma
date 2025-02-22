"use client";

import * as React from "react";
import { Motion, Slider, Container } from "@/components";
import { useMediaQuery } from "@/hooks";

export const MediaContent = () => {
  const [page, setPage] = React.useState<number>(10);
  const [limit, setLimit] = React.useState<number>(3);
  const [totalPage, setTotalPage] = React.useState<number>(0);

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
  const isMobile = useMediaQuery("(min-width: 0px) and (max-width: 639px)");

  React.useEffect(() => {
    if (page && limit) {
      setTotalPage(page);
    }
  }, [page, limit]);

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
    <Slider
      page={page}
      setPage={setPage}
      title="Layanan Unggulan"
      description="Layanan kesehatan terjangkau dengan perawatan terbaik."
      totalPage={totalPage}
      parentClassName="space-y-8"
      className="grid grid-cols-3 grid-rows-2 gap-8"
      loading={false}
    >
      {Array.from({ length: 3 }, (_, index) => (
        <Motion tag="div" initialY={30} animateY={0} duration={1} delay={index * 0.1} key={index} className={`card-shadow min-h-200 text-dark bg-light ${index === 0 && "row-span-2 col-span-2"}`}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium ducimus voluptate, obcaecati tempore alias nesciunt soluta commodi illo nostrum placeat ipsa quos deleniti, vel
          praesentium id blanditiis minus mollitia provident similique vero laborum maiores earum corrupti. Voluptatibus quia, doloremque maiores, ab, dolores vitae fugiat quaerat architecto facere
          ipsa alias quasi.
        </Motion>
      ))}
    </Slider>
  );
};

export const SocialMedia = () => {
  const [activeTab, setActiveTab] = React.useState<"youtube" | "instagram">("youtube");

  return (
    <div className="bg-primary/10 pb-20">
      <Container className="py-8 space-y-8">
        <div className="flex py-4 overflow-hidden rounded-md">
          <button
            className={`border w-full relative font-semibold rounded-s-md py-2 ${activeTab === "youtube" ? "bg-primary text-light border-primary" : "text-gray bg-light border-gray/50"}`}
            onClick={() => setActiveTab("youtube")}
          >
            YouTube
            <i className={`absolute rotate-45 -translate-x-1/2 -bottom-2 size-4 bg-primary left-1/2 ${activeTab === "youtube" ? "block" : "hidden"}`}></i>
          </button>
          <button
            className={`border w-full relative font-semibold rounded-e-md py-2 ${activeTab === "instagram" ? "bg-primary text-light border-primary" : "text-gray bg-light border-gray/50"}`}
            onClick={() => setActiveTab("instagram")}
          >
            Instagram
            <i className={`absolute rotate-45 -translate-x-1/2 -bottom-2 size-4 bg-primary left-1/2 ${activeTab === "instagram" ? "block" : "hidden"}`}></i>
          </button>
        </div>
      </Container>

      {activeTab === "youtube" && <MediaContent />}

      {activeTab === "instagram" && <MediaContent />}
    </div>
  );
};
