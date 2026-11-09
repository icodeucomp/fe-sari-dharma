"use client";

import * as React from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button, Dropdown, EmptyState, Img, LoadingState, Motion, Pagination } from "@/components";
import { getDoctorSchedule } from "@/services/doctor-schedule.service";
import axios from "axios";

const getImageUrl = (path: string) => {
  if (!path) return "/images/placeholder.jpg";
  if (path.startsWith("http")) return path;
  return `${process.env.NEXT_PUBLIC_API_URL}/storage/${path}`;
};

const formatScheduleByDay = (doctorSchedule: any[]) => {
  const dayList = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
  const formattedSchedule: { [key: string]: string } = {};

  dayList.forEach((day) => {
    formattedSchedule[day] = "-";
  });

  doctorSchedule.forEach((schedule) => {
    if (dayList.includes(schedule.day)) {
      formattedSchedule[schedule.day] = `${schedule.start_time} - ${schedule.end_time}`;
    }
  });

  return formattedSchedule;
};

const dayOptions = [
  { label: "Senin", value: "Senin" },
  { label: "Selasa", value: "Selasa" },
  { label: "Rabu", value: "Rabu" },
  { label: "Kamis", value: "Kamis" },
  { label: "Jumat", value: "Jumat" },
  { label: "Sabtu", value: "Sabtu" },
  { label: "Minggu", value: "Minggu" },
];

interface Doctor {
  id: string;
  name: string;
  label: string;
  value: string;
}

interface Specialist {
  id: string;
  name: string;
  label: string;
  value: string;
}

export const Schedule = () => {
  const [page, setPage] = React.useState<number>(1);
  const [filters, setFilters] = React.useState({
    specialist_id: "",
    doctor_id: "",
  });
  const [doctorDisplay, setDoctorDisplay] = React.useState<string>("semua");
  const [specialistDisplay, setSpecialistDisplay] = React.useState<string>("semua");
  const [day, setDay] = React.useState<string>("");

  const router = useRouter();

  const { data: scheduleResponse, isLoading: loading } = useQuery({
    queryKey: ["doctor-schedules", page, filters, day],
    queryFn: () =>
      getDoctorSchedule(page, 10, {
        specialist_id: filters.specialist_id || undefined,
        doctor_id: filters.doctor_id || undefined,
        day: day !== "semua" ? day : undefined,
      }),
    placeholderData: keepPreviousData,
  });
  const doctorSchedule: any[] = scheduleResponse?.data.data ?? [];
  const totalPage = scheduleResponse?.data.last_page ?? 1;

  const { data: listDoctor = [] } = useQuery({
    queryKey: ["doctors", "options"],
    queryFn: async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/doctors?per_page=100`);
      return response.data.data.data.map((doctor: any) => ({ label: doctor.name, value: doctor.id })) as Doctor[];
    },
  });

  const { data: listSpecialist = [] } = useQuery({
    queryKey: ["specialist-services", "options"],
    queryFn: async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/specialist-services?per_page=100`);
      return response.data.data.data.map((specialist: any) => ({ label: specialist.name, value: specialist.id })) as Specialist[];
    },
  });

  const handleFilteredSpecialist = (value: string) => {
    setFilters((prev) => ({ ...prev, specialist_id: value }));
    setSpecialistDisplay(value === "" ? "semua" : listSpecialist.find((s) => s.value === value)?.label || "semua");
    setPage(1);
  };

  const handleFilteredDoctor = (value: string) => {
    setFilters((prev) => ({ ...prev, doctor_id: value }));
    setDoctorDisplay(value === "" ? "semua" : listDoctor.find((d) => d.value === value)?.label || "semua");
    setPage(1);
  };

  const handleFilteredDay = (value: string) => {
    setDay(value);
    setPage(1);
  };

  const handleReset = () => {
    setFilters({ specialist_id: "", doctor_id: "" });
    setDoctorDisplay("semua");
    setSpecialistDisplay("semua");
    setDay("");
    setPage(1);
  };

  const handleClick = (doctorName: string, specialization: string) => {
    const message = `
                      Halo Admin,
                      Saya atas nama (...) ingin melakukan janji temu dengan dokter melalui website.
                      Berikut detailnya:
                        Dokter: ${doctorName} - ${specialization}
                        Hari: (isi…)
                        Jam: (isi…)
                      Mohon bantuannya untuk konfirmasi ketersediaan jadwal tersebut.
                      Terima kasih
                    `;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "628113881248";
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <div className="pb-8 space-y-4 border-b border-gray/50">
        <Motion tag="h2" initialY={-50} animateY={0} duration={0.3} className="heading">
          Jadwal Dokter
        </Motion>
        <Motion tag="p" initialY={-50} animateY={0} duration={0.6} delay={0.3} className="leading-tight subheading">
          Kami siap membantu Anda terhubung dengan dokter spesialis kami. <br />
          Lihat daftar dokter spesialis dan jadwalkan kunjungan dengan mudah.
        </Motion>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 py-8 border-b border-gray/50">
        <div className="w-full space-y-2">
          <h4 className="font-semibold text-primary">Spesialis</h4>
          <Dropdown
            className="top-14"
            parentClassName="w-full min-h-12"
            data={listSpecialist}
            handleFiltered={handleFilteredSpecialist}
            defaultValue="semua"
            displayValue={specialistDisplay}
          />
        </div>
        <div className="w-full space-y-2">
          <h4 className="font-semibold text-primary">Hari</h4>
          <Dropdown
            className="top-14"
            parentClassName="w-full min-h-12"
            data={dayOptions}
            handleFiltered={handleFilteredDay}
            defaultValue="semua"
            displayValue={day || "semua"}
          />
        </div>
        <div className="w-full space-y-2 flex items-end gap-2">
          <div className="w-full">
            <h4 className="font-semibold text-primary">Dokter</h4>
            <Dropdown
              className="top-14"
              parentClassName="w-full min-h-12"
              data={listDoctor}
              handleFiltered={handleFilteredDoctor}
              defaultValue="semua"
              displayValue={doctorDisplay}
            />
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="h-12 px-4 py-2 mt-6 text-sm font-semibold text-white bg-primary rounded hover:bg-primary/90 transition"
          >
            Reset
          </button>
        </div>
      </div>
      <div className="w-full mb-8 space-y-8">
        {loading ? (
          <LoadingState />
        ) : doctorSchedule.length === 0 ? (
          <EmptyState
            title="Jadwal dokter tidak ditemukan"
            description="Belum ada jadwal yang cocok. Coba ubah filter spesialis, hari atau dokter."
          />
        ) : (
          doctorSchedule.map((schedule) => {
            const formattedSchedule = formatScheduleByDay(schedule.schedule);

            return (
              <div key={schedule.id}>
                <div className="flex w-full gap-4 sm:gap-8 py-4 border-b border-gray/50">
                  {schedule.photo ? (
                    <Img src={getImageUrl(schedule.photo)} alt="dokter" className="min-h-60 sm:min-h-72 min-w-44 sm:min-w-52 rounded-lg" cover />
                  ) : (
                    <div className="min-h-60 sm:min-h-72 min-w-44 sm:min-w-52 rounded-lg" style={{ backgroundColor: "lightgray" }}></div>
                  )}
                  <div className="flex flex-col justify-between w-full gap-4">
                    <div className="space-y-1">
                      <h3 className="text-lg md:text-xl font-bold text-dark">{schedule.doctor.name}</h3>
                      <p className="font-semibold text-gray text-sm sm:text-base">
                        <span className="text-primary">{schedule.specialist.name}</span>
                      </p>
                    </div>
                    <div className="w-full overflow-x-auto scrollbar hidden md:block">
                      <table className="w-full text-sm text-center">
                        <thead>
                          <tr className="text-white bg-primary">
                            {["Senin", "Selasa", "Rabu", "Kamis", "Jumat"].map((day) => (
                              <th key={day} className="p-3 border border-primary">
                                {day}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            {["Senin", "Selasa", "Rabu", "Kamis", "Jumat"].map((day) => (
                              <td key={day} className="p-3 border border-gray/50">
                                {formattedSchedule[day]}
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button onClick={() => router.push(`/find-doctor/schedule/${schedule.id}`)} className="btn-outline">
                        View Full Profile
                      </Button>
                      <Button onClick={() => handleClick(schedule.doctor.name, schedule.specialist.name)} className="btn-primary">
                        Appointment
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="w-full overflow-x-auto scrollbar block md:hidden">
                  <table className="w-full text-xs sm:text-sm text-center">
                    <thead>
                      <tr className="text-white bg-primary">
                        {["Senin", "Selasa", "Rabu", "Kamis", "Jumat"].map((day) => (
                          <th key={day} className="p-3 border border-primary">
                            {day}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {["Senin", "Selasa", "Rabu", "Kamis", "Jumat"].map((day) => (
                          <td key={day} className="p-3 border border-gray/50">
                            {formattedSchedule[day]}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })
        )}
      </div>
      <Pagination page={page} totalPage={totalPage} setPage={setPage} isNumber />
    </>
  );
};
