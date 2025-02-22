import { Breadcrumbs, Container } from "@/components";
import { SocialMedia } from "@/components/ui";
import { HealthArticle } from "@/components/ui/media";

export default function FormsManagements() {
  return (
    <main>
      <Container>
        <Breadcrumbs
          items={[
            { name: "Beranda", path: "/" },
            { name: "Media & Informasi", path: "/media-informasi/artikel-kesehatan" },
            { name: "Artikel Kesehatan", path: "/media-informasi/artikel-kesehatan" },
          ]}
        />
      </Container>

      <HealthArticle />
      <SocialMedia />
    </main>
  );
}
