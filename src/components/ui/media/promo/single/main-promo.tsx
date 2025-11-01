/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button, Container, Img, Motion, Submenu } from "@/components";
import { Recommendation } from "./recommendation";
import { FaCheck, FaLink } from "react-icons/fa6";
import { getPaketKesehatanDetail } from "@/services/paket-kesehatan.service";
import { useEffect, useState } from "react";
import moment from "moment";
import { useParams } from "next/navigation";

export const MainPromo = () => {
  const params = useParams();
  const [data, setData] = useState<any>(null);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPaketKesehatanDetail(params.slug as string, params.id as string);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.slug, params.id]);

  if (loading) {
    return (
      <Container className="min-h-screen">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl">Loading...</div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="relative flex flex-col-reverse md:flex-row min-h-screen gap-8 xl:gap-16 pb-16 pt-4 sm:pt-8">
      <div className="w-full space-y-4 sm:space-y-8">
        <div className="pb-8 space-y-6 border-b-2 border-gray/20">
          <Motion tag="h2" initialY={50} animateY={0} duration={0.5} className="heading">
            {data.nama_paket}
          </Motion>
          <Motion tag="div" initialY={50} animateY={0} duration={0.5} delay={0.3} className="flex items-center justify-between gap-8">
            <span className="text-xs sm:text-sm md:text-base text-gray">*Berlaku s/d {moment(data.berlaku_sampai).format("DD MMMM YYYY")}</span>
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
        <Img src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${data.foto}`} alt={data.nama_paket} className="w-full min-h-300 sm:min-h-400" cover />
        <div dangerouslySetInnerHTML={{ __html: data.deskripsi }} className="prose max-w-none" />
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
