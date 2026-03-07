"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  quantity: number;
  averageRating: number;
  reviews: string[]; // Assuming reviews is an array, adjust type as needed
};

export type ProductsContextType = {
  products: Product[];
  loading: boolean;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setProductEditing: (product: Product | null) => void;
};

const ProductsContext = createContext<ProductsContextType | null>(null);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const storedProducts = localStorage.getItem("products");

    // if (storedProducts?.length) {
    //   setProducts(JSON.parse(storedProducts));
    //   setLoading(false);
    // } else {
    fetch("https://localhost:7142/api/Products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        localStorage.setItem("products", JSON.stringify(data));
        setLoading(false);
      });
    // }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  return (
    <ProductsContext.Provider value={{ products, setProducts, loading }}>
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

// "use client";

// import { createContext, useContext, useEffect, useState } from "react";

// export type Product = {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   quantity: number;
//   images: string[];
//   photo?: string;
// };

// type ProductsContextType = {
//   products: Product[];
//   loading: boolean;
//   setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
// };

// const ProductsContext = createContext<ProductsContextType | null>(null);

// export function ProductsProvider({ children }: { children: React.ReactNode }) {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Load products once
//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     const stored = localStorage.getItem("products");

//     if (stored) {
//       setProducts(JSON.parse(stored));
//       setLoading(false);
//       return;
//     }

//     fetch("https://localhost:7142/api/Products")
//       .then((res) => res.json())
//       .then((data) => {
//         setProducts(data);
//         localStorage.setItem("products", JSON.stringify(data));
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   // Auto sync localStorage whenever products change
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       localStorage.setItem("products", JSON.stringify(products));
//     }
//   }, [products]);

//   return (
//     <ProductsContext.Provider value={{ products, setProducts, loading }}>
//       {children}
//     </ProductsContext.Provider>
//   );
// }

// export function useProducts() {
//   const context = useContext(ProductsContext);

//   if (!context) {
//     throw new Error("useProducts must be used inside ProductsProvider");
//   }

//   return context;
// }
