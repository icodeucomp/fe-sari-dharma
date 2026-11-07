import axios from 'axios';

interface SocialMediaContentResponse {
  success: boolean;
  data: {
    current_page: number;
    data: SocialMediaContent[];
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

export interface SocialMediaContent {
  id: string;
  type: 'youtube' | 'instagram';
  links: string;
  created_at: string;
  updated_at: string;
}

export const getSocialMediaContent = async ({
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

  const response = await axios.get<SocialMediaContentResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/social-media-contents?${params}`
  );

  return response.data;
};