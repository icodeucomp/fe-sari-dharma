import Link from "next/link";

import { Motion } from "./motion";

import { MdArrowForward } from "react-icons/md";

export const Submenu = ({ menu, title, items }: { menu: string; title: string; items: { title: string; link: string }[] }) => {
  return (
    <Motion tag="div" initialY={50} animateY={0} duration={0.3} className={`w-full min-w-72 xl:min-w-80`}>
      <div className="px-4 py-3 bg-primary text-light">
        <h4 className="text-sm md:text-base">{menu}</h4>
        <h4 className="text-lg md:text-xl font-bold">{title}</h4>
      </div>
      <div className="border-l border-r border-gray/30 text-gray">
        {items.map((item, index) => (
          <Link key={index} href={item.link} className="flex items-center justify-between px-4 py-2 border-b border-gray/30 hover:bg-gray-100 transition-colors cursor-pointer">
            <p className="font-medium text-sm md:text-base">{item.title}</p>
            <MdArrowForward size={24} />
          </Link>
        ))}
      </div>
    </Motion>
  );
};
