"use client";

import Link from "next/link";

import { Img, Container, Navbar } from "@/components";

import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa6";

import { useToggleState } from "@/hooks";

export const Header = () => {
  const [ref, navbar, toggleNavbar] = useToggleState();
  return (
    <header ref={ref} className="border-b shadow-sm border-gray/20">
      <div className="hidden bg-primary text-light lg:block">
        <Container className="flex items-center justify-end h-12 gap-6 divide-x-2">
          <menu className="flex items-center gap-4">
            <li className="text-xs">
              <a href="https://maps.app.goo.gl/U1rDLphibDfC3Dia6" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                <Img src="/icons/maps.svg" alt="maps icon" className="size-5" cover /> Maps
              </a>
            </li>
            <li className="text-xs">
              <a href="tel:+62361226866" className="flex items-center gap-1">
                <Img src="/icons/ambulance.svg" alt="ambulance icon" className="size-5" cover /> Emergency Call
              </a>
            </li>
            <li className="text-xs">
              <a href="tel:+62361226866" className="flex items-center gap-1">
                <Img src="/icons/fluent-call.svg" alt="fluent call icon" className="size-5" cover /> Call Center
              </a>
            </li>
          </menu>
          <menu className="flex items-center gap-2 pl-6">
            <li className="flex items-center justify-center rounded-full size-7 bg-secondary">
              <a href="https://www.instagram.com/saridharma_clinic/?hl=en" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={15} />
              </a>
            </li>
            <li className="flex items-center justify-center rounded-full size-7 bg-secondary">
              <a href="https://www.facebook.com/klinik.utama.sari.dharma/" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={15} />
              </a>
            </li>
            <li className="flex items-center justify-center rounded-full size-7 bg-secondary">
              <a href="https://www.tiktok.com/@saridharma_clinic" target="_blank" rel="noopener noreferrer">
                <FaTiktok size={15} />
              </a>
            </li>
          </menu>
        </Container>
      </div>
      <div className="bg-light text-dark">
        <div className="flex items-center justify-between w-full h-16 sm:h-20 px-4 mx-auto max-w-container sm:px-8">
          <Link href="/">
            <Img src="/images/logo.png" alt="logo clinic sari dharma" className="size-11 md:size-14" cover />
          </Link>

          <Navbar toggleNavbar={toggleNavbar} navbar={navbar} />
          {/* <Button type="button" className="hidden btn-primary lg:block">
            <IoSearch size={24} className="fill-white" />
            <span className="sr-only">Search</span>
          </Button> */}
          <div className="flex items-center gap-4 lg:hidden">
            {/* <Button type="button" className="btn-primary">
              <IoSearch size={24} className="fill-white" />
              <span className="sr-only">Search</span>
            </Button> */}
            <button onClick={toggleNavbar} className={`relative flex flex-col justify-center overflow-hidden items-center p-2 ${navbar ? "space-y-1" : "space-y-1.5"}`}>
              <span className={`block h-1 w-8 rounded-full bg-primary transition-transform ease-in-out ${navbar ? "translate-y-2 rotate-45" : ""}`}></span>
              <span className={`block h-1 w-6 rounded-full bg-primary duration-200 ${navbar && "translate-x-16"}`}></span>
              <span className={`block h-1 w-8 rounded-full bg-primary transition-transform ease-in-out ${navbar ? "-translate-y-2 -rotate-45" : ""}`}></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
