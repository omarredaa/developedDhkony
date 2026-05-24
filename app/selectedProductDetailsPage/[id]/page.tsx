"use client";
import { useParams } from "next/navigation";
import { useProducts } from "@/app/context/ProductsContext";
import Navbar from "@/app/Components/Navbar";
import { EyeIcon, Flag, MessageSquare, StarIcon } from "lucide-react";
import Svg from "@/app/Components/Svg";
import { FaEye } from "react-icons/fa6";
import { useCart } from "@/app/context/CartContext";
import NotFound from "@/app/Components/NotFound";
import { useEffect, useRef, useState } from "react";
import Footer from "@/app/Components/Footer";
import SelectedProducts from "@/app/Components/SelectedProducts";

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
export default function ProductDetails() {
  const { products } = useProducts();
  const { setCartOpen, addToCart } = useCart();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const [numOfUsers, setNumOfUsers] = useState();

  const product = products.find((p) => p.id === Number(params.id));
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();

      // لو الزر خرج من الشاشة
      if (rect.bottom < 0) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    addToCart(product);
    setCartOpen(true);
  };
  // console.log("ooooooooo", product);

  useEffect(() => {
    if (!params.id) return;
    setLoading(true);
    // fetch(`https://localhost:7142/api/reviews/product/${params.id}`)
    fetch(`https://localhost:7142/api/reviews/product/57`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [params.id]);

  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedProduct]);

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleAddReview = async () => {
    const review = {
      productId: Number(params.id),
      rating,
      comment,
      reviewerName,
    };

    const res = await fetch("https://localhost:7142/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });

    if (res.ok) {
      const newReview = await res.json();
      setReviews((prev) => [...prev, newReview]);

      setRating(0);
      setComment("");
      setReviewerName("");
    }
  };

  useEffect(() => {
    setNumOfUsers(generateRandomNumber(30, 100));
    // setSelectedProduct(product);
  }, []);

  // Run every 15 minutes
  useEffect(() => {
    const updateUsers = () => {
      const number = generateRandomNumber(30, 100);
      setNumOfUsers(number);
    };

    updateUsers(); // run immediately

    const interval = setInterval(updateUsers, 120000);

    return () => clearInterval(interval);
  }, []);
  // 15 minutes in milliseconds
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#f9f5f2]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
          <p className="text-gray-600">جارٍ تحميل المنتج...</p>
        </div>
      </div>
    );
  }
  if (!product) return <NotFound />;

  return (
    <div className="flex justify-center items-center bg-[#f9f5f2] flex-col overflow-hidden">
      <Navbar />

      <span className="fixed -right-16 top-1/2 -translate-y-1/2 -rotate-90 bg-[#8b572a] text-white p-2 z-50 h-9 rounded-sm px-6  flex items-center gap-2 text-sm">
        <div className="absolute -top-2 -left-3 text-white bg-[#8a716d] rounded-full p-2 rotate-90 group-hover:scale-125">
          <MessageSquare strokeWidth={5} className="w-4 h-4" />
        </div>
        يا هلا و مرحبا .. امرنا
      </span>
      <div className="mt-32  w-full  rounded-lg p-4 flex justify-evenly items-center md:items-start flex-col md:flex-row  gap-6">
        {/* Product Image */}
        <div className="shrink-0">
          <img
            // src={product.image}
            src={`https://localhost:7142${product.images[0]}`}
            alt={product.name}
            className="rounded-md object-cover w-[360px] cursor-pointer"
            onClick={() => setSelectedProduct(product)}
          />
        </div>
        {selectedProduct && (
          <SelectedProducts
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            setCartOpen={setCartOpen}
          />
        )}

        {/* Product Info */}
        <div className="flex flex-col justify-between items-center  md:w-[40%] p-4 rounded-lg gap-10">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-lg font-extrabold text-gray-800">
              {product.name}
            </h2>
            {/* Rating */}
            {/* ⭐ Dynamic Stars */}
            <div className="flex justify-center mt-2 text-yellow-400 text-lg">
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index} className="text-2xl">
                  {/* {index < product.averageRating ? "★" : "☆"} */}★
                </span>
              ))}
            </div>{" "}
            <p className="text-[#4c4645] text-[12px]">
              بناءً على
              {/* {product.reviews.length} */}14 تقييم
            </p>
            {/* Availability */}
            <p
              className={`mt-1 text-sm font-extrabold  text-white rounded-sm w-16 h-8 text-center flex justify-center items-center text-nowrap ${
                product.quantity > 0 ? "bg-[#6bc693]" : "bg-red-600"
              }`}
            >
              {product.quantity > 0 ? "متوفر" : "غير متوفر"}
            </p>
            <div className="flex justify-center items-center gap-4 mt-3">
              <p className="text-xl font-bold">
                <Svg /> {product.price.toFixed(2)}
              </p>
              {/* <p className="text-sm line-through text-gray-400">
                <Svg />
                {product.oldPrice?.toFixed(2)}
              </p> */}
            </div>
          </div>

          {/* Price Section */}
          <div className=" w-[80%] md:w-full ">
            <div className="flex justify-center items-center gap-2 border border-dashed border-black rounded-xl p-3 text-sm md:text-base h-12">
              <span className="text-black font-medium">
                يشتري هذا المنتج الآن {numOfUsers} شخص
              </span>
              <FaEye className="text-black" />
            </div>
          </div>
          {/* <div className="bg-white text-lg">
            <div className="max-w-md mx-auto shadow-sm rounded-xl border border-black p-6 text-right w-full cursor-pointer">
              <div className="text-lg font-semibold text-gray-800 mb-2 ">
                أو قسم فاتورتك على 4 دفعات بقيمة
                <p className="">
                  <Svg />
                  {product.price / 4}
                </p>
              </div>
              <div className=" flex justify-center items-center gap-2 text-black">
                <span className="underline">تعرف على خياراتك</span>
                <p className="  ">
                  بدون رسوم تأخير، متوافقة مع الشريعة الإسلامية
                </p>
              </div>
            </div>
          </div> */}

          <div className="bg-white rounded-xl p-5 w-[85%] md:w-full">
            <div className="border border-gray-300 rounded-xl p-3  text-[15px]  text-gray-700  text-right">
              <span className="font-extrabold">
                <Svg /> ادفع {product.price / 4} /شهريا
              </span>
              أو على 4 دفعات. متوافقة مع الشريعة الإسلامية.
              <span className="flex justify-end items-center gap-2 mt-2">
                <img src="/tamara.svg" className="h-5" />
                <span className="underline cursor-pointer">
                  تعرف على خياراتك
                </span>
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 w-[85%] -mt-7 md:w-full">
            <div className="border border-gray-300 rounded-xl p-5  text-[13px]  text-gray-700  text-right">
              <div className="flex justify-center items-start gap-6">
                <img src="/tabby.png" className=" w-20" />
                <div className="">
                  <p className="font-semibold">
                    <Svg /> قسمّها على 4 دفعات بقيمة {product.price / 4}
                  </p>
                  بدون فوائد. متوافق مع أحكام الشريعة.
                  <p className=" cursor-pointer text-blue-900 font-extrabold">
                    لمعرفة المزيد
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <h3 className="text-sm text-gray-500">{product.description}</h3> */}

          {/* Installment Option */}

          <div
            className=" mt-6 flex w-full rounded-2xl overflow-hidden h-16 sticky"
            ref={buttonRef}
          >
            <button
              onClick={() => {
                setCartOpen(true);
                handleClick();
              }}
              className="w-full bg-[#2c2320] text-white py-3
                                transition-all duration-300 
                              hover:opacity-75 active:scale-95 cursor-pointer  font-extrabold "
            >
              أضف للسلة
            </button>
            {showSticky && (
              <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-lg z-50">
                <button
                  onClick={handleClick}
                  className="w-full bg-[#2c2320] text-white py-3 rounded-xl
            transition-all duration-300 hover:opacity-75  active:scale-95 cursor-pointer font-extrabold "
                >
                  أضف للسلة
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <div className=" p-6 rounded-xl mt-8 text-center flex justify-center items-center flex-col font-semibold text-wrap">
        <h1 className="text-gray-700 text-3xl font-extrabold">وصف المنتج</h1>
        -----------------------------
        <p className="whitespace-pre-line leading-relaxed text-gray-700  justify-center items-center text-wrap">
          {product.description}
        </p>
      </div> */}
      <div className="p-6 rounded-xl mt-8 text-center flex flex-col justify-center items-center font-semibold max-w-full text-[#2E2727]">
        <h1 className=" text-[18px] font-extrabold mb-2 border-b-2 border-dashed border-[#B0ABA8] p-2">
          وصف المنتج
        </h1>
        {/* <p className="text-gray-500 space-x-0">----------------------</p> */}
        {/* <div className="my-4 w-full border-t border-gray-300"></div> */}

        <p className="whitespace-pre-line leading-relaxed break-words max-w-full px-2 text-[#947c78]">
          {product.description}
        </p>
      </div>

      <div className="w-full max-w-3xl mt-10 p-6 rounded-xl mb-12 flex flex-col justify-center items-center">
        <h2 className="text-[18px] font-bold mb-4  flex justify-center items-center flex-col border-b-2 border-dashed border-[#B0ABA8] p-2 w-[40%] text-[#2E2727] text-nowrap">
          اراء المتسوقين
        </h2>

        {reviews.length === 0 && (
          <p className="text-gray-500 flex justify-center items-center">
            لا يوجد تقييمات بعد
          </p>
        )}
        <div className="flex flex-col justify-end items-center gap-5 w-full">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="border-b py-4 bg-white p-5 rounded-3xl w-full flex justify-end items-between "
            >
              <div className="text-yellow-400 flex flex-row-reverse">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                ))}
              </div>

              <div className="flex justify-end items-end flex-col w-[80%]">
                <p className="font-semibold  flex justify-end items-end text-right">
                  {review.reviewerName}
                </p>
                <p className="text-gray-600 mt-1 flex justify-end items-end text-right">
                  {review.comment}
                </p>

                {/* stars */}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full max-w-3xl mt-8 p-6 rounded-xl  felx flex-col justify-center items-center">
        <h2 className="text-xl font-bold mb-4  text-center">قيم المنتج</h2>

        {/* Rating Stars */}
        {/* <div className="flex gap-2 text-2xl text-yellow-400 mb-4 cursor-pointer">
          {Array.from({ length: 5 }).map((_, index) => (
            <span key={index} onClick={() => setRating(index + 1)}>
              {index < rating ? "★" : "☆"}
            </span>
          ))}
        </div> */}

        {/* <div className="flex items-center justify-center">
          <div className="flex gap-2 text-4xl">
            {Array.from({ length: 5 }).map((_, index) => {
              const value = index + 1;

              return (
                <span
                  key={index}
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHover(value)}
                  onMouseLeave={() => setHover(0)}
                  className={`cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110
              ${
                value <= (hover || rating) ? "text-yellow-400" : "text-gray-400"
              }`}
                >
                  ★
                </span>
              );
            })}
          </div>
        </div> */}
        <div className="flex items-center justify-center">
          <div className="flex  gap-2 text-4xl">
            {Array.from({ length: 5 }).map((_, index) => {
              const value = index + 1;
              const starNumber = 5 - index; // عكس التقييم

              return (
                <span
                  key={index}
                  onClick={() => setRating(starNumber)}
                  onMouseEnter={() => setHover(starNumber)}
                  onMouseLeave={() => setHover(0)}
                  className={`cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110
            ${
              starNumber <= (hover || rating)
                ? "text-yellow-400"
                : "text-gray-400"
            }`}
                >
                  ★
                </span>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center mt-5">
          <p className="mb-5">مراجعتك</p>
          <input
            type="text"
            placeholder="اسمك"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            className=" w-[80%] p-2 rounded mb-3 text-black bg-white text-center"
          />

          <textarea
            placeholder="تعليقك"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className=" p-15 rounded mb-3 w-[80%] h-[25%]  text-black bg-white text-center"
          />

          <button
            onClick={handleAddReview}
            className="bg-[#2e2727] px-6 py-2 rounded-lg font-extrabold text-[#d5bdad] cursor-pointer"
          >
            إرسال
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
