"uce client";
import React, { useEffect, useState } from "react";
import { Package, TrendingUp, Users, ShoppingCart } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

const stats = [
  { title: "Total Sales", value: "$12,430", icon: TrendingUp },
  { title: "Orders", value: "320", icon: ShoppingCart },
  { title: "Products", value: "45", icon: Package },
  { title: "Customers", value: "210", icon: Users },
];

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 120,
    sold: 80,
    clicks: 340,
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 90,
    sold: 60,
    clicks: 290,
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: 45,
    sold: 40,
    clicks: 180,
  },
];

export default function DashboardComponent() {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // 2s delay
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-linear-to-br from-black via-zinc-900 to-black text-white">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          <p className="text-white mt-4">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <div className="bg-indigo-600 px-4 py-2 rounded-xl shadow-lg">
          {(user && `Welcome, ${user.email}`) || "Welcome!"}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white/10 p-6 rounded-2xl backdrop-blur-xl border border-white/10 shadow-xl hover:scale-105 transition"
          >
            <stat.icon className="mb-4 text-indigo-400" size={28} />
            <p className="text-gray-400">{stat.title}</p>
            <h2 className="text-2xl font-bold mt-2">{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* Top Products Section */}
      <div className="bg-white/5 rounded-2xl p-6 border border-white/10 shadow-lg">
        <h2 className="text-xl font-semibold mb-6">Top Selling Products</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 border-b border-white/10">
                <th className="pb-3">Product</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Sold</th>
                <th className="pb-3">Clicks</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="py-4">{product.name}</td>
                  <td>${product.price}</td>
                  <td className="text-green-400 font-semibold">
                    {product.sold}
                  </td>
                  <td className="text-indigo-400">{product.clicks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
