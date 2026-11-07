import axios from 'axios';

interface CareerResponse {
  success: boolean;
  data: {
    current_page: number;
    data: Career[];
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

interface Career {
  id: string;
  division: string;
  position: string;
  application_link: string;
  photo: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

interface GetCareerParams {
  page?: number;
  per_page?: number;
  search?: string;
}

export const getCareer = async ({
  page = 1,
  per_page = 10,
  search,
}: GetCareerParams = {}) => {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: per_page.toString(),
    ...(search && { search }),
  });

  const response = await axios.get<CareerResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/careers?${params}`
  );

  return response.data;
};
