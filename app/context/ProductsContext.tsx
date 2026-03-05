"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
};

type ProductsContextType = {
  products: Product[];
  loading: boolean;
};

const ProductsContext = createContext<ProductsContextType | null>(null);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");

    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
      setLoading(false);
    } else {
      fetch("https://f075e3bea034bf.lhr.life/api/Products")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          localStorage.setItem("products", JSON.stringify(data));
          setLoading(false);
        });
    }
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProducts must be used inside ProductsProvider");
  }

  return context;
}
