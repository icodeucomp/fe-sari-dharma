import axios from 'axios';

interface JadwalHarian {
  hari: string;
  jam_mulai: string;
  jam_selesai: string;
}

interface EdukasiKarir {
  judul: string;
  tahun_mulai: number;
  tahun_selesai: number | null;
}

interface DokterDetail {
  id: string;
  nama_dokter: string;
  foto: string;
}

interface SpesialisDetail {
  id: string;
  nama_layanan: string;
  deskripsi: string;
  icon: string;
}

interface JadwalDokterDetailResponse {
  success: boolean;
  data: {
    id: string;
    dokter_id: string;
    spesialis_id: string;
    background_dokter: string;
    jadwal_dokter: JadwalHarian[];
    edukasi_karir: EdukasiKarir[];
    foto: string;
    dokter: DokterDetail;
    spesialis: SpesialisDetail;
    created_at: string;
    updated_at: string;
  };
}

/**
 * Service untuk mengambil detail jadwal dokter berdasarkan ID
 */
export const getJadwalDokterDetail = async (id: string) => {
  const response = await axios.get<JadwalDokterDetailResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/jadwal-dokter/${id}`
  );
  return response.data;
};
