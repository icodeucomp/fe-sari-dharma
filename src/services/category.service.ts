import axios from 'axios';

interface MasterCategory {
  id: string;
  name: string;
  page: string;
  flag: string;
  created_at: string;
  updated_at: string;
}

interface MasterCategoryResponse {
  success: boolean;
  data: {
    current_page: number;
    data: MasterCategory[];
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

export const getMasterCategory = async ({
  flag = 'HealthArticle',
  per_page = 100,
  page = 1,
  search,
}: {
  flag?: string;
  per_page?: number;
  page?: number;
  search?: string;
} = {}) => {
  const params = new URLSearchParams({
    flag,
    per_page: per_page.toString(),
    page: page.toString(),
    ...(search && { search }),
  });

  const response = await axios.get<MasterCategoryResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories?${params}`
  );

  return response.data;
};
