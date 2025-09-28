'use client';

import Link from 'next/link';
import { useContext, useState } from 'react';
import { CartContext } from '@/context/CartContext';
import Button from '../ui/Button';
import { FaShoppingCart, FaCheck, FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [isAdding, setIsAdding] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => {
      setIsAdding(false);
    }, 1500);
  };

  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-gold-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <FaStar className="text-gray-600" />
          <FaStar className="absolute top-0 left-0 text-gold-400 overflow-hidden" style={{ width: '50%' }} />
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-600" />);
    }

    return stars;
  };

  return (
    <article className="group relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-gold-500/30 hover:-translate-y-2 border border-gray-800/50 w-full max-w-sm mx-auto">
      {/* Favorite Button */}
      <button
        onClick={handleFavoriteToggle}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all duration-200"
        aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorited ? (
          <FaHeart className="text-red-500 text-sm" />
        ) : (
          <FaRegHeart className="text-white text-sm hover:text-red-300" />
        )}
      </button>

      {/* Sale Badge */}
      {product.onSale && (
        <div className="absolute top-3 left-3 z-10 px-2 py-1 bg-red-600 text-white text-xs font-bold rounded-full uppercase tracking-wide">
          Sale
        </div>
      )}

      <Link href={`/products/${product.id}`} className="block" aria-label={`View ${product.name} details`}>
        <div className="relative h-64 overflow-hidden">
          {!imageError ? (
            <img 
              src={product.image} 
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
              <span className="text-gray-400 text-sm">Image unavailable</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-all duration-300"></div>
          
          {/* Quick preview on hover */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white text-xs font-light line-clamp-2">
              {product.description || 'Discover this exquisite fragrance'}
            </p>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gold-500 font-semibold uppercase tracking-wider">
              {product.brand}
            </p>
            {product.size && (
              <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-full">
                {product.size}
              </span>
            )}
          </div>
          
          <h3 className="text-lg font-serif font-bold leading-tight line-clamp-2 group-hover:text-gold-300 transition-colors duration-200">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {renderStars(product.rating)}
              </div>
              <span className="text-xs text-gray-400">
                ({product.reviewCount || 0})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2">
            {product.originalPrice && product.originalPrice > product.price ? (
              <>
                <span className="text-sm font-light text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-lg font-bold text-gold-400">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gold-400">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Fragrance Notes Preview */}
          {product.notes && product.notes.length > 0 && (
            <div className="text-xs text-gray-400">
              <span className="font-medium">Notes: </span>
              <span>{product.notes.slice(0, 3).join(', ')}</span>
              {product.notes.length > 3 && '...'}
            </div>
          )}
        </div>
      </Link>

      <div className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          variant={isAdding ? "secondary" : "primary"}
          className="w-full transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/20"
          icon={isAdding ? FaCheck : FaShoppingCart}
          disabled={isAdding || product.outOfStock}
          aria-label={isAdding ? 'Added to cart' : 'Add to cart'}
        >
          {product.outOfStock ? 'Out of Stock' : isAdding ? 'Added!' : 'Add to Cart'}
        </Button>
        
        {/* Stock indicator */}
        {product.stock && product.stock <= 5 && product.stock > 0 && (
          <p className="text-center text-xs text-orange-400 mt-2">
            Only {product.stock} left in stock
          </p>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
