import axios from 'axios';

interface LayananUnggulanResponse {
  success: boolean;
  data: {
    current_page: number;
    data: LayananUnggulan[];
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

interface LayananUnggulan {
  id: string;
  nama_layanan: string;
  slug: string;
  deskripsi: string;
  foto: string;
  created_at: string;
  updated_at: string;
}

/**
 * Service untuk mengambil data layanan unggulan
 */
export const getLayananUnggulan = async (page: number = 1, perPage: number = 10, search?: string) => {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
    ...(search && { search }),
  });

  const response = await axios.get<LayananUnggulanResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/layanan-unggulan?${params}`
  );

  return response.data;
};
