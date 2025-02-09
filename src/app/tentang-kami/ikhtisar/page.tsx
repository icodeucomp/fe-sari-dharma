import { Breadcrumbs, Container } from "@/components";
import { Hero, Submenu } from "@/components/ui";
import { Message } from "@/components/ui/about-us";

export default function Overview() {
  return (
    <main>
      <Hero title="Klinik Utama Rawat Inap Sari Dharma" titlePage="Klinik introduction" />
      <Container>
        <Breadcrumbs
          items={[
            { name: "Beranda", path: "/" },
            { name: "Tentang Kami", path: "/" },
            { name: "Klinik introduction", path: "/ikhtisar" },
          ]}
        />
      </Container>
      <Container className="flex gap-8 py-16">
        <div className="w-full">
          <Message />
        </div>
        <Submenu
          menu="Akses Cepat"
          title="Klinik Introduction"
          items={[
            { title: "Overview", link: "/" },
            { title: "Mission & Vision", link: "/" },
            { title: "Sertifikasi & Penghargaan", link: "/" },
            { title: "Linimasa Historikal", link: "/" },
          ]}
        />
      </Container>
    </main>
  );
}
