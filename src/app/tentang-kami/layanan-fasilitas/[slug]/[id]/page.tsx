import { DetailServiceFacility } from "@/components/ui/about-us";

import { Hero } from "@/components/ui";

import { Breadcrumbs, Container, Submenu } from "@/components";

import { formatTitleCase } from "@/utils";

export default function ServiceFacilityPage({ params }: { params: { id: string, slug:string } }) {
  return (
    <main>
      <Hero src="/images/service.webp" title="Klinik Utama Rawat Inap Sari Dharma" titlePage="Layanan & Fasilitas" />
      <Container>
        <Breadcrumbs
          items={[
            { name: "Beranda", path: "/" },
            { name: "Tentang Kami", path: "/tentang-kami/layanan-fasilitas" },
            { name: "Layanan & Fasilitas", path: "/tentang-kami/layanan-fasilitas" },
            { name: `${formatTitleCase(params.slug)}`, path: `/tentang-kami/layanan-fasilitas/${params.id}` },
          ]}
        />
      </Container>
      <Container className="relative flex min-h-screen gap-16 pb-16">
        <div className="w-full">
          <section id="daftar">
            <DetailServiceFacility />
          </section>
        </div>

        <div className="sticky self-start space-y-8 top-4">
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
