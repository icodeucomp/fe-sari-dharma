"use client";

import { useEffect, useState } from "react";
import { Button, Container, Img } from "@/components";
import { Submenu } from "../../submenu";
import { getJadwalDokterDetail } from "@/services/jadwal-dokter-detail.service";
import moment from "moment";
import Icon from '@mdi/react';
import { mdiLoading } from '@mdi/js';

interface Tab {
  name: string;
  content: JSX.Element;
}

const tabs: Tab[] = [
  { name: "Background", content: <div>This is the background content.</div> },
  { name: "Edukasi/Karir", content: <p>This is the education/career content.</p> },
  { name: "Jadwal", content: <p>This is the schedule content.</p> },
];

const TabProfile = ({ activeTab, handleActiveTab }: { activeTab: string; handleActiveTab: (tabName: string) => void }) => {
  return (
    <div className="border-b-2 border-gray/50">
      <Container className="flex gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`py-6 px-4 text-lg transition-colors duration-300 
            ${activeTab === tab.name ? "text-primary border-custom font-semibold" : "text-gray font-medium"}`}
            onClick={() => handleActiveTab(tab.name)}
          >
            {tab.name}
          </button>
        ))}
      </Container>
    </div>
  );
};

const BackgroundContent = ({ background }: { background: string }) => (
  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: background }} />
);

const EdukasiContent = ({ edukasi }: { edukasi: any[] }) => (
  <div className="space-y-4">
    {edukasi.map((item, index) => (
      <div key={index} className="p-4 border rounded-lg">
        <h3 className="text-xl font-semibold">{item.judul}</h3>
        <p className="text-gray">
          {item.tahun_mulai} - {item.tahun_selesai || 'Sekarang'}
        </p>
      </div>
    ))}
  </div>
);

const JadwalContent = ({ jadwal }: { jadwal: any[] }) => (
  <table className="w-full text-sm">
    <thead className="bg-primary text-light">
      <tr>
        <th className="p-3">Hari</th>
        <th className="p-3">Jam Praktik</th>
      </tr>
    </thead>
    <tbody>
      {jadwal.map((item, index) => (
        <tr key={index} className="border-b">
          <td className="p-3">{item.hari}</td>
          <td className="p-3">{`${item.jam_mulai} - ${item.jam_selesai}`}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export const Profile = ({ id }: { id: string }) => {
  const [activeTab, setActiveTab] = useState<string>("Background");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getJadwalDokterDetail(id);
        setData(response.data);
      } catch (error) {
        setError("Gagal memuat data dokter");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleActiveTab = (tabName: string) => {
    setActiveTab(tabName);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Icon path={mdiLoading} size={2} className="animate-spin text-primary" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error || "Data tidak ditemukan"}</p>
      </div>
    );
  }

  const getContent = () => {
    switch (activeTab) {
      case "Background":
        return <BackgroundContent background={data.background_dokter} />;
      case "Edukasi/Karir":
        return <EdukasiContent edukasi={data.edukasi_karir} />;
      case "Jadwal":
        return <JadwalContent jadwal={data.jadwal_dokter} />;
      default:
        return null;
    }
  };

  const getImageUrl = (path: string) => {
    if (!path) return '/images/placeholder.jpg';
    if (path.startsWith('http')) return path;
    return `${process.env.NEXT_PUBLIC_API_URL}/storage/${path}`;
  };

  return (
    <>
      <div className="relative flex items-center w-full bg-gradient-to-r from-primary to-secondary min-h-400">
        <div className="absolute top-0 right-0 flex items-end justify-end w-full h-full">
          <Img src="/icons/frame.svg" alt="frame picture" className="w-full max-w-lg aspect-video" />
        </div>
        <Container className="flex items-center gap-16">
          <Img src={getImageUrl(data.dokter.foto)} alt={data.dokter.nama_dokter} className="min-h-72 min-w-52" cover />
          <div className="max-w-2xl space-y-4 text-light">
            <h4 className="text-2xl font-semibold">{data.dokter.nama_dokter}</h4>
            <menu className="space-y-2">
              <span className="text-2xl font-semibold">Spesialis</span>
              <li className="flex items-center gap-2">
                <i className="flex items-center justify-center flex-shrink-0 border-2 rounded-md border-light size-10">1</i>
                <p>{ data.spesialis.nama_layanan}</p>
              </li>
              <li className="flex items-center gap-2">
                <i className="flex items-center justify-center flex-shrink-0 border-2 rounded-md border-light size-10">2</i>
                <p>{ data.spesialis.deskripsi}</p>
              </li>
            </menu>
            <Button className="btn-light">Appointment</Button>
          </div>
        </Container>
      </div>
      <TabProfile activeTab={activeTab} handleActiveTab={handleActiveTab} />
      <Container className="relative flex min-h-screen gap-16 py-8">
        <div className="w-full">
          {getContent()}
        </div>
        <div className="sticky self-start space-y-8 top-4">
          <Submenu
            menu="Akses Menu"
            title="Tentang Kami"
            items={[
              { title: "Klinik Introduction", link: "/tentang-kami/ikhtisar" },
              { title: "Layanan & Fasilitas", link: "/tentang-kami/layanan-fasilitas" },
            ]}
          />
        </div>
      </Container>
    </>
  );
};
