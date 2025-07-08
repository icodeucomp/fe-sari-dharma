"use client";

import { useEffect, useState } from "react";
import { Profile } from "@/components/ui/find-doctor";
import { Breadcrumbs, Container } from "@/components";
import { getJadwalDokterDetail } from "@/services/jadwal-dokter-detail.service";

export default function DoctorProfilePage({ params }: { params: { id: string } }) {
  const [doctorName, setDoctorName] = useState<string>("Loading...");

  useEffect(() => {
    const fetchDoctorName = async () => {
      try {
        const response = await getJadwalDokterDetail(params.id);
        setDoctorName(response.data.dokter.nama_dokter);
      } catch (error) {
        console.error("Error fetching doctor name:", error);
        setDoctorName("Doctor Profile");
      }
    };

    fetchDoctorName();
  }, [params.id]);

  return (
    <main>
      <Container>
        <Breadcrumbs
          items={[
            { name: "Beranda", path: "/" },
            { name: "Temukan Dokter", path: "/temukan-dokter/jadwal" },
            { name: "Jadwal Dokter", path: "/temukan-dokter/jadwal" },
            { name: doctorName, path: `/temukan-dokter/jadwal/${params.id}` },
          ]}
        />
      </Container>
      <Profile id={params.id} />
    </main>
  );
}
