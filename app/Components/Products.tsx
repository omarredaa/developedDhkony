"use client";
import { useEffect, useState } from "react";
import { FaEye, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { Eye } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectedProducts from "./SelectedProducts";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  oldPrice: number;
  discount: number;
  rating: number;
  images?: string[]; // Optional array for multiple images
};

const products: Product[] = [
  {
    id: 1,
    name: "اقوي عرض 2",
    description: "Noise-cancelling over-ear headphones.",
    price: 495.0,
    oldPrice: 1238.0,
    discount: 1238.0,
    image: "p1.jpg",
    images: ["p1.jpg", "adver1.jpg", "adver2.jpg"],
    rating: 2,
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Track fitness, heart rate, and notifications.",
    price: 90,
    image: "adver2.jpg",
    oldPrice: 0,
    discount: 0,
    rating: 4,
  },
  {
    id: 3,
    name: "Gaming Mouse",
    description: "High precision with RGB lighting.",
    price: 45,
    image: "adver3.jpg",
    oldPrice: 200,
    discount: 411,
    rating: 4,
  },
  {
    id: 4,
    name: "Gaming Mouse",
    description: "High precision with RGB lighting.",
    price: 45,
    image: "adver4.jpg",
    oldPrice: 0,
    discount: 0,
    rating: 4,
  },
  {
    id: 5,
    name: "Gaming Mouse",
    description: "High precision with RGB lighting.",
    price: 45,
    image: "adver5.jpg",
    oldPrice: 0,
    discount: 0,
    rating: 4,
  },
  {
    id: 6,
    name: "Gaming Mouse",
    description: "High precision with RGB lighting.",
    price: 45,
    image: "adver6.jpg",
    oldPrice: 0,
    discount: 0,
    rating: 4,
  },
  {
    id: 7,
    name: "Gaming Mouse",
    description: "High precision with RGB lighting.",
    price: 45,
    image: "adver7.jpg",
    oldPrice: 0,
    discount: 0,
    rating: 4,
  },
];
type HomeProps = {
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  cartCount: number;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Products({ setCartOpen }: HomeProps) {
  // const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedProduct]);

  return (
    <div>
      <div className="min-h-screen bg-[#f9f5f2] text-black px-6 py-12 mt-16">
        <h1 className="text-3xl font-bold  text-center mb-10">منتجاتنا</h1>

        <div className="flex justify-center items-center flex-wrap gap-8">
          {products.map((product) => {
            // ⭐ Auto Discount Calculation
            const discount = product.oldPrice
              ? Math.round(
                  ((product.oldPrice - product.price) / product.oldPrice) * 100,
                )
              : 0;

            return (
              <div
                key={product.id}
                dir="rtl"
                className="group bg-whiterounded-3xl shadow-lg overflow-hidden flex flex-col 
                transition-all duration-300 w-72 rounded-3xl "
              >
                {/* Image Section */}
                <div className="relative h-80 w-full overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500  rounded-bl-3xl cursor-pointer group-hover:scale-105"
                  />

                  {/* Auto Discount Badge */}
                  {discount > 0 && (
                    <div className="absolute bottom-4 left-4 bg-[#ff6b6b] text-white text-sm font-semibold px-3 py-1 rounded-md shadow">
                      %{discount}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="text-center flex flex-col grow justify-between">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold tracking-wide text-gray-800">
                      {product.name}
                    </h2>

                    {/* ⭐ Dynamic Stars */}
                    <div className="flex justify-center mt-2 text-yellow-400 text-lg">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <span key={index} className="text-2xl">
                          {index < product.rating ? "★" : "☆"}
                        </span>
                      ))}
                    </div>

                    {/* Price Section */}
                    <div className="mt-3 flex justify-center items-center gap-3">
                      {product.oldPrice && (
                        <span className="text-gray-400 line-through text-sm">
                          {product.oldPrice} ج.م
                        </span>
                      )}
                      <span className="text-red-500 font-bold text-lg">
                        {product.price} ج.م
                      </span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="relative mt-6 flex w-full rounded-2xl overflow-hidden h-16">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="w-[30%] bg-[#c9b7a8] flex items-center justify-center 
                      transition-all duration-300 
                      hover:bg-[#bba493] hover:scale-105 active:scale-90 cursor-pointer text-3xl text-[#2c2320]"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => {
                        addToCart(product);
                        setCartOpen(true);
                      }}
                      className="w-[70%] bg-[#2c2320] text-white py-3 font-semibold 
                      transition-all duration-300 
                    hover:bg-black active:scale-95 cursor-pointer"
                    >
                      أضف للسلة
                    </button>
                  </div>
                </div>
                {selectedProduct && (
                  <SelectedProducts
                    selectedProduct={selectedProduct}
                    setSelectedProduct={setSelectedProduct}
                    setCartOpen={setCartOpen}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
