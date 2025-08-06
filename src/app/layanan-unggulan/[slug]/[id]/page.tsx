"use client";

import { useEffect, useState } from "react";
import { Breadcrumbs, Container } from "@/components";
import { MainFeatureService } from "@/components/ui/service";
import { getLayananUnggulanDetail } from "@/services/layanan-unggulan.service";

interface LayananDetail {
  id: string | number;
  nama_layanan: string;
  deskripsi: string;
  foto: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export default function FeatureServicesPage({ params }: { params: { slug: string; id: string } }) {
  const [layanan, setLayanan] = useState<LayananDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLayananDetail = async () => {
      try {
        setLoading(true);
        const response = await getLayananUnggulanDetail(params.slug, params.id);
        setLayanan(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching layanan detail:", err);
        setError("Failed to load layanan. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLayananDetail();
  }, [params.slug, params.id]);

  return (
    <main>
      <Container>
        <Breadcrumbs
          items={[
            { name: "Beranda", path: "/" },
            {
              name: layanan ? layanan.nama_layanan : "Loading...",
              path: `/layanan-unggulan/${params.slug}/${params.id}`,
            },
          ]}
        />
      </Container>

      {loading ? (
        <Container className="py-16">
          <div className="flex items-center justify-center">
            <p>Loading layanan detail...</p>
          </div>
        </Container>
      ) : error ? (
        <Container className="py-16">
          <div className="flex items-center justify-center">
            <p className="text-red-500">{error}</p>
          </div>
        </Container>
      ) : (
        layanan && <MainFeatureService layanan={layanan} />
      )}
    </main>
  );
}
