import axios from 'axios';

interface KontenSocialMediaResponse {
  success: boolean;
  data: {
    current_page: number;
    data: KontenSocialMedia[];
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

export interface KontenSocialMedia {
  id: string;
  type: 'youtube' | 'instagram';
  links: string;
  created_at: string;
  updated_at: string;
}

/**
 * Service untuk mengambil data konten social media
 * @param params Parameter untuk filter data
 */
export const getKontenSocialMedia = async ({
  page = 1,
  per_page = 10,
  search,
  type,
}: {
  page?: number;
  per_page?: number;
  search?: string;
  type?: 'youtube' | 'instagram';
} = {}) => {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: per_page.toString(),
    ...(search && { search }),
    ...(type && { type }),
  });

  const response = await axios.get<KontenSocialMediaResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/konten-social-media?${params}`
  );

  return response.data;
};