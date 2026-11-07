import { Schedule } from "@/components/ui/find-doctor";

import { Breadcrumbs, Container, Submenu } from "@/components";

export default function DoctorsSchedulesPage() {
  return (
    <main>
      <Container>
        <Breadcrumbs
          items={[
            { name: "Beranda", path: "/" },
            { name: "Temukan Dokter", path: "/find-doctor/schedule" },
            { name: "Jadwal Dokter", path: "/find-doctor/schedule" },
          ]}
        />
      </Container>
      <Container className="relative flex flex-col-reverse md:flex-row min-h-screen gap-8 xl:gap-16 pb-16 pt-4 sm:pt-8">
        <div className="w-full min-w-0">
          <Schedule />
        </div>

        <div className="md:sticky self-start space-y-8 top-4 w-full md:max-w-xs">
          <Submenu
            menu="Akses Menu"
            title="Tentang Kami"
            items={[
              { title: "Klinik Introduction", link: "/about-us/overview" },
              { title: "Layanan & Fasilitas", link: "/about-us/facility-services" },
            ]}
          />
        </div>
      </Container>
    </main>
  );
}
