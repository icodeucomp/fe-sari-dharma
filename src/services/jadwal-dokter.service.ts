import axios from "axios";

interface JadwalDokter {
  id: string;
  dokter_id: string;
  spesialis_id: string;
  background_dokter: string;
  jadwal_dokter: Array<{
    hari: string;
    jam_mulai: string;
    jam_selesai: string;
  }>;
  edukasi_karir: Array<{
    judul: string;
    tahun_mulai: number;
    tahun_selesai: number | null;
  }>;
  foto: string;
  created_at: string;
  updated_at: string;
}

interface JadwalDokterResponse {
  success: boolean;
  data: {
    current_page: number;
    data: JadwalDokter[];
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
 * Service untuk mengambil data jadwal dokter
 */
export const getJadwalDokter = async (
  page: number = 1,
  perPage: number = 10,
  params?: {
    search?: string;
    dokter_id?: string;
    spesialis_id?: string;
    hari?: string;
  }
) => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
    ...(params?.search && { search: params.search }),
    ...(params?.dokter_id && { dokter_id: params.dokter_id }),
    ...(params?.spesialis_id && { spesialis_id: params.spesialis_id }),
    ...(params?.hari && { hari: params.hari }),
  });

  const response = await axios.get<JadwalDokterResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/jadwal-dokter?${queryParams}`
  );

  return response.data;
};
