import { Button, Img, Motion } from "@/components";
import { FaArrowRightLong } from "react-icons/fa6";
import { LuTag } from "react-icons/lu";
import { useEffect, useState } from "react";
import { PaketKesehatan, getPaketKesehatan } from "@/services/paket-kesehatan.service";
import Link from "next/link";
import moment from "moment";

const OthersPromo = () => {
  const [paketKesehatan, setPaketKesehatan] = useState<PaketKesehatan[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * Mengambil data paket kesehatan dari API
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPaketKesehatan({
          per_page: 3,
          promo: true
        });
        setPaketKesehatan(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4 divide-y-2 divide-primary">
      <Motion tag="h4" initialY={50} animateY={0} duration={0.5} className="text-xl font-semibold text-primary">
        Paket Kesehatan Lainnya
      </Motion>
      <div className="pt-4 space-y-4">
        {paketKesehatan.map((paket, index) => (
          <Motion 
            tag="div" 
            initialY={50} 
            animateY={0} 
            duration={0.5} 
            delay={index * 0.1} 
            key={paket.id} 
            className="pb-4 space-y-2 border-b border-gray/30"
          >
            <Img 
              src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${paket.foto}`} 
              alt={paket.nama_paket} 
              className="w-full min-h-32" 
              cover 
            />
            <span className="flex items-center gap-2 px-4 py-2 text-xs rounded-md w-max bg-secondary text-light">
              <LuTag size={16} />
              {paket.nama_paket}
            </span>
            <div className="space-y-2 text-dark">
              <span className="text-sm font-light">
                *Berlaku s/d {moment(paket.berlaku_sampai).format('DD MMMM YYYY')}
              </span>
              <h3 className="font-semibold line-clamp-2">{paket.nama_paket}</h3>
              <p className="line-clamp-2 text-gray text-sm max-w-xs text-justify">
                {paket.deskripsi}
              </p>
              <Link href={`/media-informasi/paket-promo/${paket.slug}/${paket.id}`}>
                <Button className="btn-outline flex items-center gap-2">
                  Lihat Paket
                  <FaArrowRightLong />
                </Button>
              </Link>
            </div>
          </Motion>
        ))}
      </div>
    </div>
  );
};

export const Recommendation = () => {
  return (
    <div className="pb-8 pr-2 space-y-4">
      <OthersPromo />
    </div>
  );
};
