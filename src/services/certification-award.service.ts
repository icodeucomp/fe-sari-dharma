import axios from 'axios';

interface CertificationAwardResponse {
  success: boolean;
  data: {
    current_page: number;
    data: CertificationAward[];
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

interface CertificationAward {
  id: string;
  title: string;
  pdf_file: string;
  photo: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export const getCertificationAward = async (page: number = 1, perPage: number = 10, search?: string) => {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
    ...(search && { search }),
  });

  const response = await axios.get<CertificationAwardResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/certification-awards?${params}`
  );

  return response.data;
};
