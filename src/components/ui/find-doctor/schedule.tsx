"use client";

import * as React from "react";
import Image from "next/image";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button, Dropdown, EmptyState, LoadingState, Motion, Pagination } from "@/components";
import { getDoctorSchedule } from "@/services/doctor-schedule.service";
import axios from "axios";

const getImageUrl = (path: string) => {
  if (path.startsWith("http")) return path;
  return `${process.env.NEXT_PUBLIC_API_URL}/storage/${path}`;
};

const WEEK = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
// Index = Date.getDay()
const DAY_NAMES = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

const groupSlotsByDay = (doctorSchedule: any[]) => {
  const slots: Record<string, string[]> = {};
  doctorSchedule.forEach((item) => {
    (slots[item.day] ??= []).push(`${item.start_time} - ${item.end_time}`);
  });
  return slots;
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

// Opening hours per day. Saturday is always shown; Sunday only when the doctor works on it.
const ScheduleDays = ({ schedule }: { schedule: any[] }) => {
  const slots = groupSlotsByDay(schedule);
  const days = slots["Minggu"] ? [...WEEK, "Minggu"] : WEEK;
  const today = DAY_NAMES[new Date().getDay()];

  return (
    <dl
      className="grid grid-cols-3 gap-2 @min-[850px]:grid-cols-[repeat(var(--days),minmax(0,1fr))]"
      style={{ "--days": days.length } as React.CSSProperties}
    >
      {days.map((day) => {
        const daySlots = slots[day] ?? [];
        const open = daySlots.length > 0;
        return (
          <div
            key={day}
            className={`px-2 py-2.5 text-center rounded-lg border ${open ? "border-primary/30 bg-primary/5" : "border-gray/20 bg-gray/5"} ${day === today ? "ring-2 ring-secondary" : ""}`}
          >
            <dt className={`text-xs font-semibold ${open ? "text-primary" : "text-gray"}`}>
              {day}
              {day === today && <span className="sr-only"> (hari ini)</span>}
            </dt>
            <dd className={`mt-1 text-xs sm:text-[13px] ${open ? "font-medium text-dark" : "text-gray"}`}>
              {open
                ? daySlots.map((slot) => (
                    <span key={slot} className="block whitespace-nowrap">
                      {slot}
                    </span>
                  ))
                : "Libur"}
            </dd>
          </div>
        );
      })}
    </dl>
  );
};

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
      return response.data.data.data.map((doctor: any) => ({
        label: doctor.name,
        value: doctor.id,
      })) as Doctor[];
    },
  });

  const { data: listSpecialist = [] } = useQuery({
    queryKey: ["specialist-services", "options"],
    queryFn: async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/specialist-services?per_page=100`);
      return response.data.data.data.map((specialist: any) => ({
        label: specialist.name,
        value: specialist.id,
      })) as Specialist[];
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
    const message = [
      "Halo Admin,",
      "Saya atas nama (...) ingin melakukan janji temu dengan dokter melalui website.",
      "Berikut detailnya:",
      `Dokter: ${doctorName} - ${specialization}`,
      "Hari: (isi…)",
      "Jam: (isi…)",
      "Mohon bantuannya untuk konfirmasi ketersediaan jadwal tersebut.",
      "Terima kasih",
    ].join("\n");

    const phoneNumber = "628113881248";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <>
      <div className="pb-8 space-y-4 border-b border-gray/50">
        <Motion tag="h2" initialY={-50} animateY={0} duration={0.3} className="heading">
          Jadwal Dokter
        </Motion>
        <Motion tag="p" initialY={-50} animateY={0} duration={0.6} delay={0.3} className="leading-tight subheading">
          Kami siap membantu Anda terhubung dengan dokter spesialis kami. <br className="hidden sm:block" />
          Lihat daftar dokter spesialis dan jadwalkan kunjungan dengan mudah.
        </Motion>
      </div>

      <div className="grid items-end grid-cols-1 gap-4 py-8 border-b sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:gap-6 border-gray/50">
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
        <div className="w-full space-y-2">
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
          className="h-12 px-6 text-sm font-semibold transition sm:col-span-2 lg:col-span-1 text-light bg-primary rounded-md hover:bg-primary/90"
        >
          Reset
        </button>
      </div>

      <div className="w-full py-8 space-y-6">
        {loading ? (
          <LoadingState />
        ) : doctorSchedule.length === 0 ? (
          <EmptyState
            title="Jadwal dokter tidak ditemukan"
            description="Belum ada jadwal yang cocok. Coba ubah filter spesialis, hari atau dokter."
          />
        ) : (
          doctorSchedule.map((schedule) => (
            <div key={schedule.id} className="@container">
              <article className="grid grid-cols-[7rem_minmax(0,1fr)] @min-[560px]:grid-cols-[11rem_minmax(0,1fr)] @min-[850px]:grid-cols-[12rem_minmax(0,1fr)] gap-x-4 gap-y-4 @min-[560px]:gap-x-5 @min-[560px]:gap-y-5 p-4 transition-shadow border shadow-sm @min-[560px]:p-5 rounded-xl border-gray/20 bg-light hover:shadow-md">
                <div className="relative w-full overflow-hidden rounded-lg aspect-3/4 @min-[560px]:aspect-auto @min-[560px]:row-span-3 @min-[560px]:min-h-64 bg-gray/10">
                  {schedule.doctor.photo ? (
                    <Image src={getImageUrl(schedule.doctor.photo)} alt={schedule.doctor.name} fill sizes="192px" className="object-cover object-top" />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center px-4 text-sm text-center text-gray">Foto belum tersedia</span>
                  )}
                </div>

                <div className="self-center @min-[560px]:self-start">
                  <h3 className="text-lg font-bold leading-snug md:text-xl text-dark">{schedule.doctor.name}</h3>
                  <span className="inline-block px-3 py-1 mt-2 text-xs font-semibold rounded-full sm:text-sm bg-primary/10 text-primary">
                    {schedule.specialist.name}
                  </span>
                </div>

                <div className="col-span-2 @min-[560px]:col-span-1">
                  <ScheduleDays schedule={schedule.schedule ?? []} />
                </div>

                <div className="flex flex-col col-span-2 gap-3 @min-[560px]:col-span-1 @min-[560px]:mt-auto @min-[720px]:flex-row">
                  <Button onClick={() => router.push(`/find-doctor/schedule/${schedule.id}`)} className="btn-outline">
                    Lihat Profil Lengkap
                  </Button>
                  <Button onClick={() => handleClick(schedule.doctor.name, schedule.specialist.name)} className="btn-primary">
                    Buat Janji Temu
                  </Button>
                </div>
              </article>
            </div>
          ))
        )}
      </div>
      <Pagination page={page} totalPage={totalPage} setPage={setPage} isNumber />
    </>
  );
};
