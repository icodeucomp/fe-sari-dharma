"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Container, Img } from "@/components";
import { Submenu } from "../../submenu";
import { getDoctorScheduleDetail } from "@/services/doctor-schedule-detail.service";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

interface Tab {
  name: string;
  content: React.JSX.Element;
}

const tabs: Tab[] = [
  { name: "Background", content: <div>This is the background content.</div> },
  { name: "Edukasi/Karir", content: <p>This is the education/career content.</p> },
  { name: "Jadwal", content: <p>This is the schedule content.</p> },
];

const TabProfile = ({ activeTab, handleActiveTab }: { activeTab: string; handleActiveTab: (tabName: string) => void }) => {
  return (
    <div className="border-b-2 border-gray/50">
      <Container className="flex gap-2 sm:gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`py-3 sm:py-6 px-2 sm:px-4 text-base sm:text-lg transition-colors duration-300
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

const BackgroundContent = ({ background }: { background: string }) => <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: background }} />;

const EducationContent = ({ education }: { education: any[] }) => (
  <div className="space-y-4">
    {education.map((item, index) => (
      <div key={index} className="p-4 border rounded-lg">
        <h3 className="text-base sm:text-xl font-semibold">{item.title}</h3>
        <p className="text-gray text-sm sm:text-base">
          {item.start_year} - {item.end_year || "Sekarang"}
        </p>
      </div>
    ))}
  </div>
);

const ScheduleContent = ({ schedule }: { schedule: any[] }) => (
  <table className="w-full text-sm">
    <thead className="bg-primary text-light">
      <tr>
        <th className="p-3">Hari</th>
        <th className="p-3">Jam Praktik</th>
      </tr>
    </thead>
    <tbody>
      {schedule.map((item, index) => (
        <tr key={index} className="border-b text-center">
          <td className="p-3">{item.day}</td>
          <td className="p-3">{`${item.start_time} - ${item.end_time}`}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export const Profile = ({ id }: { id: string }) => {
  const [activeTab, setActiveTab] = useState<string>("Background");
  const { data, isLoading: loading, isError } = useQuery({
    queryKey: ["doctor-schedule-detail", id],
    queryFn: () => getDoctorScheduleDetail(id),
    select: (response) => response.data,
  });
  const error = isError ? "Gagal memuat data dokter" : null;

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
        return <BackgroundContent background={data.doctor_background} />;
      case "Edukasi/Karir":
        return <EducationContent education={data.education_career} />;
      case "Jadwal":
        return <ScheduleContent schedule={data.schedule} />;
      default:
        return null;
    }
  };

  const getImageUrl = (path: string) => {
    if (!path) return "/images/placeholder.jpg";
    if (path.startsWith("http")) return path;
    return `${process.env.NEXT_PUBLIC_API_URL}/storage/${path}`;
  };

  return (
    <>
      <div className="relative flex items-center w-full bg-linear-to-r from-primary to-secondary min-h-400">
        <div className="absolute top-0 right-0 flex items-end justify-end w-full h-full">
          <Img src="/icons/frame.svg" alt="frame picture" className="w-full max-w-lg aspect-video" />
        </div>
        <Container className="flex items-center flex-col md:flex-row gap-8 md:gap-16 py-8 md:py-0">
          <Img src={getImageUrl(data.doctor.photo)} alt={data.doctor.name} className="min-h-60 sm:min-h-72 min-w-44 sm:min-w-52" cover />
          <div className="w-full md:max-w-2xl space-y-4 text-light">
            <h4 className="text-base sm:text-xl md:text-2xl font-semibold">{data.doctor.name}</h4>
            <menu className="space-y-2">
              <span className="text-sm sm:text-xl md:text-2xl font-semibold">Spesialis</span>
              <li className="flex items-center gap-2">
                <i className="flex items-center justify-center shrink-0 border-2 rounded-md border-light size-8 sm:size-10">1</i>
                <p className="text-sm sm:text-base">{data.specialist.name}</p>
              </li>
            </menu>
            <Button className="btn-light">Appointment</Button>
          </div>
        </Container>
      </div>
      <TabProfile activeTab={activeTab} handleActiveTab={handleActiveTab} />
      <Container className="relative flex flex-col-reverse md:flex-row gap-8 xl:gap-16 pb-16 pt-4 sm:pt-8">
        <div className="w-full">{getContent()}</div>
        <div className="md:sticky self-start space-y-8 top-4 w-full md:max-w-xs">
          <Submenu
            menu="Akses Menu"
            title="Tentang Kami"
            items={[
              { title: "Klinik Introduction", link: "/about-us/overview" },
              { title: "Layanan & Fasilitas", link: "/about-us/facility-services" },
            ]}
          />
        </div>
      </Container>
    </>
  );
};
