"use client";

import { Package, DollarSign, TrendingUp, Users } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", sales: 1200 },
  { month: "Feb", sales: 1900 },
  { month: "Mar", sales: 3000 },
  { month: "Apr", sales: 5000 },
  { month: "May", sales: 2300 },
  { month: "Jun", sales: 4200 },
];
export default function AnalysticComponent() {
  // You can replace this with API data later
  const stats = [
    {
      title: "Total Products",
      value: "124",
      icon: <Package size={20} />,
      description: "Products in store",
    },
    {
      title: "Revenue",
      value: "$12,450",
      icon: <DollarSign size={20} />,
      description: "This month earnings",
    },
    {
      title: "Visitors",
      value: "3,200",
      icon: <Users size={20} />,
      description: "Store visitors",
    },
    {
      title: "Growth",
      value: "+24%",
      icon: <TrendingUp size={20} />,
      description: "Compared to last month",
    },
  ];

  return (
    <div className="flex-1 p-6 md:p-10 min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black">
      <h1 className="text-3xl font-bold mb-8 tracking-wide">
        Analytics Overview
      </h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10
            hover:scale-105 transition duration-300 cursor-pointer"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-indigo-400">{stat.icon}</span>
              <span className="text-xs opacity-60">{stat.description}</span>
            </div>

            <h2 className="text-2xl font-bold mb-1">{stat.value}</h2>
            <p className="opacity-70 text-sm">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Chart Section Placeholder */}
      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
        <h2 className="text-xl font-semibold mb-6">Performance Statistics</h2>

        <div className="h-64 flex items-center justify-center opacity-60">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="month" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Bar dataKey="sales" fill="#4e54c8" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
