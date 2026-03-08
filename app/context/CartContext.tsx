"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
};

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  changeQuantity: (id: number, amount: number) => void;
  totalPrice: number;
  cartCount: number;
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // ✅ نقرأ localStorage بعد الماونت
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      setCart(JSON.parse(saved));
    }
    setMounted(true);
  }, []);

  // ✅ نحفظ في localStorage عند أي تغيير
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, mounted]);

  // const addToCart = (product: Product) => {
  //   setCart((prev) => {
  //     const existing = prev.find((item) => item.id === product.id);

  //     if (existing) {
  //       return prev.map((item) =>
  //         item.id === product.id
  //           ? { ...item, quantity: (item.quantity || 1) + 1 }
  //           : item,
  //       );
  //     }

  //     return [...prev, { ...product, quantity: 1 }];
  //   });
  // };
  // const addToCart = (product: Product) => {
  //   setCart((prev) => {
  //     const existing = prev.find((item) => item.id === product.id);

  //     if (existing) {
  //       if ((existing.quantity || 1) >= product.stock) {
  //         alert("⚠️ لا يمكن إضافة أكثر من الكمية المتاحة");
  //         return prev;
  //       }

  //       return prev.map((item) =>
  //         item.id === product.id
  //           ? { ...item, quantity: (item.quantity || 1) + 1 }
  //           : item,
  //       );
  //     }

  //     return [...prev, { ...product, quantity: 1 }];
  //   });
  // };
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        if (existing.quantity >= existing.stock) {
          alert("⚠️ لا يمكن إضافة أكثر من الكمية المتاحة");
          return prev;
        }

        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      // 👇 هنا نضيف stock عند أول إضافة
      return [
        ...prev,
        {
          ...product,
          quantity: 1, // الكمية في الكارت
          stock: product.stock ?? product.quantity, // المخزون الحقيقي
        },
      ];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // const changeQuantity = (id: number, amount: number) => {
  //   setCart((prev) =>
  //     prev.map((item) =>
  //       item.id === id
  //         ? {
  //             ...item,
  //             quantity: Math.max(1, (item.quantity || 1) + amount),
  //           }
  //         : item,
  //     ),
  //   );
  // };
  const changeQuantity = (id: number, amount: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQuantity = (item.quantity || 1) + amount;

          if (newQuantity > item.stock) {
            alert("⚠️ الكمية المطلوبة أكبر من المتوفر في المخزن");
            return item;
          }

          return {
            ...item,
            quantity: Math.max(1, newQuantity),
          };
        }

        return item;
      }),
    );
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0,
  );

  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  if (!mounted) return null; // 👈 يمنع hydration mismatch

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        changeQuantity,
        totalPrice,
        cartCount,
        setMenuOpen,
        menuOpen,
        cartOpen,
        setCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};
