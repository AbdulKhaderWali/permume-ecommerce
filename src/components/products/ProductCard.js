'use client';

import Link from 'next/link';
import { useContext, useState } from 'react';
import { CartContext } from '@/context/CartContext';
import Button from '../ui/Button';
import { FaShoppingCart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <Link href={`/products/${product.id}`} className="block">
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-serif font-semibold">{product.name}</h3>
          <p className="text-gold-500 mt-2">${product.price}</p>
        </div>
      </Link>
      <div className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          variant="primary"
          className="w-full"
          icon={isAdding ? null : FaShoppingCart}
          disabled={isAdding}
        >
          {isAdding ? 'Added!' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
