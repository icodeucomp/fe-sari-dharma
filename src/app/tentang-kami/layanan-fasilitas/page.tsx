import { ServiceFacility } from "@/components/ui/about-us";

import { Hero, Submenu } from "@/components/ui";

import { Breadcrumbs, Container, Motion } from "@/components";

export default function ServicesAndFacilities() {
  return (
    <main>
      <Hero src="/images/ambulance.webp" title="Klinik Utama Rawat Inap Sari Dharma" titlePage="Layanan & Fasilitas" />
      <Container>
        <Breadcrumbs
          items={[
            { name: "Beranda", path: "/" },
            { name: "Tentang Kami", path: "/tentang-kami/layanan-fasilitas" },
            { name: "Layanan & Fasilitas", path: "/tentang-kami/layanan-fasilitas" },
          ]}
        />
      </Container>
      <Container className="relative flex min-h-screen gap-16 py-16">
        <div className="w-full">
          <section id="daftar">
            <ServiceFacility />
          </section>
        </div>

        <div className="sticky self-start space-y-8 top-4">
          <Motion tag="div" initialY={50} animateY={0} duration={0.3}>
            <Submenu menu="Akses Cepat" title="Ambulance & Emergency" items={[{ title: "Daftar Layanan & Fasilitas", link: "/tentang-kami/layanan-fasilitas#daftar" }]} />
          </Motion>

          <Motion tag="div" initialY={50} animateY={0} duration={0.3}>
            <Submenu
              menu="Akses"
              title="Tentang Kami"
              items={[
                { title: "Klinik Introduction", link: "/tentang-kami/ikhtisar" },
                { title: "Layanan & Fasilitas", link: "/tentang-kami/layanan-fasilitas" },
                { title: "Ambulance & Emergency", link: "/tentang-kami/ambulans" },
              ]}
            />
          </Motion>
        </div>
      </Container>
    </main>
  );
}
