"use client";
import { useEffect, useState } from "react";
import { FaEye, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import SelectedProducts from "./SelectedProducts";
import Link from "next/link";
import { useProducts } from "../context/ProductsContext";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  oldPrice: number;
  discount: number;
  rating: number;
  averageRating: number;
  images?: string[]; // Optional array for multiple images
};
const oldPrice = 1000; // Example old price for discount calculation
export default function Products() {
  const { products, loading } = useProducts();
  // const [loading, setLoading] = useState(true);
  const { addToCart, setCartOpen } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  // let navigate = useNavigate();
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedProduct]);

  return (
    <div>
      {loading && (
        <div className="flex flex-wrap gap-8 justify-center">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="w-72 h-[420px] bg-white rounded-3xl shadow animate-pulse"
            >
              <div className="h-80 bg-gray-200 rounded-t-3xl"></div>
              <div className="p-6 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="min-h-screen bg-[#f9f5f2] text-black px-6 py-12 mt-16">
        {products.length ? (
          <>
            <h1 className="text-3xl font-bold  text-center mb-10">منتجاتنا</h1>
            <div className="flex justify-center items-center flex-wrap gap-8 ">
              {products.map((product) => {
                // ⭐ Auto Discount Calculation
                const discount = oldPrice
                  ? Math.round(((oldPrice - product.price) / oldPrice) * 100)
                  : 0;
                return (
                  <div
                    key={product.id}
                    dir="rtl"
                    className="group bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col
                transition-all duration-300 w-72 rounded-3xl "
                  >
                    {/* Image Section */}
                    <div className="relative h-80 w-full overflow-hidden">
                      <Link href={`/selectedProductDetailsPage/${product.id}`}>
                        <img
                          src={`https://localhost:7142${product.images[0]}`}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500  rounded-bl-3xl cursor-pointer group-hover:scale-105"
                        />
                      </Link>

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
                              {index < product.averageRating ? "★" : "☆"}
                            </span>
                          ))}
                        </div>

                        {/* Price Section */}
                        <div className="mt-3 flex justify-center items-center gap-3">
                          {product?.oldPrice ? (
                            <span className="text-gray-400 line-through text-sm">
                              {product?.oldPrice} ج.م
                            </span>
                          ) : (
                            <span className="text-gray-400 line-through text-sm">
                              1000 ج.م
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
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6 mt-12">
            {/* Illustration */}
            <div className="relative mb-8 animate-bounce-slow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-40 h-40 text-[#c9b7a8]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h11L17 13"
                />
                <circle cx="9" cy="21" r="1.5" />
                <circle cx="18" cy="21" r="1.5" />
              </svg>

              {/* floating dots animation */}
              <span className="absolute -top-2 -left-2 w-3 h-3 bg-[#2c2320] rounded-full animate-ping"></span>
              <span className="absolute top-6 -right-4 w-2 h-2 bg-[#c9b7a8] rounded-full animate-pulse"></span>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-[#2c2320] mb-3">
              لا توجد منتجات حالياً
            </h2>

            {/* Description */}
            <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
              يبدو أن المتجر فارغ الآن. سيتم إضافة منتجات جديدة قريباً. يمكنك
              العودة لاحقاً أو تصفح الأقسام الأخرى.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
