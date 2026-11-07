import { Breadcrumbs, Container, Motion, Submenu } from "@/components";
import { Indicators } from "@/components/ui/media";

export default function QualitiesIndicatorsPage() {
  return (
    <main>
      <Container>
        <Breadcrumbs
          items={[
            { name: "Beranda", path: "/" },
            { name: "Media & Informasi", path: "/media-information/health-articles" },
            { name: "Artikel Kesehatan", path: "/media-information/health-articles" },
          ]}
        />
      </Container>

      <Container className="space-y-4">
        <Motion tag="h2" initialY={-50} animateY={0} duration={0.3} className="heading">
          Indikator Mutu
        </Motion>
        <Motion tag="p" initialY={-50} animateY={0} duration={0.6} delay={0.3} className="pb-8 leading-tight border-b subheading border-gray/50">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </Motion>
      </Container>

      <Container className="relative flex flex-col-reverse md:flex-row min-h-screen gap-8 xl:gap-16 pb-16 pt-4 sm:pt-8">
        <div className="w-full">
          <Indicators />
        </div>

        <div className="md:sticky self-start space-y-8 top-4 w-full md:max-w-xs">
          <Submenu
            menu="Akses Menu"
            title="Media & Informasi"
            items={[
              { title: "Artikel Kesehatan", link: "/media-information/health-articles" },
              { title: "Event & Community", link: "/media-information/community-events" },
              { title: "Paket Kesehatan", link: "/media-information/promo-packages" },
              { title: "Indikator Mutu", link: "/media-information/quality-indicators" },
              { title: "Karir", link: "/media-information/careers" },
              { title: "Form Management", link: "/media-information/form-management" },
            ]}
          />
        </div>
      </Container>
    </main>
  );
}
