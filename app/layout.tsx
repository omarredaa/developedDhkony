import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { CartProvider } from "./context/CartContext";
import { Cairo } from "next/font/google";
import { ProductsProvider } from "./context/ProductsContext";
import { AuthProvider } from "./context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dkhony",
  description: "عطور - فوحان -ثبات",
  icons: {
    icon: "/logo.png",
  },
};

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-cairo",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${cairo.variable} font-sans `}
      >
        <AuthProvider>
          <ProductsProvider>
            <CartProvider>{children}</CartProvider>{" "}
          </ProductsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
