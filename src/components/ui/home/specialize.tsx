"use client";

import { Button, Container, EmptyState, LoadingState, Motion } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { IoIosArrowDropright } from "react-icons/io";
import { getSpecialistService, SpecialistService } from "@/services/specialist-service.service";
import Icon from "@mdi/react";
import { getIconPath } from "@/utils/icon-helper";
import Link from "next/link";

export const Specialize = () => {
  const { data: serviceList = [], isLoading: loading } = useQuery({
    queryKey: ["specialist-services", "home"],
    queryFn: () => getSpecialistService("", 1, 10),
    select: (response) => response.data.data as SpecialistService[],
  });

  return (
    <Container className="py-10 space-y-8 sm:py-16">
      <div className="space-y-2">
        <Motion tag="h4" initialY={-50} animateY={0} duration={0.3} className="heading">
          Layanan Spesialis Kami
        </Motion>
        <Motion tag="p" initialY={-50} animateY={0} duration={0.6} delay={0.3} className="subheading">
          Solusi tepat dengan dokter berpengalaman di bidangnya.
        </Motion>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 justify-between gap-4 sm:gap-8 pb-12.5">
        {loading ? (
          <LoadingState compact />
        ) : serviceList.length === 0 ? (
          <EmptyState compact title="Belum ada layanan spesialis" description="Daftar layanan spesialis akan segera tersedia." />
        ) : (
          serviceList.map((item, index) => (
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
              <h5 className="mt-6 font-bold text-dark text-sm lg:text-base">{item.name}</h5>
              <div className="mt-1 text-xs lg:text-sm text-justify text-gray line-clamp-3" dangerouslySetInnerHTML={{ __html: item.description }} />
              <i className="absolute bottom-0 left-0 w-full h-1.5 bg-primary"></i>
            </Motion>
          ))
        )}
      </div>
      <Link href="/find-doctor/schedule">
        <Button className="flex items-center gap-2 mx-auto btn-outline">
          Temukan Jadwal Dokter <IoIosArrowDropright size={20} />
        </Button>
      </Link>
    </Container>
  );
};
