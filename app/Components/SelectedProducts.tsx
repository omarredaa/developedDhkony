import React from "react";
import { useCart } from "../context/CartContext";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string[];
  oldPrice: number;
  discount: number;
  rating: number;
  images?: string[]; // Optional array for multiple images
};

export default function SelectedProducts({
  setSelectedProduct,
  selectedProduct,
  setCartOpen,
}: {
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  selectedProduct: Product | null;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { addToCart } = useCart();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  React.useEffect(() => {
    setCurrentIndex(0);
  }, [selectedProduct]);
  const nextImage = () => {
    if (!selectedProduct) return;
    setCurrentIndex((prev) =>
      prev === selectedProduct.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    if (!selectedProduct) return;
    setCurrentIndex((prev) =>
      prev === 0 ? selectedProduct.images.length - 1 : prev - 1,
    );
  };
  // Scrolling by Finger--------------------------------------------------------
  const touchStartX = React.useRef<number | null>(null);
  const touchEndX = React.useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;

    const minSwipeDistance = 50; // minimum swipe amount

    if (distance > minSwipeDistance) {
      // Swiped LEFT → next image
      nextImage();
    } else if (distance < -minSwipeDistance) {
      // Swiped RIGHT → previous image
      prevImage();
    }

    // reset
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div>
      <div
        className="fixed inset-0 bg-black/10 backdrop-blur-xs flex items-center justify-center z-50"
        onClick={() => setSelectedProduct(null)}
      >
        {/* Modal Content */}
        <div
          dir="rtl"
          className="bg-white rounded-3xl w-[90%] max-w-3xl p-6 relative animate-fadeIn"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedProduct(null)}
            className="absolute top-4 right-4 text-2xl text-white hover:text-gray-300 cursor-pointer bg-black rounded-full w-8 h-8 flex items-center justify-center z-10"
          >
            ✕
          </button>

          <div className="grid  gap-6 items-center">
            {/* Large Image */}
            {/* <div className="overflow-hidden rounded-2xl">
              <img
                src={selectedProduct?.image}
                alt={selectedProduct?.name}
                className="w-full h-80 object-cover"
              />
            </div> */}
            {selectedProduct?.images && selectedProduct?.images.length > 0 ? (
              <div
                className="relative overflow-hidden rounded-2xl"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Image */}
                <img
                  src={`https://localhost:7142${selectedProduct.images[currentIndex]}`}
                  alt={selectedProduct?.name}
                  className="w-full h-80 object-cover transition-all duration-300"
                />

                {/* Previous Button */}
                <button
                  onClick={prevImage}
                  className="absolute top-1/2 -translate-y-1/2 left-3 
               bg-white/70 hover:bg-white 
               w-10 h-10 rounded-full flex items-center justify-center 
               shadow cursor-pointer text-xl"
                >
                  ‹
                </button>

                {/* Next Button */}
                <button
                  onClick={nextImage}
                  className="absolute top-1/2 -translate-y-1/2 right-3 
               bg-white/70 hover:bg-white 
               w-10 h-10 rounded-full flex items-center justify-center 
               shadow cursor-pointer text-xl"
                >
                  ›
                </button>

                {/* Image Counter */}
                <div
                  className="absolute bottom-3 right-3 
                  bg-black/60 text-white text-sm 
                  px-3 py-1 rounded-full"
                >
                  {currentIndex + 1} / {selectedProduct?.images.length}
                </div>
                <div className="flex justify-center gap-2 mt-4">
                  {selectedProduct?.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                        index === currentIndex
                          ? "bg-[#2c2320] scale-110"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={selectedProduct?.image}
                  alt={selectedProduct?.name}
                  className="w-full h-80 object-cover"
                />
              </div>
            )}

            {/* Product Details */}
            <div>
              <h2 className="text-2xl font-bold mb-4">
                {selectedProduct?.name}
              </h2>

              <p className="text-gray-600 mb-4">
                {selectedProduct?.description}
              </p>

              {/* Stars */}
              <div className="flex mb-4 text-yellow-400 text-xl">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={index}>
                    {index < selectedProduct?.rating ? "★" : "☆"}
                  </span>
                ))}
              </div>

              {/* Price */}
              <div className="mb-6">
                {selectedProduct?.oldPrice > 0 && (
                  <span className="text-gray-400 line-through ml-3">
                    {selectedProduct?.oldPrice} ج.م
                  </span>
                )}
                <span className="text-red-500 text-2xl font-bold">
                  {selectedProduct?.price} ج.م
                </span>
              </div>

              {/* Add To Cart */}
              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  setCartOpen(true);
                  setSelectedProduct(null);
                }}
                className="w-full bg-[#2c2320] text-white py-3 rounded-2xl 
                       hover:bg-black transition-all duration-300 cursor-pointer text-lg font-semibold"
              >
                أضف للسلة
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
