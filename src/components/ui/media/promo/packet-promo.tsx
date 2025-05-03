"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button, Img, Motion, Pagination } from "@/components";
import { GoArrowRight } from "react-icons/go";
import { getPaketKesehatan } from "@/services/paket-kesehatan.service";
import moment from "moment";

// Helper function untuk URL gambar
const getImageUrl = (path: string) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  if (!path) return '/images/temp-4.png';
  if (path.startsWith('http')) return path;
  return `${BASE_URL}/storage/${path}`;
};

const Card = ({ title, description, pathUrl, pathImg, expiredDate }: { 
  pathImg: string; 
  title: string; 
  description: string; 
  pathUrl: string;
  expiredDate: string;
}) => {
  const router = useRouter();
  return (
    <>
      <div className="relative text-light text-xs">
        <span className="absolute left-0 bottom-0 rounded-se-md py-2 px-4 bg-secondary z-1">
          *Berlaku s/d {moment(expiredDate).format('DD MMMM YYYY')}
        </span>
        <Img src={getImageUrl(pathImg)} alt={title} className="w-full h-60" cover />
      </div>

      <div className="p-4 space-y-2">
        <h4 className="h-12 text-base font-semibold sm:h-14 sm:text-lg text-dark line-clamp-2">{title}</h4>

        <p className="text-gray leading-normal line-clamp-5 text-sm text-justify">{description}</p>

        <Button onClick={() => router.push(`/media-informasi/paket-promo/${pathUrl}`)} className="flex items-center justify-center gap-2 btn-primary w-full">
          Lihat Paket <GoArrowRight className="fill-light -rotate-45" size={20} />
        </Button>
      </div>
    </>
  );
};

export const PacketsPromos = () => {
  const [page, setPage] = React.useState<number>(1);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>([]);
  const [totalPage, setTotalPage] = React.useState<number>(0);

  // Fungsi untuk mengambil data paket kesehatan
  const fetchPaketKesehatan = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await getPaketKesehatan({
        page,
        per_page: 6,
        promo: true
      });
      setData(response.data.data);
      setTotalPage(response.data.last_page);
    } catch (error) {
      console.error('Error fetching paket kesehatan:', error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  React.useEffect(() => {
    fetchPaketKesehatan();
  }, [fetchPaketKesehatan]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data.length === 0 ? (
          <h3 className="w-full col-span-1 py-16 text-lg font-semibold text-center min-h-400 sm:text-2xl md:text-3xl sm:col-span-2 lg:col-span-3 text-gray/50">
            Paket promo tidak ditemukan
          </h3>
        ) : (
          <>
            {data.map((item: any, index: number) => (
              <Motion 
                tag="div" 
                initialY={50} 
                animateY={0} 
                duration={0.5} 
                delay={index * 0.1} 
                key={item.id} 
                className="border border-gray/50 rounded-md overflow-hidden"
              >
                <Card
                  title={item.nama_paket}
                  description={item.deskripsi}
                  pathUrl={item.slug}
                  pathImg={item.foto}
                  expiredDate={item.berlaku_sampai}
                />
              </Motion>
            ))}
          </>
        )}
      </div>

      <Motion 
        tag="div" 
        initialX={50} 
        animateX={0} 
        duration={0.8} 
        delay={0.4} 
        className="relative flex justify-center pt-10"
      >
        <Pagination page={page} totalPage={totalPage} setPage={setPage} isNumber />
      </Motion>
    </>
  );
};
