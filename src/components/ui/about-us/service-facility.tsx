"use client";

import * as React from "react";

import { Img, Motion, Pagination } from "@/components";
import Link from "next/link";
import { formatKebabCase } from "@/utils";

const sections = [
  {
    title: "Instalasi Gawat Darurat",
    images: ["/images/home.webp", "/images/ambulance-car.webp", "/images/ambulance.webp"],
  },
  {
    title: "Ruang Rawat Inap",
    images: ["/images/home.webp", "/images/ambulance-car.webp", "/images/ambulance.webp"],
  },
  {
    title: "Ruang USG 4D",
    images: ["/images/home.webp", "/images/ambulance-car.webp", "/images/ambulance.webp"],
  },
];

export const ServiceFacility = () => {
  const [page, setPage] = React.useState<number>(0);
  const [totalPage, setTotalPage] = React.useState<number>(10);

  const [activeIndex, setActiveIndex] = React.useState<number[]>(new Array(sections.length).fill(0));

  const handleImageChange = (sectionIndex: number, imageIndex: number) => {
    setActiveIndex((prevIndexes) => {
      const newIndexes = [...prevIndexes];
      newIndexes[sectionIndex] = imageIndex;
      return newIndexes;
    });
  };

  return (
    <div className="space-y-10">
      <Motion tag="div" initialX={-50} animateX={0} duration={0.3} className="pb-8 space-y-2 leading-relaxed text-justify border-b-2 border-gray/20">
        <h2 className="heading">Daftar Layanan & Fasilitas</h2>
        <p className="subheading">Urna molestie maximus etiam tempus ipsum conubia lacus integer duis.</p>
      </Motion>
      <div className="space-y-8">
        {sections.map((item, sectionIndex) => (
          <Motion key={sectionIndex} tag="div" initialX={-50} animateX={0} duration={0.3 * sectionIndex} delay={0.2 * sectionIndex} className="grid grid-cols-2 gap-8 pb-6 border-b-2 border-gray/20">
            <div className="space-y-6">
              <Img src={item.images[activeIndex[sectionIndex]]} alt="temp" className="w-full min-h-56" cover />
              <div className="flex justify-center gap-1 mt-12">
                {item.images.map((_, imageIndex) => (
                  <button
                    key={imageIndex}
                    onClick={() => handleImageChange(sectionIndex, imageIndex)}
                    className={`duration-300 min-w-3 min-h-3 rounded-full border-2 hover:bg-secondary ${
                      activeIndex[sectionIndex] === imageIndex ? "bg-secondary border-secondary" : "bg-light border-gray"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Link href={`/tentang-kami/layanan-fasilitas/${formatKebabCase(item.title)}`}>
                <h4 className="text-3xl font-semibold text-primary">{item.title}</h4>
              </Link>
              <p className="leading-relaxed text-justify">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, quo. Et fuga amet necessitatibus modi aliquid aliquam culpa totam, vitae optio laborum ullam neque nulla vero rerum
                expedita laudantium ducimus, labore at illum velit eligendi quam. Assumenda ad veritatis impedit?
              </p>
            </div>
          </Motion>
        ))}
      </div>
      <Pagination page={page} totalPage={totalPage} setPage={setPage} isNumber />
    </div>
  );
};
