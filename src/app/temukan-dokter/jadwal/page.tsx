import { Schedule } from "@/components/ui/find-doctor";

import { Breadcrumbs, Container, Submenu } from "@/components";

export default function DoctorsSchedules() {
  return (
    <main>
      <Container>
        <Breadcrumbs
          items={[
            { name: "Beranda", path: "/" },
            { name: "Temukan Dokter", path: "/temukan-dokter/jadwal" },
            { name: "Jadwal Dokter", path: "/temukan-dokter/jadwal" },
          ]}
        />
      </Container>
      <Container className="relative flex min-h-screen gap-16 pb-16">
        <div className="w-full">
          <Schedule />
        </div>

        <div className="sticky self-start space-y-8 top-4">
          <Submenu
            menu="Akses Menu"
            title="Tentang Kami"
            items={[
              { title: "Klinik Introduction", link: "/tentang-kami/ikhtisar" },
              { title: "Layanan & Fasilitas", link: "/tentang-kami/layanan-fasilitas" },
            ]}
          />
        </div>
      </Container>
    </main>
  );
}
