import axios from "axios";

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

// Interface for detailed layanan unggulan response
interface LayananUnggulanDetail {
  id: string | number;
  nama_layanan: string;
  deskripsi: string;
  foto: string; // Change to match component's expectation
  slug: string;
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

  const response = await axios.get<LayananUnggulanResponse>(`${process.env.NEXT_PUBLIC_API_URL}/api/layanan-unggulan?${params}`);

  return response.data;
};

/**
 * Service untuk mengambil detail layanan unggulan berdasarkan slug dan id
 */
export const getLayananUnggulanDetail = async (slug: string, id: string) => {
  const response = await axios.get<{ success: boolean; data: LayananUnggulanDetail }>(`${process.env.NEXT_PUBLIC_API_URL}/api/layanan-unggulan/${slug}/${id}`);

  // If API returns gambar instead of foto, map it
  if (response.data.data.foto && !response.data.data.foto) {
    response.data.data.foto = response.data.data.foto;
  }

  return response.data;
};
