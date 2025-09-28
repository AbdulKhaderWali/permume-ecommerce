'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-black text-white p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-serif font-bold text-gold-500">
          Elysian
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/" className="hover:text-gold-500 transition-colors">
            Home
          </Link>
          <Link href="/shop" className="hover:text-gold-500 transition-colors">
            Shop
          </Link>
          <Link href="/cart" className="relative hover:text-gold-500 transition-colors">
            Cart 
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-gold-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
