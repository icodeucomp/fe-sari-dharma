"use client";

import * as React from "react";
import { Container } from "@/components";
import { KontenSocialMedia, getKontenSocialMedia } from "@/services/konten-social-media.service";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

export const SocialMedia = () => {
  const [activeTab, setActiveTab] = React.useState<"youtube" | "instagram">("youtube");
  const [kontenSocialMedia, setKontenSocialMedia] = React.useState<KontenSocialMedia[]>([]);
  const [loading, setLoading] = React.useState(true);

  /**
   * Mengambil data konten social media dari API
   */
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getKontenSocialMedia({
          type: activeTab,
          per_page: 4,
        });
        setKontenSocialMedia(response.data.data);
      } catch (error) {
        console.error("Error fetching social media content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  /**
   * Load Instagram embed script ketika tab berubah ke Instagram
   */
  React.useEffect(() => {
    if (activeTab === "instagram" && !loading) {
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
  }, [activeTab, loading]);

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
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Icon path={mdiLoading} size={2} className="animate-spin text-primary" />
          </div>
        ) : (
          <>
            {activeTab === "youtube" && (
              <div>
                <h2 className="text-2xl font-bold text-orange-700 mb-2">YouTube: Sari Dharma Klinik Utama</h2>
                <p className="mb-4">Saksikan video dan konten edukasi kesehatan dari Klinik Utama Rawat Inap Sari Dharma.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4 place-items-center">
                  {kontenSocialMedia.map((konten, index) => {
                    // Mengubah URL YouTube watch menjadi embed
                    const embedUrl = konten.links.replace("watch?v=", "embed/").split("&")[0];

                    return (
                      <iframe
                        key={konten.id}
                        className={`w-full aspect-video rounded-md ${index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
                        src={embedUrl}
                        title={`Video ${index + 1}`}
                        allowFullScreen
                      ></iframe>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "instagram" && (
              <div>
                <h2 className="text-2xl font-bold text-pink-700 mb-2">Instagram: @saridharma</h2>
                <p className="mb-4">Lihat postingan terbaru dari akun resmi Klinik Utama Sari Dharma.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {kontenSocialMedia.map((konten) => (
                    <blockquote
                      key={konten.id}
                      className="instagram-media"
                      data-instgrm-permalink={konten.links}
                      data-instgrm-version="14"
                      style={{ background: "#fff", borderRadius: "8px" }}
                    ></blockquote>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};
