"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface CartContextValue {
  count: number;
  addItem: (qty?: number) => void;
  wishlist: number;
  toggleWishlist: (id: string) => void;
  isWished: (id: string) => boolean;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  const [wished, setWished] = useState<Set<string>>(new Set());

  const addItem = useCallback(
    (qty: number = 1) => setCount((c) => c + Math.max(1, qty)),
    []
  );

  const toggleWishlist = useCallback((id: string) => {
    setWished((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const isWished = useCallback((id: string) => wished.has(id), [wished]);

  return (
    <CartContext.Provider
      value={{
        count,
        addItem,
        wishlist: wished.size,
        toggleWishlist,
        isWished,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
