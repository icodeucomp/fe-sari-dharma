import axios from 'axios';

interface FacilityServiceResponse {
  success: boolean;
  data: {
    current_page: number;
    data: FacilityService[];
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

interface FacilityService {
  id: string;
  name: string;
  overview_description: string;
  services: string;
  header_photo: string;
  other_photo: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

interface DetailFacilityService {
  id: string;
  name: string;
  overview_description: string;
  services: string;
  header_photo: string;
  other_photo: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

interface DetailFacilityServiceResponse {
  success: boolean;
  data: DetailFacilityService;
}

export const getFacilityService = async (page: number = 1, perPage: number = 10, search?: string) => {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
    ...(search && { search }),
  });

  const response = await axios.get<FacilityServiceResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/facility-services?${params}`
  );

  return response.data;
};

export const getDetailFacilityService = async (slug: string, id: string) => {
  const response = await axios.get<DetailFacilityServiceResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/facility-services/${slug}/${id}`
  );
  return response.data;
};
