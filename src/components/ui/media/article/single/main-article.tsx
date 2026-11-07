/* eslint-disable @next/next/no-img-element */

"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Container, Motion, Submenu } from "@/components";
import { Recommendation } from "./recommendation";
import { FaCheck, FaFacebook, FaInstagram, FaLink, FaXTwitter } from "react-icons/fa6";
import { getHealthArticleDetail } from "@/services/health-article.service";
import { useParams } from "next/navigation";

export const MainArticle = () => {
  const params = useParams<{ slug: string; id: string }>();
  const { data: article, isLoading: loading } = useQuery({
    queryKey: ["health-article-detail", params.slug, params.id],
    queryFn: () => getHealthArticleDetail(params.slug, params.id),
    select: (response) => response.data,
  });
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

  if (loading) return <div>Loading...</div>;
  if (!article) return <div>Artikel tidak ditemukan</div>;

  return (
    <Container className="relative flex flex-col-reverse md:flex-row min-h-screen gap-8 xl:gap-16 pb-16 pt-4 sm:pt-8">
      <div className="w-full space-y-8">
        <div className="pb-8 space-y-4 sm:space-y-12 border-b-2 border-gray/20">
          <Motion tag="h2" initialY={50} animateY={0} duration={0.5} className="heading">
            {article.title}
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
        {article.photo && (
          <div className="w-full aspect-video rounded-lg overflow-hidden mb-8">
            <img src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${article.photo}`} alt={article.title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
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
