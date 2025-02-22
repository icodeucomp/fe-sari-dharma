"use client";

import Link from "next/link";

import { Img, Container, Navbar, Button } from "@/components";

import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

export const Header = () => {
  return (
    <header className="border-b shadow-sm border-gray/20">
      <div className="bg-primary text-light">
        <Container className="flex items-center justify-end h-12 gap-6 divide-x-2">
          <menu className="flex items-center gap-4">
            <li className="flex items-center gap-1 text-xs">
              <Img src="/icons/maps.svg" alt="maps icon" className="size-5" cover /> Maps
            </li>
            <li className="flex items-center gap-1 text-xs">
              <Img src="/icons/ambulance.svg" alt="ambulance icon" className="size-5" cover /> Emergency Call
            </li>
            <li className="flex items-center gap-1 text-xs">
              <Img src="/icons/fluent-call.svg" alt="fluent call icon" className="size-5" cover /> Call Center
            </li>
          </menu>
          <menu className="flex items-center gap-2 pl-6">
            <li className="flex items-center justify-center rounded-full size-7 bg-secondary">
              <FaInstagram size={15} />
            </li>
            <li className="flex items-center justify-center rounded-full size-7 bg-secondary">
              <FaXTwitter size={15} />
            </li>
            <li className="flex items-center justify-center rounded-full size-7 bg-secondary">
              <FaFacebook size={15} />
            </li>
          </menu>
        </Container>
      </div>
      <div className="bg-light text-dark">
        <div className="flex items-center justify-between w-full h-20 px-4 mx-auto max-w-container sm:px-8">
          <Link href="/">
            <Img src="/images/logo.png" alt="logo clinic sari dharma" className="size-14" cover />
          </Link>

          <Navbar toggleNavbar={() => console.log("test")} navbar />
          <div className="">
            <Button type="button" className="btn-primary">
              <IoSearch size={24} className="fill-white" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
