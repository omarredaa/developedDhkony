"use client";
import { useCart } from "@/app/context/CartContext";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function CartProducts() {
  const { cart, removeFromCart, changeQuantity, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400 text-xl">
        🛒 Your cart is empty
      </div>
    );
  }

  return (
    <div>
      {cart.map((item) => (
        <div
          key={item.id}
          className="flex items-center bg-gray-800 rounded-lg p-4 mb-4 shadow transition-all duration-300 hover:scale-[1.02]"
        >
          <img
            src={item.image}
            alt={item.name}
            width={100}
            height={100}
            className="rounded-md"
          />

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

          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 transition hover:scale-125 cursor-pointer"
          >
            <TrashIcon className="w-6 h-6" />
          </button>
        </div>
      ))}

      <div className="text-right text-2xl font-bold text-green-400 mt-6">
        Total: ${totalPrice}
      </div>
    </div>
  );
}
