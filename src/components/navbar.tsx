"use client";

import { useToggleState } from "@/hooks";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { motion, Variants } from "framer-motion";

import { FaAngleRight } from "react-icons/fa6";

import { navbarLists } from "@/static";

import { navbarListType } from "@/types";

interface LinkProps extends navbarListType {
  toggleNavbar: () => void;
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

const DesktopLink = () => {
  return (
    <>
      {navbarLists.map((navbar, i) => (
        <li key={i} className="flex items-center flex-1 w-full h-full group">
          <div className={`font-semibold text-lg relative text-dark w-full text-center cursor-default hover:font-semibold hover:text-primary`}>
            <span>{navbar.title}</span>
            <span className={`absolute h-1 transition-all -bottom-2 left-1/2 bg-secondary w-0 group-hover:w-10`}></span>
            <span className={`absolute h-1 transition-all -bottom-2 right-1/2 bg-secondary w-0 group-hover:w-10`}></span>
          </div>
          <div className="group-hover:opacity-100 navbar-submenu group-hover:pointer-events-auto">
            <div className="grid w-full grid-cols-4 mx-auto border-l-2 border-r-2 divide-x-2 max-w-navbar border-gray/20 divide-gray/20">
              {navbarLists.map((item, j) => (
                <div key={j} className="w-full px-4 pt-4 pb-8 space-y-4 hover:bg-primary/20">
                  {item.content?.map((field, k) => (
                    <Link key={k} href={field.link || "/"} className="flex items-center gap-4 text-sm font-medium duration-300 text-primary">
                      {field.title}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </li>
      ))}
    </>
  );
};

const MobileLink = ({ link, title, content, toggleNavbar }: LinkProps) => {
  const [ref, dropdown, toggleDropdown] = useToggleState(false);

  const { push } = useRouter();

  const handleClick = (url: string) => {
    push(url);
    toggleNavbar();
  };

  return (
    <div ref={ref} className="relative w-full">
      <div className="flex items-center gap-2 px-4 pb-2 sm:px-8">
        {title === "Business" ? (
          <span className="text-base font-medium duration-300 cursor-default text-light sm:text-lg w-max">{title}</span>
        ) : (
          <button onClick={() => handleClick(link || "/")} className="text-base font-medium duration-300 hover:text-light-gray text-light sm:text-lg w-max">
            {title}
          </button>
        )}
        {content && (
          <span onClick={toggleDropdown}>
            <FaAngleRight className={`duration-300 cursor-pointer ${dropdown && "rotate-90"}`} />
          </span>
        )}
      </div>
      <motion.div initial={false} animate={dropdown ? "open" : "closed"} variants={motionVariants} className="w-full px-4 space-y-2 bg-light sm:px-8">
        <div className="py-4 space-y-4 text-sm sm:text-base">
          {content?.map((item, index) => (
            <button onClick={() => handleClick(link + item.link)} key={index} className="flex items-center gap-4 font-medium text-dark hover:font-semibold w-max">
              {item.title} <FaAngleRight />
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export const Navbar = ({ navbar, toggleNavbar }: { navbar: boolean; toggleNavbar: () => void }) => {
  return (
    <>
      <nav className="items-center justify-center hidden w-full h-full grid-cols-4 list-none max-w-navbar lg:grid">
        <DesktopLink />
      </nav>
      <motion.nav
        initial={false}
        animate={navbar ? "open" : "closed"}
        variants={motionVariants}
        className="absolute left-0 w-full space-y-4 overflow-hidden py-4 top-20 text-nowrap bg-primary text-light z-1000"
      >
        {navbarLists.map((item, index) => (
          <MobileLink key={index} link={item.link} title={item.title} content={item.content} toggleNavbar={toggleNavbar} />
        ))}
      </motion.nav>
    </>
  );
};

export default Navbar;
