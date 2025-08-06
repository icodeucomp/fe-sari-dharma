"use client";

import * as React from "react";

import Link from "next/link";

import { Button, Container, Img } from "@/components";

import { footerList, getFooterLists } from "@/static";

import { FaFacebook, FaInstagram } from "react-icons/fa6";

import { IoLogoWhatsapp } from "react-icons/io5";

export const Footer = () => {
  const [footerItems, setFooterItems] = React.useState(footerList);

  React.useEffect(() => {
    const loadFooterData = async () => {
      const dynamicFooterItems = await getFooterLists();
      setFooterItems(dynamicFooterItems);
    };

    loadFooterData();
  }, []);
  return (
    <footer className="bg-gray/10 mt-auto">
      <Container className="flex justify-between gap-8 py-8">
        <div className="max-w-sm space-y-4">
          <Img src="/images/logo.png" alt="logo clinic sari dharma" className="size-14" cover />
          <h2 className="text-xl font-semibold text-primary">Komunitas Sahabat Sari Dharma</h2>
          <p className="text-sm">Bergabung dengan Komunitas Sahabat Sari Dharma dan dapatkan edukasi seputar kesehatan.</p>
          <Button className="flex items-center gap-2 font-medium bg-primary text-light">
            <IoLogoWhatsapp className="fill-light" size={20} />
            Call us on Whatsapp
          </Button>
          <menu className="flex items-center gap-2">
            <li className="flex items-center justify-center rounded-full size-9 bg-primary">
              <a href="https://www.instagram.com/saridharma_clinic/?hl=en" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={20} className="fill-light" />
              </a>
            </li>
            <li className="flex items-center justify-center rounded-full size-9 bg-primary">
              <a href="https://www.facebook.com/klinik.utama.sari.dharma/" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={20} className="fill-light" />
              </a>
            </li>
          </menu>
        </div>
        <div className="flex flex-wrap gap-8">
          {footerItems.map((item, index) => (
            <div key={index} className="space-y-4">
              <h4 className="font-semibold text-primary">{item.title}</h4>
              <menu className="space-y-2">
                {item.navigation.map((nav, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Link href={nav.link}>{nav.subtitle}</Link>
                  </li>
                ))}
              </menu>
            </div>
          ))}
        </div>
      </Container>
      <div className="py-6 bg-primary text-light">
        <div className="flex items-center w-full max-w-screen-lg mx-auto divide-x-2">
          <h4 className="pr-8 text-lg font-bold whitespace-nowrap">Klinik Utama Rawat Inap Sari Dharma</h4>
          <h5 className="pl-8 text-sm text-center">
            <strong>© 2025 Klinik Utama Rawat Inap Sari Dharma.</strong> Jl. Pulau Seram No.1 Dauh Puri Klod, Denpasar Barat, Bali 80113
          </h5>
        </div>
      </div>
    </footer>
  );
};
