"use client";

import { Globe } from "lucide-react";
import { useState, useEffect } from "react";

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("en");

  // تحميل اللغة من localStorage
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved) setLanguage(saved);
  }, []);

  // تغيير اللغة
  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
    setOpen(false);

    // تغيير اتجاه الصفحة
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-center items-center gap-2 cursor-pointer"
      >
        <span>اللغة</span>
        <Globe size={28} className=" hover:scale-110 transition" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white shadow-xl rounded-xl overflow-hidden border">
          <button
            onClick={() => changeLanguage("ar")}
            className="block w-full text-right px-4 py-2 hover:bg-gray-100"
          >
            🇸🇦 عربي
          </button>

          <button
            onClick={() => changeLanguage("en")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            🇺🇸 English
          </button>
        </div>
      )}
    </div>
  );
}
