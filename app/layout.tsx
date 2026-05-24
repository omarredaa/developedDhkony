import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { CartProvider } from "./context/CartContext";
import { Cairo } from "next/font/google";
import { ProductsProvider } from "./context/ProductsContext";
import { AuthProvider } from "./context/AuthContext";
import LearnProvider from "./learningReact/learnContext";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Dkhony",
  description: "عطور - فوحان -ثبات",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    siteName: "Dkhony",
    title: "Dhony",
    description: "عطور - فوحان -ثبات",
    url: "https://dkhonemiraates.com/",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Dhkony",
      },
    ],
  },
};

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar">
      <link rel="icon" href="/logo.png" />
      <body className={`${cairo.className} `}>
        <LearnProvider>
          <AuthProvider>
            <ProductsProvider>
              <CartProvider>{children}</CartProvider>{" "}
            </ProductsProvider>
          </AuthProvider>
        </LearnProvider>
      </body>
    </html>
  );
}
