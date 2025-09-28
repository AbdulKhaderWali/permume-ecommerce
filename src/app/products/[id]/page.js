'use client';

import { useState, useEffect, useContext } from 'react';
import { perfumes } from '@/data/perfumes';
import Spinner from '@/components/ui/Spinner';
import { CartContext } from '@/context/CartContext';
import Button from '@/components/ui/Button';
import { FaShoppingCart } from 'react-icons/fa';

const ProductDetailsPage = ({ params }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = () => {
      setTimeout(() => {
        const foundProduct = perfumes.find((p) => p.id === parseInt(params.id));
        setProduct(foundProduct);
        setLoading(false);
      }, 500); // Reduced timeout for faster page load
    };
    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  if (loading) {
    return <Spinner />;
  }

  if (!product) {
    return <p className="text-center text-white">Product not found.</p>;
  }

  return (
    <div className="container mx-auto py-12 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <img src={product.image} alt={product.name} className="w-full rounded-lg shadow-lg" />
        </div>
        <div>
          <h1 className="text-4xl font-serif font-bold mb-4">{product.name}</h1>
          <p className="text-2xl text-gold-500 mb-6">${product.price}</p>
          <p className="text-lg mb-8 leading-relaxed">{product.description}</p>
          <Button 
            onClick={handleAddToCart}
            variant="primary"
            className="w-full md:w-auto"
            icon={isAdding ? null : FaShoppingCart}
            disabled={isAdding}
          >
            {isAdding ? 'Added!' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
