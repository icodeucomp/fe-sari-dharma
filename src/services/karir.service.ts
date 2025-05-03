import axios from 'axios';

interface KarirResponse {
  success: boolean;
  data: {
    current_page: number;
    data: Karir[];
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

interface Karir {
  id: string;
  divisi: string;
  posisi: string;
  link_pendaftaran: string;
  foto: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

interface GetKarirParams {
  page?: number;
  per_page?: number;
  search?: string;
}

/**
 * Service untuk mengambil data karir
 */
export const getKarir = async ({
  page = 1,
  per_page = 10,
  search,
}: GetKarirParams = {}) => {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: per_page.toString(),
    ...(search && { search }),
  });

  const response = await axios.get<KarirResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/karir?${params}`
  );

  return response.data;
};
