import { Breadcrumbs, Container } from "@/components";

import { MainCommunityEvent } from "@/components/ui/media";

import { formatTitleCase } from "@/utils";

export default async function CommunityEventPage({ params }: { params: Promise<{ id: string; slug: string }> }) {
  const { slug, id } = await params;

  return (
    <main>
      <Container>
        <Breadcrumbs
          items={[
            { name: "Beranda", path: "/" },
            { name: "Media & Informasi", path: "/media-information/community-events" },
            { name: "Event & Community", path: "/media-information/community-events" },
            { name: `${formatTitleCase(slug)}`, path: `/media-information/community-events/${slug}/${id}` },
          ]}
        />
      </Container>

      <MainCommunityEvent />
    </main>
  );
}
