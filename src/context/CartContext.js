'use client';

import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const addToCart = (product) => {
    setLoading(true);
    setTimeout(() => {
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === product.id);
        if (existingItem) {
          return prevCart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...prevCart, { ...product, quantity: 1 }];
      });
      setLoading(false);
    }, 500);
  };

  const removeFromCart = (productId) => {
    setLoading(true);
    setTimeout(() => {
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
      setLoading(false);
    }, 500);
  };

  const updateQuantity = (productId, quantity) => {
    setLoading(true);
    setTimeout(() => {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: quantity } : item
        )
      );
      setLoading(false);
    }, 500);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, loading }}>
      {children}
    </CartContext.Provider>
  );
};
