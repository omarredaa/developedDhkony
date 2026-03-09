// "use client";
// import { useCart } from "@/app/context/CartContext";
// import { TrashIcon } from "@heroicons/react/24/outline";
// import Link from "next/link";
// import { useState } from "react";
// import { FaTruckFast } from "react-icons/fa6";
// import Svg from "./Svg";

// export default function CartProducts() {
//   const { cart, removeFromCart, changeQuantity, totalPrice } = useCart();

//   if (cart.length === 0) {
//     return (
//       <div className="text-center py-20 text-gray-400 text-xl font-cairo">
//         <Link href="/">
//           <button className="mb-5 bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer ">
//             أضف بعض المنتجات 🛒
//           </button>
//         </Link>{" "}
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="h-2 w-full bg-linear-to-r from-[#c0bfbf] via-[#8b8b8b] to-[#000000] rounded-full mb-4"></div>
//       <div className="flex justify-evenly items-center pb-8 gap-24">
//         <p className="text-black text-2xl">
//           <FaTruckFast />
//         </p>
//         <p className="text-gray-700 font-bold">قيمة الشحن مجانية الآن</p>
//       </div>
//       {cart.map((item) => (
//         <div key={item.id}>
//           <div className="flex items-center rounded-lg mb-4  text-center">
//             <button
//               onClick={() => removeFromCart(item.id)}
//               className="text-[#303030] cursor-pointer"
//             >
//               <TrashIcon className="w-5 h-5" />
//             </button>

//             <div className="ml-4 flex-1 px-5 flex flex-col justify-center items-center gap-1">
//               <h3 className="text-black font-semibold">{item.name}</h3>
//               <div className="flex justify-center items-center gap-5">
//                 {" "}
//                 <p className="text-[#e94b4b]">
//                   ${item.price * (item.quantity || 1)}
//                 </p>
//                 <p className="text-[#B0ABA8] line-through text-sm">
//                   ${item.oldPrice}
//                 </p>
//               </div>

//               <div className="flex justify-center items-center mt-2">
//                 <button
//                   onClick={() => changeQuantity(item.id, -1)}
//                   className="px-1 bg-[#b0aba8] text-xl rounded cursor-pointer"
//                 >
//                   –
//                 </button>
//                 <span className="mx-3 text-black">{item.quantity}</span>
//                 <button
//                   onClick={() => changeQuantity(item.id, 1)}
//                   className="px-1 bg-[#b0aba8] text-xl rounded cursor-pointer"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>

//             <img
//               src={`https://localhost:7142${item.images[0]}`}
//               alt={item.name}
//               width={70}
//               className="rounded-md"
//             />
//           </div>
//           <hr className="text-gray-300 mt-7" />
//         </div>
//       ))}
//       <div>
//         <div className="w-full max-w-md mx-auto rounded-xl p-4" dir="rtl">
//           {/* Amount before discount */}
//           {/* <div className="flex justify-between text-gray-700 mb-2">
//             <span className="font-medium">المبلغ قبل الخصم:</span>
//             <span>5000 ر.س</span>
//           </div> */}

//           {/* Total including tax */}
//           <div className="flex justify-between text-gray-900 font-bold pt-2">
//             <span>
//               الإجمالي:{" "}
//               <span className="text-sm font-normal text-gray-600">
//                 شامل الضريبة %15
//               </span>
//             </span>
//             <span>
//               {totalPrice.toFixed(2)} <Svg />
//             </span>
//           </div>
//           <div className="w-full max-w-md mx-auto space-y-4" dir="rtl">
//             <div className="w-full max-w-md mx-auto mt-10" dir="rtl">
//               <div className="flex rounded-lg overflow-hidden border border-dashed border-gray-400 h-16">
//                 {/* Coupon Input */}
//                 <input
//                   type="text"
//                   placeholder="هل لديك كوبون؟"
//                   className="flex-1 px-3 py-2 text-right focus:outline-none text-black placeholder:text-black w-[80%]"
//                 />

//                 {/* Apply Button */}
//                 <button className="bg-[#B0ABA8] text-white px-4 py-2 hover:bg-black transition  w-[40%] font-extrabold cursor-pointer">
//                   تطبيق
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import { useCart } from "@/app/context/CartContext";
import { TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import { FaTruckFast } from "react-icons/fa6";
import Svg from "./Svg";
import { toast, ToastContainer } from "react-toastify";

export default function CartProducts() {
  const { cart, removeFromCart, changeQuantity, totalPrice } = useCart();

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  // const handleApplyCoupon = async () => {
  //   if (!coupon) return toast.error("Please enter a coupon code ❌");

  //   try {
  //     const res = await fetch(
  //       `https://localhost:7142/api/Coupons/validate/${coupon}`,
  //     );
  //     if (!res.ok) {
  //       const text = await res.text();
  //       console.log(text);
  //       toast.error("Invalid coupon ❌");
  //       return;
  //     }

  //     const data = await res.json();
  //     console.log("Coupon data:", data);

  //     // Assuming the API returns something like { code: "1", discount: 20 }
  //     setDiscount(data.discount || 0);
  //     if (data.isValid) {
  //       toast.success(`Coupon applied! Discount: ${data.percentage}% 🎉`);
  //     } else {
  //       toast.error(`Coupon Not Correct !`);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Failed to apply coupon ❌");
  //   }
  // };
  const handleApplyCoupon = async () => {
    if (!coupon) return toast.error("Please enter a coupon code ❌");

    try {
      const res = await fetch(
        `https://localhost:7142/api/Coupons/validate/${coupon}`,
      );
      if (!res.ok) {
        toast.error("Invalid coupon ❌");
        return;
      }

      const data = await res.json();
      console.log("Coupon data:", data);

      if (data.isValid) {
        // Make sure you set the discount to the correct percentage from API
        setDiscount(data.percentage || 0);
        toast.success(`Coupon applied! Discount: ${data.percentage}% 🎉`);
      } else {
        toast.error("Coupon not correct ❌");
        setDiscount(0); // Reset discount
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to apply coupon ❌");
      setDiscount(0);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400 text-xl font-cairo">
        <Link href="/">
          <button className="mb-5 bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer ">
            أضف بعض المنتجات 🛒
          </button>
        </Link>{" "}
      </div>
    );
  }

  const discountedPrice = totalPrice - (totalPrice * discount) / 100;

  return (
    <div>
      <ToastContainer />
      <div className="h-2 w-full bg-linear-to-r from-[#c0bfbf] via-[#8b8b8b] to-[#000000] rounded-full mb-4"></div>
      <div className="flex justify-evenly items-center pb-8 gap-24">
        <p className="text-black text-2xl">
          <FaTruckFast />
        </p>
        <p className="text-gray-700 font-bold">قيمة الشحن مجانية الآن</p>
      </div>

      {cart.map((item) => (
        <div key={item.id}>
          <div className="flex items-center rounded-lg mb-4  text-center">
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-[#303030] cursor-pointer"
            >
              <TrashIcon className="w-5 h-5" />
            </button>

            <div className="ml-4 flex-1 px-5 flex flex-col justify-center items-center gap-1">
              <h3 className="text-black font-semibold">{item.name}</h3>
              <div className="flex justify-center items-center gap-5">
                <p className="text-[#e94b4b]">
                  ${(item.price * (item.quantity || 1)).toFixed(2)}
                </p>
                <p className="text-[#B0ABA8] line-through text-sm">
                  ${item.oldPrice}
                </p>
              </div>

              <div className="flex justify-center items-center mt-2">
                <button
                  onClick={() => changeQuantity(item.id, -1)}
                  className="px-1 bg-[#b0aba8] text-xl rounded cursor-pointer"
                >
                  –
                </button>
                <span className="mx-3 text-black">{item.quantity}</span>
                <button
                  onClick={() => changeQuantity(item.id, 1)}
                  className="px-1 bg-[#b0aba8] text-xl rounded cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <img
              src={`https://localhost:7142${item.images[0]}`}
              alt={item.name}
              width={70}
              className="rounded-md"
            />
          </div>
          <hr className="text-gray-300 mt-7" />
        </div>
      ))}

      <div className="w-full max-w-md mx-auto rounded-xl p-4" dir="rtl">
        <div className="flex flex-col justify-between items-center bg-gray-100 p-6 rounded-xl shadow-md gap-4">
          {/* Total Price */}
          <div className="flex justify-center items-center gap-4 text-nowrap text-gray-900">
            <span className="text-lg font-semibold flex">
              الإجمالي{" "}
              <span className="text-sm font-normal text-gray-500">
                شامل الضريبة %15
              </span>
            </span>
            <div className="flex items-center gap-2 mt-1 text-xl font-bold text-black">
              {totalPrice.toFixed(2)} <Svg />
            </div>
          </div>

          {/* Discounted Price */}
          {discount > 0 && (
            <div className="flex items-center md:items-end text-black">
              <span className="text-base font-semibold text-nowrap">
                السعر بعد الخصم:
              </span>
              <div className="flex items-center gap-2 mt-1 text-2xl font-bold">
                {(totalPrice - (totalPrice * discount) / 100).toFixed(2)}
                <Svg />
                {discount > 0 && (
                  <span className="text-green-500 text-lg font-semibold">
                    (-{discount}%)
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="w-full max-w-md mx-auto space-y-4 mt-6" dir="rtl">
          <div className="flex rounded-lg overflow-hidden border border-dashed border-gray-400 h-16">
            <input
              type="text"
              placeholder="هل لديك كوبون؟"
              className="flex-1 px-3 py-2 text-right focus:outline-none text-black placeholder:text-black w-[80%]"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button
              onClick={handleApplyCoupon}
              className="bg-[#B0ABA8] text-white px-4 py-2 hover:bg-black transition w-[40%] font-extrabold cursor-pointer"
            >
              تطبيق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
