import axios from "axios";

export interface SpecialistService {
    id: string;
    name: string;
    slug: string;
    description: string;
    icon: string;
    created_at: string;
    updated_at: string;
  }

  export interface SpecialistServiceResponse {
    success: boolean;
    data: {
      current_page: number;
      data: SpecialistService[];
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

export const getSpecialistService = async (
  search?: string,
  page: number = 1,
  per_page: number = 10
): Promise<SpecialistServiceResponse> => {
  const params = new URLSearchParams({
    ...(search && { search }),
    page: page.toString(),
    per_page: per_page.toString(),
  });

  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/specialist-services?${params}`);
  return response.data;
};
