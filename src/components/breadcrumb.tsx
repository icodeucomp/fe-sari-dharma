import Link from "next/link";

import { BreadcrumbProps } from "@/types";

export const Breadcrumbs = ({ items }: BreadcrumbProps) => {
  return (
    <ol className="flex gap-x-1" aria-label="breadcrumbs">
      {items.map((item, index) => (
        <li key={item.path} className="flex items-center">
          {index !== 0 && <span className="mr-1 font-semibold text-gray">/</span>}
          {index === items.length - 1 ? (
            <span className="font-medium text-primary line-clamp-1">{item.name}</span>
          ) : (
            <Link href={item.path} className="font-medium text-gray">
              {item.name}
            </Link>
          )}
        </li>
      ))}
    </ol>
  );
};
