import { Button, Container, Img, Motion, Tab } from "@/components";

import { convertDate } from "@/utils";

import { FaArrowRightLong } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { LuTag } from "react-icons/lu";

export const Article = () => {
  return (
    <Container className="py-16 space-y-8 lg:py-20">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Motion tag="h4" initialX={-50} animateX={0} duration={0.4} className="heading">
            Artikel Kesehatan
          </Motion>
          <Motion tag="p" initialX={-50} animateX={0} duration={0.4} delay={0.3} className="subheading">
            Temukan berbagai tips kesehatan dan informasi medis disini.
          </Motion>
        </div>
        <div className="flex gap-4">
          <Button className="btn-outline">Lihat Semua</Button>
        </div>
      </div>

      <Tab />

      <div className="flex justify-between gap-12">
        <div className="max-w-lg">
          <Motion tag="div" initialY={30} animateY={0} duration={1} delay={0.5} className="space-y-4 min-h-400 text-dark bg-light">
            <Img src={"/images/temp-2.png"} alt={"test"} className="w-full rounded-lg h-60" cover />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 px-8 py-2 rounded-md bg-secondary text-light">
                <LuTag />
                <p className="text-sm">Edukasi Kesehatan</p>
              </div>
              <div className="flex items-center gap-2">
                <IoCalendarOutline />
                <p className="text-sm text-gray">{convertDate("2025-02-07")}</p>
              </div>
            </div>
            <h4 className="text-base font-bold sm:text-xl line-clamp-1">consectetur adipisicing</h4>
            <p className="h-40 text-sm text-justify">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta ipsam adipisci excepturi voluptate fuga! Sunt eum fugit, et voluptate porro perspiciatis voluptatum maxime accusamus ex
              eaque aut quae illum aperiam, vel repellendus sequi voluptas ab. Impedit odio cupiditate perferendis mollitia.
            </p>

            <Button className="flex items-center gap-2 btn-outline">
              Read More
              <FaArrowRightLong />
            </Button>
          </Motion>
        </div>
        <div className="py-4 space-y-8">
          {Array.from({ length: 3 }, (_, index) => (
            <Motion tag="div" initialX={30} animateX={0} duration={index * 0.4} delay={index * 0.2} key={index} className="flex items-center w-full gap-8">
              <div className="flex items-center gap-4">
                <Img src="/images/temp-3.png" alt="temp" className="size-40" />
                <div className="space-y-4">
                  <div className="flex items-center gap-2 px-8 py-2 rounded-md w-max bg-secondary text-light">
                    <LuTag />
                    <p className="text-sm">Edukasi Kesehatan</p>
                  </div>
                  <h4 className="max-w-sm text-xl font-bold h-14">Pentingnya Tidur Berkualitas untuk kesehatan tubuh</h4>
                  <div className="flex items-center gap-2">
                    <IoCalendarOutline />
                    <p className="text-sm text-gray">{convertDate("2025-02-07")}</p>
                  </div>
                </div>
              </div>

              <Button className="flex items-center gap-2 btn-outline">
                Read More
                <FaArrowRightLong />
              </Button>
            </Motion>
          ))}
        </div>
      </div>
    </Container>
  );
};
