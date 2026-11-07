import axios from 'axios';

interface CommunityEventResponse {
  success: boolean;
  data: {
    current_page: number;
    data: CommunityEvent[];
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

export interface CommunityEvent {
  id: string;
  category_id: string;
  title: string;
  content: string;
  photo: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

interface CommunityEventDetailResponse {
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

export const getCommunityEvent = async (page: number = 1, perPage: number = 10, search?: string) => {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
    ...(search && { search }),
  });

  const response = await axios.get<CommunityEventResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/community-events?${params}`
  );

  return response.data;
};

export const getCommunityEventDetail = async (slug: string, id: string) => {
  const response = await axios.get<CommunityEventDetailResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/community-events/${slug}/${id}`
  );

  return response.data;
};
