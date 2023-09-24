"use client";

import { useEffect, useRef } from "react";
import { BsArrowUp } from "react-icons/bs";

const ScrollToTop = () => {
  const arrow = useRef<HTMLButtonElement>(null);
  //   const handleScroll = () => {
  //     if (arrow.current) {
  //       if (window.pageYOffset > 80) {
  //         arrow.current.classList.add("bg-white");
  //         arrow.current.classList.add("shadow-md");
  //         arrow.current.classList.add("drop-shadow-md");
  //       } else {
  //         arrow.current.classList.remove("bg-white");
  //         arrow.current.classList.remove("shadow-md");
  //         arrow.current.classList.remove("drop-shadow-md");
  //       }
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [arrow]);

  useEffect(() => {
    window.onscroll = () => {
      if (arrow.current) {
        if (window.pageYOffset >= 180) {
          arrow.current.classList.add("right-10");
        } else {
          arrow.current.classList.remove("right-10");
        }
      }
    };
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div onClick={scrollTop} className="overflow-hidden">
      <button
        aria-label="arrow"
        className={`fixed bottom-6 ss:bottom-10 z-30 -right-full shadow-2xl shadow-black bg-orange dark:bg-orange hover:bg-[#d93237] dark:hover:bg-[#d93237] active:p-[.45rem] p-3 rounded-full`}
        ref={arrow}
      >
        <BsArrowUp className="text-xl active:text-[1.2rem] text-white dark:text-white" />
      </button>
    </div>
  );
};

export default ScrollToTop;
