// "use client";

// import Image from "next/image";
// import { FaWhatsapp } from "react-icons/fa";
// import { HiDevicePhoneMobile } from "react-icons/hi2";

// export default function LoginPage() {
//   return (
//     <div
//       dir="rtl"
//       className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4"
//     >
//       {/* Login Card */}
//       <div className="bg-white rounded-xl shadow-sm w-full max-w-md p-6 sm:p-8">
//         {/* Continue as visitor */}
//         <button className="w-full border border-gray-300 rounded-lg py-3 text-gray-700 hover:bg-gray-50 transition">
//           المتابعة كزائر
//         </button>

//         {/* Divider */}
//         <div className="flex items-center gap-3 my-5">
//           <div className="flex-1 h-px bg-gray-200"></div>
//           <span className="text-gray-400 text-sm">أو</span>
//           <div className="flex-1 h-px bg-gray-200"></div>
//         </div>

//         {/* Title */}
//         <h2 className="text-xl font-bold text-gray-800 mb-1 text-center">
//           تسجيل الدخول
//         </h2>

//         <p className="text-gray-500 text-sm text-center mb-6">
//           أدخل بريدك الإلكتروني للحصول على رمز التحقق.
//         </p>

//         {/* Email Field */}
//         <div className="mb-4">
//           <label className="text-sm text-gray-700 block mb-1">
//             البريد الإلكتروني
//           </label>

//           <input
//             type="email"
//             placeholder="أدخل بريدك الإلكتروني"
//             className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2b201f]"
//           />
//         </div>

//         {/* Send OTP */}
//         <button className="w-full bg-[#2b201f] text-white py-3 rounded-lg font-semibold hover:bg-black transition mb-3">
//           إرسال رمز التحقق بالبريد الإلكتروني
//         </button>
//       </div>

//       {/* Footer */}
//       <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-4xl mt-8 text-sm text-gray-500 gap-4 px-4">
//         <div className="flex items-center gap-3">
//           <Image src="/cer.jpg" alt="certificate" width={45} height={45} />
//           <span>الرقم الضريبي: 310179603200003</span>
//         </div>
//         <p>جميع الحقوق محفوظة لدخوني © 2026</p>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  /* =========================
      Send OTP
  ========================= */

  const sendOtp = async () => {
    if (!email) {
      alert("أدخل البريد الإلكتروني");
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000);

    localStorage.setItem("loginOtp", code.toString());
    localStorage.setItem("loginOtpExpiry", (Date.now() + 300000).toString());

    try {
      await fetch("https://yourdomain.com/send_otp.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          otp: code,
        }),
      });

      setOtpSent(true);
      alert("تم إرسال رمز التحقق إلى بريدك");
    } catch (err) {
      alert("فشل إرسال OTP");
    }
  };

  /* =========================
      OTP INPUT CHANGE
  ========================= */

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  /* =========================
      Handle Backspace
  ========================= */

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  /* =========================
      Verify OTP
  ========================= */

  const verifyOtp = () => {
    const enteredOtp = otp.join("");
    const savedOtp = localStorage.getItem("loginOtp");
    const expiry = localStorage.getItem("loginOtpExpiry");

    if (!savedOtp || !expiry) {
      alert("لا يوجد رمز تحقق");
      return;
    }

    if (Date.now() > Number(expiry)) {
      alert("انتهت صلاحية الرمز");
      return;
    }

    if (enteredOtp === savedOtp) {
      alert("تم تسجيل الدخول بنجاح");
    } else {
      alert("رمز غير صحيح");
    }
  };

  return (
    <div
      dir="ltr"
      className="min-h-screen flex flex-col items-center justify-center  px-4 gap-10"
    >
      <div className="flex items-center justify-center w-full border-b">
        <Link href="/">
          <img src="/logo.png" alt="logo" className="w-16 cursor-pointer" />
        </Link>
      </div>
      <div className="bg-white rounded-xl shadow-sm w-full max-w-md p-6 sm:p-8 ">
        {/* Continue as guest */}
        <Link href="/login">
          <button className="w-full border border-gray-300 rounded-lg py-3 text-gray-700 hover:bg-gray-50 transition cursor-pointer">
            المتابعة كزائر
          </button>
        </Link>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-gray-400 text-sm">أو</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <h2 className="text-xl font-bold text-center mb-2">تسجيل الدخول</h2>

        <p className="text-gray-500 text-sm text-center mb-6">
          أدخل بريدك الإلكتروني للحصول على رمز التحقق
        </p>

        {/* Email */}
        {!otpSent && (
          <>
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#2b201f]"
            />

            <button
              onClick={sendOtp}
              className="w-full bg-[#2b201f] text-white py-3 rounded-lg font-semibold hover:bg-black transition"
            >
              إرسال رمز التحقق
            </button>
          </>
        )}

        {/* OTP INPUT */}
        {otpSent && (
          <>
            <div className="flex justify-between gap-2 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputs.current[index] = el)}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  maxLength={1}
                  className="w-12 h-12 text-center border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#2b201f]"
                />
              ))}
            </div>

            <button
              onClick={verifyOtp}
              className="w-full bg-[#2b201f] text-white py-3 rounded-lg font-semibold hover:bg-black transition"
            >
              تحقق من الرمز
            </button>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-4xl mt-8 text-sm text-gray-500 gap-4 px-4">
        <p>جميع الحقوق محفوظة لدخوني © 2026</p>
        <div className="flex items-center gap-3">
          <span>الرقم الضريبي: 310179603200003</span>
          <Image src="/cer.jpg" alt="certificate" width={45} height={45} />
        </div>
      </div>
    </div>
  );
}
