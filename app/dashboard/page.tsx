"use client";

import { LayoutDashboard, Package, BarChart3, CirclePlus } from "lucide-react";
import { useState } from "react";
import DashboardComponent from "../Components/dashboardComponents/DashboardComponent";
import ProductEditing from "../Components/dashboardComponents/ProductEditing";
import AnalysticComponent from "../Components/dashboardComponents/AnalysticComponent";
import EditingSpecificProduct from "../Components/dashboardComponents/EditingSpecificProduct";
import AddProduct from "../Components/dashboardComponents/AddProduct";

export default function Dashboard() {
  const [openedSection, setOpenedSection] = useState("dashboard");
  return (
    <div className="min-h-screen flex bg-linear-to-br from-black via-zinc-900 to-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 hidden md:block">
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
        <ProductEditing setOpenedSection={setOpenedSection} />
      ) : openedSection === "EditingSpecificProduct" ? (
        <EditingSpecificProduct />
      ) : (
        <AnalysticComponent />
      )}
    </div>
  );
}
