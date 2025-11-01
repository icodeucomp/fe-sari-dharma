import { Breadcrumbs, Container, Motion, Submenu } from "@/components";
import { Carriers } from "@/components/ui/media";

export default function CarriersPages() {
  return (
    <main>
      <Container>
        <Breadcrumbs
          items={[
            { name: "Beranda", path: "/" },
            { name: "Media & Informasi", path: "/media-informasi/karir" },
            { name: "karir", path: "/media-informasi/karir" },
          ]}
        />
      </Container>

      <Container className="space-y-4">
        <Motion tag="h2" initialX={-50} animateX={0} duration={0.3} className="heading">
          Karir
        </Motion>
        <Motion tag="p" initialX={-50} animateX={0} duration={0.6} delay={0.3} className="pb-8 leading-tight border-b subheading border-gray/50">
          Temukan peluang kerja terbaru di Klinik Utama Rawat Inap Sari Dharma dan jadilah bagian dari tim yang peduli pada pelayanan dan inovasi di bidang kesehatan.
        </Motion>
      </Container>

      <Container className="relative flex flex-col-reverse md:flex-row min-h-screen gap-8 xl:gap-16 pb-16 pt-4 sm:pt-8">
        <div className="w-full">
          <Carriers />
        </div>

        <div className="md:sticky self-start space-y-8 top-4 w-full md:max-w-xs">
          <Submenu
            menu="Akses Menu"
            title="Media & Informasi"
            items={[
              { title: "Artikel Kesehatan", link: "/media-informasi/artikel-kesehatan" },
              { title: "Event & Community", link: "/media-informasi/event-community" },
              { title: "Paket Kesehatan", link: "/media-informasi/paket-promo" },
              { title: "Indikator Mutu", link: "/media-informasi/indikator-mutu" },
              { title: "Karir", link: "/media-informasi/karir" },
              { title: "Form Management", link: "/media-informasi/form-management" },
            ]}
          />
        </div>
      </Container>
    </main>
  );
}
