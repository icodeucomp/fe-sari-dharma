import axios from "axios";

export interface LayananSpesialis {
    id: string;
    nama_layanan: string;
    slug: string;
    deskripsi: string;
    icon: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface LayananSpesialisResponse {
    success: boolean;
    data: {
      current_page: number;
      data: LayananSpesialis[];
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
 * Service untuk mengambil data layanan spesialis
 */
export const getLayananSpesialis = async (
  search?: string,
  page: number = 1,
  per_page: number = 10
): Promise<LayananSpesialisResponse> => {
  const params = new URLSearchParams({
    ...(search && { search }),
    page: page.toString(),
    per_page: per_page.toString(),
  });

  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/layanan-spesialis?${params}`);
  return response.data;
};
