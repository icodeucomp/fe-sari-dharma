/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button, Dropdown, Img, Motion, Pagination } from "@/components";
import { getJadwalDokter } from "@/services/jadwal-dokter.service";
import axios from "axios";

// Helper function untuk mendapatkan URL gambar
const getImageUrl = (path: string) => {
  if (!path) return "/images/placeholder.jpg";
  if (path.startsWith("http")) return path;
  return `${process.env.NEXT_PUBLIC_API_URL}/storage/${path}`;
};

/**
 * Helper function untuk memformat jadwal berdasarkan hari
 */
const formatJadwalByHari = (jadwalDokter: any[]) => {
  const hariList = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
  const formattedJadwal: { [key: string]: string } = {};

  // Inisialisasi semua hari dengan "-"
  hariList.forEach((hari) => {
    formattedJadwal[hari] = "-";
  });

  // Isi jadwal yang ada
  jadwalDokter.forEach((jadwal) => {
    if (hariList.includes(jadwal.hari)) {
      formattedJadwal[jadwal.hari] = `${jadwal.jam_mulai} - ${jadwal.jam_selesai}`;
    }
  });

  return formattedJadwal;
};

const hariOptions = [
  { label: "Senin", value: "Senin" },
  { label: "Selasa", value: "Selasa" },
  { label: "Rabu", value: "Rabu" },
  { label: "Kamis", value: "Kamis" },
  { label: "Jumat", value: "Jumat" },
  { label: "Sabtu", value: "Sabtu" },
  { label: "Minggu", value: "Minggu" },
];

interface Dokter {
  id: string;
  nama_dokter: string;
  label: string;
  value: string;
}

interface Spesialis {
  id: string;
  name: string;
  label: string;
  value: string;
}

export const Schedule = () => {
  const [page, setPage] = React.useState<number>(1);
  const [totalPage, setTotalPage] = React.useState<number>(1);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [jadwalDokter, setJadwalDokter] = React.useState<any[]>([]);
  console.log("🚀 ~ Schedule ~ jadwalDokter:", jadwalDokter);
  const [filters, setFilters] = React.useState({
    spesialis_id: "",
    dokter_id: "",
  });
  const [listDokter, setListDokter] = React.useState<Dokter[]>([]);
  const [listSpesialis, setListSpesialis] = React.useState<Spesialis[]>([]);
  const [dokterDisplay, setDokterDisplay] = React.useState<string>("semua");
  const [spesialisDisplay, setSpesialisDisplay] = React.useState<string>("semua");
  const [hari, setHari] = React.useState<string>("");

  const router = useRouter();

  // Fungsi untuk mengambil data jadwal dokter
  const fetchJadwalDokter = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await getJadwalDokter(page, 10, {
        spesialis_id: filters.spesialis_id || undefined,
        dokter_id: filters.dokter_id || undefined,
        hari: hari !== "semua" ? hari : undefined,
      });
      setJadwalDokter(response.data.data);
      setTotalPage(response.data.last_page);
    } catch (error) {
      console.error("Error fetching jadwal dokter:", error);
    } finally {
      setLoading(false);
    }
  }, [page, filters.spesialis_id, filters.dokter_id, hari]);

  // Fungsi untuk mengambil data master dokter
  const fetchMasterDokter = React.useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/master-dokter?per_page=100`);
      const dokterData = response.data.data.data.map((dokter: any) => ({
        label: dokter.nama_dokter,
        value: dokter.id,
      }));
      setListDokter(dokterData);
    } catch (error) {
      console.error("Error fetching master dokter:", error);
    }
  }, []);

  // Fungsi untuk mengambil data master spesialis
  const fetchMasterSpesialis = React.useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/layanan-spesialis?per_page=100`);
      const spesialisData = response.data.data.data.map((spesialis: any) => ({
        label: spesialis.nama_layanan,
        value: spesialis.id,
      }));
      setListSpesialis(spesialisData);
    } catch (error) {
      console.error("Error fetching master spesialis:", error);
    }
  }, []);

  React.useEffect(() => {
    fetchJadwalDokter();
    fetchMasterDokter();
    fetchMasterSpesialis();
  }, [fetchJadwalDokter, fetchMasterDokter, fetchMasterSpesialis]);

  const handleFilteredSpecialist = (value: string) => {
    setFilters((prev) => ({ ...prev, spesialis_id: value }));
    setSpesialisDisplay(value === "" ? "semua" : listSpesialis.find((s) => s.value === value)?.label || "semua");
    setPage(1);
  };

  const handleFilteredDokter = (value: string) => {
    setFilters((prev) => ({ ...prev, dokter_id: value }));
    setDokterDisplay(value === "" ? "semua" : listDokter.find((d) => d.value === value)?.label || "semua");
    setPage(1);
  };

  const handleFilteredHari = (value: string) => {
    setHari(value);
    setPage(1);
  };

  const handleReset = () => {
    setFilters({ spesialis_id: "", dokter_id: "" });
    setDokterDisplay("semua");
    setSpesialisDisplay("semua");
    setHari("");
    setPage(1);
  };

  const handleClick = (doctorName: string, specialization: string) => {
    const message = `Halo Admin,
Saya ingin melakukan janji temu dengan dokter melalui website.
Berikut detailnya:

  *Dokter:* ${doctorName} - ${specialization}
  *Hari:* (isi…)
  *Jam:* (isi…)

Mohon bantuannya untuk konfirmasi ketersediaan jadwal tersebut.
Terima kasih`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "6281318041828";
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <div className="pb-8 space-y-4 border-b border-gray/50">
        <Motion tag="h2" initialX={-50} animateX={0} duration={0.3} className="heading">
          Jadwal Dokter
        </Motion>
        <Motion tag="p" initialX={-50} animateX={0} duration={0.6} delay={0.3} className="leading-tight subheading">
          Kami siap membantu Anda terhubung dengan dokter spesialis kami. <br />
          Lihat daftar dokter spesialis dan jadwalkan kunjungan dengan mudah.
        </Motion>
      </div>
      <div className="flex gap-8 py-8 border-b border-gray/50">
        <div className="w-full space-y-2 min-w-60">
          <h4 className="font-semibold text-primary">Spesialis</h4>
          <Dropdown className="top-14" parentClassName="w-full min-h-12" data={listSpesialis} handleFiltered={handleFilteredSpecialist} defaultValue="semua" displayValue={spesialisDisplay} />
        </div>
        <div className="w-full space-y-2 min-w-60">
          <h4 className="font-semibold text-primary">Hari</h4>
          <Dropdown className="top-14" parentClassName="w-full min-h-12" data={hariOptions} handleFiltered={handleFilteredHari} defaultValue="semua" displayValue={hari || "semua"} />
        </div>
        <div className="w-full space-y-2 min-w-60 flex items-end gap-2">
          <div className="w-full">
            <h4 className="font-semibold text-primary">Dokter</h4>
            <Dropdown className="top-14" parentClassName="w-full min-h-12" data={listDokter} handleFiltered={handleFilteredDokter} defaultValue="semua" displayValue={dokterDisplay} />
          </div>
          <button type="button" onClick={handleReset} className="h-12 px-4 py-2 mt-6 text-sm font-semibold text-white bg-primary rounded hover:bg-primary/90 transition">
            Reset
          </button>
        </div>
      </div>
      <div className="w-full mb-8">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          jadwalDokter.map((jadwal) => {
            const formattedJadwal = formatJadwalByHari(jadwal.jadwal_dokter);

            return (
              <div key={jadwal.id} className="flex w-full gap-8 py-4 border-b border-gray/50">
                {jadwal.dokter.foto ? (
                  <Img src={getImageUrl(jadwal.dokter.foto)} alt="dokter" className="min-h-72 min-w-52 rounded-lg" cover />
                ) : (
                  <div className="min-h-72 min-w-52 rounded-lg" style={{ backgroundColor: "lightgray" }}></div>
                )}
                <div className="flex flex-col justify-between w-full gap-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-dark">{jadwal.dokter.nama_dokter}</h3>
                    <p className="font-semibold text-gray">
                      Spesialis <span className="text-primary">{jadwal.spesialis.nama_layanan}</span>
                    </p>
                  </div>
                  <div className="w-full overflow-x-auto scrollbar">
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
                              {formattedJadwal[day]}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="flex space-x-4">
                    <Button onClick={() => router.push(`/temukan-dokter/jadwal/${jadwal.id}`)} className="btn-outline">
                      View Full Profile
                    </Button>
                    <Button onClick={() => handleClick(jadwal.dokter.nama_dokter, jadwal.spesialis.nama_layanan)} className="btn-primary">
                      Appointment
                    </Button>
                  </div>
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
