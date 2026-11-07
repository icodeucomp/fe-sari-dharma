"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumbs, Container } from "@/components";
import { MainFeatureService } from "@/components/ui/service";
import { getFeaturedServiceDetail } from "@/services/featured-service.service";

interface ServiceDetail {
  id: string | number;
  name: string;
  description: string;
  photo: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export default function FeatureServicesPage() {
  const { slug, id } = useParams<{ slug: string; id: string }>();

  const {
    data: service,
    isLoading: loading,
    isError,
  } = useQuery({
    queryKey: ["featured-service", slug, id],
    queryFn: () => getFeaturedServiceDetail(slug, id),
    select: (response) => response.data as ServiceDetail,
  });
  const error = isError ? "Failed to load layanan. Please try again later." : null;

  return (
    <main>
      <Container>
        <Breadcrumbs
          items={[
            { name: "Beranda", path: "/" },
            {
              name: service ? service.name : "Loading...",
              path: `/featured-services/${slug}/${id}`,
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
        service && <MainFeatureService service={service} />
      )}
    </main>
  );
}
