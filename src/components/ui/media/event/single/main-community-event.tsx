/* eslint-disable @next/next/no-img-element */
"use client";
import { Button, Container, Motion, Submenu } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { Recommendation } from "./recommendation";
import { FaCheck, FaFacebook, FaInstagram, FaLink, FaXTwitter } from "react-icons/fa6";
import { useState } from "react";
import { getCommunityEventDetail } from "@/services/community-event.service";
import { useParams } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const getImageUrl = (path: string) => {
  if (!path) return "/images/placeholder.jpg";
  if (path.startsWith("http")) return path;
  return `${BASE_URL}/storage/${path}`;
};

interface CommunityEventDetail {
  id: string;
  category_id: string;
  title: string;
  slug: string;
  content: string;
  photo: string;
  category: {
    id: string;
    name: string;
    page: string;
    flag: string;
  };
  created_at: string;
  updated_at: string;
}

export const MainCommunityEvent = () => {
  const params = useParams<{ slug: string; id: string }>();
  const {
    data,
    isLoading: loading,
    isError,
  } = useQuery({
    queryKey: ["community-event-detail", params.slug, params.id],
    queryFn: () => getCommunityEventDetail(params.slug, params.id),
    select: (response) => response.data as CommunityEventDetail,
  });
  const error = isError ? "Gagal memuat data event" : null;
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      const currentUrl = window.location.href;

      await navigator.clipboard.writeText(currentUrl);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
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
    } catch {
    }

    document.body.removeChild(textArea);
  };

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
            {data?.title}
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

        {data?.photo && (
          <div className="w-full aspect-video mb-8">
            <img src={getImageUrl(data.photo)} alt={data.title} className="w-full h-full object-cover rounded-lg" />
          </div>
        )}

        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: data?.content || "" }} />
      </div>

      <div className="md:sticky self-start h-screen space-y-8 overflow-y-auto scrollbar md:top-4 w-full md:max-w-[340px] min-w-[340px]">
        <Submenu
          menu="Akses Menu"
          title="Tentang Kami"
          items={[
            { title: "Artikel Kesehatan", link: "/media-information/health-articles" },
            { title: "Event & Community", link: "/media-information/community-events" },
            { title: "Paket Kesehatan", link: "/media-information/promo-packages" },
            { title: "Indikator Mutu", link: "/media-information/quality-indicators" },
            { title: "Karir", link: "/media-information/careers" },
            { title: "Form Management", link: "/media-information/form-management" },
          ]}
        />

        <Recommendation />
      </div>
    </Container>
  );
};
