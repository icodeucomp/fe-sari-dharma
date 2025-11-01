"use client";

import { Button, Container, Motion } from "@/components";
import { useEffect, useState } from "react";
import { IoIosArrowDropright } from "react-icons/io";
import { getLayananSpesialis, LayananSpesialis } from "@/services/layanan-spesialis.service";
import Icon from "@mdi/react";
import { getIconPath } from "@/utils/icon-helper";
import Link from "next/link";

export const Specialize = () => {
  const [loading, setLoading] = useState(true);
  const [layananList, setLayananList] = useState<LayananSpesialis[]>([]);

  /**
   * Fungsi untuk mengambil data layanan spesialis
   */
  const fetchLayanan = async () => {
    try {
      setLoading(true);
      const response = await getLayananSpesialis("", 1, 10);
      setLayananList(response.data.data);
    } catch (error) {
      console.error("Error fetching layanan:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLayanan();
  }, []);

  return (
    <Container className="py-10 space-y-8 sm:py-16">
      <div className="space-y-2">
        <Motion tag="h4" initialX={-50} animateX={0} duration={0.3} className="heading">
          Layanan Spesialis Kami
        </Motion>
        <Motion tag="p" initialX={-50} animateX={0} duration={0.6} delay={0.3} className="subheading">
          Solusi tepat dengan dokter berpengalaman di bidangnya.
        </Motion>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 justify-between gap-4 sm:gap-8 pb-[50px]">
        {loading ? (
          <p className="text-center w-full">Memuat data...</p>
        ) : (
          layananList.map((item, index) => (
            <Motion
              tag="div"
              initialY={50}
              animateY={0}
              duration={index * 0.2}
              delay={index * 0.01}
              key={item.id}
              className="relative flex-1 max-w-sm p-4 lg:p-8 overflow-hidden rounded-lg card-shadow min-w-40 md:min-w-56 lg:min-h-80 bg-light"
            >
              <div className="p-4 rounded-full bg-secondary w-max mx-auto md:mx-0">
                <Icon path={getIconPath(item.icon)} size={1.5} className="text-primary" />
              </div>
              <h5 className="mt-6 font-bold text-dark text-sm lg:text-base">{item.nama_layanan}</h5>
              <div className="mt-1 text-xs lg:text-sm text-justify text-gray line-clamp-3" dangerouslySetInnerHTML={{ __html: item.deskripsi }} />
              <i className="absolute bottom-0 left-0 w-full h-1.5 bg-primary"></i>
            </Motion>
          ))
        )}
      </div>
      <Link href="/temukan-dokter/jadwal">
        <Button className="flex items-center gap-2 mx-auto btn-outline">
          Temukan Jadwal Dokter <IoIosArrowDropright size={20} />
        </Button>
      </Link>
    </Container>
  );
};
