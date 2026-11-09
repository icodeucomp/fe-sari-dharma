import axios from 'axios';

interface ScheduleHarian {
  day: string;
  start_time: string;
  end_time: string;
}

interface EducationCareer {
  title: string;
  start_year: number;
  end_year: number | null;
}

interface DoctorDetail {
  id: string;
  name: string;
  photo: string;
}

interface SpecialistDetail {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface DoctorScheduleDetailResponse {
  success: boolean;
  data: {
    id: string;
    doctor_id: string;
    specialist_id: string;
    doctor_background: string;
    schedule: ScheduleHarian[];
    education_career: EducationCareer[];
    doctor: DoctorDetail;
    specialist: SpecialistDetail;
    created_at: string;
    updated_at: string;
  };
}

export const getDoctorScheduleDetail = async (id: string) => {
  const response = await axios.get<DoctorScheduleDetailResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/doctor-schedules/${id}`
  );
  return response.data;
};
