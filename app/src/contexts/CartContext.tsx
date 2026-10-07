/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// The cart is a selection of designs. Designs have no individual prices:
// each clean download uses one credit, bought in packs at checkout.
interface CartItem {
  id: string;
  name: string;
  category: string;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems((items) => (items.some((i) => i.id === item.id) ? items : [...items, item]));
  };

  const removeFromCart = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartCount: cartItems.length }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
