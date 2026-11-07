import axios from "axios";

interface DoctorSchedule {
  id: string;
  doctor_id: string;
  specialist_id: string;
  doctor_background: string;
  schedule: Array<{
    day: string;
    start_time: string;
    end_time: string;
  }>;
  education_career: Array<{
    title: string;
    start_year: number;
    end_year: number | null;
  }>;
  photo: string;
  created_at: string;
  updated_at: string;
}

interface DoctorScheduleResponse {
  success: boolean;
  data: {
    current_page: number;
    data: DoctorSchedule[];
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

export const getDoctorSchedule = async (
  page: number = 1,
  perPage: number = 10,
  params?: {
    search?: string;
    doctor_id?: string;
    specialist_id?: string;
    day?: string;
  }
) => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
    ...(params?.search && { search: params.search }),
    ...(params?.doctor_id && { doctor_id: params.doctor_id }),
    ...(params?.specialist_id && { specialist_id: params.specialist_id }),
    ...(params?.day && { day: params.day }),
  });

  const response = await axios.get<DoctorScheduleResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/doctor-schedules?${queryParams}`
  );

  return response.data;
};
