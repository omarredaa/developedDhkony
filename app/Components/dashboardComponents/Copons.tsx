"use client";

import { useAuth } from "@/app/context/AuthContext";
import React, { useEffect, useState } from "react";
import { FaTicketAlt, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

type Coupon = {
  id: number;
  code: string;
  discountPercentage: number;
};

export default function Copons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const { user } = useAuth();

  /* ================= Fetch Coupons ================= */

  const fetchCoupons = async () => {
    try {
      const res = await fetch("https://localhost:7142/api/Coupons", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (!res.ok) return;

      const text = await res.text();

      if (!text) {
        setCoupons([]);
        return;
      }

      const data = JSON.parse(text);
      setCoupons(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  /* ================= Add Coupon ================= */

  const addCoupon = async () => {
    if (!code || !discount) {
      toast.error("Please enter coupon code and discount");
      return;
    }

    const discountNumber = Number(discount);

    if (discountNumber < 0 || discountNumber > 100) {
      toast.error("Discount must be between 0 and 100%");
      return;
    }

    try {
      const res = await fetch("https://localhost:7142/api/Coupons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          code,
          discountPercentage: discountNumber,
          isActive: true,
        }),
      });

      if (!res.ok) {
        toast.error("Something went wrong ❌");
        return;
      }

      toast.success("Coupon added successfully 🎉");

      setCode("");
      setDiscount("");

      fetchCoupons();
    } catch {
      toast.error("Server connection failed");
    }
  };

  /* ================= Delete Coupon ================= */

  const deleteCoupon = async (id: number) => {
    await fetch(`https://localhost:7142/api/Coupons/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    toast.success("Coupon deleted successfully");
    fetchCoupons();
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto text-white mt-10">
      <ToastContainer />

      {/* Title */}
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <FaTicketAlt className="text-yellow-400" />
        Coupon Management
      </h2>

      {/* Add Coupon Card */}
      <div className="bg-gray-900 rounded-2xl shadow-lg p-6 mb-10 border border-gray-800">
        <p className="font-semibold mb-4 text-lg">Add New Coupon</p>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Coupon Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-yellow-400 outline-none"
          />

          <input
            type="number"
            placeholder="Discount %"
            min={0}
            max={100}
            value={discount}
            onChange={(e) => {
              const value = e.target.value;
              if (Number(value) <= 100) {
                setDiscount(value);
              }
            }}
            className="md:w-40 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-yellow-400 outline-none"
          />

          <button
            onClick={addCoupon}
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg transition cursor-pointer"
          >
            Add Coupon
          </button>
        </div>
      </div>

      {/* Coupons List */}
      <div className="bg-gray-900 rounded-2xl shadow-lg border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm md:text-base">
            <thead className="bg-gray-800 text-gray-300">
              <tr>
                <th className="p-4 text-left">Code</th>
                <th className="p-4 text-left">Discount</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {coupons.map((coupon) => (
                <tr
                  key={coupon.id}
                  className="border-t border-gray-800 hover:bg-gray-800 transition"
                >
                  <td className="p-4 font-semibold">{coupon.code}</td>

                  <td className="p-4 text-green-400 font-bold">
                    {coupon.discountPercentage}%
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => deleteCoupon(coupon.id)}
                      className="text-red-500 hover:text-red-400 text-lg cursor-pointer"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}

              {coupons.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center p-8 text-gray-400">
                    No coupons found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
