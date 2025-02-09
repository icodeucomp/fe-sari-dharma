import { Button, Container, Img, Motion } from "@/components";
import { specializeLists } from "@/static";
import { IoIosArrowDown } from "react-icons/io";

export const Specialize = () => {
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
      <div className="flex flex-wrap justify-between gap-8">
        {specializeLists.map((item, index) => (
          <Motion tag="div" initialY={50} animateY={0} duration={1} delay={index * 0.3} key={index} className="relative flex-1 max-w-sm p-8 overflow-hidden rounded-lg card-shadow min-w-80 bg-light">
            <div className="p-4 rounded-full bg-secondary w-max">
              <Img src={item.pathIcon} alt={item.title} className="size-10" />
            </div>
            <h5 className="mt-6 font-bold text-dark">{item.title}</h5>
            <p className="mt-1 text-sm text-justify text-gray line-clamp-3">{item.description}</p>
            <i className="absolute bottom-0 left-0 w-full h-1.5 bg-primary"></i>
          </Motion>
        ))}
      </div>
      <Button className="flex items-center gap-2 mx-auto btn-outline">
        Lihat Semua <IoIosArrowDown size={20} />
      </Button>
    </Container>
  );
};
