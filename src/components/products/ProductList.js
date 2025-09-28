'use client';

import { useState, useEffect } from 'react';
import { perfumes } from '@/data/perfumes';
import ProductCard from './ProductCard';
import Spinner from '../ui/Spinner';

const ProductList = ({ filters, onFilteredCountChange }) => {
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

      // Category filter
      if (filters.category !== 'all') {
        tempProducts = tempProducts.filter(p => p.category === filters.category);
      }

      // Brand filter
      if (filters.brand !== 'all') {
        tempProducts = tempProducts.filter(p => p.brand === filters.brand);
      }

      // Price range filter
      tempProducts = tempProducts.filter(p => p.price <= filters.priceRange[1] && p.price >= filters.priceRange[0]);

      // Fragrance family filter
      if (filters.fragranceFamily !== 'all') {
        tempProducts = tempProducts.filter(p => p.fragranceFamily === filters.fragranceFamily);
      }

      // Concentration filter
      if (filters.concentration !== 'all') {
        tempProducts = tempProducts.filter(p => p.concentration === filters.concentration);
      }

      // Seasonality filter
      if (filters.seasonality !== 'all') {
        tempProducts = tempProducts.filter(p => p.seasonality === filters.seasonality);
      }

      // Time of day filter
      if (filters.timeOfDay !== 'all') {
        tempProducts = tempProducts.filter(p => p.timeOfDay === filters.timeOfDay);
      }

      // Rating filter
      if (filters.rating > 0) {
        tempProducts = tempProducts.filter(p => p.rating >= filters.rating);
      }

      // Sale filter
      if (filters.onSale) {
        tempProducts = tempProducts.filter(p => p.onSale === true);
      }

      setFilteredProducts(tempProducts);
      
      // Notify parent component of filtered count
      if (onFilteredCountChange) {
        onFilteredCountChange(tempProducts.length);
      }
    }
  }, [filters, products, loading, onFilteredCountChange]);

  if (loading) {
    return <Spinner />;
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl text-gray-600 mb-4">🔍</div>
        <h3 className="text-2xl font-serif text-white mb-2">No products found</h3>
        <p className="text-gray-400 max-w-md mx-auto">
          Try adjusting your filters or browse our complete collection to discover your perfect fragrance.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 px-4">
          <div className="text-6xl text-gray-600 mb-6">🔍</div>
          <h3 className="text-2xl font-serif text-white mb-4">No products found</h3>
          <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
            Try adjusting your filters or browse our complete collection to discover your perfect fragrance.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
