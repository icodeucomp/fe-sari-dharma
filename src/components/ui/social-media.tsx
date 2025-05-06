"use client";

import * as React from "react";
import { Container } from "@/components";

export const SocialMedia = () => {
  const [activeTab, setActiveTab] = React.useState<"youtube" | "instagram">("youtube");

  // Load Instagram embed script when tab changes to Instagram
  React.useEffect(() => {
    if (activeTab === "instagram") {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        if ((window as any).instgrm) {
          (window as any).instgrm.Embeds.process();
        }
      };
    }
  }, [activeTab]);

  return (
    <div className="bg-primary/10 pb-20">
      <Container className="py-8 space-y-8">
        <div className="flex py-4 overflow-hidden rounded-md">
          <button
            className={`border w-full relative font-semibold rounded-s-md py-2 ${activeTab === "youtube" ? "bg-primary text-light border-primary" : "text-gray bg-light border-gray/50"}`}
            onClick={() => setActiveTab("youtube")}
          >
            YouTube
            <i className={`absolute rotate-45 -translate-x-1/2 -bottom-2 size-4 bg-primary left-1/2 ${activeTab === "youtube" ? "block" : "hidden"}`}></i>
          </button>
          <button
            className={`border w-full relative font-semibold rounded-e-md py-2 ${activeTab === "instagram" ? "bg-primary text-light border-primary" : "text-gray bg-light border-gray/50"}`}
            onClick={() => setActiveTab("instagram")}
          >
            Instagram
            <i className={`absolute rotate-45 -translate-x-1/2 -bottom-2 size-4 bg-primary left-1/2 ${activeTab === "instagram" ? "block" : "hidden"}`}></i>
          </button>
        </div>
      </Container>

      <Container>
        <>
          {activeTab === "youtube" && (
            <div>
              <h2 className="text-2xl font-bold text-orange-700 mb-2">YouTube: Sari Dharma Klinik Utama</h2>
              <p className="mb-4">Saksikan video dan konten edukasi kesehatan dari Klinik Utama Rawat Inap Sari Dharma.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4 place-items-center">
                <iframe
                  className="w-full aspect-video rounded-md lg:col-span-2 lg:row-span-2"
                  src="https://www.youtube.com/embed/jMPtlS2-73A?si=4LMoG8rKoGqO8wSf"
                  title="WHO: What is coronavirus?"
                  allowFullScreen
                ></iframe>
                <iframe className="w-full aspect-video rounded-md" src="https://www.youtube.com/embed/jMPtlS2-73A?si=4LMoG8rKoGqO8wSf" title="Covid-19: What you need to know" allowFullScreen></iframe>
                <iframe
                  className="w-full aspect-video rounded-md"
                  src="https://www.youtube.com/embed/jMPtlS2-73A?si=4LMoG8rKoGqO8wSf"
                  title="Health tips: How to wash hands properly"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </>
        <div>
          {activeTab === "instagram" && (
            <div>
              <h2 className="text-2xl font-bold text-pink-700 mb-2">Instagram: @who</h2>
              <p className="mb-4">Lihat postingan terbaru dari akun resmi World Health Organization.</p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink="https://www.instagram.com/p/DJRkPQHNpmx/?utm_source=ig_web_copy_link"
                  data-instgrm-version="14"
                  style={{ background: "#fff", borderRadius: "8px" }}
                ></blockquote>

                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink="https://www.instagram.com/reel/DIbpzZdPcWJ/?igsh=MXg1aXNuMXZwZTFuYQ=="
                  data-instgrm-version="14"
                  style={{ background: "#fff", borderRadius: "8px" }}
                ></blockquote>

                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink="https://www.instagram.com/p/DJRkPQHNpmx/?utm_source=ig_web_copy_link"
                  data-instgrm-version="14"
                  style={{ background: "#fff", borderRadius: "8px" }}
                ></blockquote>

                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink="https://www.instagram.com/p/DJRkPQHNpmx/?utm_source=ig_web_copy_link"
                  data-instgrm-version="14"
                  style={{ background: "#fff", borderRadius: "8px" }}
                ></blockquote>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};
