"use client";
import { useParams } from "next/navigation";
import { useProducts } from "@/app/context/ProductsContext";
import Navbar from "@/app/Components/Navbar";
import { EyeIcon, StarIcon } from "lucide-react";
import Svg from "@/app/Components/Svg";
import { FaEye } from "react-icons/fa6";
import { useCart } from "@/app/context/CartContext";
import NotFound from "@/app/Components/NotFound";
import { useEffect, useState } from "react";

export default function ProductDetails() {
  const { products } = useProducts();
  const { setCartOpen, addToCart } = useCart();
  const params = useParams();

  const [numOfUsers, setNumOfUsers] = useState();

  const product = products.find((p) => p.id === Number(params.id));
  // console.log(product);

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    setNumOfUsers(generateRandomNumber(30, 100));
  }, []);

  // Run every 15 minutes
  setInterval(
    () => {
      const number = generateRandomNumber(30, 100);
      setNumOfUsers(number);
    },
    2 * 60 * 1000,
  ); // 15 minutes in milliseconds

  if (!product) return <NotFound />;

  return (
    <div className="flex justify-center items-center bg-[#f9f5f2]">
      <Navbar />

      <div className="mt-32  w-full  rounded-lg p-4 flex justify-evenly items-center md:items-start flex-col md:flex-row  gap-6">
        {/* Product Image */}
        <div className="shrink-0">
          <img
            // src={product.image}
            src={`https://localhost:7142${product.images[0]}`}
            alt={product.name}
            className="rounded-md object-cover w-[360px]"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between items-center  md:w-[40%] p-4 rounded-lg gap-10">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              {product.name}
            </h2>
            {/* Rating */}
            {/* ⭐ Dynamic Stars */}
            <div className="flex justify-center mt-2 text-yellow-400 text-lg">
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index} className="text-2xl">
                  {/* {index < product.rating ? "★" : "☆"} */}★
                </span>
              ))}
            </div>{" "}
            <p className="text-[#4c4645] text-sm">
              بناءً على {product.reviews.length} تقييم
            </p>
            {/* Availability */}
            <p
              className={`mt-1 text-sm font-extrabold  p-5 text-white rounded-xl w-20 h-8 text-center flex justify-center items-center text-nowrap ${
                product.quantity > 0 ? "bg-[#6bc693]" : "bg-red-600"
              }`}
            >
              {product.quantity > 0 ? "متوفر" : "غير متوفر"}
            </p>
            <div className="flex justify-center items-center gap-4 mt-7">
              <p className="text-xl font-bold text-red-600">
                <Svg /> {product.price.toFixed(2)}
              </p>
              <p className="text-sm line-through text-gray-400">
                {/* {product.oldPrice?.toFixed(2)} */}
                <Svg /> <span> 1000.00 </span>
              </p>
            </div>
          </div>

          {/* Price Section */}
          <div className="mt-3 w-full ">
            <div className="flex justify-center items-center gap-2 border border-dashed border-black rounded-xl p-3 text-sm md:text-base h-12">
              <span className="text-black font-medium">
                يشتري هذا المنتج الآن {numOfUsers} شخص
              </span>
              <FaEye className="text-black" />
            </div>
          </div>
          <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl border border-gray-200 p-6 text-right w-full cursor-pointer">
            <h2 className="text-lg font-semibold text-gray-800 mb-2 ">
              أو قسم فاتورتك على 4 دفعات بقيمة
              <p className="">
                <Svg />
                {product.price / 4}
              </p>
            </h2>
            <div className=" flex justify-center items-center gap-2 text-black">
              <span className="underline">تعرف على خياراتك</span>
              <p className="  ">
                بدون رسوم تأخير، متوافقة مع الشريعة الإسلامية
              </p>
            </div>
          </div>

          {/* <h3 className="text-sm text-gray-500">{product.description}</h3> */}

          {/* Installment Option */}

          <div className=" mt-6 flex w-full rounded-2xl overflow-hidden h-16">
            <button
              onClick={() => {
                addToCart(product);
                setCartOpen(true);
              }}
              className="w-full bg-[#2c2320] text-white py-3 font-semibold 
                                transition-all duration-300 
                              hover:bg-black active:scale-95 cursor-pointer"
            >
              أضف للسلة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
