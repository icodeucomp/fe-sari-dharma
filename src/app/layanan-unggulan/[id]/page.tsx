import { Breadcrumbs, Container } from "@/components";

import { MainFeatureService } from "@/components/ui/service";

import { formatTitleCase } from "@/utils";

export default function FeatureServicesPage({ params }: { params: { id: string } }) {
  return (
    <main>
      <Container>
        <Breadcrumbs
          items={[
            { name: "Beranda", path: "/" },
            { name: "Layanan Unggulan", path: `/layanan-unggulan/${params.id}` },
            { name: `${formatTitleCase(params.id)}`, path: `/layanan-unggulan/${params.id}` },
          ]}
        />
      </Container>

      <MainFeatureService />
    </main>
  );
}
