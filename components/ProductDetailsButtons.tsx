"use client";

import { useStateContext } from "@/context/StateContext";
import CommonButton from "./CommonButton";

interface ProductDetailsButtonsProps {
  stock: boolean;
  product: any;
}

const ProductDetailsButtons = ({
  stock,
  product,
}: ProductDetailsButtonsProps) => {
  const { onAdd, qty, setShowCart }: any = useStateContext();

  return (
    <div className="flex items-center gap-2 sm:gap-5 md:gap-8">
      <button
        onClick={() => {
          onAdd(product, qty);
        }}
      >
        <CommonButton
          stock={stock}
          text="Add to cart"
          customClasses="md:w-44 py-6 before:w-4 after:w-0 rounded text-sm md:text-base capitalize"
        />
      </button>

      <button
        onClick={() => {
          onAdd(product, qty);
          setShowCart(true);
        }}
      >
        <CommonButton
          stock={stock}
          text="Buy now"
          customClasses="md:w-44 hover:bg-[#d93237] bg-orange text-white py-6 rounded before:w-4 text-xs md:text-sm after:w-0"
        />
      </button>
    </div>
  );
};

export default ProductDetailsButtons;
