"use client";

import { AiFillStar, AiOutlineEye, AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

import { urlFor } from "@/lib/client";
import DiscountButton from "./DiscountButton";
import StockButton from "./StockButton";
import { cn } from "@/lib/utils";
import { useStateContext } from "@/context/StateContext";
import { Button } from "./ui/button";
import { IoClose } from "react-icons/io5";

const Product = ({ product }: any) => {
  const [showIcons, setShowIcons] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [toggleProductImage, setToggleProductImage] = useState(false);

  const {
    image,
    category,
    name,
    discountPrice,
    actualPrice,
    stock,
    discount,
    slug,
    rating,
    review,
    bestSell,
  } = product;

  const starsArray = Array.from(
    { length: rating },
    (item: any, index: number) => <AiFillStar key={index} />
  );

  const { qty, onAdd, setShowCart }: any = useStateContext();

  return (
    <>
      <div
        onMouseEnter={() => setShowIcons(true)}
        onMouseLeave={() => setShowIcons(false)}
        className="relative w-full flex flex-col gap-3 cursor-pointer overflow-hidden"
      >
        <div
          onMouseEnter={() => setShowImage(true)}
          onMouseLeave={() => setShowImage(false)}
          className="bg-[#F6F8FA]"
        >
          <Link href={`/product/${slug.current}`}>
            {showImage ? (
              <Image
                src={`${urlFor(image[1].asset)}`}
                alt="featured image"
                width={500}
                height={500}
                className="h-[280px] w-full object-center object-contain 2xl:object-contain mix-blend-multiply"
              />
            ) : (
              <Image
                src={`${urlFor(image[0].asset)}`}
                alt="featured image"
                width={500}
                height={500}
                className="h-[280px] w-full object-center object-contain 2xl:object-contain mix-blend-multiply"
              />
            )}
          </Link>
        </div>
        <div>
          <span className="text-sm text-light-black/60 dark:text-white/60 capitalize">
            {category}
          </span>

          <Link href={`/product/${slug.current}`}>
            <p className="font-[500] capitalize hover:text-orange">{name}</p>
          </Link>
          <div className="flex items-center gap-[1px] text-orange my-[1px]">
            {starsArray.map((star, index) => (
              <span key={index}>{star}</span>
            ))}
            {review && (
              <span className="text-sm ml-1 text-light-black/70">
                ({review})
              </span>
            )}
          </div>

          {discountPrice && discountPrice.length && (
            <div className="flex items-center gap-4">
              <p className="font-semibold text-light-black/80 dark:text-white">
                ${discountPrice}.00
              </p>
              <s className="text-sm text-light-black/60 dark:text-white/60">
                ${actualPrice}.00
              </s>
            </div>
          )}
          {!(discountPrice && discountPrice.length) && (
            <p className="font-semibold text-light-black/80">
              ${actualPrice}.00
            </p>
          )}
        </div>
        <Button
          disabled={!stock && true}
          className={cn(
            "bg-transparent hover:bg-transparent p-0 absolute -bottom-1 transition-all duration-500 w-fit",
            showIcons ? "right-0 opacity-100" : "-right-8 opacity-0",
            !stock && "-right-full hover:right-2"
          )}
        >
          <button
            onClick={() => {
              onAdd(product, qty);
              setShowCart(true);
            }}
            className={cn(
              "text-orange bg-transparent hover:bg-light-black/5 rounded-full p-2 capitalize text-xs flex items-center gap-1"
            )}
          >
            <AiOutlinePlus className="text-sm" /> <span>Add to cart</span>
          </button>
        </Button>

        {stock && discount && discount.length && (
          <DiscountButton
            text={discount}
            customClasses={
              discount.includes("%")
                ? "bg-green-500 hover:bg-green-500"
                : "bg-orange"
            }
          />
        )}
        {!stock && <StockButton />}

        <Button
          onClick={() => {
            onAdd(product, qty);
            setShowCart(true);
          }}
          disabled={!stock && true}
          className={cn(
            "bg-transparent hover:bg-transparent p-0 absolute bottom-44 transition-all duration-500 w-fit",
            showIcons ? "left-5 opacity-100" : "-left-5 opacity-0",
            !stock && "-left-full"
          )}
        >
          <AiOutlinePlus
            className={cn(
              "bg-white border rounded-full text-light-black/80 hover:text-white hover:bg-orange p-2 text-[2.5rem] cursor-pointer"
            )}
          />
        </Button>
        <AiOutlineEye
          onClick={() => setToggleProductImage(true)}
          className={cn(
            "bg-white border rounded-full text-light-black/80 hover:text-white hover:bg-orange p-2 text-[2.5rem] cursor-pointer absolute bottom-32 transition-all duration-500 delay-150",
            showIcons ? "left-5 opacity-100" : "-left-5 opacity-0"
          )}
        />
      </div>

      {toggleProductImage && (
        <div
          className={cn(
            "w-full bg-black/80  top-0 left-0 z-[100]",
            bestSell ? "h-full absolute" : "fixed h-screen"
          )}
        >
          <div className="relative w-full h-full md:p-0 p-4 flex items-center justify-center">
            <button
              type="submit"
              onClick={() => setToggleProductImage(false)}
              className={cn(
                "rounded-full p-2 absolute hover:rotate-180 transition-all duration-500",
                bestSell
                  ? "top-2 right-2 text-white bg-orange text-2xl"
                  : "text-white hover:bg-white hover:text-orange top-20 sm:top-10 sm:right-16 right-2 text-3xl sm:text-4xl"
              )}
            >
              <IoClose />
            </button>

            <Image
              src={`${urlFor(image[0].asset)}`}
              alt={name}
              width={500}
              height={500}
              className="w-[25rem] 2xl:w-[35rem] object-center object-contain bg-white"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
