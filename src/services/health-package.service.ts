import axios from 'axios';

interface HealthPackageResponse {
  success: boolean;
  data: {
    current_page: number;
    data: HealthPackage[];
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

export interface HealthPackage {
  id: string;
  name: string;
  category_id: string;
  promo: boolean;
  valid_until: string;
  description: string;
  photo: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

interface HealthPackageDetail extends HealthPackage {
  category: {
    id: string;
    name: string;
    page: string;
    flag: string;
  };
}

interface HealthPackageDetailResponse {
  success: boolean;
  data: HealthPackageDetail;
}

interface GetHealthPackageParams {
  page?: number;
  per_page?: number;
  search?: string;
  category_id?: string;
  promo?: boolean;
  valid_start?: string;
  valid_end?: string;
}

export const getHealthPackage = async ({
  page = 1,
  per_page = 10,
  search,
  category_id,
  promo,
  valid_start,
  valid_end,
}: GetHealthPackageParams = {}) => {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: per_page.toString(),
    ...(search && { search }),
    ...(category_id && { category_id }),
    ...(promo !== undefined && { promo: promo ? '1' : '0' }),
    ...(valid_start && { valid_start }),
    ...(valid_end && { valid_end }),
  });

  const response = await axios.get<HealthPackageResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/health-packages?${params}`
  );

  return response.data;
};

export const getHealthPackageDetail = async (slug: string, id: string) => {
  const response = await axios.get<HealthPackageDetailResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/health-packages/${slug}/${id}`
  );

  return response.data;
};
