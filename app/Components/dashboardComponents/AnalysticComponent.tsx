"use client";
import React, { useEffect, useState } from "react";

export default function AnalysticComponent() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // 2s delay
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-linear-to-br from-black via-zinc-900 to-black text-white">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          <p className="text-white mt-4">Loading Analystics...</p>
        </div>
      </div>
    );
  }
  return <div>AnalysticComponent</div>;
}
