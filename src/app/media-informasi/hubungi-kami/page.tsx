import { Breadcrumbs, Container, Motion } from "@/components";

import { Hero } from "@/components/ui";

import { Contacts } from "@/components/ui/media";

export default function ContactUsPage() {
  return (
    <main>
      <Hero src="/images/contact-us.webp" title="Klinik Utama Rawat Inap Sari Dharma" titlePage="Hubungi Kami" />
      <Container>
        <Breadcrumbs
          items={[
            { name: "Beranda", path: "/" },
            { name: "Media & Informasi", path: "/media-informasi/hubungi-kami" },
            { name: "Hubungi Kami", path: "/media-informasi/hubungi-kami" },
          ]}
        />
      </Container>
      <Container className="space-y-4">
        <Motion tag="h2" initialX={-50} animateX={0} duration={0.3} className="heading">
          Hubungi Kami
        </Motion>
        <Motion tag="p" initialX={-50} animateX={0} duration={0.6} delay={0.3} className="pb-8 leading-tight border-b subheading border-gray/50">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </Motion>
      </Container>
      <Contacts />
    </main>
  );
}
