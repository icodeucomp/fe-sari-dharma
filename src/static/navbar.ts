import { navbarListType } from "@/types";

export const navbarLists: navbarListType[] = [
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
    content: [
      { title: "Neurology Center", link: "/layanan-unggulan/neurology-center" },
      { title: "Digestive & Endoscopy Center", link: "/layanan-unggulan/digestive-endoscopy-center" },
      { title: "Mom & Kids Center", link: "/layanan-unggulan/mom-kids-center" },
      { title: "Orthopedic & Traumatology", link: "/layanan-unggulan/orthopedic-traumatology" },
      { title: "Urology Center", link: "/layanan-unggulan/urology-center" },
      { title: "Hidroterapi (Terapi Air)", link: "/layanan-unggulan/hidroterapi" },
      { title: "Cardiovascular Center", link: "/layanan-unggulan/cardiovascular-center" },
    ],
  },
  {
    title: "Temukan Dokter",
    content: [
      { title: "Jadwal Dokter", link: "/temukan-dokter/jadwal" },
      { title: "Buat Janji Dokter", link: "/temukan-dokter/janji" },
    ],
  },
  {
    title: "Media & Informasi",
    content: [
      { title: "Hubungi Kami", link: "/media-informasi/hubungi-kami" },
      { title: "Paket & Promo Kesehatan", link: "/media-informasi/paket-promo" },
      { title: "Artikel Kesehatan", link: "/media-informasi/artikel-kesehatan" },
      { title: "Event & Community", link: "/media-informasi/event-community" },
      { title: "Indikator Mutu", link: "/media-informasi/indikator-mutu" },
      { title: "Karir", link: "/media-informasi/karir" },
      { title: "Form Management", link: "/media-informasi/form-management" },
    ],
  },
];
