import { ServiceFacility } from "@/components/ui/about-us";

import { Hero } from "@/components/ui";

import { Breadcrumbs, Container, Submenu } from "@/components";

export default function ServicesFacilitiesPage() {
  return (
    <main>
      <Hero src="/images/contact-us.webp" title="Klinik Utama Rawat Inap Sari Dharma" titlePage="Layanan & Fasilitas" />
      <Container>
        <Breadcrumbs
          items={[
            { name: "Beranda", path: "/" },
            { name: "Tentang Kami", path: "/tentang-kami/layanan-fasilitas" },
            { name: "Layanan & Fasilitas", path: "/tentang-kami/layanan-fasilitas" },
          ]}
        />
      </Container>
      <Container className="relative flex flex-col-reverse md:flex-row min-h-screen gap-8 xl:gap-16 pb-16 pt-4 sm:pt-8">
        <div className="w-full">
          <section id="daftar">
            <ServiceFacility />
          </section>
        </div>

        <div className="md:sticky self-start space-y-8 top-4 w-full md:max-w-xs">
          <Submenu menu="Akses Cepat" title="Ambulance & Emergency" items={[{ title: "Daftar Layanan & Fasilitas", link: "/tentang-kami/layanan-fasilitas#daftar" }]} />

          <Submenu
            menu="Akses Menu"
            title="Tentang Kami"
            items={[
              { title: "Klinik Introduction", link: "/tentang-kami/ikhtisar" },
              { title: "Layanan & Fasilitas", link: "/tentang-kami/layanan-fasilitas" },
              { title: "Ambulance & Emergency", link: "/tentang-kami/ambulans" },
            ]}
          />
        </div>
      </Container>
    </main>
  );
}
