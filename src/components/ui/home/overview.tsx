import { Container, Img, Motion } from "@/components";
import Link from "next/link";

export const Overview = () => {
  const images: string[] = ["/images/temp-3.png", "/images/temp-1.png", "/images/temp-2.png"];

  return (
    <Container className="flex flex-col-reverse gap-8 pt-10 sm:pt-16 md:pt-20 lg:flex-row">
      <Motion tag="div" initialX={-50} animateX={0} duration={0.4} className="flex-1 space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-medium sm:text-3xl text-dark">Selamat datang, Sehat Bersama!</h2>
          <h2 className="text-3xl font-bold sm:text-5xl text-primary">di Klinik Utama Rawat Inap Sari Dharma</h2>
        </div>
        <p className="text-sm text-justify sm:text-base text-dark/80">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores dolores assumenda voluptate in placeat atque. Nobis consectetur praesentium rerum iure rem vero nesciunt, ratione fugiat
          dolorum quia dignissimos quo natus eum! Odio hic autem recusandae tempore minima expedita. Nisi, delectus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti et in atque quos,
          impedit aspernatur quidem architecto sunt tempore ipsam.
        </p>
        <Link href="/" className="flex items-center gap-1 px-6 py-2 border-2 rounded-2xl w-max text-primary border-primary">
          Explore Now
          <Img src="/icons/arrow-up-brown.svg" alt="arrow up light" className="size-5 sm:size-6 lg:size-7" />
        </Link>
      </Motion>
      <Motion tag="div" initialX={50} animateX={0} duration={0.8} delay={0.4} className="relative grid flex-1 grid-cols-2 grid-rows-2 gap-4 min-h-400">
        {images.map((item, index) => (
          <Img
            key={index}
            src={item}
            alt="image profile Klinik Utama Rawat Inap Sari Dharma"
            className={`w-full rounded-lg overflow-hidden h-32 sm:h-48 md:h-52 lg:h-full ${index === 0 && "row-span-2"}`}
            cover
          />
        ))}
      </Motion>
    </Container>
  );
};
