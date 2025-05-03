import axios from 'axios';

interface SertifikasiPenghargaanResponse {
  success: boolean;
  data: {
    current_page: number;
    data: SertifikasiPenghargaan[];
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

interface SertifikasiPenghargaan {
  id: string;
  judul: string;
  file_pdf: string;
  foto: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

/**
 * Service untuk mengambil data sertifikasi dan penghargaan
 * @param page - Nomor halaman
 * @param perPage - Jumlah item per halaman
 * @param search - Kata kunci pencarian
 */
export const getSertifikasiPenghargaan = async (page: number = 1, perPage: number = 10, search?: string) => {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
    ...(search && { search }),
  });

  const response = await axios.get<SertifikasiPenghargaanResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sertifikasi-penghargaan?${params}`
  );

  return response.data;
};
