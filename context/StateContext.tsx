"use client";

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type Product = {
  _id: string;
  name: string;
  discountPrice: number;
  quantity: number;
};

// Defining a type for the context data
type ContextType = {
  showNavbar: boolean;
  setShowNavbar: React.Dispatch<React.SetStateAction<boolean>>;
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: Product[];
  totalQuantities: number;
  totalPrice: number;
  qty: number;
  incQty: () => void;
  decQty: () => void;
  onAdd: (product: Product, quantity: number) => void;
  toggleCartItemQuantity: (id: number, value: string) => void;
  onRemove: (product: any) => void;
};

// Creating a React context with an initial empty object of type ContextType
const Context = createContext<ContextType | undefined>(undefined);

export const StateContext = ({ children }: { children: React.ReactNode }) => {
  const getLocalStorage = (name: string): any => {
    if (typeof window !== "undefined") {
      const storage = localStorage.getItem(name);

      if (storage !== null) {
        return JSON.parse(storage);
      }

      if (name === "cartItems") return [];

      return 0;
    }
  };

  const [showNavbar, setShowNavbar] = useState<boolean>(false);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<Product[]>(
    getLocalStorage("cartItems")
  );
  const [totalQuantities, setTotalQuantities] = useState<number>(
    getLocalStorage("totalQuantities")
  );
  const [totalPrice, setTotalPrice] = useState<number>(
    getLocalStorage("totalPrice")
  );
  const [qty, setQty] = useState(1);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    localStorage.setItem("totalQuantities", JSON.stringify(totalQuantities));
  }, [cartItems, totalPrice, totalQuantities]);

  let findProduct: any;
  let index;

  const onAdd = (product: any, quantity: number) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + quantity);
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.discountPrice * quantity
    );

    if (checkProductInCart) {
      // If the product is already in the cart, update its quantity
      const updatedCartItems = cartItems.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );

      setCartItems(updatedCartItems);
    } else {
      // If the product is not in the cart, add it
      const updatedProduct = { ...product, quantity };
      setCartItems([...cartItems, updatedProduct]);
    }

    toast.success(`${quantity} ${product.name} added to cart.`);
  };

  const onRemove = (product: any) => {
    findProduct = cartItems.find((item: any) => item._id === product._id);
    const tempCart = cartItems.filter((item: any) => item._id !== product._id);
    setTotalPrice(totalPrice - findProduct.price * findProduct.quantity);
    setTotalQuantities(totalQuantities - findProduct.quantity);
    setCartItems(tempCart);
  };

  const toggleCartItemQuantity = (id: number, value: string) => {
    findProduct = cartItems.find((item: any) => item._id === id);
    index = cartItems.findIndex((product: any) => product._id === id);

    if (value === "inc") {
      findProduct.quantity += 1;
      cartItems[index] = findProduct;
      setTotalPrice(totalPrice + findProduct.discountPrice);
      setTotalQuantities(totalQuantities + 1);
    }

    if (value === "dec") {
      if (findProduct.quantity > 1) {
        findProduct.quantity -= 1;
        cartItems[index] = findProduct;
        setTotalPrice(totalPrice - findProduct.discountPrice);
        setTotalQuantities(totalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty: number) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty: number) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showNavbar,
        setShowNavbar,
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalQuantities,
        setTotalQuantities,
        totalPrice,
        setTotalPrice,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
