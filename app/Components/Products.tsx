"use client";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "Noise-cancelling over-ear headphones.",
    price: 120,
    image: "adver1.jpg",
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Track fitness, heart rate, and notifications.",
    price: 90,
    image: "adver2.jpg",
  },
  {
    id: 3,
    name: "Gaming Mouse",
    description: "High precision with RGB lighting.",
    price: 45,
    image: "adver3.jpg",
  },
  {
    id: 4,
    name: "Gaming Mouse",
    description: "High precision with RGB lighting.",
    price: 45,
    image: "adver4.jpg",
  },
  {
    id: 5,
    name: "Gaming Mouse",
    description: "High precision with RGB lighting.",
    price: 45,
    image: "adver5.jpg",
  },
  {
    id: 6,
    name: "Gaming Mouse",
    description: "High precision with RGB lighting.",
    price: 45,
    image: "adver6.jpg",
  },
  {
    id: 7,
    name: "Gaming Mouse",
    description: "High precision with RGB lighting.",
    price: 45,
    image: "adver7.jpg",
  },
];
type HomeProps = {
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  cartCount: number;
};

export default function Products({ setCartCount, cartCount }: HomeProps) {
  // const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<Product[]>([]);
  const { addToCart } = useCart();

  return (
    <div>
      <div className="min-h-screen bg-white text-black px-6 py-12 mt-16">
        <h1 className="text-3xl font-bold  text-center mb-10">Our Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl overflow-hidden flex flex-col"
            >
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />

              {/* Product Info */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h2 className="text-xl font-semibold ">{product.name}</h2>
                  <p className="text-gray-300 text-sm mt-2">
                    {product.description}
                  </p>
                  <p className="text-indigo-400 font-bold mt-4">
                    ${product.price}
                  </p>
                </div>

                <div className="flex justify-center items-center gap-5">
                  {" "}
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-6 w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition  font-semibold shadow-lg shadow-indigo-600/30 cursor-pointer flex items-center justify-center gap-2"
                  >
                    Add to Cart <FaShoppingCart />
                  </button>
                  {/* <button
                    onClick={() => addToCart(product)}
                    className="mt-6 w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition text-white font-semibold shadow-lg shadow-indigo-600/30 cursor-pointer"
                  >
                    Show Details
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
