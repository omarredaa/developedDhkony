import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e7dbd4] px-6">
      <div className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-lg w-full">
        {/* 404 */}
        <h1 className="text-8xl font-bold text-[#2c2320] mb-4 animate-bounce">
          404
        </h1>

        {/* Icon */}
        <div className="text-6xl mb-4">🛒</div>

        {/* Message */}
        <h2 className="text-2xl font-semibold text-[#2c2320] mb-2">
          الصفحة غير موجودة
        </h2>

        <p className="text-gray-600 mb-8">
          يبدو أن المنتج أو الصفحة التي تبحث عنها غير موجودة.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="inline-block bg-[#2c2320] text-white px-8 py-3 rounded-xl font-semibold hover:bg-black transition"
        >
          العودة للصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
}
