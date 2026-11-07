import { ServiceFacility } from "@/components/ui/about-us";

import { Hero } from "@/components/ui";

import { Breadcrumbs, Container, Submenu } from "@/components";

export default function ServicesFacilitiesPage() {
  return (
    <main>
      <Hero src="/images/clinic-introduction-2.webp" title="Klinik Utama Rawat Inap Sari Dharma" titlePage="Layanan & Fasilitas" />
      <Container>
        <Breadcrumbs
          items={[
            { name: "Beranda", path: "/" },
            { name: "Tentang Kami", path: "/about-us/facility-services" },
            { name: "Layanan & Fasilitas", path: "/about-us/facility-services" },
          ]}
        />
      </Container>
      <Container className="relative flex flex-col-reverse md:flex-row min-h-screen gap-8 xl:gap-16 pb-16 pt-4 sm:pt-8">
        <div className="w-full">
          <section id="list">
            <ServiceFacility />
          </section>
        </div>

        <div className="md:sticky self-start space-y-8 top-4 w-full md:max-w-xs">
          <Submenu menu="Akses Cepat" title="Ambulance & Emergency" items={[{ title: "Daftar Layanan & Fasilitas", link: "/about-us/facility-services#list" }]} />

          <Submenu
            menu="Akses Menu"
            title="Tentang Kami"
            items={[
              { title: "Klinik Introduction", link: "/about-us/overview" },
              { title: "Layanan & Fasilitas", link: "/about-us/facility-services" },
              { title: "Ambulance & Emergency", link: "/about-us/ambulance" },
            ]}
          />
        </div>
      </Container>
    </main>
  );
}
