'use client';

import { useState } from 'react';

const Filter = ({ onFilterChange }) => {
  const [category, setCategory] = useState('all');
  const [brand, setBrand] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 500]);

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    onFilterChange({ category: newCategory, brand, priceRange });
  };

  const handleBrandChange = (e) => {
    const newBrand = e.target.value;
    setBrand(newBrand);
    onFilterChange({ category, brand: newBrand, priceRange });
  };

  const handlePriceChange = (e) => {
    const newPrice = parseInt(e.target.value);
    setPriceRange([0, newPrice]);
    onFilterChange({ category, brand, priceRange: [0, newPrice] });
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg mb-8">
      <h3 className="text-2xl font-serif font-semibold text-white mb-6">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="category" className="block text-gold-500 mb-2">Category</label>
          <select id="category" value={category} onChange={handleCategoryChange} className="w-full bg-gray-800 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500">
            <option value="all">All</option>
            <option value="for-her">For Her</option>
            <option value="for-him">For Him</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>
        <div>
          <label htmlFor="brand" className="block text-gold-500 mb-2">Brand</label>
          <select id="brand" value={brand} onChange={handleBrandChange} className="w-full bg-gray-800 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500">
            <option value="all">All</option>
            <option value="Chanel">Chanel</option>
            <option value="Dior">Dior</option>
            <option value="Creed">Creed</option>
            <option value="Tom Ford">Tom Ford</option>
            <option value="Jo Malone London">Jo Malone London</option>
            <option value="Paco Rabanne">Paco Rabanne</option>
            <option value="Yves Saint Laurent">Yves Saint Laurent</option>
            <option value="Giorgio Armani">Giorgio Armani</option>
            <option value="Maison Francis Kurkdjian">Maison Francis Kurkdjian</option>
          </select>
        </div>
        <div>
          <label htmlFor="price" className="block text-gold-500 mb-2">Price (up to ${priceRange[1]})</label>
          <input type="range" id="price" min="0" max="500" value={priceRange[1]} onChange={handlePriceChange} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-gold-500" />
        </div>
      </div>
    </div>
  );
};

export default Filter;
