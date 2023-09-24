"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import Title from "./Title";
import Product from "./Product";

interface bestSellProps {
  productData: [];
}

const BestSell = ({ productData }: bestSellProps) => {
  return (
    <div className="flex flex-col gap-10 relative w-full 2xl:container px-5 md:px-10 2xl:mx-auto ">
      <Title
        title="Best Sell"
        desc=" Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text"
      />

      <div>
        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            650: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          className="mySwiper"
          modules={[Autoplay]}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
        >
          {productData.map((product: any) => {
            return (
              product.bestSell && (
                <SwiperSlide key={product._id}>
                  <Product product={...product} />
                </SwiperSlide>
              )
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default BestSell;
