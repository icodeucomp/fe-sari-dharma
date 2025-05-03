import axios from 'axios';

interface ArtikelKesehatanResponse {
  success: boolean;
  data: {
    current_page: number;
    data: ArtikelKesehatan[];
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

interface ArtikelKesehatan {
  id: string;
  kategori_id: string;
  judul: string;
  konten: string;
  dokter_terkait: string[];
  foto: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

interface ArtikelParams {
  page?: number;
  per_page?: number;
  search?: string;
  slug?: string;
  kategori_id?: string;
  dokter_terkait?: string | string[];
}

interface ArtikelDetail {
  id: string;
  kategori_id: string;
  judul: string;
  slug: string;
  konten: string;
  dokter_terkait: string[];
  foto: string;
  kategori: {
    id: string;
    name: string;
    page: string;
    flag: string;
  };
  created_at: string;
  updated_at: string;
}

/**
 * Service untuk mengambil data artikel kesehatan
 */
export const getArtikelKesehatan = async (params?: ArtikelParams) => {
  const queryParams = new URLSearchParams({
    page: (params?.page || 1).toString(),
    per_page: (params?.per_page || 10).toString(),
    ...(params?.search && { search: params.search }),
    ...(params?.slug && { slug: params.slug }),
    ...(params?.kategori_id && { kategori_id: params.kategori_id }),
    ...(params?.dokter_terkait && { dokter_terkait: JSON.stringify(params.dokter_terkait) }),
  });

  const response = await axios.get<ArtikelKesehatanResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/artikel-kesehatan?${queryParams}`
  );

  return response.data;
};

/**
 * Service untuk mengambil detail artikel kesehatan berdasarkan slug dan id
 */
export const getArtikelKesehatanDetail = async (slug: string, id: string) => {
  const response = await axios.get<{ success: boolean; data: ArtikelDetail }>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/artikel-kesehatan/${slug}/${id}`
  );
  return response.data;
};
