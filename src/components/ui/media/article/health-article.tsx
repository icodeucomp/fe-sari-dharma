import Link from "next/link";

import { Background, Container, Motion } from "@/components";

import { LuTag } from "react-icons/lu";

import { convertDate, formatKebabCase } from "@/utils";

const Card = () => {
  return (
    <Background src="/images/temp-1.png" alt="temp" className="w-full min-h-60 flex items-end" imgClassName="object-cover" parentClassName="rounded-md">
      <div className="absolute inset-0 bg-gradient-to-b from-light/10 to-dark/40 w-full h-full" />
      <span className="flex items-center gap-2 text-xs absolute top-4 right-4 rounded-md bg-secondary px-3 py-2">
        <LuTag size={20} />
        Edukasi Kesehatan
      </span>

      <div className="flex flex-col px-4 pb-6 gap-1 z-1 text-light">
        <span className="text-xs font-light">{convertDate("2025-02-19")}</span>
        <Link href={`/media-informasi/artikel-kesehatan/${formatKebabCase("Peran CT Scan dan MRI dalam Mendeteksi Stroke")}`}>
          <h3 className="font-semibold line-clamp-2">Peran CT Scan dan MRI dalam Mendeteksi Stroke</h3>
        </Link>
      </div>
    </Background>
  );
};

export const HealthArticle = () => {
  return (
    <Container className="space-y-8">
      <div className="pb-8 space-y-4 border-b border-gray/50">
        <Motion tag="h2" initialX={-50} animateX={0} duration={0.3} className="heading">
          Artikel Kesehatan
        </Motion>
        <Motion tag="p" initialX={-50} animateX={0} duration={0.6} delay={0.3} className="leading-tight subheading">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Motion>
      </div>

      <div className="grid grid-cols-4 grid-rows-2 gap-4">
        <Background src="/images/temp-1.png" alt="temp" className="w-full min-h-60 flex items-end h-full" imgClassName="object-cover" parentClassName="rounded-md col-span-2 row-span-2">
          <div className="absolute inset-0 bg-gradient-to-b from-light/10 to-dark/40 w-full h-full" />
          <span className="flex items-center gap-2 text-xs absolute top-4 right-4 rounded-md bg-secondary px-3 py-2">
            <LuTag size={20} />
            Edukasi Kesehatan
          </span>

          <div className="flex flex-col px-4 pb-6 gap-1 z-1 text-light">
            <span className="font-light">{convertDate("2025-02-19")}</span>
            <Link href={`/media-informasi/artikel-kesehatan/${formatKebabCase("Peran CT Scan dan MRI dalam Mendeteksi Stroke")}`}>
              <h3 className="font-semibold text-2xl line-clamp-2">Peran CT Scan dan MRI dalam Mendeteksi Stroke</h3>
            </Link>
          </div>
        </Background>
        {[...Array(4)].map((_, index) => (
          <Card key={index} />
        ))}
      </div>
    </Container>
  );
};
