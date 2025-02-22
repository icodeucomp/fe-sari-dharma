import { Breadcrumbs, Container } from "@/components";

import { MainEventCommunity } from "@/components/ui/media";

import { formatTitleCase } from "@/utils";

export default function EventCommunity({ params }: { params: { id: string } }) {
  return (
    <main>
      <Container>
        <Breadcrumbs
          items={[
            { name: "Beranda", path: "/" },
            { name: "Media & Informasi", path: "/media-informasi/event-community" },
            { name: "Event & Community", path: "/media-informasi/event-community" },
            { name: `${formatTitleCase(params.id)}`, path: `/media-informasi/artikel-kesehatan/${params.id}` },
          ]}
        />
      </Container>

      <MainEventCommunity />
    </main>
  );
}
