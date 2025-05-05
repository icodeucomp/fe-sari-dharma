"use client";
import { Button, Container, Motion, Submenu } from "@/components";
import { Recommendation } from "./recommendation";
import { FaFacebook, FaInstagram, FaLink, FaXTwitter } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { getEventCommunityDetail } from "@/services/event-community.service";
import moment from "moment";
import { useParams } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper function untuk URL gambar
const getImageUrl = (path: string) => {
  if (!path) return '/images/placeholder.jpg';
  if (path.startsWith('http')) return path;
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

  /**
   * Mengambil data event community dari API
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getEventCommunityDetail(params.slug as string, params.id as string);
        setData(result.data);
      } catch (err) {
        setError("Gagal memuat data event"+err);
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
    <Container className="relative flex min-h-screen gap-16 pb-16">
      <div className="w-full space-y-8">
        <div className="pb-8 space-y-12 border-b-2 border-gray/20">
          <Motion tag="h2" initialY={50} animateY={0} duration={0.5} className="text-4xl font-semibold text-primary">
            {data?.judul}
          </Motion>
          <Motion tag="div" initialY={50} animateY={0} duration={0.5} delay={0.3} className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{data?.kategori.name}</span>
              <span className="text-sm text-gray-600">
                {moment(data?.created_at).format('DD MMMM YYYY')}
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
        
        {data?.foto && (
          <div className="w-full aspect-video mb-8">
            <img 
              src={getImageUrl(data.foto)}
              alt={data.judul}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}

        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: data?.konten || '' }} />
      </div>

      <div className="sticky self-start h-screen space-y-8 overflow-y-auto scrollbar top-4 min-w-[340px]">
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
