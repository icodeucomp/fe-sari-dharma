import axios from "axios";

interface IndikatorMutuResponse {
  success: boolean;
  data: {
    current_page: number;
    data: IndikatorMutu[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

export interface IndikatorMutu {
  id: string;
  kategori_id: string;
  judul: string;
  konten: string;
  foto: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

interface IndikatorMutuDetailResponse {
  success: boolean;
  data: {
    id: string;
    kategori_id: string;
    judul: string;
    slug: string;
    konten: string;
    foto: string;
    kategori: {
      id: string;
      name: string;
      page: string;
      flag: string;
    };
    created_at: string;
    updated_at: string;
  };
}

/**
 * Service untuk mengambil data event community
 */
export const getIndikatorMutu = async (page: number = 1, perPage: number = 10, search?: string) => {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
    ...(search && { search }),
  });

  const response = await axios.get<IndikatorMutuResponse>(`${process.env.NEXT_PUBLIC_API_URL}/api/indikator-mutu?${params}`);

  return response.data;
};

/**
 * Service untuk mengambil detail event community berdasarkan slug dan id
 * @param slug - Slug event community
 * @param id - ID event community
 */
export const getIndikatorMutuDetail = async (slug: string, id: string) => {
  const response = await axios.get<IndikatorMutuDetailResponse>(`${process.env.NEXT_PUBLIC_API_URL}/api/indikator-mutu/${slug}/${id}`);

  return response.data;
};
