'use client';

import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import Spinner from '@/components/ui/Spinner';
import Button from '@/components/ui/Button';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, loading } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto py-8 text-white">
      <h1 className="text-4xl font-serif font-bold text-center mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b border-gray-700 py-4">
              <div className="flex items-center">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg mr-4" />
                <div>
                  <h3 className="text-lg font-serif">{item.name}</h3>
                  <p className="text-gold-500">${item.price}</p>
                </div>
              </div>
              <div className="flex items-center">
                <input 
                  type="number" 
                  value={item.quantity} 
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-16 text-center bg-gray-800 rounded-lg mx-4" 
                />
                <Button onClick={() => removeFromCart(item.id)} variant="text">Remove</Button>
              </div>
            </div>
          ))}
          <div className="text-right mt-8">
            <h2 className="text-2xl font-serif">Total: <span className="text-gold-500">${total.toFixed(2)}</span></h2>
            <Button variant="primary" className="mt-4">
              Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
