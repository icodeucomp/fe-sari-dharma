import Link from "next/link";
import React from "react";
import { MdArrowForward } from "react-icons/md";

export const Submenu = ({ menu, title, items }: { menu: string; title: string; items: { title: string; link: string }[] }) => {
  return (
    <div className="w-full max-w-xs">
      <div className="p-4 bg-primary text-light">
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
    </div>
  );
};
