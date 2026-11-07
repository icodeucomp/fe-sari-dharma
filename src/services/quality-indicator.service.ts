import axios from "axios";

interface QualityIndicatorResponse {
  success: boolean;
  data: {
    current_page: number;
    data: QualityIndicator[];
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

export interface QualityIndicator {
  id: string;
  category_id: string;
  title: string;
  content: string;
  photo: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

interface QualityIndicatorDetailResponse {
  success: boolean;
  data: {
    id: string;
    category_id: string;
    title: string;
    slug: string;
    content: string;
    photo: string;
    category: {
      id: string;
      name: string;
      page: string;
      flag: string;
    };
    created_at: string;
    updated_at: string;
  };
}

export const getQualityIndicator = async (page: number = 1, perPage: number = 10, search?: string) => {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
    ...(search && { search }),
  });

  const response = await axios.get<QualityIndicatorResponse>(`${process.env.NEXT_PUBLIC_API_URL}/api/quality-indicators?${params}`);

  return response.data;
};

export const getQualityIndicatorDetail = async (slug: string, id: string) => {
  const response = await axios.get<QualityIndicatorDetailResponse>(`${process.env.NEXT_PUBLIC_API_URL}/api/quality-indicators/${slug}/${id}`);

  return response.data;
};
