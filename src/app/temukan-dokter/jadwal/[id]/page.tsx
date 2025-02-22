import { Profile } from "@/components/ui/find-doctor";

import { Breadcrumbs, Container } from "@/components";
import { formatTitleCase } from "@/utils";

export default function DoctorProfile({ params }: { params: { id: string } }) {
  return (
    <main>
      <Container>
        <Breadcrumbs
          items={[
            { name: "Beranda", path: "/" },
            { name: "Temukan Dokter", path: "/temukan-dokter/jadwal" },
            { name: "Jadwal Dokter", path: "/temukan-dokter/jadwal" },
            { name: `${formatTitleCase(params.id)}`, path: `/temukan-dokter/jadwal/${params.id}` },
          ]}
        />
      </Container>
      <Profile />
    </main>
  );
}
