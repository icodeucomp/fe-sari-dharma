"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Profile } from "@/components/ui/find-doctor";
import { Breadcrumbs, Container } from "@/components";
import { getDoctorScheduleDetail } from "@/services/doctor-schedule-detail.service";

export default function DoctorProfilePage() {
  const { id } = useParams<{ id: string }>();

  const { data: doctorName = "Loading..." } = useQuery({
    queryKey: ["doctor-schedule-detail", id],
    queryFn: () => getDoctorScheduleDetail(id),
    select: (response) => response.data.doctor.name,
  });

  return (
    <main>
      <Container>
        <Breadcrumbs
          items={[
            { name: "Beranda", path: "/" },
            { name: "Temukan Dokter", path: "/find-doctor/schedule" },
            { name: "Jadwal Dokter", path: "/find-doctor/schedule" },
            { name: doctorName, path: `/find-doctor/schedule/${id}` },
          ]}
        />
      </Container>
      <Profile id={id} />
    </main>
  );
}
