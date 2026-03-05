"use client";
import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Products from "./Components/Products";
import { BrowserRouter } from "react-router-dom";

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);

  // const [loading, setLoading] = useState(true);
  // // const [cartCount, setCartCount] = useState(0);

  // useEffect(() => {
  //   const timer = setTimeout(() => setLoading(false), 1000); // 2s delay
  //   return () => clearTimeout(timer);
  // }, []);

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen bg-gray-900">
  //       <div className="flex flex-col items-center">
  //         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
  //         <p className="text-white mt-4">Loading App...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div>
      <BrowserRouter>
        <Navbar cartOpen={cartOpen} setCartOpen={setCartOpen} />
        <Products setCartOpen={setCartOpen} />
      </BrowserRouter>
    </div>
  );
}
