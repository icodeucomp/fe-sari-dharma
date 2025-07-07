/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button, Container, Img, Motion, Submenu } from "@/components";
import { Recommendation } from "./recommendation";
import { FaLink } from "react-icons/fa6";
import { getPaketKesehatanDetail } from "@/services/paket-kesehatan.service";
import { useEffect, useState } from "react";
import moment from "moment";
import { useParams } from "next/navigation";

export const MainPromo = () => {
  const params = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPaketKesehatanDetail(
          params.slug as string,
          params.id as string
        );
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
    <Container className="relative flex min-h-screen gap-16 pb-16">
      <div className="w-full space-y-8">
        <div className="pb-8 space-y-6 border-b-2 border-gray/20">
          <Motion
            tag="h2"
            initialY={50}
            animateY={0}
            duration={0.5}
            className="text-4xl font-semibold text-primary"
          >
            {data.nama_paket}
          </Motion>
          <Motion
            tag="div"
            initialY={50}
            animateY={0}
            duration={0.5}
            delay={0.3}
            className="flex items-center justify-between gap-8"
          >
            <span className="text-gray">
              *Berlaku s/d {moment(data.berlaku_sampai).format("DD MMMM YYYY")}
            </span>
            <Button className="flex items-center gap-1 btn-outline">
              Bagikan <FaLink />
            </Button>
          </Motion>
        </div>
        <Img
          src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${data.foto}`}
          alt={data.nama_paket}
          className="w-full min-h-400"
          cover
        />
        <div dangerouslySetInnerHTML={{ __html: data.deskripsi }} />
      </div>

      <div className="sticky self-start h-screen space-y-8 overflow-y-auto scrollbar top-4 min-w-[340px]">
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
