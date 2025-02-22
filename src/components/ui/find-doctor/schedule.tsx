"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { Button, Dropdown, Img, Motion, Pagination } from "@/components";

import { formatKebabCase } from "@/utils";

const data = [
  { label: "Monday", value: "monday" },
  { label: "Tuesday", value: "tuesday" },
  { label: "Wednesday", value: "wednesday" },
];

export const Schedule = () => {
  const [page, setPage] = React.useState<number>(0);
  const [totalPage, setTotalPage] = React.useState<number>(10);

  const router = useRouter();

  const handleFilteredSpecialist = (value: string) => {
    console.log(value);
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
        <div className="flex w-full gap-8 py-4 border-b border-gray/50">
          <Img src="/images/temp-5.png" alt="temp" className="min-h-72 min-w-52" cover />
          <div className="flex flex-col justify-between w-full gap-4">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-dark">dr. Bambang Sutoyo, Sp.A</h3>

              <p className="font-semibold text-gray">
                Spesialis <span className="text-primary">Anak</span>
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
                    {[...Array(5)].map((_, index) => (
                      <td key={index} className="p-3 border border-gray/50">
                        13.00 - 18.00
                      </td>
                    ))}
                  </tr>
                  <tr>
                    {[...Array(5)].map((_, index) => (
                      <td key={index} className="p-3 border border-gray/50">
                        11.45 - 14.00
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex space-x-4">
              <Button onClick={() => router.push(`/temukan-dokter/jadwal/${formatKebabCase("dr. Bambang Sutoyo, Sp.A")}`)} className="btn-outline">
                View Full Profile
              </Button>
              <Button className="btn-primary">Appointment</Button>
            </div>
          </div>
        </div>
      </div>
      <Pagination page={page} totalPage={totalPage} setPage={setPage} isNumber />
    </>
  );
};
