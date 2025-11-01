/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Button, Container, Motion, Submenu } from "@/components";
import { Recommendation } from "./recommendation";
import { FaCheck, FaFacebook, FaInstagram, FaLink, FaXTwitter } from "react-icons/fa6";
import { getArtikelKesehatanDetail } from "@/services/artikel-kesehatan.service";
import { useParams } from "next/navigation";

export const MainArticle = () => {
  const params = useParams();
  const [artikel, setArtikel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      // Get current page URL
      const currentUrl = window.location.href;

      // Copy to clipboard
      await navigator.clipboard.writeText(currentUrl);

      // Show success feedback
      setCopied(true);

      // Reset after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
      // Fallback for older browsers
      fallbackCopyTextToClipboard(window.location.href);
    }
  };

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Fallback: Could not copy text", err);
    }

    document.body.removeChild(textArea);
  };

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
    <Container className="relative flex flex-col-reverse md:flex-row min-h-screen gap-8 xl:gap-16 pb-16 pt-4 sm:pt-8">
      <div className="w-full space-y-8">
        <div className="pb-8 space-y-4 sm:space-y-12 border-b-2 border-gray/20">
          <Motion tag="h2" initialY={50} animateY={0} duration={0.5} className="heading">
            {artikel.judul}
          </Motion>
          <Motion tag="div" initialY={50} animateY={0} duration={0.5} delay={0.3} className="flex items-center justify-between gap-8">
            <menu className="flex items-center gap-1 sm:gap-2">
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
            <Button className={`flex items-center gap-1 btn-outline transition-all ${copied ? "bg-green-500 text-white border-green-500" : ""}`} onClick={handleCopyLink}>
              {copied ? (
                <>
                  Tersalin <FaCheck />
                </>
              ) : (
                <>
                  Bagikan <FaLink />
                </>
              )}
            </Button>
          </Motion>
        </div>
        {artikel.foto && (
          <div className="w-full aspect-video rounded-lg overflow-hidden mb-8">
            <img src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${artikel.foto}`} alt={artikel.judul} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: artikel.konten }} />
      </div>

      <div className="md:sticky self-start h-screen space-y-8 overflow-y-auto scrollbar md:top-4 w-full md:max-w-[340px] min-w-[340px]">
        <Submenu
          menu="Akses Menu"
          title="Tentang Kami"
          items={[
            { title: "Artikel Kesehatan", link: "/media-informasi/artikel-kesehatan" },
            { title: "Event & Community", link: "/media-informasi/event-community" },
            { title: "Paket Kesehatan", link: "/media-informasi/paket-promo" },
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
