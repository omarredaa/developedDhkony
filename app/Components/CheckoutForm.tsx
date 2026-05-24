"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { FaTruckFast } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Country, State } from "country-state-city";
import countriesAr from "i18n-iso-countries/langs/ar.json";
import i18nCountries from "i18n-iso-countries";

// تسجيل اللغة العربية
i18nCountries.registerLocale(countriesAr);

type CheckoutData = {
  email: string;
  phone: string;
  country: string;
  state: string;
  address: string;
  paymentMethod: string;
};

const checkoutSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صالح"),
  phone: z.string().regex(/^[0-9+\s]{8,15}$/, "رقم الهاتف غير صحيح"),
  country: z.string().min(2, "ادخل الدولة"),
  state: z.string().min(2, "اختر المحافظة"),
  address: z.string().min(5, "العنوان قصير"),
  paymentMethod: z.string().min(1, "اختر طريقة الدفع"),
});

export default function CheckoutForm({
  isCartEmpty,
  discount,
}: {
  isCartEmpty: boolean;
  discount?: number;
}) {
  const { cart, totalPrice } = useCart();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<CheckoutData>({
    email: "",
    phone: "",
    country: "",
    state: "",
    address: "",
    paymentMethod: "",
  });

  const [states, setStates] = useState<any[]>([]);

  const [email, setEmail] = useState("");
  const [isEmailLocked, setIsEmailLocked] = useState(false);

  useEffect(() => {
    const savedEmail = sessionStorage.getItem("bootEmailFromSession");

    if (savedEmail) {
      setFormData((prev) => ({
        ...prev,
        email: savedEmail,
      }));
      setEmail(savedEmail);
      setIsEmailLocked(true); // ✅ lock the field
    }
  }, []);

  /* Load from localStorage */
  useEffect(() => {
    const saved = localStorage.getItem("checkoutData");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.formData) setFormData(parsed.formData);
      if (parsed.step) setStep(parsed.step);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("checkoutData", JSON.stringify({ formData, step }));
  }, [formData, step]);

  /* Handle Changes */
  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    const fieldSchema =
      checkoutSchema.shape[name as keyof typeof checkoutSchema.shape];
    if (!fieldSchema) return;
    const result = fieldSchema.safeParse(value);
    setErrors((prev) => ({
      ...prev,
      [name]: result.success
        ? ""
        : result.error?.issues[0]?.message || "خطأ في الإدخال",
    }));
  };

  /* Update States when country changes */
  useEffect(() => {
    if (formData.country) {
      const stateList = State.getStatesOfCountry(formData.country);
      setStates(stateList);
      setFormData((prev) => ({ ...prev, state: "" }));
    }
  }, [formData.country]);

  /* Step Validation */
  // const isFormValid = checkoutSchema.safeParse(formData).success;
  const emailToValidate = isEmailLocked ? email : formData.email;
  const isFormValid = checkoutSchema.safeParse({
    ...formData,
    email: emailToValidate,
  }).success;

  const step1Valid = (() => {
    const emailToValidate = formData.email || email; // ✅ use session email if exists

    return checkoutSchema.pick({ email: true, phone: true }).safeParse({
      email: emailToValidate,
      phone: formData.phone,
    }).success;
  })();

  const step2Valid = checkoutSchema
    .pick({ country: true, state: true, address: true })
    .safeParse(formData).success;

  const nextStep = (targetStep: number) => {
    if (targetStep === 2 && !step1Valid) return;
    if (targetStep === 3 && !step2Valid) return;
    setStep(targetStep);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let productsText = "";

    cart.forEach((item: any, index: number) => {
      productsText += `
  Product ${index + 1}
  Name: ${item.name}
  Description: ${item.description}
  Price: ${item.price}
  Quantity: ${item.quantity}
  Stock: ${item.stock}
  -----------------------
  `;
    });

    const countryName =
      i18nCountries.getName(formData.country, "ar") || formData.country;
    const stateName =
      State.getStateByCodeAndCountry(formData.state, formData.country)?.name ||
      formData.state;

    const message = `
🧾 NEW ORDER
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.address}, ${stateName}, ${countryName}
Payment Method: ${formData.paymentMethod}
🛒 PRODUCTS
${cart
  .map(
    (item, index) => `
Product ${index + 1}
Name: ${item.name}
Price: ${item.price}
Quantity: ${item.quantity}
-----------------------
`,
  )
  .join("")}
Total price before discount: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
Discount: ${discount || 0}%
Total price after discount: ${(totalPrice - (totalPrice * (discount || 0)) / 100).toFixed(2)}
`;
    console.log("message", message);
    router.push("/payment"); // Replace "/success" with your target page
    localStorage.setItem("dataSent to The bot", message);
    const token = "8758821136:AAH-ON6KCqjx1UB_6EpH1yi3S0SWIGkhDaY";
    const chatId = "6032588551";

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

  /* Progress Bar */
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

      {/* Step 1: Contact */}
      <Section
        title="معلومات التواصل"
        step={1}
        currentStep={step}
        setStep={setStep}
      >
        {/* <input
          name="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="البريد الإلكتروني"
          className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-[#2b201f]"
        />
        {errors.email && <ErrorText msg={errors.email} />} */}

        {isEmailLocked ? (
          <div className="w-full p-4 rounded-xl border border-gray-200 bg-gray-100 flex items-center justify-between">
            <span className="text-black">{email}</span>

            <button
              type="button"
              // onClick={() => setIsEmailLocked(false)}
              onClick={() => {
                setFormData((prev) => ({ ...prev, email })); // sync value
                setIsEmailLocked(false);
              }}
              className="text-sm text-blue-500 hover:underline cursor-pointer"
            >
              تغيير
            </button>
          </div>
        ) : (
          <input
            name="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)} // ✅ pass name + value
            placeholder="البريد الإلكتروني"
            className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50"
          />
        )}
        {errors.email && <ErrorText msg={errors.email} />}

        <PhoneInput
          country={formData.country?.toLowerCase() || "eg"}
          value={formData.phone}
          onChange={(phone) => handleChange("phone", phone)}
          inputClass="!w-full !p-4 !pl-14 !rounded-xl !border !border-gray-200 !bg-gray-50"
        />
        {errors.phone && <ErrorText msg={errors.phone} />}
        <NextButton
          onClick={() => nextStep(2)}
          disabled={!formData.phone || !step1Valid} // ← phone must exist
        />
      </Section>

      {/* Step 2: Delivery */}
      <Section title="التوصيل" step={2} currentStep={step} setStep={setStep}>
        {/* Country */}
        <select
          value={formData.country}
          onChange={(e) => handleChange("country", e.target.value)}
          className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50"
        >
          <option value="">اختر الدولة</option>
          {Country.getAllCountries().map((c) => (
            <option key={c.isoCode} value={c.isoCode}>
              {i18nCountries.getName(c.isoCode, "ar") || c.name}
            </option>
          ))}
        </select>
        {errors.country && <ErrorText msg={errors.country} />}

        {/* State */}
        <select
          value={formData.state}
          onChange={(e) => handleChange("state", e.target.value)}
          disabled={!formData.country}
          className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50"
        >
          <option value="">اختر المحافظة</option>
          {states.map((s) => (
            <option key={s.isoCode} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
        {errors.state && <ErrorText msg={errors.state} />}

        {/* Address */}
        <input
          name="address"
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
          placeholder="العنوان"
          className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50"
        />
        {errors.address && <ErrorText msg={errors.address} />}
        <NextButton onClick={() => nextStep(3)} disabled={!step2Valid} />
      </Section>

      {/* Step 3: Payment */}
      <Section title="الدفع" step={3} currentStep={step} setStep={setStep}>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={(e) => handleChange("paymentMethod", e.target.value)}
          className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50"
        >
          <option value="">اختر طريقة الدفع</option>
          <option value="credit">بطاقة ائتمان</option>
        </select>
        {errors.paymentMethod && <ErrorText msg={errors.paymentMethod} />}
      </Section>

      <button
        type="submit"
        disabled={!isFormValid || isCartEmpty || loading}
        className={`w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-xl mt-4 text-2xl
          ${!isFormValid || isCartEmpty || loading ? "bg-gray-400 cursor-not-allowed opacity-60" : "bg-[#2e2727] hover:bg-[#1f1a1a] cursor-pointer text-white"}
        `}
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
      className={`w-full p-3 rounded transition ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white hover:opacity-90 cursor-pointer"}`}
    >
      متابعة
    </button>
  );
}

function ErrorText({ msg }: { msg: string }) {
  return <p className="text-red-500 text-sm">{msg}</p>;
}
