"use client";

import { useState } from "react";
import { Button, Container, Img } from "@/components";
import { Submenu } from "../../submenu";

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

export const Profile = () => {
  const [activeTab, setActiveTab] = useState<string>("Background");

  const handleActiveTab = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <div className="relative flex items-center w-full bg-gradient-to-r from-primary to-secondary min-h-400">
        <div className="absolute top-0 right-0 flex items-end justify-end w-full h-full">
          <Img src="/icons/frame.svg" alt="frame picture" className="w-full max-w-lg aspect-video" />
        </div>
        <Container className="flex items-center gap-16">
          <Img src="/images/temp-5.png" alt="temp" className="min-h-72 min-w-52" cover />
          <div className="max-w-2xl space-y-4 text-light">
            <h4 className="text-2xl font-semibold">dr. Bambang Sutoyo, Sp.A</h4>
            <menu className="space-y-2">
              <span className="text-2xl font-semibold">Spesialis</span>
              <li className="flex items-center gap-2">
                <i className="flex items-center justify-center flex-shrink-0 border-2 rounded-md border-light size-10">1</i>
                <p>Heart transplantion</p>
              </li>
              <li className="flex items-center gap-2">
                <i className="flex items-center justify-center flex-shrink-0 border-2 rounded-md border-light size-10">2</i>
                <p>Arrhythmia , Adult congenital heart disease , Congenital heart disease , Common pediatric heart disease</p>
              </li>
            </menu>
            <Button className="btn-light">Appointment</Button>
          </div>
        </Container>
      </div>
      <TabProfile activeTab={activeTab} handleActiveTab={handleActiveTab} />
      <Container className="relative flex min-h-screen gap-16 py-8">
        <div className="w-full">{tabs.find((t) => t.name === activeTab)?.content}</div>

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
