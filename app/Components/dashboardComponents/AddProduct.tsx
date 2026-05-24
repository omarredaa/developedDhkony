"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { useProducts } from "@/app/context/ProductsContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddProduct({ setOpenedSection }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const { setProducts } = useProducts();
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const handleImages = (files: FileList) => {
    const fileArray = Array.from(files);

    setImages((prev) => [...prev, ...fileArray]);

    const previews = fileArray.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...previews]);
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newPreview = [...previewImages];

    newImages.splice(index, 1);
    newPreview.splice(index, 1);

    setImages(newImages);
    setPreviewImages(newPreview);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("oldPrice", oldPrice);
      formData.append("quantity", quantity);

      images.forEach((img) => {
        formData.append("Images", img);
      });
      const res = await fetch("https://localhost:7142/api/Products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        body: formData,
      });
      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const newProduct = await res.json();

      // setProducts((prev) => [...prev, newProduct]);
      // update UI with actual server paths
      setProducts((prev) => [...prev, newProduct]);

      toast.success("Product added successfully 🎉");

      setName("");
      setDescription("");
      setPrice("");
      setOldPrice("");
      setQuantity("");
      setImages([]);
      setPreviewImages([]);
      setTimeout(() => {
        setOpenedSection("products");
      }, 2000);
    } catch (error) {
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1b1b1b] flex justify-center text-white w-full">
      <ToastContainer />
      {/* Responsive container */}
      <div className="w-full max-w-screen-2xl px-4 sm:px-6 lg:px-10 py-10">
        <form
          onSubmit={handleSubmit}
          className="bg-[#262626] border border-[#3a3a3a] rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#d5bdad] mb-8">
            Add New Product
          </h2>

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product Name"
              className="bg-[#1f1f1f] border border-[#3a3a3a] p-3 rounded-lg focus:border-[#d5bdad] outline-none"
            />

            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="Price"
              className="bg-[#1f1f1f] border border-[#3a3a3a] p-3 rounded-lg focus:border-[#d5bdad] outline-none"
            />
            <input
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
              type="number"
              placeholder="oldPrice"
              className="bg-[#1f1f1f] border border-[#3a3a3a] p-3 rounded-lg focus:border-[#d5bdad] outline-none"
            />

            <input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              type="number"
              placeholder="Quantity"
              className="bg-[#1f1f1f] border border-[#3a3a3a] p-3 rounded-lg focus:border-[#d5bdad] outline-none"
            />
          </div>

          {/* Description */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Product Description"
            className="mt-6 w-full bg-[#1f1f1f] border border-[#3a3a3a] p-4 rounded-lg focus:border-[#d5bdad] outline-none"
          />

          {/* Upload Area */}
          <div
            onDrop={(e) => {
              e.preventDefault();
              handleImages(e.dataTransfer.files);
            }}
            onDragOver={(e) => e.preventDefault()}
            className="mt-8 border-2 border-dashed border-[#d5bdad] rounded-xl p-8 md:p-12 text-center hover:bg-[#2d2d2d] transition"
          >
            <Upload size={40} className="mx-auto text-[#d5bdad] mb-3" />

            <p className="text-gray-300 mb-2">Drag & Drop product images</p>

            <label className="text-[#d5bdad] font-semibold cursor-pointer">
              Browse Files
              <input
                type="file"
                multiple
                className="hidden"
                onChange={(e) => e.target.files && handleImages(e.target.files)}
              />
            </label>
          </div>

          {/* Preview */}
          {previewImages.length > 0 && (
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {previewImages.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img}
                    className="w-full h-24 object-cover rounded-lg border border-[#3a3a3a]"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Submit */}
          <button
            disabled={loading}
            className="mt-10 w-full md:w-auto bg-[#d5bdad] text-black px-10 py-3 rounded-lg font-semibold hover:opacity-90 transition cursor-pointer"
          >
            {loading ? "Uploading..." : "Upload Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
