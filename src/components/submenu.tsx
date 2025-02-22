import Link from "next/link";

import { Motion } from "./motion";

import { MdArrowForward } from "react-icons/md";

export const Submenu = ({ menu, title, items, isBig }: { menu: string; title: string; isBig?: boolean; items: { title: string; link: string }[] }) => {
  return (
    <Motion tag="div" initialY={50} animateY={0} duration={0.3} className={`w-full min-w-72 xl:min-w-80 ${isBig ? "max-w-md" : "max-w-xs"}`}>
      <div className="px-4 py-3 bg-primary text-light">
        <h4>{menu}</h4>
        <h4 className="text-xl font-bold">{title}</h4>
      </div>
      <div className="border-l border-r border-gray/30 text-gray">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between px-4 py-2 border-b border-gray/30">
            <p className="font-medium">{item.title}</p>
            <Link href={item.link}>
              <MdArrowForward size={28} />
            </Link>
          </div>
        ))}
      </div>
    </Motion>
  );
};
