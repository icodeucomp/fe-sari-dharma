import axios from "axios";

interface HealthArticleResponse {
  success: boolean;
  data: {
    current_page: number;
    data: HealthArticle[];
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

interface HealthArticle {
  id: string;
  category_id: string;
  title: string;
  content: string;
  related_doctors: string[];
  photo: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

interface ArticleParams {
  page?: number;
  per_page?: number;
  search?: string;
  slug?: string;
  category_id?: string;
  related_doctors?: string | string[];
}

interface ArticleDetail {
  id: string;
  category_id: string;
  title: string;
  slug: string;
  content: string;
  related_doctors: string[];
  photo: string;
  category: {
    id: string;
    name: string;
    page: string;
    flag: string;
  };
  created_at: string;
  updated_at: string;
}

export const getHealthArticle = async (params?: ArticleParams) => {
  const queryParams = new URLSearchParams({
    page: (params?.page || 1).toString(),
    per_page: (params?.per_page || 10).toString(),
    ...(params?.search && { search: params.search }),
    ...(params?.slug && { slug: params.slug }),
    ...(params?.category_id && { category_id: params.category_id }),
    ...(params?.related_doctors && { related_doctors: JSON.stringify(params.related_doctors) }),
  });

  const response = await axios.get<HealthArticleResponse>(`${process.env.NEXT_PUBLIC_API_URL}/api/health-articles?${queryParams}`);

  return response.data;
};

export const getHealthArticleDetail = async (slug: string, id: string) => {
  const response = await axios.get<{ success: boolean; data: ArticleDetail }>(`${process.env.NEXT_PUBLIC_API_URL}/api/health-articles/${slug}/${id}`);
  return response.data;
};
