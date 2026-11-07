"use client";

import * as React from "react";


import { Motion, Slider } from "@/components";
import { convertDate } from "@/utils";

export const Review = () => {
  const [page, setPage] = React.useState<number>(10);
  const totalPage = page;

  return (
    <Slider
      page={page}
      setPage={setPage}
      title="Apa kata mereka tentang kami?"
      description="Simak pengalaman mereka yang telah memilih layanan kami."
      totalPage={totalPage}
      parentClassName="py-14 space-y-8"
      className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
      loading={false}
    >
      {Array.from({ length: 3 }, (_, index) => (
        <Motion tag="div" initialY={30} animateY={0} duration={1} delay={index * 0.1} key={index} className="rounded-lg p-4 space-y-2 shadow-md border border-gray/10 text-dark bg-light">
          <small className="text-gray">{convertDate("2025-03-25")}</small>
          <h4 className="text-base font-semibold sm:text-lg line-clamp-1 text-primary">consectetur adipisicing</h4>
          <p className="text-sm line-clamp-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur, sapiente? Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum qui eaque nostrum facere ipsum ullam maiores
            beatae quaerat illo eos!
          </p>
        </Motion>
      ))}
    </Slider>
  );
};
