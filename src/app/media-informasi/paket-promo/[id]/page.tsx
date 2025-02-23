import { Breadcrumbs, Container } from "@/components";
import { MainPromo } from "@/components/ui/media";
import { formatTitleCase } from "@/utils";

export default function PacketPromoPage({ params }: { params: { id: string } }) {
  return (
    <main>
      <Container>
        <Breadcrumbs
          items={[
            { name: "Beranda", path: "/" },
            { name: "Media & Informasi", path: "/media-informasi/paket-promo" },
            { name: "Paket Kesehatan", path: "/media-informasi/paket-promo" },
            { name: `${formatTitleCase(params.id)}`, path: `/media-informasi/paket-promo/${params.id}` },
          ]}
        />
      </Container>

      <MainPromo />
    </main>
  );
}
