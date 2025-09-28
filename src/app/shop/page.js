"use client";

import { useState } from "react";
import ProductList from "@/components/products/ProductList";
import Filter from "@/components/products/Filter";
import { FaFilter, FaTimes } from "react-icons/fa";

const ShopPage = () => {
  const [filters, setFilters] = useState({
    category: "all",
    brand: "all",
    priceRange: [0, 500],
    fragranceFamily: "all",
    concentration: "all",
    seasonality: "all",
    timeOfDay: "all",
    rating: 0,
    onSale: false,
  });

  const [filteredCount, setFilteredCount] = useState(12);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilteredCountChange = (count) => {
    setFilteredCount(count);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight font-serif mb-4">
            Our Exquisite Collection
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400 leading-relaxed">
            Discover your signature scent from our curated selection of the world's finest perfumes. 
            Each fragrance tells a unique story, waiting to become part of yours.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gold-500 rounded-full"></span>
              Premium Brands
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gold-500 rounded-full"></span>
              Authentic Products
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gold-500 rounded-full"></span>
              Fast Shipping
            </span>
          </div>
        </header>

        {/* Filter Button & Results Count */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={toggleFilter}
            className="flex items-center gap-3 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-gold-500/25"
          >
            <FaFilter className="text-lg" />
            <span>Filters</span>
            <div className="bg-black/20 text-xs px-2 py-1 rounded-full ml-2">
              {filteredCount}
            </div>
          </button>

          <div className="text-gray-400 text-sm">
            Showing {filteredCount} of 12 products
          </div>
        </div>

        <div className="relative flex gap-8">
          {/* Sidebar Filter */}
          <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-gray-900/95 backdrop-blur-sm transform transition-transform duration-300 ease-in-out ${
            isFilterOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:relative lg:translate-x-0 lg:bg-transparent lg:backdrop-blur-none lg:w-80`}>
            
            {/* Close button for mobile */}
            <button
              onClick={toggleFilter}
              className="absolute top-4 right-4 p-2 text-white hover:text-gold-400 transition-colors duration-200 lg:hidden"
            >
              <FaTimes className="text-xl" />
            </button>

            {/* Filter Component */}
            <div className="h-full overflow-y-auto p-4 lg:p-0">
              <Filter
                onFilterChange={handleFilterChange}
                totalProducts={12}
                filteredCount={filteredCount}
                filters={filters}
              />
            </div>
          </div>

          {/* Backdrop for mobile */}
          {isFilterOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={toggleFilter}
            ></div>
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <ProductList 
              filters={filters} 
              onFilteredCountChange={handleFilteredCountChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
