import axios from 'axios';

interface PaketKesehatanResponse {
  success: boolean;
  data: {
    current_page: number;
    data: PaketKesehatan[];
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

export interface PaketKesehatan {
  id: string;
  nama_paket: string;
  kategori_id: string;
  promo: boolean;
  berlaku_sampai: string;
  deskripsi: string;
  foto: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

interface PaketKesehatanDetail extends PaketKesehatan {
  kategori: {
    id: string;
    name: string;
    page: string;
    flag: string;
  };
}

interface PaketKesehatanDetailResponse {
  success: boolean;
  data: PaketKesehatanDetail;
}

interface GetPaketKesehatanParams {
  page?: number;
  per_page?: number;
  search?: string;
  kategori_id?: string;
  promo?: boolean;
  berlaku_start?: string;
  berlaku_end?: string;
}

/**
 * Service untuk mengambil data paket kesehatan
 */
export const getPaketKesehatan = async ({
  page = 1,
  per_page = 10,
  search,
  kategori_id,
  promo,
  berlaku_start,
  berlaku_end,
}: GetPaketKesehatanParams = {}) => {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: per_page.toString(),
    ...(search && { search }),
    ...(kategori_id && { kategori_id }),
    ...(promo !== undefined && { promo: promo ? '1' : '0' }),
    ...(berlaku_start && { berlaku_start }),
    ...(berlaku_end && { berlaku_end }),
  });

  const response = await axios.get<PaketKesehatanResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/paket-kesehatan?${params}`
  );

  return response.data;
};

/**
 * Service untuk mengambil detail paket kesehatan berdasarkan slug dan id
 * @param slug - Slug paket kesehatan
 * @param id - ID paket kesehatan
 */
export const getPaketKesehatanDetail = async (slug: string, id: string) => {
  const response = await axios.get<PaketKesehatanDetailResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/paket-kesehatan/${slug}/${id}`
  );

  return response.data;
};
