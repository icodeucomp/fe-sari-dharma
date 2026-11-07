import { Certification, HistoricalTimeline, Message, VisionMission } from "@/components/ui/about-us";

import { Hero } from "@/components/ui";

import { Breadcrumbs, Container, Submenu } from "@/components";

export default function OverviewPage() {
  return (
    <main>
      <Hero src="/images/clinic-introduction.webp" title="Klinik Utama Rawat Inap Sari Dharma" titlePage="Klinik introduction" />
      <Container>
        <Breadcrumbs
          items={[
            { name: "Beranda", path: "/" },
            { name: "Tentang Kami", path: "/about-us/overview" },
            { name: "Klinik introduction", path: "/about-us/overview" },
          ]}
        />
      </Container>
      <Container className="relative flex flex-col-reverse md:flex-row min-h-screen gap-8 xl:gap-16 pb-16 pt-4 sm:pt-8">
        <div className="w-full space-y-16">
          <section id="message">
            <Message />
          </section>
          <section id="visi-misi">
            <VisionMission />
          </section>
          <section id="certification-awards">
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
              { title: "Overview", link: "/about-us/overview#message" },
              { title: "Mission & Vision", link: "/about-us/overview#visi-misi" },
              { title: "Sertifikasi & Penghargaan", link: "/about-us/overview#certification-awards" },
              { title: "Linimasa Historikal", link: "/about-us/overview#histori" },
            ]}
          />

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
