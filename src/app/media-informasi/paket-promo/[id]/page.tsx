import { Breadcrumbs, Container } from "@/components";
import { MainArticle } from "@/components/ui/media";
import { formatTitleCase } from "@/utils";

export default function PacketPromo({ params }: { params: { id: string } }) {
  return (
    <main>
      <Container>
        <Breadcrumbs
          items={[
            { name: "Beranda", path: "/" },
            { name: "Media & Informasi", path: "/media-informasi/artikel-kesehatan" },
            { name: "Artikel Kesehatan", path: "/media-informasi/artikel-kesehatan" },
            { name: `${formatTitleCase(params.id)}`, path: `/media-informasi/artikel-kesehatan/${params.id}` },
          ]}
        />
      </Container>

      <MainArticle />
    </main>
  );
}
