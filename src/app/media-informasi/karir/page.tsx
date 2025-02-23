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
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </Motion>
      </Container>

      <Container className="relative flex min-h-screen gap-16 pt-4 pb-16">
        <div className="w-full">
          <Carriers />
        </div>

        <div className="sticky self-start space-y-8 top-4">
          <Submenu
            menu="Akses Menu"
            title="Media & Informasi"
            items={[
              { title: "Artikel Kesehatan", link: "/media-informasi/artikel-kesehatan" },
              { title: "Event & Community", link: "/media-informasi/event-community" },
              { title: "Paket Kesehatan", link: "/media-informasi/form-management" },
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
