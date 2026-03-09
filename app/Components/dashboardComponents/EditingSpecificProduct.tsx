"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { useProducts } from "@/app/context/ProductsContext";
import { toast, ToastContainer } from "react-toastify";

export default function EditProduct({
  productEditing,
}: {
  productEditing: any;
}) {
  const { user } = useAuth();
  const { setProducts } = useProducts();

  const [name, setName] = useState(productEditing.name);
  const [description, setDescription] = useState(productEditing.description);
  const [price, setPrice] = useState(productEditing.price);
  const [oldPrice, setOldPrice] = useState(productEditing.oldPrice);

  const [quantity, setQuantity] = useState(productEditing.quantity);

  const [images, setImages] = useState<File[]>([]);
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>(
    productEditing.images?.map(
      (img: string) => `https://localhost:7142${img}`,
    ) || [],
  );

  const [loading, setLoading] = useState(false);

  const handleImages = (files: FileList) => {
    const fileArray = Array.from(files);

    setImages((prev) => [...prev, ...fileArray]);

    const previews = fileArray.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...previews]);
  };

  const removeImage = (index: number, imageUrl: string) => {
    // remove from preview
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));

    // if the image is an existing image from API
    if (!imageUrl.startsWith("blob:")) {
      const imagePath = imageUrl.replace("https://localhost:7142", "");
      setImagesToRemove((prev) => [...prev, imagePath]);
    } else {
      // if it's a new uploaded image
      setImages((prev) =>
        prev.filter((_, i) => i !== index - imagesToRemove.length),
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("Id", productEditing.id.toString());
      formData.append("Name", name);
      formData.append("Description", description);
      formData.append("Price", price.toString());
      formData.append("OldPrice", oldPrice.toString());
      formData.append("Quantity", quantity.toString());

      images.forEach((img) => {
        formData.append("Images", img);
      });

      imagesToRemove.forEach((img) => {
        formData.append("ImagesToRemove", img);
      });

      const res = await fetch(
        `https://localhost:7142/api/Products/${productEditing.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
          body: formData,
        },
      );

      if (!res.ok) {
        const text = await res.text();
        console.log(text);
        toast.error("Something went wrong ❌");
        return;
      }

      toast.success("Product Updated successfully 🎉");

      // setProducts((prevProducts) =>
      //   prevProducts.map((p) =>
      //     p.id === productEditing.id
      //       ? {
      //           ...p,
      //           name,
      //           description,
      //           price,
      //           quantity,
      //           oldPrice,
      //         }
      //       : p,
      //   ),
      // );
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === productEditing.id
            ? {
                ...p, // keep other properties intact
                name,
                description,
                price,
                oldPrice,
                quantity,
                images: previewImages.map((img) =>
                  img.replace("https://localhost:7142", ""),
                ), // update images from previewImages
              }
            : p,
        ),
      );
    } catch (error) {
      console.error(error);
      toast.error("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1b1b1b] flex justify-center text-white w-full">
      <ToastContainer />
      <div className="w-full max-w-screen-2xl px-4 sm:px-6 lg:px-10 py-10">
        <form
          onSubmit={handleSubmit}
          className="bg-[#262626] border border-[#3a3a3a] rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#d5bdad] mb-8">
            Edit Product
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
              onChange={(e) => setPrice(Number(e.target.value))}
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
              onChange={(e) => setQuantity(Number(e.target.value))}
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

          {/* Upload */}
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
                    // onClick={() => removeImage(index, img)}
                    onClick={() => removeImage(index, img)}
                    className="absolute top-1 right-1 bg-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-10">
            <button
              type="button"
              onClick={() => setOpenedSection("products")}
              className="border border-[#3a3a3a] px-8 py-3 rounded-lg hover:bg-[#2d2d2d] transition"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="bg-[#d5bdad] text-black px-10 py-3 rounded-lg font-semibold hover:opacity-90 transition cursor-pointer"
            >
              {loading ? "Updating..." : "Save Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
