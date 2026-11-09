"use client";

import * as React from "react";

import { useToggleState } from "@/hooks";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { motion, Variants } from "framer-motion";

import { FaAngleRight } from "react-icons/fa6";

import { getNavbarLists, navbarLists } from "@/static";

import { navbarListType } from "@/types";

interface LinkProps extends navbarListType {
  toggleNavbar: () => void;
  loaded: boolean;
}

const motionVariants: Variants = {
  open: {
    height: "auto",
    opacity: 1,
    transition: { height: { duration: 0.2, ease: "easeOut" }, opacity: { duration: 0.3, ease: "easeOut" }, staggerChildren: 0.3 },
  },
  closed: {
    height: 0,
    opacity: 0,
    transition: { height: { duration: 0.2, ease: "easeIn" }, opacity: { duration: 0.2, ease: "easeIn" }, staggerChildren: 0.1 },
  },
};

// Text for a menu that has no entries (for example when the database has no featured services yet).
const emptyText = (title: string) => `Belum ada ${title.toLowerCase()}.`;

const SkeletonLines = () => (
  <div className="p-4 space-y-3 animate-pulse" aria-hidden>
    <div className="w-4/5 h-3 rounded bg-gray/20" />
    <div className="w-3/5 h-3 rounded bg-gray/20" />
    <div className="w-2/3 h-3 rounded bg-gray/20" />
  </div>
);

// Each title opens its own list directly below it. The list shows only the entries: the title is already in the bar.
const DesktopLink = ({ navbarItems, loaded }: { navbarItems: navbarListType[]; loaded: boolean }) => (
  <>
    {navbarItems.map((navbar, i) => {
      const entries = navbar.content ?? [];
      return (
        <li key={i} className="relative flex items-center flex-1 w-full h-full group/item">
          <div className="relative w-full text-lg font-semibold text-center duration-200 cursor-default text-dark group-hover/item:text-primary group-focus-within/item:text-primary">
            <button type="button" className="font-semibold" aria-haspopup="true">
              {navbar.title}
            </button>
            <span className="absolute w-0 h-1 transition-all -bottom-2 left-1/2 bg-secondary group-hover/item:w-10 group-focus-within/item:w-10"></span>
            <span className="absolute w-0 h-1 transition-all -bottom-2 right-1/2 bg-secondary group-hover/item:w-10 group-focus-within/item:w-10"></span>
          </div>

          <div
            className={`absolute top-full left-1/2 z-100000 w-64 -translate-x-1/2 invisible opacity-0 pointer-events-none transition-all duration-200 translate-y-1 group-hover/item:visible group-hover/item:opacity-100 group-hover/item:pointer-events-auto group-hover/item:translate-y-0 group-focus-within/item:visible group-focus-within/item:opacity-100 group-focus-within/item:pointer-events-auto group-focus-within/item:translate-y-0`}
          >
            <div className="overflow-hidden border-t-2 shadow-xl rounded-b-lg bg-light border-secondary">
              {entries.length > 0 ? (
                <ul className="py-2 overflow-y-auto max-h-[60vh] scrollbar">
                  {entries.map((field, k) => (
                    <li key={k}>
                      <Link
                        href={field.link || "/"}
                        className="flex items-center justify-between gap-3 px-5 py-2.5 text-sm font-medium duration-200 text-dark hover:bg-primary/10 hover:text-primary group/link"
                      >
                        <span className="line-clamp-2">{field.title}</span>
                        <FaAngleRight className="shrink-0 transition-transform opacity-0 size-3 group-hover/link:translate-x-1 group-hover/link:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : loaded ? (
                <p className="px-5 py-4 text-sm italic text-gray">{emptyText(navbar.title)}</p>
              ) : (
                <SkeletonLines />
              )}
            </div>
          </div>
        </li>
      );
    })}
  </>
);

const MobileLink = ({ link, title, content, toggleNavbar, loaded }: LinkProps) => {
  const [ref, dropdown, toggleDropdown] = useToggleState(false);

  const { push } = useRouter();

  const handleClick = (url: string) => {
    push(url);
    toggleNavbar();
  };

  const entries = content ?? [];

  return (
    <div ref={ref} className="relative w-full">
      <div className="flex items-center gap-2 px-4 pb-2 sm:px-8">
        {link ? (
          <button onClick={() => handleClick(link)} className="text-base font-medium duration-300 hover:text-light-gray text-light sm:text-lg w-max">
            {title}
          </button>
        ) : (
          <button onClick={toggleDropdown} className="text-base font-medium duration-300 hover:text-light-gray text-light sm:text-lg w-max">
            {title}
          </button>
        )}
        {content && (
          <button type="button" onClick={toggleDropdown} aria-label={`Buka menu ${title}`} aria-expanded={dropdown}>
            <FaAngleRight className={`duration-300 cursor-pointer ${dropdown && "rotate-90"}`} />
          </button>
        )}
      </div>
      <motion.div initial={false} animate={dropdown ? "open" : "closed"} variants={motionVariants} className="w-full px-4 space-y-2 bg-light sm:px-8">
        <div className="py-4 space-y-4 text-sm sm:text-base">
          {entries.length > 0 ? (
            entries.map((item, index) => (
              <button
                onClick={() => handleClick(item.link || "/")}
                key={index}
                className="flex items-center gap-4 font-medium text-dark hover:font-semibold w-max"
              >
                {item.title} <FaAngleRight />
              </button>
            ))
          ) : loaded ? (
            <p className="italic text-gray">{emptyText(title)}</p>
          ) : (
            <SkeletonLines />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export const Navbar = ({ navbar, toggleNavbar }: { navbar: boolean; toggleNavbar: () => void }) => {
  const [navbarItems, setNavbarItems] = React.useState(navbarLists);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const loadNavbarData = async () => {
      const dynamicNavbarItems = await getNavbarLists();
      setNavbarItems(dynamicNavbarItems);
      setLoaded(true);
    };

    loadNavbarData();
  }, []);
  return (
    <>
      <nav className="items-center justify-center hidden w-full h-full grid-cols-4 list-none max-w-navbar lg:grid" aria-label="Menu utama">
        <DesktopLink navbarItems={navbarItems} loaded={loaded} />
      </nav>
      <motion.nav
        initial={false}
        animate={navbar ? "open" : "closed"}
        variants={motionVariants}
        className="absolute left-0 w-full space-y-4 overflow-hidden py-4 top-16 text-nowrap bg-primary text-light z-1000 block lg:hidden"
      >
        {navbarItems.map((item, index) => (
          <MobileLink key={index} link={item.link} title={item.title} content={item.content} toggleNavbar={toggleNavbar} loaded={loaded} />
        ))}
      </motion.nav>
    </>
  );
};

export default Navbar;
