"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ShoppingCart,
  Search,
  User,
  Menu,
  X,
  LayoutDashboard,
} from "lucide-react";
import CartProducts from "./CartProducts";
import { useCart } from "../context/CartContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const {
    cartCount,
    totalPrice,
    menuOpen,
    setMenuOpen,
    cartOpen,
    setCartOpen,
  } = useCart();
  // منع اسكرول الصفحة عند فتح الكارت
  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [cartOpen]);

  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  // useEffect(() => {
  //   console.log("Cart count updated:", cartCount);
  // }, [cartCount]);

  return (
    <>
      <nav className="fixed w-full top-0 z-50 backdrop-blur-xl bg-[#d5bdad] border-b border-white/10 text-mist-800 h-24 text-sm rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 mt-3.5 font-bold">
            <button
              onClick={() => setCartOpen(true)}
              className="relative cursor-pointer"
            >
              <ShoppingCart size={30} className=" transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-mist-800 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-lg shadow-indigo-600/40">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="hidden md:flex justify-between items-center">
              {user?.role === "Admin" && (
                <div className="relative">
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex justify-center items-center gap-2 cursor-pointer"
                  >
                    <User size={16} color="#000000" strokeWidth={2.75} />
                    Admin : {user ? user.email : "تسجيل الدخول"}
                  </div>

                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border">
                      {user ? (
                        <button
                          onClick={logout}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Sign Out
                        </button>
                      ) : (
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                          Login
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* <LanguageSwitcher /> */}
              <Link
                href="/dashboard"
                className="flex items-center gap-2  transition"
              >
                لوحة التحكم
                <LayoutDashboard size={22} className=" transition" />
              </Link>
              <div className="hidden md:flex flex-row-reverse items-center backdrop-blur-md border border-black rounded-full px-4 py-2 w-1/3">
                <Search size={18} className="text-black" />
                <input
                  type="text"
                  placeholder="ابحث عن منتجات..."
                  className="bg-transparent outline-none px-2 w-full text-sm placeholder-black text-right"
                />
              </div>
            </div>
            {/* Desktop Right Section */}
            <div className="flex items-center gap-6">
              {/* Cart Button */}

              <Link href="/" className="text-2xl font-bold  tracking-wide">
                <img src="/logo.png" alt="Logo" className="h-32 w-auto " />
              </Link>
            </div>
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-black cursor-pointer font-bold"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden pb-4 space-y-4 bg-[#d3c5bb] rounded-3xl mt-4 p-5">
              <div className="flex items-center  border-4 border-[#5c4a3e] rounded-full px-4 py-2">
                <Search size={18} className="text-black" />

                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent outline-none px-2 w-full text-sm text-black placeholder-gray-400"
                />
              </div>

              <Link
                href="/login"
                className="block text-black hover:text-zinc-900 hover:font-bold transition"
              >
                تسجيل الدخول
              </Link>

              <button
                onClick={() => setCartOpen(true)}
                className="block cursor-pointer text-black hover:text-zinc-900 hover:font-bold transition"
              >
                السلة ({cartCount})
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Overlay */}
      <div
        onClick={() => setCartOpen(false)}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          cartOpen ? "opacity-100 visible" : "opacity-0 invisible "
        } `}
      />

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[300px] md:w-[400px] bg-white backdrop-blur-2xl border-r border-white/20 shadow-2xl z-50 transform transition-transform duration-300 rounded-3xl ${
          cartOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-center items-center p-6 border-b border-white/10 bg-[#2e2727] h-28 rounded-e-3xl">
          <h2 className="text-white text-xl font-semibold tracking-wide text-center flex justify-center items-center mt-10 font-sans">
            سلة المشتريات
          </h2>
          {/* <button onClick={() => setCartOpen(false)}>
            <X className="text-gray-300 hover:text-white transition cursor-pointer" />
          </button> */}
        </div>

        {/* Cart Items */}
        <div className="p-6 space-y-4 overflow-y-auto h-[calc(100%-180px)]">
          {cartCount === 0 ? (
            <p className="text-black font-bold text-center mt-48 text-2xl">
              🛒 سلة المشتريات فارغة
            </p>
          ) : (
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition">
              <CartProducts />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
