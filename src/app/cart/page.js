'use client';

import { useContext, useState } from 'react';
import { CartContext } from '@/context/CartContext';
import Spinner from '@/components/ui/Spinner';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { 
  FaTrash, 
  FaPlus, 
  FaMinus, 
  FaShoppingBag, 
  FaArrowLeft, 
  FaHeart,
  FaShieldAlt,
  FaTruck,
  FaUndo
} from 'react-icons/fa';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, loading } = useContext(CartContext);
  const [removingItems, setRemovingItems] = useState(new Set());
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = appliedPromo ? subtotal * 0.1 : 0; // 10% discount example
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = (subtotal - discount) * 0.08; // 8% tax
  const total = subtotal - discount + shipping + tax;

  const handleRemoveItem = async (itemId) => {
    setRemovingItems(prev => new Set([...prev, itemId]));
    setTimeout(() => {
      removeFromCart(itemId);
      setRemovingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }, 300);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(itemId);
      return;
    }
    updateQuantity(itemId, newQuantity);
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'perfume10') {
      setAppliedPromo({ code: promoCode, discount: 10 });
    }
    setPromoCode('');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/shop" 
            className="flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors duration-200"
          >
            <FaArrowLeft className="text-sm" />
            <span>Continue Shopping</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">
            Your Cart
          </h1>
          <div className="w-32"></div> {/* Spacer for centering */}
        </div>

        {cart.length === 0 ? (
          // Empty Cart State
          <div className="text-center py-20">
            <div className="text-8xl text-gray-600 mb-6">🛒</div>
            <h2 className="text-3xl font-serif text-white mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Discover our exquisite collection of perfumes and find your signature scent.
            </p>
            <Link href="/shop">
              <Button variant="primary" className="inline-flex items-center gap-2">
                <FaShoppingBag />
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="xl:col-span-2 space-y-4">
              <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-xl border border-gray-800/50 p-6">
                <h2 className="text-2xl font-serif text-white mb-6">
                  Cart Items ({cart.length})
                </h2>
                
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div 
                      key={item.id} 
                      className={`bg-gray-800/50 rounded-lg p-4 border border-gray-700/30 transition-all duration-300 ${
                        removingItems.has(item.id) ? 'opacity-50 scale-95' : 'hover:border-gold-500/30'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-700">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" 
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-xs text-gold-500 font-semibold uppercase tracking-wider">
                                {item.brand}
                              </p>
                              <h3 className="text-lg font-serif text-white font-bold leading-tight">
                                {item.name}
                              </h3>
                              {item.size && (
                                <p className="text-sm text-gray-400">Size: {item.size}</p>
                              )}
                            </div>
                            
                            {/* Remove Button */}
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                              aria-label="Remove item"
                            >
                              <FaTrash className="text-sm" />
                            </button>
                          </div>

                          {/* Price and Quantity */}
                          <div className="flex items-center justify-between mt-4">
                            <div className="text-xl font-bold text-gold-400">
                              {formatPrice(item.price)}
                            </div>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center bg-gray-700/50 rounded-lg border border-gray-600/50">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="p-2 text-gray-300 hover:text-white hover:bg-gray-600/50 rounded-l-lg transition-colors duration-200"
                                disabled={item.quantity <= 1}
                              >
                                <FaMinus className="text-xs" />
                              </button>
                              
                              <span className="px-4 py-2 text-white font-semibold min-w-[3rem] text-center">
                                {item.quantity}
                              </span>
                              
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="p-2 text-gray-300 hover:text-white hover:bg-gray-600/50 rounded-r-lg transition-colors duration-200"
                              >
                                <FaPlus className="text-xs" />
                              </button>
                            </div>
                          </div>

                          {/* Item Total */}
                          <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-700/50">
                            <span className="text-gray-400">Item Total:</span>
                            <span className="text-lg font-bold text-white">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-xl border border-gray-800/50 p-6">
                <h3 className="text-xl font-serif text-white mb-4">You might also like</h3>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex-shrink-0 w-32 bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
                      <div className="w-full h-24 bg-gray-700 rounded-lg mb-2"></div>
                      <p className="text-xs text-gray-400 truncate">Recommended Item {i}</p>
                      <p className="text-sm font-bold text-gold-400">$99.99</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="xl:col-span-1">
              <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-xl border border-gray-800/50 p-6 sticky top-6">
                <h2 className="text-2xl font-serif text-white mb-6">Order Summary</h2>
                
                {/* Promo Code */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gold-400 mb-2">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 bg-gray-800/70 text-white p-3 rounded-lg border border-gray-700/50 focus:outline-none focus:ring-1 focus:ring-gold-500/50 text-sm"
                    />
                    <Button 
                      onClick={applyPromoCode}
                      variant="secondary"
                      className="px-4 py-3 text-sm"
                    >
                      Apply
                    </Button>
                  </div>
                  {appliedPromo && (
                    <div className="flex items-center gap-2 mt-2 text-green-400 text-sm">
                      <span>✓ {appliedPromo.code} applied ({appliedPromo.discount}% off)</span>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal:</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Discount:</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping:</span>
                    <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-300">
                    <span>Tax:</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  
                  <div className="border-t border-gray-700 pt-3">
                    <div className="flex justify-between text-xl font-bold text-white">
                      <span>Total:</span>
                      <span className="text-gold-400">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex items-center gap-3 text-gray-300">
                    <FaShieldAlt className="text-green-500" />
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <FaTruck className="text-blue-500" />
                    <span>{shipping === 0 ? 'Free shipping' : 'Fast delivery'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <FaUndo className="text-gold-500" />
                    <span>30-day return policy</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button 
                  variant="primary" 
                  className="w-full text-lg py-4 mb-4"
                >
                  Proceed to Checkout
                </Button>
                
                <Button 
                  variant="secondary" 
                  className="w-full"
                >
                  <FaHeart className="mr-2" />
                  Save for Later
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
