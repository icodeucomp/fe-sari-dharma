import axios from 'axios';

interface MasterKategori {
  id: string;
  name: string;
  page: string;
  flag: string;
  created_at: string;
  updated_at: string;
}

interface MasterKategoriResponse {
  success: boolean;
  data: {
    current_page: number;
    data: MasterKategori[];
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

/**
 * Service untuk mengambil data master kategori
 */
export const getMasterKategori = async ({
  flag = 'ArtikelKesehatan',
  per_page = 100,
  page = 1,
  search,
}: {
  flag?: string;
  per_page?: number;
  page?: number;
  search?: string;
} = {}) => {
  const params = new URLSearchParams({
    flag,
    per_page: per_page.toString(),
    page: page.toString(),
    ...(search && { search }),
  });

  const response = await axios.get<MasterKategoriResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/master-kategori?${params}`
  );

  return response.data;
};
