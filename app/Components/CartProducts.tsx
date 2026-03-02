"use client";
import { useCart } from "@/app/context/CartContext";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Truck } from "lucide-react";

export default function CartProducts() {
  const { cart, removeFromCart, changeQuantity, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400 text-xl font-cairo">
        🛒 سلة المشتريات فارغة
      </div>
    );
  }

  return (
    <div>
      <div className="h-2 w-full bg-linear-to-r from-[#c0bfbf] via-[#8b8b8b] to-[#000000] rounded-full mb-4"></div>
      <div className="flex justify-evenly items-center pb-8 gap-24">
        <Truck size={20} color="#000000" strokeWidth={2.5} />
        <p className="text-gray-700 font-bold">قيمة الشحن مجانية الآن</p>
      </div>
      {cart.map((item) => (
        <div
          key={item.id}
          className="flex items-center rounded-lg p-4 mb-4 shadow transition-all duration-300 hover:scale-[1.02]"
        >
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 transition hover:scale-125 cursor-pointer"
          >
            <TrashIcon className="w-6 h-6" />
          </button>

          <div className="ml-4 flex-1">
            <h3 className="text-white font-semibold">{item.name}</h3>
            <p className="text-green-400">
              ${item.price * (item.quantity || 1)}
            </p>

            <div className="flex items-center mt-2">
              <button
                onClick={() => changeQuantity(item.id, -1)}
                className="px-2 bg-gray-700 rounded cursor-pointer"
              >
                –
              </button>
              <span className="mx-3">{item.quantity}</span>
              <button
                onClick={() => changeQuantity(item.id, 1)}
                className="px-2 bg-gray-700 rounded cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          <img
            src={item.image}
            alt={item.name}
            width={100}
            height={100}
            className="rounded-md"
          />
        </div>
      ))}
      <div className="text-right text-2xl font-bold text-green-400 mt-6">
        Total: ${totalPrice}
      </div>
    </div>
  );
}
