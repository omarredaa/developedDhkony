"use client";

import Image from "next/image";
import { Eye } from "lucide-react";

export default function ProductCard() {
  return (
    <div className="w-[320px] rounded-3xl overflow-hidden bg-[#f5f3f1] shadow-lg">
      {/* Image Section */}
      <div className="relative bg-[#d9d5d2] p-6 rounded-3xl">
        <div className="rounded-3xl overflow-hidden">
          <Image
            src="/product.png" // put your image inside public folder
            alt="DKHOON Love"
            width={400}
            height={300}
            className="object-contain mx-auto"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="relative px-6 pt-6 pb-8 text-center bg-[#f5f3f1]">
        {/* Discount Badge */}
        <div className="absolute -top-4 left-4 bg-[#ff6b6b] text-white text-sm font-semibold px-3 py-1 rounded-md shadow">
          60.0%
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold tracking-wide text-gray-800">
          LOVE
        </h3>

        {/* Stars */}
        <div className="flex justify-center mt-2 text-yellow-400 text-lg">
          ★★★★★
        </div>

        {/* Price */}
        <div className="mt-3 flex justify-center items-center gap-3">
          <span className="text-red-500 font-semibold text-lg">199.00</span>
          <span className="text-gray-400 line-through text-sm">497.00</span>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-center">
          <div className="flex w-full rounded-2xl overflow-hidden">
            {/* Add to cart */}
            <button className="flex-1 bg-[#2c2320] text-white py-3 font-semibold hover:bg-black transition">
              أضف للسلة
            </button>

            {/* View button */}
            <button className="w-14 bg-[#c9b7a8] flex items-center justify-center hover:bg-[#bba493] transition">
              <Eye size={20} className="text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
