"use client";
import { useAuth } from "@/app/context/AuthContext";
import {
  Product,
  ProductsContextType,
  useProducts,
} from "@/app/context/ProductsContext";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import Svg from "../Svg";

export default function ProductEditing({
  setOpenedSection,
  setProductEditing,
}: {
  setOpenedSection: (section: string) => void;
  setProductEditing: (product: Product | null) => void;
}) {
  const { products, setProducts, loading } = useProducts();
  const { user } = useAuth();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  // console.log("Products in ProductEditing:", products);

  async function handleDelete(id: number) {
    console.log("id from Editing", id);
    console.log("token from Editing", user?.token);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This product will be deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;
    try {
      const res = await fetch(`https://localhost:7142/api/Products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (!res.ok) {
        toast.error("Something went wrong ❌");
        throw new Error("Delete failed");
      }

      // Remove product from local context/state if available
      setProducts((prev) => prev.filter((product) => product.id !== id));

      toast.success("Product Deleted successfully 🎉");
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-linear-to-br from-black via-zinc-900 to-black text-white">
        <ToastContainer />
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          <p className="text-white mt-4">Loading Products...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center gap-10 flex-wrap mt-14 w-full">
      {products.map((product) => (
        <div
          key={product.id}
          dir="rtl"
          className="group bg-whiterounded-3xl shadow-lg overflow-hidden flex flex-col 
                transition-all duration-300 w-72 rounded-3xl "
        >
          {/* Image Section */}
          <div className="relative h-80 w-full overflow-hidden">
            <img
              src={`https://localhost:7142${product.images[0]}`}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500  rounded-bl-3xl cursor-pointer group-hover:scale-105"
            />

            {/* Auto Discount Badge */}

            <div className="absolute bottom-4 left-4 bg-[#ff6b6b] text-white text-sm font-semibold px-3 py-1 rounded-md shadow">
              %50
            </div>
          </div>

          {/* Product Info */}
          <div className="text-center flex flex-col grow justify-between">
            <div className="p-6">
              <h2 className="text-lg font-semibold tracking-wide text-white">
                {product.name}
              </h2>

              {/* ⭐ Dynamic Stars */}
              <div className="flex justify-center mt-2 text-yellow-400 text-lg">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={index} className="text-2xl">
                    ★
                  </span>
                ))}
              </div>

              {/* Price Section */}
              <div className="mt-3 flex justify-center items-center gap-3">
                <span className="text-gray-400 line-through text-sm">
                  {product.oldPrice} <Svg />
                </span>

                <span className="text-red-500 font-bold text-lg">
                  {product.price} <Svg />
                </span>
              </div>
            </div>
          </div>
          <div className="mt-5 flex justify-center gap-3 flex-wrap">
            <button
              onClick={() => {
                setOpenedSection("EditingSpecificProduct");
                setProductEditing(product);
                localStorage.setItem("editingProduct", JSON.stringify(product));
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
            >
              Update
            </button>

            <button
              onClick={() => handleDelete(product.id)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
