import { Button, Img, Motion } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { FaArrowRightLong } from "react-icons/fa6";
import { LuTag } from "react-icons/lu";
import { HealthPackage, getHealthPackage } from "@/services/health-package.service";
import Link from "next/link";
import moment from "moment";

const OthersPromo = () => {
  const { data: healthPackage = [], isLoading: loading } = useQuery({
    queryKey: ["health-packages", "recommendation"],
    queryFn: () => getHealthPackage({ per_page: 3, promo: true }),
    select: (response) => response.data.data as HealthPackage[],
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4 divide-y-2 divide-primary">
      <Motion tag="h4" initialY={50} animateY={0} duration={0.5} className="text-xl font-semibold text-primary">
        Paket Kesehatan Lainnya
      </Motion>
      <div className="pt-4 space-y-4">
        {healthPackage.map((pkg, index) => (
          <Motion tag="div" initialY={50} animateY={0} duration={0.5} delay={index * 0.1} key={pkg.id} className="pb-4 space-y-2 border-b border-gray/30">
            <Img src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${pkg.photo}`} alt={pkg.name} className="w-full min-h-40" cover />
            <span className="flex items-center gap-2 px-4 py-2 text-xs rounded-md w-max bg-secondary text-light">
              <LuTag size={16} />
              {pkg.name}
            </span>
            <div className="space-y-2 text-dark">
              <span className="text-xs sm:text-sm font-light">*Berlaku s/d {moment(pkg.valid_until).format("DD MMMM YYYY")}</span>
              <h3 className="font-semibold line-clamp-2">{pkg.name}</h3>
              <p className="line-clamp-2 text-gray text-sm max-w-xs text-justify">{pkg.description}</p>
              <Link href={`/media-information/promo-packages/${pkg.slug}/${pkg.id}`} className="block">
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
