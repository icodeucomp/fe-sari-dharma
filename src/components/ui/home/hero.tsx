"use client";

import * as React from "react";

import { Background, Img, Motion } from "@/components";

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

export const Hero = () => {
  const images: string[] = ["/images/home.webp", "/images/ambulance-car.webp", "/images/ambulance.webp"];
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <Background src={images[currentSlide]} alt="hero background" imgClassName="object-cover object-center" className="flex items-center justify-center min-h-500">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-primary/40 to-secondary/40"></div>
        <div className="relative w-full max-w-screen-xl px-4 mx-auto text-center sm:px-8">
          <Motion tag="h1" initialX={-50} animateX={0} duration={0.3} className="max-w-xl mx-auto text-3xl font-semibold leading-snug md:text-4xl lg:text-5xl">
            Feel Better About Finding HealthCare
          </Motion>
          <Motion tag="p" initialX={-50} animateX={0} duration={0.5} delay={0.3} className="mt-4 text-base sm:text-lg md:text-xl">
            Klinik Utama Rawat Inap Sari Dharma
          </Motion>
          <div className="flex justify-center gap-1 mt-12">
            {images.map((_, index) => (
              <button key={index} className={`duration-300 min-w-3 min-h-3 rounded-full hover:bg-secondary ${currentSlide === index ? "bg-secondary" : "bg-light"}`} />
            ))}
          </div>
          <button onClick={prevSlide} className="absolute z-10 -translate-y-1/2 top-20 left-8 text-dark">
            <SlArrowLeft size={50} className="fill-light" />
          </button>
          <button onClick={nextSlide} className="absolute z-10 -translate-y-1/2 top-20 right-8 text-dark">
            <SlArrowRight size={50} className="fill-light" />
          </button>
        </div>
      </Background>
      <div className="w-full bg-secondary text-light">
        <div className="flex justify-center w-full max-w-screen-lg mx-auto">
          <div className="flex items-center justify-between w-full gap-4 p-4 bg-primary">
            <p className="text-lg font-semibold">Temukan Dokter</p>
            <Img src="/icons/doctor.svg" alt="icon doctor" className="size-8" cover />
          </div>
          <div className="flex items-center justify-between w-full gap-4 p-4 bg-secondary">
            <p className="text-lg font-semibold">Buat Janji Temu</p>
            <Img src="/icons/appointment.svg" alt="icon appointment" className="size-8" cover />
          </div>
          <div className="flex items-center justify-between w-full gap-4 p-4 bg-primary">
            <p className="text-lg font-semibold">Hubungi Kami</p>
            <Img src="/icons/customer-service.svg" alt="icon customer-service" className="size-8" cover />
          </div>
        </div>
      </div>
    </>
  );
};
