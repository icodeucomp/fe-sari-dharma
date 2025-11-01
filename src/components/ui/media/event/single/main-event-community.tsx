/* eslint-disable @next/next/no-img-element */
"use client";
import { Button, Container, Motion, Submenu } from "@/components";
import { Recommendation } from "./recommendation";
import { FaCheck, FaFacebook, FaInstagram, FaLink, FaXTwitter } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { getEventCommunityDetail } from "@/services/event-community.service";
import { useParams } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper function untuk URL gambar
const getImageUrl = (path: string) => {
  if (!path) return "/images/placeholder.jpg";
  if (path.startsWith("http")) return path;
  return `${BASE_URL}/storage/${path}`;
};

interface EventCommunityDetail {
  id: string;
  kategori_id: string;
  judul: string;
  slug: string;
  konten: string;
  foto: string;
  kategori: {
    id: string;
    name: string;
    page: string;
    flag: string;
  };
  created_at: string;
  updated_at: string;
}

export const MainEventCommunity = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<EventCommunityDetail | null>(null);
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

  /**
   * Mengambil data event community dari API
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getEventCommunityDetail(params.slug as string, params.id as string);
        setData(result.data);
      } catch {
        setError("Gagal memuat data event");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.slug, params.id]);

  if (loading) {
    return (
      <Container className="min-h-screen">
        <div className="flex items-center justify-center h-[400px]">
          <div className="w-8 h-8 border-4 border-primary rounded-full animate-spin border-t-transparent"></div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="min-h-screen">
        <div className="flex items-center justify-center h-[400px]">
          <p className="text-red-500">{error}</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="relative flex flex-col-reverse md:flex-row min-h-screen gap-8 xl:gap-16 pb-16 pt-4 sm:pt-8">
      <div className="w-full space-y-8">
        <div className="pb-8 space-y-4 sm:space-y-12 border-b-2 border-gray/20">
          <Motion tag="h2" initialY={50} animateY={0} duration={0.5} className="heading">
            {data?.judul}
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

        {data?.foto && (
          <div className="w-full aspect-video mb-8">
            <img src={getImageUrl(data.foto)} alt={data.judul} className="w-full h-full object-cover rounded-lg" />
          </div>
        )}

        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: data?.konten || "" }} />
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
