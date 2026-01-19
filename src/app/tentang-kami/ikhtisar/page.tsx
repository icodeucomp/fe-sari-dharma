import { Certification, HistoricalTimeline, Message, VisionMission } from "@/components/ui/about-us";

import { Hero } from "@/components/ui";

import { Breadcrumbs, Container, Submenu } from "@/components";

export default function OverviewPage() {
  return (
    <main>
      <Hero src="/images/klinik-introduction.webp" title="Klinik Utama Rawat Inap Sari Dharma" titlePage="Klinik introduction" />
      <Container>
        <Breadcrumbs
          items={[
            { name: "Beranda", path: "/" },
            { name: "Tentang Kami", path: "/tentang-kami/ikhtisar" },
            { name: "Klinik introduction", path: "/tentang-kami/ikhtisar" },
          ]}
        />
      </Container>
      <Container className="relative flex flex-col-reverse md:flex-row min-h-screen gap-8 xl:gap-16 pb-16 pt-4 sm:pt-8">
        <div className="w-full space-y-16">
          <section id="pesan">
            <Message />
          </section>
          <section id="visi-misi">
            <VisionMission />
          </section>
          <section id="sertifikasi-penghargaan">
            <Certification />
          </section>
          <section id="histori">
            <HistoricalTimeline />
          </section>
        </div>

        <div className="md:sticky self-start space-y-8 top-4 w-full md:max-w-xs">
          <Submenu
            menu="Akses Cepat"
            title="Klinik Introduction"
            items={[
              { title: "Overview", link: "/tentang-kami/ikhtisar#pesan" },
              { title: "Mission & Vision", link: "/tentang-kami/ikhtisar#visi-misi" },
              { title: "Sertifikasi & Penghargaan", link: "/tentang-kami/ikhtisar#sertifikasi-penghargaan" },
              { title: "Linimasa Historikal", link: "/tentang-kami/ikhtisar#histori" },
            ]}
          />

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
