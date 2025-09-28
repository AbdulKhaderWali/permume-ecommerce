'use client';

import { useState } from 'react';
import { FaFilter, FaTimes, FaChevronDown } from 'react-icons/fa';

const Filter = ({ onFilterChange, totalProducts = 0, filteredCount = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    brand: 'all',
    priceRange: [0, 500],
    fragranceFamily: 'all',
    concentration: 'all',
    seasonality: 'all',
    timeOfDay: 'all',
    rating: 0,
    onSale: false
  });

  const brands = [
    'Chanel', 'Dior', 'Creed', 'Tom Ford', 'Jo Malone London', 
    'Paco Rabanne', 'Yves Saint Laurent', 'Giorgio Armani', 
    'Maison Francis Kurkdjian', 'Versace', 'Marc Jacobs', 'Byredo'
  ];

  const fragranceFamilies = [
    'floral', 'woody-aromatic', 'woody-fruity', 'oriental-floral', 
    'fruity-floral', 'woody-spicy', 'oriental-gourmand', 'aquatic-fresh', 
    'amber-floral', 'woody-oriental'
  ];

  const concentrations = [
    'eau-de-cologne', 'eau-de-toilette', 'eau-de-parfum', 'parfum'
  ];

  const seasons = [
    'spring-summer', 'fall-winter', 'all-seasons'
  ];

  const timesOfDay = [
    'day', 'evening', 'night'
  ];

  const updateFilter = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const resetFilters = {
      category: 'all',
      brand: 'all',
      priceRange: [0, 500],
      fragranceFamily: 'all',
      concentration: 'all',
      seasonality: 'all',
      timeOfDay: 'all',
      rating: 0,
      onSale: false
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const hasActiveFilters = () => {
    return filters.category !== 'all' || 
           filters.brand !== 'all' || 
           filters.priceRange[1] !== 500 ||
           filters.fragranceFamily !== 'all' ||
           filters.concentration !== 'all' ||
           filters.seasonality !== 'all' ||
           filters.timeOfDay !== 'all' ||
           filters.rating > 0 ||
           filters.onSale;
  };

  const formatLabel = (str) => {
    return str.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-xl shadow-2xl border border-gray-800/50 h-fit">
      {/* Filter Header */}
      <div className="p-4 border-b border-gray-700/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <FaFilter className="text-gold-500 text-lg" />
            <h3 className="text-xl font-serif font-semibold text-white">Filters</h3>
          </div>
          {hasActiveFilters() && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-2 text-xs text-gold-400 hover:text-gold-300 transition-colors duration-200 bg-gray-800/50 px-2 py-1 rounded"
            >
              <FaTimes className="text-xs" />
              Clear
            </button>
          )}
        </div>
        <div className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full text-center">
          {filteredCount} of {totalProducts} products
        </div>
      </div>

      {/* Filter Content - Always visible in sidebar */}
      <div className="p-4 space-y-5 max-h-[80vh] overflow-y-auto">
        {/* Category */}
        <div className="space-y-2">
          <label htmlFor="category" className="block text-sm font-medium text-gold-400">
            Category
          </label>
          <select 
            id="category" 
            value={filters.category} 
            onChange={(e) => updateFilter('category', e.target.value)}
            className="w-full bg-gray-800/70 text-white text-sm p-2 rounded-lg border border-gray-700/50 focus:outline-none focus:ring-1 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all duration-200"
          >
            <option value="all">All Categories</option>
            <option value="for-her">For Her</option>
            <option value="for-him">For Him</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        {/* Brand */}
        <div className="space-y-2">
          <label htmlFor="brand" className="block text-sm font-medium text-gold-400">
            Brand
          </label>
          <select 
            id="brand" 
            value={filters.brand} 
            onChange={(e) => updateFilter('brand', e.target.value)}
            className="w-full bg-gray-800/70 text-white text-sm p-2 rounded-lg border border-gray-700/50 focus:outline-none focus:ring-1 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all duration-200"
          >
            <option value="all">All Brands</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <label htmlFor="price" className="block text-sm font-medium text-gold-400">
            Price: $0 - ${filters.priceRange[1]}
          </label>
          <div className="relative">
            <input 
              type="range" 
              id="price" 
              min="0" 
              max="500" 
              value={filters.priceRange[1]} 
              onChange={(e) => updateFilter('priceRange', [0, parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #d4af37 0%, #d4af37 ${(filters.priceRange[1]/500)*100}%, #374151 ${(filters.priceRange[1]/500)*100}%, #374151 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>$0</span>
              <span>$250</span>
              <span>$500</span>
            </div>
          </div>
        </div>

        {/* Concentration */}
        <div className="space-y-2">
          <label htmlFor="concentration" className="block text-sm font-medium text-gold-400">
            Concentration
          </label>
          <select 
            id="concentration" 
            value={filters.concentration} 
            onChange={(e) => updateFilter('concentration', e.target.value)}
            className="w-full bg-gray-800/70 text-white text-sm p-2 rounded-lg border border-gray-700/50 focus:outline-none focus:ring-1 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all duration-200"
          >
            <option value="all">All Types</option>
            {concentrations.map(concentration => (
              <option key={concentration} value={concentration}>
                {formatLabel(concentration)}
              </option>
            ))}
          </select>
        </div>

        {/* Fragrance Family */}
        <div className="space-y-2">
          <label htmlFor="fragranceFamily" className="block text-sm font-medium text-gold-400">
            Fragrance Family
          </label>
          <select 
            id="fragranceFamily" 
            value={filters.fragranceFamily} 
            onChange={(e) => updateFilter('fragranceFamily', e.target.value)}
            className="w-full bg-gray-800/70 text-white text-sm p-2 rounded-lg border border-gray-700/50 focus:outline-none focus:ring-1 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all duration-200"
          >
            <option value="all">All Families</option>
            {fragranceFamilies.map(family => (
              <option key={family} value={family}>
                {formatLabel(family)}
              </option>
            ))}
          </select>
        </div>

        {/* Season */}
        <div className="space-y-2">
          <label htmlFor="seasonality" className="block text-sm font-medium text-gold-400">
            Season
          </label>
          <select 
            id="seasonality" 
            value={filters.seasonality} 
            onChange={(e) => updateFilter('seasonality', e.target.value)}
            className="w-full bg-gray-800/70 text-white text-sm p-2 rounded-lg border border-gray-700/50 focus:outline-none focus:ring-1 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all duration-200"
          >
            <option value="all">All Seasons</option>
            {seasons.map(season => (
              <option key={season} value={season}>
                {formatLabel(season)}
              </option>
            ))}
          </select>
        </div>

        {/* Time of Day */}
        <div className="space-y-2">
          <label htmlFor="timeOfDay" className="block text-sm font-medium text-gold-400">
            Best For
          </label>
          <select 
            id="timeOfDay" 
            value={filters.timeOfDay} 
            onChange={(e) => updateFilter('timeOfDay', e.target.value)}
            className="w-full bg-gray-800/70 text-white text-sm p-2 rounded-lg border border-gray-700/50 focus:outline-none focus:ring-1 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all duration-200"
          >
            <option value="all">Any Time</option>
            {timesOfDay.map(time => (
              <option key={time} value={time}>
                {formatLabel(time)}
              </option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div className="space-y-2">
          <label htmlFor="rating" className="block text-sm font-medium text-gold-400">
            Rating
          </label>
          <select 
            id="rating" 
            value={filters.rating} 
            onChange={(e) => updateFilter('rating', parseFloat(e.target.value))}
            className="w-full bg-gray-800/70 text-white text-sm p-2 rounded-lg border border-gray-700/50 focus:outline-none focus:ring-1 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all duration-200"
          >
            <option value={0}>Any Rating</option>
            <option value={4.5}>4.5+ Stars</option>
            <option value={4.0}>4.0+ Stars</option>
            <option value={3.5}>3.5+ Stars</option>
            <option value={3.0}>3.0+ Stars</option>
          </select>
        </div>

        {/* Sale Toggle */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gold-400">
            Special Offers
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={filters.onSale}
              onChange={(e) => updateFilter('onSale', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gold-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-500"></div>
            <span className="ml-3 text-sm text-gray-300">Sale Items Only</span>
          </label>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #d4af37;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
          transition: all 0.2s ease;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.7);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #d4af37;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Filter;
