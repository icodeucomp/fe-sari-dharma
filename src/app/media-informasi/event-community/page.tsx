import { Breadcrumbs, Container, Motion, Submenu } from "@/components";
import { EventsCommunities } from "@/components/ui/media";

export default function EventsCommunitiesPage() {
  return (
    <main>
      <Container>
        <Breadcrumbs
          items={[
            { name: "Beranda", path: "/" },
            { name: "Media & Informasi", path: "/media-informasi/event-community" },
            { name: "Event & Community", path: "/media-informasi/event-community" },
          ]}
        />
      </Container>
      <Container className="space-y-4">
        <Motion tag="h2" initialX={-50} animateX={0} duration={0.3} className="heading">
          Event & Community
        </Motion>
        <Motion tag="p" initialX={-50} animateX={0} duration={0.6} delay={0.3} className="pb-8 leading-tight border-b subheading border-gray/50">
          Mari jadi bagian dari komunitas sehat bersama kami! Temukan informasi terbaru seputar seminar kesehatan, bakti sosial, donor darah, dan event menarik lainnya.
        </Motion>
      </Container>
      <Container className="relative flex flex-col-reverse md:flex-row min-h-screen gap-8 xl:gap-16 pb-16 pt-4 sm:pt-8">
        <div className="w-full">
          <EventsCommunities />
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
