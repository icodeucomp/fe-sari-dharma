import { Breadcrumbs, Container } from "@/components";
import { SocialMedia } from "@/components/ui";
import { HealthArticle } from "@/components/ui/media";

export default function HealthArticlesPage() {
  return (
    <main>
      <Container>
        <Breadcrumbs
          items={[
            { name: "Beranda", path: "/" },
            { name: "Media & Informasi", path: "/media-information/health-articles" },
            { name: "Artikel Kesehatan", path: "/media-information/health-articles" },
          ]}
        />
      </Container>

      <HealthArticle />
      <SocialMedia />
    </main>
  );
}
