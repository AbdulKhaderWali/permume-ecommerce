'use client';

import { useState, useEffect } from 'react';
import { perfumes } from '@/data/perfumes';
import ProductCard from './ProductCard';
import Spinner from '../ui/Spinner';

const ProductList = ({ filters }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = () => {
      setTimeout(() => {
        setProducts(perfumes);
        setLoading(false);
      }, 500); 
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!loading) {
      let tempProducts = [...products];

      if (filters.category !== 'all') {
        tempProducts = tempProducts.filter(p => p.category === filters.category);
      }

      if (filters.brand !== 'all') {
        tempProducts = tempProducts.filter(p => p.brand === filters.brand);
      }

      tempProducts = tempProducts.filter(p => p.price <= filters.priceRange[1]);

      setFilteredProducts(tempProducts);
    }
  }, [filters, products, loading]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
