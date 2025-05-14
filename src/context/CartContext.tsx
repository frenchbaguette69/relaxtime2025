// context/CartContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useRef,
} from "react";
import type { Product } from "@prisma/client";

type CartItem = {
  id: string;
  product: Product;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  total: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const firstRender = useRef(true);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (firstRender.current) {
      if (typeof window !== "undefined") {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          try {
            setItems(JSON.parse(savedCart));
          } catch (e) {
            console.error("Failed to parse saved cart", e);
          }
        }
        firstRender.current = false;
      }
    }

    if (typeof window !== "undefined" && !firstRender.current) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items]);

  // Calculate derived values
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce(
    (sum, item) =>
      sum + (item.product.offerPrice || item.product.price) * item.quantity,
    0,
  );

  // For now, total is same as subtotal
  const total = subtotal;

  // Cart operations
  const addItem = (product: Product, quantity = 1) => {
    const existingItem = items.find((item) => item.product.id === product.id);

    if (existingItem)
      updateQuantity(product.id, existingItem.quantity + quantity);
    else
      setItems((prevItems) => [
        ...prevItems,
        { id: product.id, product, quantity },
      ]);
    // Open cart when adding items
    setIsOpen(true);
  };

  const removeItem = (productId: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId),
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => {
    setIsOpen(true);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        total,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
