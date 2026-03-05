"use client";
import { useProducts } from "@/app/context/ProductsContext";
import React, { useEffect, useState } from "react";

export default function ProductEditing() {
  const { products, loading } = useProducts();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => setLoading(false), 1000); // 2s delay
  //   return () => clearTimeout(timer);
  // }, []);
  console.log(products);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-linear-to-br from-black via-zinc-900 to-black text-white">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          <p className="text-white mt-4">Loading Products...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-4 gap-6 p-10">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded-xl">
          <img src={product.image} className="h-40 object-contain" />

          <h2 className="mt-2 font-bold">{product.name}</h2>

          <p className="text-red-500">{product.price} $</p>
        </div>
      ))}
    </div>
  );
}
