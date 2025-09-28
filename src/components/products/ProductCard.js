'use client';

import Link from 'next/link';
import { useContext, useState } from 'react';
import { CartContext } from '@/context/CartContext';
import Button from '../ui/Button';
import { FaShoppingCart, FaCheck } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => {
      setIsAdding(false);
    }, 1500);
  };

  return (
    <div className="group relative bg-gray-900 text-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-gold-500/30 hover:-translate-y-2">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative h-72">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300"></div>
        </div>
        <div className="p-5">
          <p className="text-sm text-gold-500 font-semibold uppercase tracking-wider">{product.brand}</p>
          <h3 className="text-xl font-serif font-bold mt-1 truncate">{product.name}</h3>
          <p className="text-lg font-light text-gray-300 mt-2">${product.price.toFixed(2)}</p>
        </div>
      </Link>
      <div className="p-5 pt-0">
        <Button 
          onClick={handleAddToCart}
          variant={isAdding ? "secondary" : "primary"}
          className="w-full transition-all duration-300"
          icon={isAdding ? FaCheck : FaShoppingCart}
          disabled={isAdding}
        >
          {isAdding ? 'Added to Cart!' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
