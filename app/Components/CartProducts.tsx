// "use client";
// import React, { useEffect, useState } from "react";
// import { TrashIcon } from "@heroicons/react/24/outline";
// import Image from "next/image";

// type Product = {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   quantity: number;
// };

// type CartItemProps = {
//   cartCount: number;
// };

// export default function CartProducts({ cartCount }: CartItemProps) {
//   const cartLocalStorage = localStorage.getItem("cart");
//   const jsondata = cartLocalStorage ? JSON.parse(cartLocalStorage) : [];

//   const [cartStorage, setCartStorage] = useState<Product[]>([]);

//   // useEffect(() => {
//   //   setCartStorage(jsondata);
//   //   console.log("setcarstorage from car products", cartStorage);
//   // }, [cartCount]);

//   const updateCart = (updatedCart: Product[]) => {
//     setCartStorage(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const changeQuantity = (id: number, amount: number) => {
//     const updated = cartStorage.map((item) =>
//       item.id === id
//         ? { ...item, quantity: Math.max(1, item.quantity + amount) }
//         : item,
//     );
//     updateCart(updated);
//   };

//   const removeItem = (id: number) => {
//     const filtered = cartStorage.filter((item) => item.id !== id);
//     updateCart(filtered);
//   };

//   return (
//     <div>
//       {cartStorage.map((item) => (
//         <div
//           key={item.id}
//           className="flex items-center bg-gray-800 rounded-lg p-4 mb-4 shadow"
//         >
//           <Image
//             src={
//               item.image && item.image.startsWith("/")
//                 ? item.image
//                 : "/adver1.jpg"
//             }
//             alt={item.name}
//             width={100}
//             height={100}
//             className="w-20 h-20 object-cover rounded-md"
//           />

//           <div className="ml-4 flex-1">
//             <h3 className="text-lg font-semibold text-white">{item.name}</h3>
//             <p className="text-gray-400 text-sm">{item.description}</p>
//             <p className="text-green-400 font-bold mt-1">${item.price}</p>

//             <div className="flex items-center mt-2">
//               <button
//                 onClick={() => changeQuantity(item.id, -1)}
//                 className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded"
//               >
//                 –
//               </button>
//               <span className="mx-3 text-white">{item.quantity}</span>
//               <button
//                 onClick={() => changeQuantity(item.id, 1)}
//                 className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded"
//               >
//                 +
//               </button>
//             </div>
//           </div>

//           <button
//             onClick={() => removeItem(item.id)}
//             className="ml-4 text-red-500 hover:text-red-400"
//           >
//             <TrashIcon className="w-6 h-6" />
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }
"use client";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
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
          <Image
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
                className="px-2 bg-gray-700 rounded"
              >
                –
              </button>
              <span className="mx-3">{item.quantity}</span>
              <button
                onClick={() => changeQuantity(item.id, 1)}
                className="px-2 bg-gray-700 rounded"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 transition hover:scale-125"
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
