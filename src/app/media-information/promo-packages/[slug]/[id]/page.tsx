import { Breadcrumbs, Container } from "@/components";
import { MainPromo } from "@/components/ui/media";
import { formatTitleCase } from "@/utils";

export default async function PacketPromoPage({ params }: { params: Promise<{ id: string; slug: string }> }) {
  const { slug, id } = await params;

  return (
    <main>
      <Container>
        <Breadcrumbs
          items={[
            { name: "Beranda", path: "/" },
            { name: "Media & Informasi", path: "/media-information/promo-packages" },
            { name: "Paket Kesehatan", path: "/media-information/promo-packages" },
            { name: `${formatTitleCase(slug)}`, path: `/media-information/promo-packages/${slug}/${id}` },
          ]}
        />
      </Container>

      <MainPromo />
    </main>
  );
}
