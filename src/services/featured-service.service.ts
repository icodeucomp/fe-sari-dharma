import axios from "axios";

interface FeaturedServiceResponse {
  success: boolean;
  data: {
    current_page: number;
    data: FeaturedService[];
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

interface FeaturedService {
  id: string;
  name: string;
  slug: string;
  description: string;
  photo: string;
  created_at: string;
  updated_at: string;
}

interface FeaturedServiceDetail {
  id: string | number;
  name: string;
  description: string;
  photo: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export const getFeaturedService = async (page: number = 1, perPage: number = 10, search?: string) => {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
    ...(search && { search }),
  });

  const response = await axios.get<FeaturedServiceResponse>(`${process.env.NEXT_PUBLIC_API_URL}/api/featured-services?${params}`);

  return response.data;
};

export const getFeaturedServiceDetail = async (slug: string, id: string) => {
  const response = await axios.get<{ success: boolean; data: FeaturedServiceDetail }>(`${process.env.NEXT_PUBLIC_API_URL}/api/featured-services/${slug}/${id}`);

  if (response.data.data.photo && !response.data.data.photo) {
    response.data.data.photo = response.data.data.photo;
  }

  return response.data;
};
