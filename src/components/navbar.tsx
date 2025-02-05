import { Container, Img, Button } from "@/components";

import { FaAngleDown } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

const navbarList: string[] = ["Profil Klinik", "Layanan Unggulan", "Cari Dokter", "Media & Informasi"];

export const Navbar = () => {
  return (
    <nav className="bg-light text-dark">
      <Container className="flex items-center justify-between h-20">
        <Img src="/images/logo.png" alt="logo clinic sari dharma" className="size-14" cover />
        <menu className="flex items-center gap-6">
          {navbarList.map((item, index) => (
            <li key={index} className="flex items-center gap-2 cursor-pointer group">
              {item}
              <FaAngleDown className="duration-300 group-hover:rotate-180" />
            </li>
          ))}
        </menu>
        <div className="flex items-center gap-6 divide-x divide-primary">
          <div className="relative hidden overflow-hidden rounded-lg lg:min-w-44 xl:min-w-56 lg:flex">
            <input type="text" className="block w-full p-2.5 text-xs duration-300 border outline-none rounded-s-lg text-dark-blue border-gray focus:border-primary" placeholder="Search" />
            <button type="button" className="absolute top-0 h-full p-2 duration-300 border end-0 bg-primary border-primary hover:bg-primary/80">
              <IoSearch size={20} className="fill-white" />
              <span className="sr-only">Search</span>
            </button>
          </div>
          <div className="pl-6">
            <Button className="bg-primary text-light">Masuk/Daftar</Button>
          </div>
        </div>
      </Container>
    </nav>
  );
};
