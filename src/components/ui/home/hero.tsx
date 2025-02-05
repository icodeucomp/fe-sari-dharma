"use client";

import * as React from "react";

import Link from "next/link";

import { motion } from "framer-motion";

import { Background, Img, Motion } from "@/components";

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

export const Hero = () => {
  const images: string[] = ["/images/suzy.jpg", "/images/suzy-1.jpg", "/images/suzy-2.jpg"];
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div key={currentSlide} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
      <Background src={images[currentSlide]} alt="hero background" imgClassName="object-cover object-center" className="flex items-center justify-center min-h-500">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-primary/40 to-secondary/40"></div>
        <div className="relative w-full max-w-screen-xl px-4 mx-auto space-y-6 text-center sm:px-8">
          <Motion tag="h1" initialX={-50} animateX={0} duration={0.3} className="max-w-xl mx-auto text-3xl font-semibold leading-snug md:text-4xl lg:text-5xl">
            Feel Better About Finding HealthCare
          </Motion>
          <Motion tag="h1" initialX={-50} animateX={0} duration={0.5} delay={0.3} className="text-base sm:text-lg md:text-xl">
            Klinik Utama Rawat Inap Sari Dharma
          </Motion>
          <Motion tag="h1" initialX={-50} animateX={0} duration={0.8} delay={0.5} className="flex items-center justify-center gap-4">
            <Link href="/" className="flex items-center h-full gap-1 px-6 py-2 border rounded-2xl">
              Explore Now
              <Img src="/icons/arrow-up-white.svg" alt="arrow up light" className="size-5 sm:size-6 lg:size-7" />
            </Link>
          </Motion>
          <button onClick={prevSlide} className="absolute z-10 -translate-y-1/2 top-8 left-8 text-dark">
            <SlArrowLeft size={50} className="fill-light" />
          </button>
          <button onClick={nextSlide} className="absolute z-10 -translate-y-1/2 top-8 right-8 text-dark">
            <SlArrowRight size={50} className="fill-light" />
          </button>
        </div>
      </Background>
    </motion.div>
  );
};
