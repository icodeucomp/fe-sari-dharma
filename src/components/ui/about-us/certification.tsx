import { Button, Img, Motion } from "@/components";
import Link from "next/link";

export const Certification = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Motion tag="h4" initialX={-50} animateX={0} duration={0.3} className="heading">
          Sertifikasi & Penghargaan
        </Motion>
      </div>
      <div className="grid grid-cols-3 gap-8">
        {Array.from({ length: 3 }, (_, index) => (
          <Motion tag="div" initialY={30} animateY={0} duration={1} delay={index * 0.1} key={index} className="rounded-lg text-dark bg-light">
            <Img src={"/images/temp-2.png"} alt={"test"} className="w-full rounded-lg h-52" cover />
            <div className="my-4 space-y-4">
              <h4 className="text-xl font-semibold line-clamp-2">Akreditasi PARIPURNA oleh KEMENKES dan LASKESI</h4>
              <Link href={`/`} className="block">
                <Button className="flex items-center gap-2 btn-primary group">View Details</Button>
              </Link>
            </div>
          </Motion>
        ))}
      </div>
    </div>
  );
};
