import { Ambulance } from "@/components/ui/about-us";

import { Hero } from "@/components/ui";

import { Breadcrumbs, Container, Submenu } from "@/components";

export default function Ambulances() {
  return (
    <main>
      <Hero src="/images/ambulance.webp" title="Siap, Cepat & Sigap. Layanan Ambulans Gawat Darurat 24/7" titlePage="Ambulans & Emergency" />
      <Container>
        <Breadcrumbs
          items={[
            { name: "Beranda", path: "/" },
            { name: "Tentang Kami", path: "/tentang-kami/ambulans" },
            { name: "Ambulance & Emergency", path: "/tentang-kami/ambulans" },
          ]}
        />
      </Container>
      <Container className="relative flex min-h-screen gap-16 py-16">
        <div className="w-full space-y-16">
          <section id="informasi">
            <Ambulance />
          </section>
        </div>

        <div className="sticky self-start space-y-8 top-4">
          <Submenu menu="Akses Cepat" title="Ambulance & Emergency" items={[{ title: "Informasi Ambulans", link: "/tentang-kami/ambulans#informasi" }]} />

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
