'use client';

import { useState, useEffect, useContext } from 'react';
import { perfumes } from '@/data/perfumes';
import Spinner from '@/components/ui/Spinner';
import { CartContext } from '@/context/CartContext';

const ProductDetailsPage = ({ params }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = () => {
      setTimeout(() => {
        const foundProduct = perfumes.find((p) => p.id === parseInt(params.id));
        setProduct(foundProduct);
        setLoading(false);
      }, 1000);
    };
    fetchProduct();
  }, [params.id]);

  if (loading) {
    return <Spinner />;
  }

  if (!product) {
    return <p className="text-center text-white">Product not found.</p>;
  }

  return (
    <div className="container mx-auto py-8 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <img src={product.image} alt={product.name} className="w-full rounded-lg shadow-lg" />
        </div>
        <div>
          <h1 className="text-4xl font-serif font-bold mb-4">{product.name}</h1>
          <p className="text-2xl text-gold-500 mb-4">${product.price}</p>
          <p className="text-lg mb-6">{product.description}</p>
          <button 
            onClick={() => addToCart(product)}
            className="bg-gold-500 text-black py-3 px-8 rounded-lg hover:bg-gold-600 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
