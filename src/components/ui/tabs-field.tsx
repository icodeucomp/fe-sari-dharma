import * as React from "react";

import { Motion, Slider } from "@/components";
import { useMediaQuery } from "@/hooks";

export const TabsField = () => {
  const [page, setPage] = React.useState<number>(10);
  const [limit, setLimit] = React.useState<number>(3);
  const [totalPage, setTotalPage] = React.useState<number>(0);

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
  const isMobile = useMediaQuery("(min-width: 0px) and (max-width: 639px)");

  React.useEffect(() => {
    if (isDesktop) {
      setLimit(3);
    } else if (isTablet) {
      setLimit(2);
    } else if (isMobile) {
      setLimit(1);
    }
  }, [isDesktop, isTablet, isMobile]);
  return (
    <Slider
      page={page}
      setPage={setPage}
      title="Layanan Unggulan"
      description="Layanan kesehatan terjangkau dengan perawatan terbaik."
      totalPage={totalPage}
      parentClassName="space-y-8"
      className="grid grid-cols-3 grid-rows-2 gap-8"
      loading={false}
    >
      {Array.from({ length: 3 }, (_, index) => (
        <Motion tag="div" initialY={30} animateY={0} duration={1} delay={index * 0.1} key={index} className={`card-shadow min-h-200 text-dark bg-light ${index === 0 && "row-span-2 col-span-2"}`}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium ducimus voluptate, obcaecati tempore alias nesciunt soluta commodi illo nostrum placeat ipsa quos deleniti, vel
          praesentium id blanditiis minus mollitia provident similique vero laborum maiores earum corrupti. Voluptatibus quia, doloremque maiores, ab, dolores vitae fugiat quaerat architecto facere
          ipsa alias quasi.
        </Motion>
      ))}
    </Slider>
  );
};
