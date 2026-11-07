import { Ambulance } from "@/components/ui/about-us";

import { Hero } from "@/components/ui";

import { Breadcrumbs, Container, Submenu } from "@/components";

export default function AmbulancesPage() {
  return (
    <main>
      <Hero src="/images/clinic-introduction.webp" title="Siap, Cepat & Sigap. Layanan Ambulans Gawat Darurat 24/7" titlePage="Ambulans & Emergency" />
      <Container>
        <Breadcrumbs
          items={[
            { name: "Beranda", path: "/" },
            { name: "Tentang Kami", path: "/about-us/ambulance" },
            { name: "Ambulance & Emergency", path: "/about-us/ambulance" },
          ]}
        />
      </Container>
      <Container className="relative flex flex-col-reverse md:flex-row min-h-screen gap-8 xl:gap-16 pb-16 pt-4 sm:pt-8">
        <div className="w-full space-y-16">
          <section id="information">
            <Ambulance />
          </section>
        </div>

        <div className="md:sticky self-start space-y-8 top-4 w-full md:max-w-xs">
          <Submenu menu="Akses Cepat" title="Ambulance & Emergency" items={[{ title: "Informasi Ambulans", link: "/about-us/ambulance#information" }]} />

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
