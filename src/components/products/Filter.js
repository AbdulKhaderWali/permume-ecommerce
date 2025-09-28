'use client';

import { useState } from 'react';
import { FaFilter, FaTimes, FaChevronDown } from 'react-icons/fa';

const Filter = ({ onFilterChange, totalProducts = 0, filteredCount = 0, filters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
//   const [filters, setFilters] = useState({
//     category: 'all',
//     brand: 'all',
//     priceRange: [0, 500],
//     fragranceFamily: 'all',
//     concentration: 'all',
//     seasonality: 'all',
//     timeOfDay: 'all',
//     rating: 0,
//     onSale: false
//   });

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
  const newFilters = { ...filters, [key]: value }; // filters now comes from props
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
    <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-xl shadow-2xl mb-8 border border-gray-800/50">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <FaFilter className="text-gold-500 text-lg" />
            <h3 className="text-2xl font-serif font-semibold text-white">Filters</h3>
          </div>
          <div className="text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">
            {filteredCount} of {totalProducts} products
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {hasActiveFilters() && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-2 text-sm text-gold-400 hover:text-gold-300 transition-colors duration-200"
            >
              <FaTimes className="text-xs" />
              Clear All
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-white hover:text-gold-300 transition-colors duration-200 md:hidden"
          >
            <span className="text-sm">
              {isExpanded ? 'Hide' : 'Show'} Filters
            </span>
            <FaChevronDown 
              className={`text-sm transform transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`} 
            />
          </button>
        </div>
      </div>

      {/* Filter Content */}
      <div className={`transition-all duration-300 overflow-hidden ${
        isExpanded ? 'max-h-full opacity-100' : 'max-h-0 opacity-0 md:max-h-full md:opacity-100'
      }`}>
        <div className="p-6 space-y-6">
          {/* Basic Filters Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium text-gold-400">
                Category
              </label>
              <select 
                id="category" 
                value={filters.category} 
                onChange={(e) => updateFilter('category', e.target.value)}
                className="w-full bg-gray-800/70 text-white p-3 rounded-lg border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all duration-200"
              >
                <option value="all">All Categories</option>
                <option value="for-her">For Her</option>
                <option value="for-him">For Him</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="brand" className="block text-sm font-medium text-gold-400">
                Brand
              </label>
              <select 
                id="brand" 
                value={filters.brand} 
                onChange={(e) => updateFilter('brand', e.target.value)}
                className="w-full bg-gray-800/70 text-white p-3 rounded-lg border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all duration-200"
              >
                <option value="all">All Brands</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="concentration" className="block text-sm font-medium text-gold-400">
                Concentration
              </label>
              <select 
                id="concentration" 
                value={filters.concentration} 
                onChange={(e) => updateFilter('concentration', e.target.value)}
                className="w-full bg-gray-800/70 text-white p-3 rounded-lg border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all duration-200"
              >
                <option value="all">All Concentrations</option>
                {concentrations.map(concentration => (
                  <option key={concentration} value={concentration}>
                    {formatLabel(concentration)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="seasonality" className="block text-sm font-medium text-gold-400">
                Season
              </label>
              <select 
                id="seasonality" 
                value={filters.seasonality} 
                onChange={(e) => updateFilter('seasonality', e.target.value)}
                className="w-full bg-gray-800/70 text-white p-3 rounded-lg border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all duration-200"
              >
                <option value="all">All Seasons</option>
                {seasons.map(season => (
                  <option key={season} value={season}>
                    {formatLabel(season)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Advanced Filters Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="fragranceFamily" className="block text-sm font-medium text-gold-400">
                Fragrance Family
              </label>
              <select 
                id="fragranceFamily" 
                value={filters.fragranceFamily} 
                onChange={(e) => updateFilter('fragranceFamily', e.target.value)}
                className="w-full bg-gray-800/70 text-white p-3 rounded-lg border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all duration-200"
              >
                <option value="all">All Families</option>
                {fragranceFamilies.map(family => (
                  <option key={family} value={family}>
                    {formatLabel(family)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="timeOfDay" className="block text-sm font-medium text-gold-400">
                Time of Day
              </label>
              <select 
                id="timeOfDay" 
                value={filters.timeOfDay} 
                onChange={(e) => updateFilter('timeOfDay', e.target.value)}
                className="w-full bg-gray-800/70 text-white p-3 rounded-lg border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all duration-200"
              >
                <option value="all">Any Time</option>
                {timesOfDay.map(time => (
                  <option key={time} value={time}>
                    {formatLabel(time)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="rating" className="block text-sm font-medium text-gold-400">
                Minimum Rating
              </label>
              <select 
                id="rating" 
                value={filters.rating} 
                onChange={(e) => updateFilter('rating', parseFloat(e.target.value))}
                className="w-full bg-gray-800/70 text-white p-3 rounded-lg border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all duration-200"
              >
                <option value={0}>Any Rating</option>
                <option value={4.5}>4.5+ Stars</option>
                <option value={4.0}>4.0+ Stars</option>
                <option value={3.5}>3.5+ Stars</option>
                <option value={3.0}>3.0+ Stars</option>
              </select>
            </div>
          </div>

          {/* Price and Toggle Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label htmlFor="price" className="block text-sm font-medium text-gold-400">
                Price Range: $0 - ${filters.priceRange[1]}
              </label>
              <div className="relative">
                <input 
                  type="range" 
                  id="price" 
                  min="0" 
                  max="500" 
                  value={filters.priceRange[1]} 
                  onChange={(e) => updateFilter('priceRange', [0, parseInt(e.target.value)])}
                  className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #d4af37 0%, #d4af37 ${(filters.priceRange[1]/500)*100}%, #374151 ${(filters.priceRange[1]/500)*100}%, #374151 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>$0</span>
                  <span>$250</span>
                  <span>$500</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gold-400">
                Special Offers
              </label>
              <div className="flex items-center">
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
          </div>
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
