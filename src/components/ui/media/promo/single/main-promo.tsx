"use client";

import { Button, Container, Img, Motion, Submenu } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { Recommendation } from "./recommendation";
import { FaCheck, FaLink } from "react-icons/fa6";
import { getHealthPackageDetail } from "@/services/health-package.service";
import { useState } from "react";
import moment from "moment";
import { useParams } from "next/navigation";

export const MainPromo = () => {
  const params = useParams<{ slug: string; id: string }>();
  const { data, isLoading: loading } = useQuery({
    queryKey: ["health-package-detail", params.slug, params.id],
    queryFn: () => getHealthPackageDetail(params.slug, params.id),
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

  if (loading) {
    return (
      <Container className="min-h-screen">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl">Loading...</div>
        </div>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container className="min-h-screen">
        <p className="py-16 text-center text-red-500">Gagal memuat data paket.</p>
      </Container>
    );
  }

  return (
    <Container className="relative flex flex-col-reverse md:flex-row min-h-screen gap-8 xl:gap-16 pb-16 pt-4 sm:pt-8">
      <div className="w-full space-y-4 sm:space-y-8">
        <div className="pb-8 space-y-6 border-b-2 border-gray/20">
          <Motion tag="h2" initialY={50} animateY={0} duration={0.5} className="heading">
            {data.name}
          </Motion>
          <Motion tag="div" initialY={50} animateY={0} duration={0.5} delay={0.3} className="flex items-center justify-between gap-8">
            <span className="text-xs sm:text-sm md:text-base text-gray">*Berlaku s/d {moment(data.valid_until).format("DD MMMM YYYY")}</span>
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
        <Img src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${data.photo}`} alt={data.name} className="w-full min-h-300 sm:min-h-400" cover />
        <div dangerouslySetInnerHTML={{ __html: data.description }} className="prose max-w-none" />
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
