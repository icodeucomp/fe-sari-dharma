"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button, Dropdown, Img, Motion, Pagination } from "@/components";
import { formatKebabCase } from "@/utils";
import { getJadwalDokter } from "@/services/jadwal-dokter.service";

// Helper function untuk mendapatkan URL gambar
const getImageUrl = (path: string) => {
  if (!path) return '/images/placeholder.jpg';
  if (path.startsWith('http')) return path;
  return `${process.env.NEXT_PUBLIC_API_URL}/storage/${path}`;
};

/**
 * Helper function untuk memformat jadwal berdasarkan hari
 */
const formatJadwalByHari = (jadwalDokter: any[]) => {
  const hariList = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
  const formattedJadwal: { [key: string]: string } = {};
  
  // Inisialisasi semua hari dengan "-"
  hariList.forEach(hari => {
    formattedJadwal[hari] = "-";
  });
  
  // Isi jadwal yang ada
  jadwalDokter.forEach(jadwal => {
    if (hariList.includes(jadwal.hari)) {
      formattedJadwal[jadwal.hari] = `${jadwal.jam_mulai} - ${jadwal.jam_selesai}`;
    }
  });
  
  return formattedJadwal;
};

const data = [
  { label: "Monday", value: "monday" },
  { label: "Tuesday", value: "tuesday" },
  { label: "Wednesday", value: "wednesday" },
];

export const Schedule = () => {
  const [page, setPage] = React.useState<number>(1);
  const [totalPage, setTotalPage] = React.useState<number>(1);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [jadwalDokter, setJadwalDokter] = React.useState<any[]>([]);
  const [filters, setFilters] = React.useState({
    spesialis_id: '',
    dokter_id: '',
  });

  const router = useRouter();

  // Fungsi untuk mengambil data jadwal dokter
  const fetchJadwalDokter = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await getJadwalDokter(page, 10, {
        spesialis_id: filters.spesialis_id || undefined,
        dokter_id: filters.dokter_id || undefined,
      });
      setJadwalDokter(response.data.data);
      setTotalPage(response.data.last_page);
    } catch (error) {
      console.error('Error fetching jadwal dokter:', error);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  React.useEffect(() => {
    fetchJadwalDokter();
  }, [fetchJadwalDokter]);

  const handleFilteredSpecialist = (value: string) => {
    setFilters(prev => ({ ...prev, spesialis_id: value }));
    setPage(1);
  };

  return (
    <>
      <div className="pb-8 space-y-4 border-b border-gray/50">
        <Motion tag="h2" initialX={-50} animateX={0} duration={0.3} className="heading">
          Jadwal Dokter
        </Motion>
        <Motion tag="p" initialX={-50} animateX={0} duration={0.6} delay={0.3} className="leading-tight subheading">
          Let us help you connect with our specialists. <br />
          Browse our list of specialists and schedule an appointment.
        </Motion>
      </div>
      <div className="flex gap-8 py-8 border-b border-gray/50">
        <div className="w-full space-y-2 min-w-60">
          <h4 className="font-semibold text-primary">Spesialis</h4>
          <Dropdown className="top-14" parentClassName="w-full min-h-12" data={data} handleFiltered={handleFilteredSpecialist} defaultValue="semua" />
        </div>
        <div className="w-full space-y-2 min-w-60">
          <h4 className="font-semibold text-primary">Hari</h4>
          <Dropdown className="top-14" parentClassName="w-full min-h-12" data={data} handleFiltered={handleFilteredSpecialist} defaultValue="semua" />
        </div>
        <div className="w-full space-y-2 min-w-60">
          <h4 className="font-semibold text-primary">Dokter</h4>
          <Dropdown className="top-14" parentClassName="w-full min-h-12" data={data} handleFiltered={handleFilteredSpecialist} defaultValue="semua" />
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
                <Img 
                  src={getImageUrl(jadwal.dokter.foto)} 
                  alt="dokter" 
                  className="min-h-72 min-w-52 rounded-lg" 
                  cover 
                />
                <div className="flex flex-col justify-between w-full gap-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-dark">{jadwal.nama_dokter}</h3>
                    <p className="font-semibold text-gray">
                      Spesialis <span className="text-primary">{jadwal.spesialis}</span>
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
                    <Button 
                      onClick={() => router.push(`/temukan-dokter/jadwal/${jadwal.id}`)} 
                      className="btn-outline"
                    >
                      View Full Profile
                    </Button>
                    <Button className="btn-primary">Appointment</Button>
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
