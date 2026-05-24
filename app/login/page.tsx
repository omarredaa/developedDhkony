"use client";

import Link from "next/link";
import CheckoutForm from "../Components/CheckoutForm";
import OrderSummary from "../Components/OrderSummary";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
export default function CheckoutPage() {
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const { cart } = useCart();
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  useEffect(() => {
    if (!cart.length) {
      setIsCartEmpty(true);
    }
  }, [cart.length]);
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center flex-col py-10 text-black px-4">
      {/* <Link href="/">
        <button className="mb-5 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer ">
          العودة للصفحة الرئيسية
        </button>
      </Link> */}
      <div className="flex items-center justify-center w-full border-b">
        <Link href="/">
          <img src="/logo.png" alt="logo" className="w-16 cursor-pointer" />
        </Link>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="bg-white shadow rounded-lg p-6 order-1 lg:order-1 lg:col-span-1">
          <OrderSummary setDiscount={setDiscount} discount={discount} />
        </div>

        {/* Checkout Form */}
        <div className="bg-white shadow rounded-lg p-6 order-2 lg:order-2 lg:col-span-2">
          <CheckoutForm isCartEmpty={isCartEmpty} discount={discount} />
        </div>
      </div>
    </div>
  );
}
