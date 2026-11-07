import { navbarListType } from "@/types";
import { getFeaturedService } from "@/services/featured-service.service";

const staticNavbarLists: navbarListType[] = [
  {
    title: "Tentang Kami",
    content: [
      { title: "Klinik Introduction", link: "/about-us/overview" },
      { title: "Layanan & Fasilitas", link: "/about-us/facility-services" },
      { title: "Ambulance & Emergency", link: "/about-us/ambulance" },
    ],
  },
  {
    title: "Layanan Unggulan",
    content: [],
  },
  {
    title: "Temukan Dokter",
    content: [{ title: "Jadwal Dokter", link: "/find-doctor/schedule" }],
  },
  {
    title: "Media & Informasi",
    content: [
      { title: "Hubungi Kami", link: "/media-information/contact-us" },
      { title: "Paket & Promo Kesehatan", link: "/media-information/promo-packages" },
      { title: "Artikel Kesehatan", link: "/media-information/health-articles" },
      { title: "Event & Community", link: "/media-information/community-events" },
      { title: "Karir", link: "/media-information/careers" },
    ],
  },
];

export const getNavbarLists = async (): Promise<navbarListType[]> => {
  try {
    const featuredServiceResponse = await getFeaturedService(1, 20);
    const featuredServiceContent = featuredServiceResponse.data.data.map((item: any) => ({
      title: item.name,
      link: `/featured-services/${item.slug}/${item.id}`,
    }));

    const dynamicNavbarLists = staticNavbarLists.map((navItem) => {
      if (navItem.title === "Layanan Unggulan") {
        return {
          ...navItem,
          content: featuredServiceContent,
        };
      }
      return navItem;
    });

    return dynamicNavbarLists;
  } catch {

    return staticNavbarLists;
  }
};

export const navbarLists = staticNavbarLists;
