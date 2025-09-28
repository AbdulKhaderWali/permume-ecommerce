"use client";

import { useState } from "react";
import ProductList from "@/components/products/ProductList";
import Filter from "@/components/products/Filter";

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

  const [filteredCount, setFilteredCount] = useState(0);

  const handleFilteredCountChange = (count) => {
    setFilteredCount(count);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-white tracking-tight font-serif">
          Our Exquisite Collection
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
          Discover your signature scent from our curated selection of the
          world's finest perfumes.
        </p>
      </header>
      <Filter
        onFilterChange={handleFilterChange}
        totalProducts={12} // or import perfumes.length
        filteredCount={filteredCount}
        filters={filters}
      />
      <ProductList filters={filters} />
    </div>
  );
};

export default ShopPage;
