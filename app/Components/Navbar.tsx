"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, Search, User, Menu, X } from "lucide-react";
import CartProducts from "./CartProducts";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cartCount } = useCart();

  // منع اسكرول الصفحة عند فتح الكارت
  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [cartOpen]);

  return (
    <>
      <nav className="fixed w-full top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-bold text-white tracking-wide"
            >
              DarkShop
            </Link>

            {/* Desktop Search */}
            <div className="hidden md:flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 w-1/3">
              <Search size={18} className="text-gray-300" />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent outline-none px-2 w-full text-sm text-white placeholder-gray-400"
              />
            </div>

            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/login"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition"
              >
                <User size={18} />
                Login
              </Link>

              {/* Cart Button */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative cursor-pointer"
              >
                <ShoppingCart
                  size={22}
                  className="text-gray-300 hover:text-white transition"
                />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-lg shadow-indigo-600/40">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden pb-4 space-y-4">
              <div className="flex items-center bg-white/10 border border-white/20 rounded-full px-4 py-2">
                <Search size={18} className="text-gray-300" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent outline-none px-2 w-full text-sm text-white placeholder-gray-400"
                />
              </div>

              <Link
                href="/login"
                className="block text-gray-300 hover:text-white"
              >
                Login
              </Link>

              <button
                onClick={() => setCartOpen(true)}
                className="block text-gray-300 hover:text-white curpo"
              >
                Cart ({cartCount})
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Overlay */}
      <div
        onClick={() => setCartOpen(false)}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          cartOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white/10 backdrop-blur-2xl border-l border-white/20 shadow-2xl z-50 transform transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <h2 className="text-white text-xl font-semibold tracking-wide">
            Your Cart
          </h2>
          <button onClick={() => setCartOpen(false)}>
            <X className="text-gray-300 hover:text-white transition cursor-pointer" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-6 space-y-4 overflow-y-auto h-[calc(100%-180px)]">
          {cartCount === 0 ? (
            <p className="text-gray-400 text-center mt-10">
              Your cart is empty 🛒
            </p>
          ) : (
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition">
              <CartProducts cartCount={cartCount} />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 w-full p-6 border-t border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="flex justify-between text-gray-300 mb-4">
            <span>Total</span>
            <span>$99</span>
          </div>

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 transition py-3 rounded-2xl text-white font-semibold shadow-lg shadow-indigo-600/40">
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}
