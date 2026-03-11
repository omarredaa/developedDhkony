"use client";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Products from "../Products";
import { BrowserRouter } from "react-router-dom";
import { useRouter } from "next/navigation";

export default function Home() {
  return (
    <div className="flex justify-center items-center w-full">
      <BrowserRouter>
        <Products
        // setCartOpen={setCartOpen}
        />
      </BrowserRouter>
    </div>
  );
}
