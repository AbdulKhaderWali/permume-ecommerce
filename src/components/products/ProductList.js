'use client';

import { useState, useEffect } from 'react';
import { perfumes } from '@/data/perfumes';
import ProductCard from './ProductCard';
import Spinner from '../ui/Spinner';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = () => {
      setTimeout(() => {
        setProducts(perfumes);
        setLoading(false);
      }, 1000);
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
