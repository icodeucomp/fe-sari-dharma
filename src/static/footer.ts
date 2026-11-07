import { getFeaturedService } from "@/services/featured-service.service";
import { footerListType } from "@/types";

export const footerList: footerListType[] = [
  {
    title: "Tentang Kami",
    navigation: [
      { subtitle: "Perkenalan Klinik", link: "/about-us/overview" },
      { subtitle: "Layanan & Fasilitas", link: "/about-us/facility-services" },
      { subtitle: "Ambulance Emergency", link: "/about-us/ambulance" },
    ],
  },
  {
    title: "Layanan Unggulan",
    navigation: [],
  },
  {
    title: "Temukan Dokter",
    navigation: [{ subtitle: "Jadwal Dokter", link: "/find-doctor/schedule" }],
  },
  {
    title: "Media & Informasi",
    navigation: [
      { subtitle: "Hubungi Kami", link: "/media-information/contact-us" },
      { subtitle: "Paket & Promo Kesehatan", link: "/media-information/promo-packages" },
      { subtitle: "Artikel Kesehatan", link: "/media-information/health-articles" },
      { subtitle: "Event & Community", link: "/media-information/community-events" },
      { subtitle: "Karir", link: "/media-information/careers" },
    ],
  },
];

export const getFooterLists = async (): Promise<footerListType[]> => {
  try {
    const featuredServiceResponse = await getFeaturedService(1, 20);
    const featuredServiceContent = featuredServiceResponse.data.data.map((item: any) => ({
      subtitle: item.name,
      link: `/featured-services/${item.slug}/${item.id}`,
    }));

    const dynamicFooterLists = footerList.map((navItem) => {
      if (navItem.title === "Layanan Unggulan") {
        return {
          ...navItem,
          navigation: featuredServiceContent,
        };
      }
      return navItem;
    });

    return dynamicFooterLists;
  } catch {

    return footerList;
  }
};

export const footer = footerList;
