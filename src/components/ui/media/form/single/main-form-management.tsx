import { Button, Container, Motion, Submenu } from "@/components";

import { FaLink } from "react-icons/fa6";

export const MainFormManagement = () => {
  return (
    <Container className="relative flex min-h-screen gap-16 pb-16">
      <div className="w-full space-y-8">
        <div className="pb-8 space-y-12 border-b-2 border-gray/20">
          <Motion tag="h2" initialY={50} animateY={0} duration={0.5} className="text-4xl font-semibold text-primary">
            Survey Kepuasan
          </Motion>
          <Motion tag="div" initialY={50} animateY={0} duration={0.5} delay={0.3} className="flex justify-end">
            <Button className="flex items-center gap-1 btn-outline">
              Bagikan <FaLink />
            </Button>
          </Motion>
        </div>
        <div>This is for form view</div>
      </div>

      <div className="sticky self-start h-screen space-y-8 overflow-y-auto scrollbar top-4 min-w-[340px]">
        <Submenu
          menu="Akses Menu"
          title="Tentang Kami"
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
  );
};
