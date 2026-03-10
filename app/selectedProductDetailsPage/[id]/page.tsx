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
import Footer from "@/app/Components/Footer";

export default function ProductDetails() {
  const { products } = useProducts();
  const { setCartOpen, addToCart } = useCart();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewerName, setReviewerName] = useState("");

  const params = useParams();

  const [numOfUsers, setNumOfUsers] = useState();

  const product = products.find((p) => p.id === Number(params.id));
  // console.log(product);

  useEffect(() => {
    if (!params.id) return;

    fetch(`https://localhost:7142/api/reviews/product/${params.id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.log(err));
  }, [params.id]);

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
    <div className="flex justify-center items-center bg-[#f9f5f2] flex-col overflow-hidden">
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
                  {index < product.averageRating ? "★" : "☆"}
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

      {/* <div className=" p-6 rounded-xl mt-8 text-center flex justify-center items-center flex-col font-semibold text-wrap">
        <h1 className="text-gray-700 text-3xl font-extrabold">وصف المنتج</h1>
        -----------------------------
        <p className="whitespace-pre-line leading-relaxed text-gray-700  justify-center items-center text-wrap">
          {product.description}
        </p>
      </div> */}
      <div className="p-6 rounded-xl mt-8 text-center flex flex-col justify-center items-center font-semibold max-w-full">
        <h1 className="text-gray-700 text-2xl md:text-3xl font-extrabold">
          وصف المنتج
        </h1>

        <div className="my-4 w-full border-t border-gray-300"></div>

        <p className="whitespace-pre-line leading-relaxed text-gray-700 break-words max-w-full px-2">
          {product.description}
        </p>
      </div>

      <div className="w-full max-w-3xl mt-10 p-6 rounded-xl shadow-md mb-12">
        <h2 className="text-xl font-bold mb-4  flex justify-center items-center">
          التقييمات
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
              <div className="text-yellow-400">
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
      {/* <div className="w-full max-w-3xl mt-8 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">أضف تقييمك</h2>

        <input
          type="text"
          placeholder="اسمك"
          value={reviewerName}
          onChange={(e) => setReviewerName(e.target.value)}
          className="border w-full p-2 rounded mb-3"
        />

        <textarea
          placeholder="تعليقك"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border w-full p-2 rounded mb-3"
        />

        {/* Rating Stars */}
      {/* <div className="flex gap-2 text-2xl text-yellow-400 mb-4 cursor-pointer">
          {Array.from({ length: 5 }).map((_, index) => (
            <span key={index} onClick={() => setRating(index + 1)}>
              {index < rating ? "★" : "☆"}
            </span>
          ))}
        </div>

        <button
          onClick={handleAddReview}
          className="bg-black text-white px-6 py-2 rounded"
        >
          إرسال التقييم
        </button>
      </div>  */}
      <Footer />
    </div>
  );
}
