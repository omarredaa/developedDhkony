"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";

/* ===============================
 Types
=============================== */

type CheckoutData = {
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  paymentMethod: string;
};

/* ===============================
 Schema Validation
=============================== */

const checkoutSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صالح"),
  phone: z.string().regex(/^[0-9+\s]{8,15}$/, "رقم الهاتف غير صحيح"),
  country: z.string().min(2, "ادخل الدولة"),
  city: z.string().min(2, "ادخل المدينة"),
  address: z.string().min(5, "العنوان قصير"),
  paymentMethod: z.string().min(1, "اختر طريقة الدفع"),
});

/* ===============================
 Component
=============================== */

export default function CheckoutForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<CheckoutData>({
    email: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    paymentMethod: "",
  });

  /* ===============================
 LocalStorage Sync
=============================== */

  useEffect(() => {
    const saved = localStorage.getItem("checkoutData");
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("checkoutData", JSON.stringify(formData));
  }, [formData]);

  /* ===============================
 Realtime Validation
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

  /* ===============================
 Input Handler
=============================== */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };

  /* ===============================
 Step Validation Engine
=============================== */

  const validateStep = (stepNumber: number) => {
    let data: Partial<CheckoutData> = {};

    if (stepNumber === 1) {
      data = {
        email: formData.email,
        phone: formData.phone,
      };
    }

    if (stepNumber === 2) {
      data = {
        country: formData.country,
        city: formData.city,
        address: formData.address,
      };
    }

    if (stepNumber === 3) {
      data = {
        paymentMethod: formData.paymentMethod,
      };
    }

    const result = checkoutSchema.partial().safeParse(data);

    if (!result.success) {
      const newErrors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          newErrors[issue.path[0] as string] =
            issue.message ?? "خطأ في الإدخال";
        }
      });

      setErrors(newErrors);
      return false;
    }

    return true;
  };

  const nextStep = (targetStep: number) => {
    if (!validateStep(targetStep - 1)) return;
    setStep(targetStep);
  };

  /* ===============================
 Submit Order (.NET Backend Ready)
=============================== */

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    try {
      setLoading(true);

      const res = await fetch("https://your-dotnet-api.com/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error();

      localStorage.removeItem("checkoutData");

      alert("تم تأكيد الطلب");
    } catch {
      alert("فشل إرسال الطلب");
    } finally {
      setLoading(false);
    }
  };

  const progress = (step / 3) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="h-2 bg-gray-200 rounded overflow-hidden">
        <div
          className="h-full bg-black transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

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
          className="w-full p-4 rounded-xl border border-gray-200 
bg-gray-50 
focus:bg-white 
focus:border-black 
focus:ring-2 focus:ring-black/10 
transition-all duration-300 
outline-none text-sm shadow-sm hover:border-gray-300"
        />
        {errors.email && <ErrorText msg={errors.email} />}

        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="رقم الهاتف"
          className="w-full p-4 rounded-xl border border-gray-200 
bg-gray-50 
focus:bg-white 
focus:border-black 
focus:ring-2 focus:ring-black/10 
transition-all duration-300 
outline-none text-sm shadow-sm hover:border-gray-300"
        />
        {errors.phone && <ErrorText msg={errors.phone} />}

        <NextButton onClick={() => nextStep(2)} />
      </Section>

      <Section title="التوصيل" step={2} currentStep={step} setStep={setStep}>
        <div className="flex justify-end items-end flex-col gap-5">
          {" "}
          <p className="font-extrabold">الدولة</p>
          <input
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="الدولة"
            className="w-full p-4 rounded-xl border border-gray-200 
bg-gray-50 
focus:bg-white 
focus:border-black 
focus:ring-2 focus:ring-black/10 
transition-all duration-300 
outline-none text-sm shadow-sm hover:border-gray-300"
          />
          {errors.country && <ErrorText msg={errors.country} />}
          <p className="font-extrabold">المدينة</p>
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="المدينة"
            className="w-full p-4 rounded-xl border border-gray-200 
bg-gray-50 
focus:bg-white 
focus:border-black 
focus:ring-2 focus:ring-black/10 
transition-all duration-300 
outline-none text-sm shadow-sm hover:border-gray-300"
          />
          {errors.city && <ErrorText msg={errors.city} />}
          <p className="font-extrabold">العنوان</p>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="العنوان"
            className="w-full p-4 rounded-xl border border-gray-200 
bg-gray-50 
focus:bg-white 
focus:border-black 
focus:ring-2 focus:ring-black/10 
transition-all duration-300 
outline-none text-sm shadow-sm hover:border-gray-300"
          />
          {errors.address && <ErrorText msg={errors.address} />}
          <NextButton onClick={() => nextStep(3)} />
        </div>
      </Section>

      <Section title="الدفع" step={3} currentStep={step} setStep={setStep}>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="w-full p-4 rounded-xl border border-gray-200 
bg-gray-50 
focus:bg-white 
focus:border-black 
focus:ring-2 focus:ring-black/10 
transition-all duration-300 
outline-none text-sm shadow-sm hover:border-gray-300"
        >
          <option value="">اختر طريقة الدفع</option>
          <option value="credit">بطاقة ائتمان</option>
          <option value="mada">مدى</option>
          <option value="cod">الدفع عند الاستلام</option>
        </select>

        {errors.paymentMethod && <ErrorText msg={errors.paymentMethod} />}
      </Section>
    </div>
  );
}

/* ===============================
 UI Components
=============================== */

interface SectionProps {
  title: string;
  step: number;
  currentStep: number;
  setStep: (step: number) => void;
  children: React.ReactNode;
}

function Section({
  title,
  step,
  currentStep,
  setStep,
  children,
}: SectionProps) {
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

function NextButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-black text-white p-3 rounded hover:opacity-90 transition"
    >
      متابعة
    </button>
  );
}

function ErrorText({ msg }: { msg: string }) {
  return <p className="text-red-500 text-sm">{msg}</p>;
}
