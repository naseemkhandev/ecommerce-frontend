"use client";

import Link from "next/link";
import { useEffect } from "react";
import { BsFillCartCheckFill } from "react-icons/bs";

import CommonButton from "@/components/CommonButton";
import { useStateContext } from "@/context/StateContext";
import { canvasConfetti } from "@/constants/canvasConfetti";

const page = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities }: any =
    useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);

    canvasConfetti();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center text-center z-[10000] bg-white dark:bg-black">
      <div className="w-[60%] text-center bg-black/5 rounded-xl p-16 flex flex-col gap-8">
        <BsFillCartCheckFill className="text-7xl text-green-600 w-fit mx-auto mb-2" />
        <div>
          <h1 className="capitalize text-3xl font-extrabold text-light-black">
            ThankYou For your Purchase
          </h1>
          <p className="text-sm">Check your email inbox for the receipt</p>
        </div>
        <p className="text-sm">
          If you have any Questions, please email us{" "}
          <Link href="mailto:naseemsaffy@gmail.com" className="text-orange">
            naseemsaffy@gamil.com
          </Link>
        </p>
        <Link href={"/shop"}>
          <CommonButton
            stock={true}
            text="continue shopping"
            customClasses="w-full uppercase bg-orange text-white hover:bg-[#d93237] py-6 rounded before:w-4 after:w-0"
          />
        </Link>
      </div>
    </div>
  );
};

export default page;
