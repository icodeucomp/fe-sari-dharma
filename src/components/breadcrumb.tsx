import Link from "next/link";

import { BreadcrumbProps } from "@/types";

export const Breadcrumbs = ({ items }: BreadcrumbProps) => {
  return (
    <ol className="flex gap-1 py-1 px-4 border rounded-md border-gray/50 my-4 md:my-8" aria-label="breadcrumbs">
      {items.map((item, index) => (
        <li key={index} className="flex items-center text-xs sm:text-sm md:text-base">
          {index !== 0 && <span className="mr-1 font-semibold text-gray">/</span>}
          {index === items.length - 1 ? (
            <span className="font-medium text-primary line-clamp-1">{item.name}</span>
          ) : (
            <Link href={item.path} className="font-medium text-gray line-clamp-1">
              {item.name}
            </Link>
          )}
        </li>
      ))}
    </ol>
  );
};
