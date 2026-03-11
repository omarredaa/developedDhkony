// // "use client";

// // import { useEffect, useState } from "react";
// // import { motion } from "framer-motion";
// // import { z } from "zod";
// // import { FaTruckFast } from "react-icons/fa6";
// // import { useRouter } from "next/navigation";
// // import { useCart } from "../context/CartContext";
// // // import OtpLogin from "./OtpLogin";

// // type CheckoutData = {
// //   email: string;
// //   phone: string;
// //   country: string;
// //   city: string;
// //   address: string;
// //   paymentMethod: string;
// //   name: string;
// // };

// // const checkoutSchema = z.object({
// //   email: z.string().email("البريد الإلكتروني غير صالح"),
// //   phone: z.string().regex(/^[0-9+\s]{8,15}$/, "رقم الهاتف غير صحيح"),
// //   country: z.string().min(2, "ادخل الدولة"),
// //   city: z.string().min(2, "ادخل المدينة"),
// //   address: z.string().min(5, "العنوان قصير"),
// //   paymentMethod: z.string().min(1, "اختر طريقة الدفع"),
// // });

// // export default function CheckoutForm({
// //   isCartEmpty,
// //   discount,
// // }: {
// //   isCartEmpty: boolean;
// // }) {
// //   const [step, setStep] = useState(1);
// //   const [loading, setLoading] = useState(false);
// //   const [errors, setErrors] = useState<Record<string, string>>({});
// //   const [serverErrorMessage, setServerErrorMessage] = useState("");
// //   const router = useRouter();
// //   const [formData, setFormData] = useState<CheckoutData>({
// //     email: "",
// //     phone: "",
// //     country: "",
// //     city: "",
// //     address: "",
// //     paymentMethod: "",
// //     name: "",
// //   });
// //   const { cart, totalPrice } = useCart();
// //   console.log("formData", formData);
// //   console.log("cart", cart);

// //   /* ===============================
// //     Load from localStorage
// //   =============================== */

// //   useEffect(() => {
// //     if (typeof window === "undefined") return;

// //     const saved = localStorage.getItem("checkoutData");

// //     if (saved) {
// //       const parsed = JSON.parse(saved);

// //       if (parsed.formData) setFormData(parsed.formData);
// //       if (parsed.step) setStep(parsed.step);
// //     }
// //   }, []);

// //   /* ===============================
// //     Save to localStorage
// //   =============================== */

// //   useEffect(() => {
// //     if (typeof window === "undefined") return;

// //     const data = {
// //       formData,
// //       step,
// //     };

// //     localStorage.setItem("checkoutData", JSON.stringify(data));
// //   }, [formData, step]);

// //   /* ===============================
// //      Validation
// //   =============================== */

// //   const validateField = (name: string, value: string) => {
// //     const fieldSchema =
// //       checkoutSchema.shape[name as keyof typeof checkoutSchema.shape];

// //     if (!fieldSchema) return;

// //     const result = fieldSchema.safeParse(value);

// //     setErrors((prev) => ({
// //       ...prev,
// //       [name]: result.success
// //         ? ""
// //         : (result.error?.issues?.[0]?.message ?? "خطأ في الإدخال"),
// //     }));
// //   };

// //   const handleChange = (
// //     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
// //   ) => {
// //     const { name, value } = e.target;

// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));

// //     validateField(name, value);
// //   };

// //   /* ===============================
// //      Form Validation
// //   =============================== */

// //   const isFormValid = checkoutSchema.safeParse(formData).success;

// //   const step1Valid = checkoutSchema
// //     .pick({ email: true, phone: true })
// //     .safeParse(formData).success;

// //   const step2Valid = checkoutSchema
// //     .pick({ country: true, city: true, address: true })
// //     .safeParse(formData).success;

// //   /* ===============================
// //      Step Control
// //   =============================== */

// //   const nextStep = (targetStep: number) => {
// //     if (targetStep === 2 && !step1Valid) return;
// //     if (targetStep === 3 && !step2Valid) return;

// //     setStep(targetStep);
// //   };

// //   /* ===============================
// //      Submit
// //   =============================== */

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     let productsText = "";

// //     cart.forEach((item: any, index: number) => {
// //       productsText += `
// // Product ${index + 1}
// // Name: ${item.name}
// // Description: ${item.description}
// // Price: ${item.price}
// // Quantity: ${item.quantity}
// // Stock: ${item.stock}
// // -----------------------
// // `;
// //     });
// //     const message = `
// // 🧾 NEW ORDER
// // Name: ${formData.email}
// // Email: ${formData.email}
// // Phone: ${formData.phone}
// // Address:
// // ${formData.address}
// // ${formData.city}, ${formData.country}
// // Payment Method: ${formData.paymentMethod}
// // 🛒 PRODUCTS
// // price :${cart[0].price}
// // quantity : ${cart[0].quantity}
// // discount: ${discount}
// // total price before discount : ${cart[0].price * cart[0].quantity}
// // total price after discount : ${(totalPrice - (totalPrice * discount) / 100).toFixed(2)}
// // `;
// //     console.log("message", message);
// //     router.push("/payment"); // Replace "/success" with your target page
// //     localStorage.setItem("dataSent to The bot", message);
// //     const token = "8758821136:AAH-ON6KCqjx1UB_6EpH1yi3S0SWIGkhDaY";
// //     const chatId = "6032588551";

// //     try {
// //       const response = await fetch(
// //         `https://api.telegram.org/bot${token}/sendMessage`,
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify({
// //             chat_id: chatId,
// //             text: message,
// //           }),
// //         },
// //       );

// //       const result = await response.json();
// //       console.log(result);
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   /* ===============================
// //      Progress
// //   =============================== */

// //   let progress = 0;

// //   if (step1Valid) progress = 33;
// //   if (step1Valid && step2Valid) progress = 66;
// //   if (isFormValid) progress = 100;

// //   return (
// //     <form className="max-w-2xl mx-auto space-y-6" onSubmit={handleSubmit}>
// //       <div className="h-2 bg-gray-200 rounded overflow-hidden">
// //         <div
// //           className="h-full bg-black transition-all duration-500"
// //           style={{ width: `${progress}%` }}
// //         />
// //       </div>

// //       {/* Step 1 */}

// //       <Section
// //         title="معلومات التواصل"
// //         step={1}
// //         currentStep={step}
// //         setStep={setStep}
// //       >
// //         <input
// //           name="email"
// //           value={formData.email}
// //           onChange={handleChange}
// //           placeholder="البريد الإلكتروني"
// //           className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50"
// //         />
// //         {errors.email && <ErrorText msg={errors.email} />}

// //         <input
// //           name="phone"
// //           value={formData.phone}
// //           onChange={handleChange}
// //           placeholder="رقم الهاتف"
// //           className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50"
// //         />
// //         {/* <OtpLogin /> */}
// //         {errors.phone && <ErrorText msg={errors.phone} />}

// //         <NextButton onClick={() => nextStep(2)} disabled={!step1Valid} />
// //       </Section>

// //       {/* Step 2 */}

// //       <Section title="التوصيل" step={2} currentStep={step} setStep={setStep}>
// //         <input
// //           name="country"
// //           value={formData.country}
// //           onChange={handleChange}
// //           placeholder="الدولة"
// //           className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50"
// //         />
// //         {errors.country && <ErrorText msg={errors.country} />}

// //         <input
// //           name="city"
// //           value={formData.city}
// //           onChange={handleChange}
// //           placeholder="المدينة"
// //           className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50"
// //         />
// //         {errors.city && <ErrorText msg={errors.city} />}

// //         <input
// //           name="address"
// //           value={formData.address}
// //           onChange={handleChange}
// //           placeholder="العنوان"
// //           className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50"
// //         />
// //         {errors.address && <ErrorText msg={errors.address} />}

// //         <NextButton onClick={() => nextStep(3)} disabled={!step2Valid} />
// //       </Section>

// //       {/* Step 3 */}

// //       <Section title="الدفع" step={3} currentStep={step} setStep={setStep}>
// //         <select
// //           name="paymentMethod"
// //           value={formData.paymentMethod}
// //           onChange={handleChange}
// //           className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50"
// //         >
// //           <option value="">اختر طريقة الدفع</option>
// //           <option value="credit">بطاقة ائتمان</option>
// //         </select>

// //         {errors.paymentMethod && <ErrorText msg={errors.paymentMethod} />}
// //       </Section>

// //       <p className="bg-red-400 text-sm">{serverErrorMessage}</p>

// //       <button
// //         type="submit"
// //         disabled={!isFormValid || isCartEmpty || loading}
// //         className={`w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-xl mt-4 text-2xl
// //         ${
// //           !isFormValid || isCartEmpty || loading
// //             ? "bg-gray-400 cursor-not-allowed opacity-60"
// //             : "bg-[#2e2727] hover:bg-[#1f1a1a] cursor-pointer text-white"
// //         }`}
// //       >
// //         <span>{loading ? "جارى المعالجة..." : "إتمام الطلب"}</span>
// //         <FaTruckFast />
// //       </button>
// //     </form>
// //   );
// // }

// // /* UI Components */

// // function Section({ title, step, currentStep, setStep, children }: any) {
// //   return (
// //     <div className="border-b rounded-lg overflow-hidden text-black">
// //       <div
// //         className="p-4 font-semibold flex justify-end cursor-pointer"
// //         onClick={() => currentStep >= step && setStep(step)}
// //       >
// //         {title}
// //       </div>

// //       <motion.div
// //         initial={{ height: 0, opacity: 0 }}
// //         animate={
// //           currentStep === step
// //             ? { height: "auto", opacity: 1 }
// //             : { height: 0, opacity: 0 }
// //         }
// //         className="overflow-hidden"
// //       >
// //         <div className="p-4 space-y-4">{children}</div>
// //       </motion.div>
// //     </div>
// //   );
// // }

// // function NextButton({
// //   onClick,
// //   disabled,
// // }: {
// //   onClick: () => void;
// //   disabled: boolean;
// // }) {
// //   return (
// //     <button
// //       type="button"
// //       onClick={onClick}
// //       disabled={disabled}
// //       className={`w-full p-3 rounded transition
// //       ${
// //         disabled
// //           ? "bg-gray-400 cursor-not-allowed"
// //           : "bg-black text-white hover:opacity-90 cursor-pointer"
// //       }`}
// //     >
// //       متابعة
// //     </button>
// //   );
// // }

// // function ErrorText({ msg }: { msg: string }) {
// //   return <p className="text-red-500 text-sm">{msg}</p>;
// // }

// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { z } from "zod";
// import { FaTruckFast } from "react-icons/fa6";
// import { useRouter } from "next/navigation";
// import { useCart } from "../context/CartContext";
// import emailjs from "@emailjs/browser";

// type CheckoutData = {
//   email: string;
//   phone: string;
//   country: string;
//   city: string;
//   address: string;
//   paymentMethod: string;
//   name: string;
// };

// const checkoutSchema = z.object({
//   email: z.string().email("البريد الإلكتروني غير صالح"),
//   phone: z.string().regex(/^[0-9+\s]{8,15}$/, "رقم الهاتف غير صحيح"),
//   country: z.string().min(2, "ادخل الدولة"),
//   city: z.string().min(2, "ادخل المدينة"),
//   address: z.string().min(5, "العنوان قصير"),
//   paymentMethod: z.string().min(1, "اختر طريقة الدفع"),
// });

// export default function CheckoutForm({
//   isCartEmpty,
//   discount,
// }: {
//   isCartEmpty: boolean;
// }) {
//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [serverErrorMessage, setServerErrorMessage] = useState("");

//   const [otpSent, setOtpSent] = useState(false);
//   const [otpInput, setOtpInput] = useState("");
//   const [otpVerified, setOtpVerified] = useState(false);

//   const router = useRouter();

//   const [formData, setFormData] = useState<CheckoutData>({
//     email: "",
//     phone: "",
//     country: "",
//     city: "",
//     address: "",
//     paymentMethod: "",
//     name: "",
//   });

//   const { cart, totalPrice } = useCart();

//   /* ===============================
//      OTP Send
//   =============================== */

//   // const sendOtp = async () => {
//   //   const otp = Math.floor(100000 + Math.random() * 900000);

//   //   localStorage.setItem("otp", otp.toString());
//   //   localStorage.setItem("otpExpiry", (Date.now() + 300000).toString());

//   //   try {
//   //     await emailjs.send(
//   //       "service_rykhfta",
//   //       "template_9yvuqif",
//   //       {
//   //         email: formData.email,
//   //         otp: otp,
//   //       },
//   //       "D_0aDj9nIART6Zvue",
//   //     );

//   //     setOtpSent(true);
//   //     alert("OTP sent to your Gmail");
//   //   } catch (err) {
//   //     console.error(err);
//   //     alert("Failed to send OTP");
//   //   }
//   // };
//   const sendOtp = async () => {
//     const otp = Math.floor(100000 + Math.random() * 900000);

//     localStorage.setItem("otp", otp);

//     const message = `Your OTP code is: ${otp}`;

//     await fetch("https://formsubmit.co/ajax/a1a1azx4@gmail.com", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         subject: "Your OTP Code",
//         message: message,
//       }),
//     });

//     alert("OTP sent to Gmail");
//   };

//   /* ===============================
//      OTP Verify
//   =============================== */

//   const verifyOtp = () => {
//     const savedOtp = localStorage.getItem("otp");
//     const expiry = localStorage.getItem("otpExpiry");

//     if (!savedOtp || !expiry) {
//       alert("No OTP found");
//       return;
//     }

//     if (Date.now() > Number(expiry)) {
//       alert("OTP expired");
//       return;
//     }

//     if (otpInput === savedOtp) {
//       setOtpVerified(true);
//       alert("OTP verified");
//     } else {
//       alert("Incorrect OTP");
//     }
//   };

//   /* ===============================
//     Load from localStorage
//   =============================== */

//   useEffect(() => {
//     const saved = localStorage.getItem("checkoutData");

//     if (saved) {
//       const parsed = JSON.parse(saved);

//       if (parsed.formData) setFormData(parsed.formData);
//       if (parsed.step) setStep(parsed.step);
//     }
//   }, []);

//   /* ===============================
//     Save to localStorage
//   =============================== */

//   useEffect(() => {
//     const data = { formData, step };
//     localStorage.setItem("checkoutData", JSON.stringify(data));
//   }, [formData, step]);

//   /* ===============================
//      Validation
//   =============================== */

//   const validateField = (name: string, value: string) => {
//     const fieldSchema =
//       checkoutSchema.shape[name as keyof typeof checkoutSchema.shape];

//     if (!fieldSchema) return;

//     const result = fieldSchema.safeParse(value);

//     setErrors((prev) => ({
//       ...prev,
//       [name]: result.success
//         ? ""
//         : (result.error?.issues?.[0]?.message ?? "خطأ في الإدخال"),
//     }));
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
//   ) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     validateField(name, value);
//   };

//   /* ===============================
//      Form Validation
//   =============================== */

//   const isFormValid = checkoutSchema.safeParse(formData).success;

//   const step1Valid = checkoutSchema
//     .pick({ email: true, phone: true })
//     .safeParse(formData).success;

//   const step2Valid = checkoutSchema
//     .pick({ country: true, city: true, address: true })
//     .safeParse(formData).success;

//   /* ===============================
//      Step Control
//   =============================== */

//   const nextStep = (targetStep: number) => {
//     if (targetStep === 2 && !step1Valid) return;
//     if (targetStep === 3 && !step2Valid) return;

//     setStep(targetStep);
//   };

//   /* ===============================
//      Submit
//   =============================== */

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!otpVerified) {
//       alert("Please verify OTP first");
//       return;
//     }

//     router.push("/payment");
//   };

//   let progress = 0;

//   if (step1Valid) progress = 33;
//   if (step1Valid && step2Valid) progress = 66;
//   if (isFormValid) progress = 100;

//   return (
//     <form className="max-w-2xl mx-auto space-y-6" onSubmit={handleSubmit}>
//       <div className="h-2 bg-gray-200 rounded overflow-hidden">
//         <div
//           className="h-full bg-black transition-all duration-500"
//           style={{ width: `${progress}%` }}
//         />
//       </div>

//       {/* Step 1 */}

//       <Section
//         title="معلومات التواصل"
//         step={1}
//         currentStep={step}
//         setStep={setStep}
//       >
//         <input
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="البريد الإلكتروني"
//           className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50"
//         />
//         {errors.email && <ErrorText msg={errors.email} />}

//         <button
//           type="button"
//           onClick={sendOtp}
//           className="bg-black text-white px-4 py-2 rounded"
//         >
//           Send OTP
//         </button>

//         {otpSent && (
//           <div className="space-y-2">
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otpInput}
//               onChange={(e) => setOtpInput(e.target.value)}
//               className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50"
//             />

//             <button
//               type="button"
//               onClick={verifyOtp}
//               className="bg-black text-white px-4 py-2 rounded"
//             >
//               Verify OTP
//             </button>
//           </div>
//         )}

//         <input
//           name="phone"
//           value={formData.phone}
//           onChange={handleChange}
//           placeholder="رقم الهاتف"
//           className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50"
//         />
//         {errors.phone && <ErrorText msg={errors.phone} />}

//         <NextButton onClick={() => nextStep(2)} disabled={!step1Valid} />
//       </Section>

//       {/* Step 2 */}

//       <Section title="التوصيل" step={2} currentStep={step} setStep={setStep}>
//         <input
//           name="country"
//           value={formData.country}
//           onChange={handleChange}
//           placeholder="الدولة"
//           className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50"
//         />

//         <input
//           name="city"
//           value={formData.city}
//           onChange={handleChange}
//           placeholder="المدينة"
//           className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50"
//         />

//         <input
//           name="address"
//           value={formData.address}
//           onChange={handleChange}
//           placeholder="العنوان"
//           className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50"
//         />

//         <NextButton onClick={() => nextStep(3)} disabled={!step2Valid} />
//       </Section>

//       {/* Step 3 */}

//       <Section title="الدفع" step={3} currentStep={step} setStep={setStep}>
//         <select
//           name="paymentMethod"
//           value={formData.paymentMethod}
//           onChange={handleChange}
//           className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50"
//         >
//           <option value="">اختر طريقة الدفع</option>
//           <option value="credit">بطاقة ائتمان</option>
//         </select>
//       </Section>

//       <button
//         type="submit"
//         disabled={!isFormValid || isCartEmpty || loading || !otpVerified}
//         className={`w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-xl mt-4 text-2xl
//         ${
//           !isFormValid || isCartEmpty || loading || !otpVerified
//             ? "bg-gray-400 cursor-not-allowed opacity-60"
//             : "bg-[#2e2727] hover:bg-[#1f1a1a] cursor-pointer text-white"
//         }`}
//       >
//         <span>{loading ? "جارى المعالجة..." : "إتمام الطلب"}</span>
//         <FaTruckFast />
//       </button>
//     </form>
//   );
// }

// /* UI Components */

// function Section({ title, step, currentStep, setStep, children }: any) {
//   return (
//     <div className="border-b rounded-lg overflow-hidden text-black">
//       <div
//         className="p-4 font-semibold flex justify-end cursor-pointer"
//         onClick={() => currentStep >= step && setStep(step)}
//       >
//         {title}
//       </div>

//       <motion.div
//         initial={{ height: 0, opacity: 0 }}
//         animate={
//           currentStep === step
//             ? { height: "auto", opacity: 1 }
//             : { height: 0, opacity: 0 }
//         }
//         className="overflow-hidden"
//       >
//         <div className="p-4 space-y-4">{children}</div>
//       </motion.div>
//     </div>
//   );
// }

// function NextButton({
//   onClick,
//   disabled,
// }: {
//   onClick: () => void;
//   disabled: boolean;
// }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       disabled={disabled}
//       className={`w-full p-3 rounded transition
//       ${
//         disabled
//           ? "bg-gray-400 cursor-not-allowed"
//           : "bg-black text-white hover:opacity-90 cursor-pointer"
//       }`}
//     >
//       متابعة
//     </button>
//   );
// }

// function ErrorText({ msg }: { msg: string }) {
//   return <p className="text-red-500 text-sm">{msg}</p>;
// }

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { FaTruckFast } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

type CheckoutData = {
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  paymentMethod: string;
  name: string;
};

const checkoutSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صالح"),
  phone: z.string().regex(/^[0-9+\s]{8,15}$/, "رقم الهاتف غير صحيح"),
  country: z.string().min(2, "ادخل الدولة"),
  city: z.string().min(2, "ادخل المدينة"),
  address: z.string().min(5, "العنوان قصير"),
  paymentMethod: z.string().min(1, "اختر طريقة الدفع"),
});

export default function CheckoutForm({
  isCartEmpty,
  discount,
}: {
  isCartEmpty: boolean;
}) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  // const [serverErrorMessage, setServerErrorMessage] = useState("");

  // const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  // const [otpVerified, setOtpVerified] = useState(false);

  const router = useRouter();
  const { cart, totalPrice } = useCart();

  const [formData, setFormData] = useState<CheckoutData>({
    email: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    paymentMethod: "",
    name: "",
  });

  /* ===============================
     Send OTP using Hostinger PHP
  =============================== */
  // const sendOtp = async () => {
  //   if (!formData.email) {
  //     alert("Please enter your email first");
  //     return;
  //   }

  //   const otp = Math.floor(100000 + Math.random() * 900000);
  //   localStorage.setItem("otp", otp.toString());
  //   localStorage.setItem("otpExpiry", (Date.now() + 300000).toString()); // 5 mins

  //   try {
  //     const response = await fetch("https://yourdomain.com/send_otp.php", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email: formData.email, otp }),
  //     });

  //     const result = await response.json();

  //     if (result.status === "success") {
  //       alert("OTP sent to your Gmail!");
  //       setOtpSent(true);
  //     } else {
  //       alert("Failed to send OTP: " + result.message);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert("Failed to send OTP");
  //   }
  // };

  /* ===============================
     Verify OTP
  =============================== */
  // const verifyOtp = () => {
  //   const savedOtp = localStorage.getItem("otp");
  //   const expiry = localStorage.getItem("otpExpiry");

  //   if (!savedOtp || !expiry) {
  //     alert("No OTP found");
  //     return;
  //   }

  //   if (Date.now() > Number(expiry)) {
  //     alert("OTP expired");
  //     return;
  //   }

  //   if (otpInput === savedOtp) {
  //     setOtpVerified(true);
  //     alert("OTP verified");
  //   } else {
  //     alert("Incorrect OTP");
  //   }
  // };

  /* ===============================
     Load from localStorage
  =============================== */
  useEffect(() => {
    const saved = localStorage.getItem("checkoutData");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.formData) setFormData(parsed.formData);
      if (parsed.step) setStep(parsed.step);
    }
  }, []);

  /* ===============================
     Save to localStorage
  =============================== */
  useEffect(() => {
    const data = { formData, step };
    localStorage.setItem("checkoutData", JSON.stringify(data));
  }, [formData, step]);

  /* ===============================
     Validation
  =============================== */
  const validateField = (name: string, value: string) => {
    const fieldSchema =
      checkoutSchema.shape[name as keyof typeof checkoutSchema.shape];

    if (!fieldSchema) return;

    const result = fieldSchema.safeParse(value);

    setErrors((prev) => ({
      ...prev,
      [name]: result.success
        ? ""
        : (result.error?.issues?.[0]?.message ?? "خطأ في الإدخال"),
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  /* ===============================
     Form Validation
  =============================== */
  const isFormValid = checkoutSchema.safeParse(formData).success;
  const step1Valid = checkoutSchema
    .pick({ email: true, phone: true })
    .safeParse(formData).success;
  const step2Valid = checkoutSchema
    .pick({ country: true, city: true, address: true })
    .safeParse(formData).success;

  /* ===============================
     Step Control
  =============================== */
  const nextStep = (targetStep: number) => {
    if (targetStep === 2 && !step1Valid) return;
    if (targetStep === 3 && !step2Valid) return;
    setStep(targetStep);
  };

  /* ===============================
     Submit
  =============================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // if (!otpVerified) {
    //   alert("Please verify OTP first");
    //   return;
    // }

    router.push("/payment");
  };

  /* ===============================
     Progress
  =============================== */
  let progress = 0;
  if (step1Valid) progress = 33;
  if (step1Valid && step2Valid) progress = 66;
  if (isFormValid) progress = 100;

  return (
    <form className="max-w-2xl mx-auto space-y-6" onSubmit={handleSubmit}>
      <div className="h-2 bg-gray-200 rounded overflow-hidden">
        <div
          className="h-full bg-black transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step 1 */}
      <Section
        title="معلومات التواصل"
        step={1}
        currentStep={step}
        setStep={setStep}
      >
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="البريد الإلكتروني"
          className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50"
        />
        {errors.email && <ErrorText msg={errors.email} />}

        {/* <button
          type="button"
          onClick={sendOtp}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Send OTP
        </button> */}

        {/* {otpSent && (
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50"
            />
            <button
              type="button"
              onClick={verifyOtp}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Verify OTP
            </button>
          </div>
        )} */}

        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="رقم الهاتف"
          className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50"
        />
        {errors.phone && <ErrorText msg={errors.phone} />}

        <NextButton
          onClick={() => nextStep(2)}
          disabled={
            !step1Valid
            // || !otpVerified
          }
        />
      </Section>

      {/* Step 2 */}
      <Section title="التوصيل" step={2} currentStep={step} setStep={setStep}>
        <input
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="الدولة"
          className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50"
        />
        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="المدينة"
          className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50"
        />
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="العنوان"
          className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50"
        />
        <NextButton onClick={() => nextStep(3)} disabled={!step2Valid} />
      </Section>

      {/* Step 3 */}
      <Section title="الدفع" step={3} currentStep={step} setStep={setStep}>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50"
        >
          <option value="">اختر طريقة الدفع</option>
          <option value="credit">بطاقة ائتمان</option>
        </select>
      </Section>

      <button
        type="submit"
        disabled={
          !isFormValid || isCartEmpty || loading
          // || !otpVerified
        }
        className={`w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-xl mt-4 text-2xl
        ${
          !isFormValid || isCartEmpty || loading
            ? // || !otpVerified
              "bg-gray-400 cursor-not-allowed opacity-60"
            : "bg-[#2e2727] hover:bg-[#1f1a1a] cursor-pointer text-white"
        }`}
      >
        <span>{loading ? "جارى المعالجة..." : "إتمام الطلب"}</span>
        <FaTruckFast />
      </button>
    </form>
  );
}

/* UI Components */
function Section({ title, step, currentStep, setStep, children }: any) {
  return (
    <div className="border-b rounded-lg overflow-hidden text-black">
      <div
        className="p-4 font-semibold flex justify-end cursor-pointer"
        onClick={() => currentStep >= step && setStep(step)}
      >
        {title}
      </div>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={
          currentStep === step
            ? { height: "auto", opacity: 1 }
            : { height: 0, opacity: 0 }
        }
        className="overflow-hidden"
      >
        <div className="p-4 space-y-4">{children}</div>
      </motion.div>
    </div>
  );
}

function NextButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full p-3 rounded transition
      ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-black text-white hover:opacity-90 cursor-pointer"
      }`}
    >
      متابعة
    </button>
  );
}

function ErrorText({ msg }: { msg: string }) {
  return <p className="text-red-500 text-sm">{msg}</p>;
}
