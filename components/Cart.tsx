"use client";

import Image from "next/image";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";

import { cn } from "@/lib/utils";
import CommonButton from "./CommonButton";
import { useStateContext } from "@/context/StateContext";
import { urlFor } from "@/lib/client";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import getStripe from "@/lib/getStripe";
import toast from "react-hot-toast";

const Cart = ({ showCart, setShowCart }: any) => {
  const {
    totalQuantities,
    totalPrice,
    cartItems,
    toggleCartItemQuantity,
    onRemove,
  }: any = useStateContext();

  const handleCheckout = async () => {
    const stripe: any = await getStripe();

    const response = await fetch("http://localhost:3000/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (!response.ok) {
      console.error("Request failed with status:", response.status);
      // Handle the error case here.
      return;
    }

    const responseText = await response.text();
    console.log("Response Text:", responseText);

    try {
      const data = JSON.parse(responseText);
      toast.loading("Redirecting...");
      stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      console.error("Error parsing JSON:", error);
      // Handle JSON parsing error.
    }
  };

  return (
    <div className="relative">
      <span
        className={cn(
          "block dark:bg-black bg-white shadow-lg drop-shadow shadow-black/10 rotate-45 absolute right-2 w-4 transition-all duration-500",
          showCart ? "h-4 top-8" : "h-0 top-20"
        )}
      ></span>
      <div
        className={cn(
          "w-[330px] sm:w-[22rem] bg-white shadow-lg shadow-black/10 absolute top-10 -right-10 sm:-right-5 overflow-y-auto overflow-hidden transition-all duration-500",
          showCart ? "h-[29rem]" : "h-0"
        )}
      >
        <div className="cart w-full h-full overflow-y-auto relative">
          <div className="relative">
            <div className="sticky top-0 left-0 bg-white z-[1] w-full flex items-center justify-between border-b-2 pt-7 pb-3 px-5 mb-5">
              <p className="uppercase text-sm font-light">
                your cart
                <span className="ml-2 capitalize text-orange font-normal text-[.8rem]">
                  ({totalQuantities} items)
                </span>
              </p>
              <IoClose
                onClick={() => setShowCart(false)}
                className="text-lg hover:text-orange text-light-black cursor-pointer"
              />
            </div>

            {cartItems && cartItems.length >= 1 ? (
              <div className="flex flex-col justify-between gap-8 w-full min-h-[23.65rem] select-none">
                {cartItems.map((item: any) => (
                  <div
                    key={item._id}
                    className="flex flex-col gap-5 w-full h-[90px] px-5"
                  >
                    <div className="flex gap-3 w-full h-full">
                      <div className="bg-[#F6F8FA] w-[90px] h-full rounded-md">
                        <Image
                          src={`${urlFor(item.image[0])}`}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                      </div>
                      <div className="flex flex-col justify-between flex-1">
                        <p className="text-[.9rem] font-semibold">
                          {item.name}
                        </p>
                        <span className="font-semibold text-light-black">
                          ${item.discountPrice}.00
                        </span>
                        <div className="flex items-center gap-3 justify-between">
                          <div
                            className={cn(
                              "select-none flex items-center justify-between w-[120px] border rounded-full"
                            )}
                          >
                            <AiOutlineMinus
                              onClick={() =>
                                toggleCartItemQuantity(item._id, "dec")
                              }
                              className="cursor-pointer text-red-600 hover:bg-red-600/20 text-3xl p-1 pl-2 rounded-l-full"
                            />
                            <span>{item.quantity}</span>
                            <AiOutlinePlus
                              onClick={() =>
                                toggleCartItemQuantity(item._id, "inc")
                              }
                              className="text-green-500 hover:bg-green-500/20 cursor-pointer text-3xl p-1 pr-2 rounded-r-full"
                            />
                          </div>
                          <RiDeleteBinLine
                            onClick={() => onRemove(item)}
                            className="hover:text-red-600 cursor-pointer text-xl"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="py-3 px-5 flex flex-col gap-5 sticky bottom-0 left-0 bg-white w-full">
                  <div className="flex items-center justify-between text-light-black select-none">
                    <h2 className="font-semibold text-lg capitalize">
                      subtotal:
                    </h2>
                    <h2 className="font-semibold text-lg capitalize">
                      ${totalPrice}.00
                    </h2>
                  </div>

                  <button className="w-full" onClick={handleCheckout}>
                    <CommonButton
                      stock={true}
                      text="pay with stripe"
                      customClasses="w-full bg-orange text-white hover:bg-[#d93237] py-6 rounded before:w-4 after:w-0"
                    />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center flex-col gap-5 px-5 w-full min-h-[20rem]">
                <Image
                  src="/shopping-bag.png"
                  alt="shopping bar"
                  width={100}
                  height={100}
                  className="object-contain"
                />
                <p className="capitalize text-light-black font-semibold text-sm md:text-base">
                  Your shopping bag is empty.
                </p>
                <Link
                  href={"/"}
                  className="w-full"
                  onClick={() => setShowCart(false)}
                >
                  <CommonButton
                    stock={true}
                    text="continue shopping"
                    customClasses="w-full bg-orange text-white hover:bg-[#d93237] py-6 rounded before:w-4 after:w-0 uppercase"
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
