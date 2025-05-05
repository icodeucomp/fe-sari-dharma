import axios from 'axios';

interface LayananFasilitasResponse {
  success: boolean;
  data: {
    current_page: number;
    data: LayananFasilitas[];
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

interface LayananFasilitas {
  id: string;
  nama_fasilitas: string;
  deskripsi_overview: string;
  layanan_fasilitas: string;
  foto_header: string;
  foto_lainnya: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

interface DetailLayananFasilitas {
  id: string;
  nama_fasilitas: string;
  deskripsi_overview: string;
  layanan_fasilitas: string;
  foto_header: string;
  foto_lainnya: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

interface DetailLayananFasilitasResponse {
  success: boolean;
  data: DetailLayananFasilitas;
}

/**
 * Service untuk mengambil data layanan fasilitas
 */
export const getLayananFasilitas = async (page: number = 1, perPage: number = 10, search?: string) => {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
    ...(search && { search }),
  });

  const response = await axios.get<LayananFasilitasResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/layanan-fasilitas?${params}`
  );

  return response.data;
};

/**
 * Service untuk mengambil detail layanan fasilitas berdasarkan slug dan id
 */
export const getDetailLayananFasilitas = async (slug: string, id: string) => {
  const response = await axios.get<DetailLayananFasilitasResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/layanan-fasilitas/${slug}/${id}`
  );
  return response.data;
};
