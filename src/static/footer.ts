import { getLayananUnggulan } from "@/services/layanan-unggulan.service";
import { footerListType } from "@/types";

export const footerList: footerListType[] = [
  {
    title: "Tentang Kami",
    navigation: [
      { subtitle: "Perkenalan Klinik", link: "/tentang-kami/ikhtisar" },
      { subtitle: "Layanan & Fasilitas", link: "/tentang-kami/layanan-fasilitas" },
      { subtitle: "Ambulance Emergency", link: "/tentang-kami/ambulans" },
    ],
  },
  {
    title: "Layanan Unggulan",
    navigation: [],
  },
  {
    title: "Temukan Dokter",
    navigation: [{ subtitle: "Jadwal Dokter", link: "/temukan-dokter/jadwal" }],
  },
  {
    title: "Media & Informasi",
    navigation: [
      { subtitle: "Hubungi Kami", link: "/media-informasi/hubungi-kami" },
      { subtitle: "Paket & Promo Kesehatan", link: "/media-informasi/paket-promo" },
      { subtitle: "Artikel Kesehatan", link: "/media-informasi/artikel-kesehatan" },
      { subtitle: "Event & Community", link: "/media-informasi/event-community" },
      { subtitle: "Karir", link: "/media-informasi/karir" },
    ],
  },
];

export const getFooterLists = async (): Promise<footerListType[]> => {
  try {
    const layananUnggulanResponse = await getLayananUnggulan(1, 20);
    const layananUnggulanContent = layananUnggulanResponse.data.data.map((item: any) => ({
      subtitle: item.nama_layanan,
      link: `/layanan-unggulan/${item.slug}/${item.id}`,
    }));

    const dynamicFooterLists = footerList.map((navItem) => {
      if (navItem.title === "Layanan Unggulan") {
        return {
          ...navItem,
          navigation: layananUnggulanContent,
        };
      }
      return navItem;
    });

    return dynamicFooterLists;
  } catch (error) {
    console.error("Error fetching Layanan Unggulan data:", error);

    return footerList;
  }
};

export const footer = footerList;
