/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Button, Container, Motion, Submenu } from "@/components";
import { Recommendation } from "./recommendation";
import { FaFacebook, FaInstagram, FaLink, FaXTwitter } from "react-icons/fa6";
import { getArtikelKesehatanDetail } from "@/services/artikel-kesehatan.service";
import { useParams } from "next/navigation";
import moment from "moment";

export const MainArticle = () => {
  const params = useParams();
  const [artikel, setArtikel] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil detail artikel
  const fetchArtikel = async () => {
    try {
      setLoading(true);
      const slug = params.slug as string;
      const id = params.id as string;
      const response = await getArtikelKesehatanDetail(slug, id);
      setArtikel(response.data);
    } catch (error) {
      console.error("Error fetching artikel:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtikel();
  }, [params]);

  if (loading) return <div>Loading...</div>;
  if (!artikel) return <div>Artikel tidak ditemukan</div>;

  return (
    <Container className="relative flex min-h-screen gap-16 pb-16">
      <div className="w-full space-y-8">
        <div className="pb-8 space-y-12 border-b-2 border-gray/20">
          <Motion tag="h2" initialY={50} animateY={0} duration={0.5} className="text-4xl font-semibold text-primary">
            {artikel.judul}
          </Motion>
          <Motion tag="div" initialY={50} animateY={0} duration={0.5} delay={0.3} className="flex items-center justify-between gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-600">
                {moment(artikel.created_at).format("DD MMMM YYYY")}
              </span>
              <span className="text-sm text-gray-600">
                Kategori: {artikel.kategori.name}
              </span>
            </div>
            <menu className="flex items-center gap-2">
              <li className="flex items-center justify-center rounded-md size-10 bg-primary text-light">
                <FaInstagram size={20} />
              </li>
              <li className="flex items-center justify-center rounded-md size-10 bg-primary text-light">
                <FaXTwitter size={20} />
              </li>
              <li className="flex items-center justify-center rounded-md size-10 bg-primary text-light">
                <FaFacebook size={20} />
              </li>
            </menu>
            <Button className="flex items-center gap-1 btn-outline">
              Bagikan <FaLink />
            </Button>
          </Motion>
        </div>
        {artikel.foto && (
          <div className="w-full aspect-video rounded-lg overflow-hidden mb-8">
            <img 
              src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${artikel.foto}`} 
              alt={artikel.judul}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: artikel.konten }} />
      </div>

      <div className="sticky self-start h-screen min-w-[340px] space-y-8 overflow-x-hidden overflow-y-auto scrollbar top-4">
        <Submenu
          menu="Akses Menu"
          title="Tentang Kami"
          items={[
            { title: "Artikel Kesehatan", link: "/media-informasi/artikel-kesehatan" },
            { title: "Event & Community", link: "/media-informasi/event-community" },
            { title: "Paket Kesehatan", link: "/media-informasi/form-management" },
            { title: "Indikator Mutu", link: "/media-informasi/indikator-mutu" },
            { title: "Karir", link: "/media-informasi/karir" },
            { title: "Form Management", link: "/media-informasi/form-management" },
          ]}
        />
        <Recommendation />
      </div>
    </Container>
  );
};
