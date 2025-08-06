import { navbarListType } from "@/types";
import { getLayananUnggulan } from "@/services/layanan-unggulan.service";

// Static navbar items
const staticNavbarLists: navbarListType[] = [
  {
    title: "Tentang Kami",
    content: [
      { title: "Klinik Introduction", link: "/tentang-kami/ikhtisar" },
      { title: "Layanan & Fasilitas", link: "/tentang-kami/layanan-fasilitas" },
      { title: "Ambulance & Emergency", link: "/tentang-kami/ambulans" },
    ],
  },
  {
    title: "Layanan Unggulan",
    content: [],
  },
  {
    title: "Temukan Dokter",
    content: [{ title: "Jadwal Dokter", link: "/temukan-dokter/jadwal" }],
  },
  {
    title: "Media & Informasi",
    content: [
      { title: "Hubungi Kami", link: "/media-informasi/hubungi-kami" },
      { title: "Paket & Promo Kesehatan", link: "/media-informasi/paket-promo" },
      { title: "Artikel Kesehatan", link: "/media-informasi/artikel-kesehatan" },
      { title: "Event & Community", link: "/media-informasi/event-community" },
      { title: "Karir", link: "/media-informasi/karir" },
    ],
  },
];

export const getNavbarLists = async (): Promise<navbarListType[]> => {
  try {
    const layananUnggulanResponse = await getLayananUnggulan(1, 20);
    const layananUnggulanContent = layananUnggulanResponse.data.data.map((item: any) => ({
      title: item.nama_layanan,
      link: `/layanan-unggulan/${item.slug}/${item.id}`,
    }));

    const dynamicNavbarLists = staticNavbarLists.map((navItem) => {
      if (navItem.title === "Layanan Unggulan") {
        return {
          ...navItem,
          content: layananUnggulanContent,
        };
      }
      return navItem;
    });

    return dynamicNavbarLists;
  } catch (error) {
    console.error("Error fetching Layanan Unggulan data:", error);

    return staticNavbarLists;
  }
};

export const navbarLists = staticNavbarLists;
