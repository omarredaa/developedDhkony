"use client";

import Link from "next/link";
import CheckoutForm from "../Components/CheckoutForm";
import OrderSummary from "../Components/OrderSummary";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
export default function CheckoutPage() {
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const { cart } = useCart();

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
      <Link href="/">
        <button className="mb-5 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer ">
          العودة للصفحة الرئيسية
        </button>
      </Link>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="md:col-span-2 bg-white shadow rounded-lg p-6 order-1">
          <CheckoutForm isCartEmpty={isCartEmpty} />
        </div>

        {/* Order Summary */}
        <div className="bg-white shadow rounded-lg p-6 order-2 md:order-0 md:sticky md:top-10 h-fit">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
