"use client";

import {
  LayoutDashboard,
  Package,
  BarChart3,
  CirclePlus,
  FilePenLine,
} from "lucide-react";
import { useEffect, useState } from "react";
import DashboardComponent from "../Components/dashboardComponents/DashboardComponent";
import ProductEditing from "../Components/dashboardComponents/ProductEditing";
import AnalysticComponent from "../Components/dashboardComponents/AnalysticComponent";
import EditingSpecificProduct from "../Components/dashboardComponents/EditingSpecificProduct";
import AddProduct from "../Components/dashboardComponents/AddProduct";
import { set } from "zod";

export default function Dashboard() {
  const [openedSection, setOpenedSection] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productEditing, setProductEditing] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const storedProduct = localStorage.getItem("productEditing");
    if (storedProduct) {
      setProductEditing(JSON.parse(storedProduct));
    }
  }, []);

  // Save to localStorage whenever productEditing changes
  useEffect(() => {
    if (productEditing !== null) {
      localStorage.setItem("productEditing", JSON.stringify(productEditing));
    }
  }, [productEditing]);

  // useEffect(() => {
  //   setProductEditing(JSON.parse(localStorage.getItem("productEditing")));
  // }, [productEditing]);
  return (
    <div className="min-h-screen flex bg-linear-to-br from-black via-zinc-900 to-black text-white">
      <div className="md:hidden p-4">
        <button onClick={() => setMobileMenuOpen(true)} className="text-white">
          ☰
        </button>
      </div>
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black/90 backdrop-blur-xl p-6 z-50 transform transition-transform duration-300 md:hidden
  ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="mb-6 text-white text-xl"
        >
          ✕
        </button>

        <nav className="space-y-4 text-white">
          <a
            className="flex items-center gap-3 cursor-pointer hover:text-indigo-400"
            onClick={() => {
              setOpenedSection("dashboard");
              setMobileMenuOpen(false);
            }}
          >
            <LayoutDashboard size={18} /> Dashboard
          </a>

          <a
            className="flex items-center gap-3 cursor-pointer hover:text-indigo-400"
            onClick={() => {
              setOpenedSection("addproduct");
              setMobileMenuOpen(false);
            }}
          >
            <CirclePlus /> Add product
          </a>

          <a
            className="flex items-center gap-3 cursor-pointer hover:text-indigo-400"
            onClick={() => {
              setOpenedSection("products");
              setMobileMenuOpen(false);
            }}
          >
            <Package size={18} /> Products
          </a>
        </nav>
      </div>
      {/* Sidebar */}
      <aside className="w-64 h-lvh bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 hidden md:block sticky top-0 z-10">
        <h2 className="text-2xl font-bold mb-10 flex items-center gap-2">
          <LayoutDashboard /> Admin
        </h2>

        <nav className="space-y-4">
          <a
            className={`flex items-center gap-3  hover:text-indigo-400 transition cursor-pointer ${openedSection === "dashboard" ? "text-indigo-400" : ""}`}
            onClick={() => setOpenedSection("dashboard")}
          >
            <LayoutDashboard size={18} /> Dashboard
          </a>
          <a
            className={`flex items-center gap-3 hover:text-indigo-400 transition cursor-pointer ${openedSection === "addproduct" ? "text-indigo-400" : ""}`}
            onClick={() => setOpenedSection("addproduct")}
          >
            <CirclePlus /> Add product
          </a>
          <a
            className={`flex items-center gap-3 hover:text-indigo-400 transition cursor-pointer ${openedSection === "products" ? "text-indigo-400" : ""}`}
            onClick={() => setOpenedSection("products")}
          >
            <Package size={18} /> Products
          </a>
          <a
            className={`flex items-center gap-3 hover:text-indigo-400 transition cursor-pointer ${openedSection === "EditingSpecificProduct" ? "text-indigo-400" : ""}`}
            onClick={() => setOpenedSection("EditingSpecificProduct")}
          >
            <FilePenLine /> Edit a Product
          </a>
          <a
            className={`flex items-center gap-3 hover:text-indigo-400 transition cursor-pointer ${openedSection === "analytics" ? "text-indigo-400" : ""}`}
            onClick={() => setOpenedSection("analytics")}
          >
            <BarChart3 size={18} /> Analytics
          </a>
        </nav>
      </aside>
      {openedSection === "dashboard" ? (
        <DashboardComponent />
      ) : openedSection === "addproduct" ? (
        <AddProduct />
      ) : openedSection === "products" ? (
        <ProductEditing
          setProductEditing={setProductEditing}
          setOpenedSection={setOpenedSection}
        />
      ) : openedSection === "EditingSpecificProduct" ? (
        <EditingSpecificProduct productEditing={productEditing} />
      ) : (
        <AnalysticComponent />
      )}
    </div>
  );
}
