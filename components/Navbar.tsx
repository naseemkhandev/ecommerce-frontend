"use client";

import Image from "next/image";
import Link from "next/link";
import { LuSearch } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { NavLinks } from "@/constants/NavLinks";
import Search from "./Search";
import Cart from "./Cart";
import { useStateContext } from "@/context/StateContext";

const Navbar = () => {
  const [searchIsOpen, setSearchIsOpen] = useState(false);

  const {
    showNavbar,
    setShowNavbar,
    showCart,
    setShowCart,
    totalQuantities,
  }: any = useStateContext();

  const pathname = usePathname();
  const navbar = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        if (navbar.current) {
          if (window.scrollY > 80) {
            navbar.current.classList.add("bg-white");
            navbar.current.classList.add("shadow-lg");
          } else {
            navbar.current.classList.remove("bg-white");
            navbar.current.classList.remove("shadow-lg");
          }
        }
      };

      // Attach the scroll event listener when the component mounts on the client.
      window.addEventListener("scroll", handleScroll);

      // Remove the scroll event listener when the component unmounts.
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [navbar]);

  const underline =
    "before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:bg-orange before:h-[2px] before:rounded-full cursor-pointer transition-all before:transition-all before:duration-500";

  return (
    <div
      ref={navbar}
      className="fixed top-0 left-0 z-[80] w-full shadow-light-black/10"
    >
      <div className="flex items-center justify-between py-5 container px-5 md:px-10 mx-auto relative">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={200}
            height={200}
            className="md:w-[170px] w-[130px] h-full object-contain"
          />
        </Link>

        <div
          className={`flex md:items-center md:justify-center md:flex-row flex-col gap-4 lg:gap-10 flex-1 fixed md:relative md:right-0 top-0 w-full sm:w-80 md:w-auto h-screen md:h-auto px-10 pt-36 md:p-0 bg-white dark:bg-black md:bg-transparent md:dark:bg-transparent z-[80] transition-all duration-700 shadow-light-black/10 shadow-xl drop-shadow-2xl md:shadow-none md:drop-shadow-none ${
            showNavbar ? "right-0" : "-right-[150%]"
          }`}
        >
          {NavLinks.map((item) => (
            <Link
              href={item.link}
              key={item.link}
              className={`relative pb-3 md:pb-1 py-2 md:py-1 md:p-1 block md:inline-block
               ${
                 item.link === pathname
                   ? `text-orange dark:text-orange hover:text-orange before:w-full ${underline} md:before:w-0`
                   : `hover:text-orange dark:hover:text-orange dark:text-white md:text-light-black md:dark:text-light-black border-b border-light-black/20 dark:border-white/40 md:border-0 before:w-0 hover:before:w-full ${underline} md:hover:before:w-0 dark:text-light-black`
               }`}
            >
              {item.name}
            </Link>
          ))}

          <span
            onClick={() => setShowNavbar(false)}
            className="block md:hidden text-xl p-2 dark:hover:text-orange hover:text-orange bg-light-black text-white absolute top-10 right-10 cursor-pointer rounded-full hover:rotate-180 transition-all duration-500"
          >
            <IoClose />
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            onClick={() => setSearchIsOpen(true)}
            className="hover:text-orange dark:hover:text-orange cursor-pointer rounded-full text-2xl dark:text-black"
          >
            <LuSearch />
          </span>
          <Search
            searchIsOpen={searchIsOpen}
            setSearchIsOpen={setSearchIsOpen}
          />

          <div
            onClick={() => setShowCart(!showCart)}
            className="cursor-pointer flex items-center gap-1 hover:text-orange dark:hover:text-orange relative"
          >
            <span className=" dark:hover:text-orange hover:text-orange rounded-full text-2xl dark:text-black">
              <AiOutlineShoppingCart />
            </span>
            <p className="absolute -top-2 -right-2 bg-orange text-white rounded-full w-5 h-5 text-[11px] flex items-center justify-center">
              {totalQuantities}
            </p>
          </div>
          <Cart showCart={showCart} setShowCart={setShowCart} />

          <span
            onClick={() => setShowNavbar(true)}
            className="cursor-pointer rounded-full md:hidden text-2xl dark:text-black  dark:hover:text-orange hover:text-orange"
          >
            <FiMenu />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
