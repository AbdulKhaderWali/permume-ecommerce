'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { perfumes } from '@/data/perfumes';
import ProductCard from '@/components/products/ProductCard';
import Button from '@/components/ui/Button';
import { FaStar, FaShippingFast, FaUndo, FaShieldAlt, FaPlay, FaQuoteLeft } from 'react-icons/fa';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const featuredPerfumes = perfumes.slice(0, 4);
  const bestSellers = perfumes.filter(p => p.rating >= 4.5).slice(0, 4);
  
  const heroSlides = [
    {
      image: "https://cdn.pixabay.com/photo/2020/04/19/01/15/perfume-5061479_1280.jpg",
      title: "Elysian Perfumes",
      subtitle: "Discover Your Signature Scent",
      cta: "Explore Collection"
    },
    {
      image: "https://images.unsplash.com/photo-1594736797933-d0c6dfb2238d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80",
      title: "New Arrivals",
      subtitle: "Limited Edition Collection",
      cta: "Shop New"
    },
    {
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2008&q=80",
      title: "Premium Gifting",
      subtitle: "Elegant Gift Sets Available",
      cta: "Shop Gifts"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <div className="bg-black">
      {/* Enhanced Hero Section with Carousel */}
      <div className="relative h-screen min-h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ 
              backgroundImage: `url('${slide.image}')`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center' 
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
          </div>
        ))}
        
        <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-gold-500 mb-6 animate-fade-in">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-3xl mb-8 font-light tracking-wide">
              {heroSlides[currentSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/shop" variant="primary" className="text-lg px-8 py-4">
                {heroSlides[currentSlide].cta}
              </Button>
              <Button 
                href="#story" 
                variant="secondary" 
                className="text-lg px-8 py-4 flex items-center gap-2"
              >
                <FaPlay className="text-sm" />
                Watch Our Story
              </Button>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-gold-500' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center text-white">
              <FaShippingFast className="text-3xl text-gold-500 mb-3" />
              <h3 className="font-semibold mb-1">Free Shipping</h3>
              <p className="text-sm text-gray-400">On orders over $100</p>
            </div>
            <div className="flex flex-col items-center text-white">
              <FaUndo className="text-3xl text-gold-500 mb-3" />
              <h3 className="font-semibold mb-1">30-Day Returns</h3>
              <p className="text-sm text-gray-400">Hassle-free returns</p>
            </div>
            <div className="flex flex-col items-center text-white">
              <FaShieldAlt className="text-3xl text-gold-500 mb-3" />
              <h3 className="font-semibold mb-1">Authentic Products</h3>
              <p className="text-sm text-gray-400">100% genuine fragrances</p>
            </div>
            <div className="flex flex-col items-center text-white">
              <FaStar className="text-3xl text-gold-500 mb-3" />
              <h3 className="font-semibold mb-1">5-Star Service</h3>
              <p className="text-sm text-gray-400">Exceptional customer care</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Collection Section */}
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-bold text-white mb-4">Featured Collection</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover our handpicked selection of extraordinary fragrances, each telling its own unique story
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredPerfumes.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button href="/shop" variant="secondary" className="px-8 py-4">
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section id="story" className="bg-gray-900 py-24 text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <img 
                  src="https://akm-img-a-in.tosshub.com/lingo/hrb/images/story/202409/66e16720d48af-fragrance-114711995-16x9.png?size=1200:675" 
                  alt="Perfumery Artisan" 
                  className="rounded-2xl shadow-2xl w-full" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-block px-4 py-2 bg-gold-500/10 border border-gold-500/30 rounded-full">
                <span className="text-gold-400 text-sm font-medium">Our Story</span>
              </div>
              <h2 className="text-5xl font-serif font-bold text-gold-500 leading-tight">
                The Art of Perfumery
              </h2>
              <p className="text-lg leading-relaxed text-gray-300">
                At Elysian, we believe that a fragrance is more than just a scent—it's an expression of identity, 
                a memory, a work of art. Our perfumes are crafted with the finest ingredients sourced from around 
                the world, blended with passion and precision by master perfumers.
              </p>
              <p className="text-lg leading-relaxed text-gray-300">
                Each bottle represents decades of expertise, countless hours of refinement, and an unwavering 
                commitment to excellence that has made us a trusted name in luxury fragrance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button href="/about" variant="primary">
                  Our Heritage
                </Button>
                <Button href="/craftsmanship" variant="secondary">
                  The Process
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discover Your Scent Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-bold text-white mb-4">Discover Your Scent</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Find the perfect fragrance that reflects your personality and style
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "For Him",
                description: "Bold, charismatic, and sophisticated fragrances for the modern man.",
                link: "/shop?category=for-him",
                image: "https://images.unsplash.com/photo-1594736797933-d0c6dfb2238d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
              },
              {
                title: "For Her", 
                description: "Elegant, radiant, and timeless scents that capture the essence of femininity.",
                link: "/shop?category=for-her",
                image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
              },
              {
                title: "Unisex",
                description: "Versatile and captivating fragrances designed to be shared and loved by all.",
                link: "/shop?category=unisex", 
                image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59db9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
              }
            ].map((category, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800/50 hover:border-gold-500/50 transition-all duration-500">
                <div className="absolute inset-0 opacity-20">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="relative p-8 text-center h-full flex flex-col justify-center">
                  <h3 className="text-3xl font-serif text-gold-500 mb-4">{category.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{category.description}</p>
                  <Button 
                    href={category.link} 
                    variant="secondary"
                    className="self-center group-hover:bg-gold-500 group-hover:text-black transition-all duration-300"
                  >
                    Shop Now →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-bold text-white mb-4">Our Best Sellers</h2>
            <p className="text-xl text-gray-400">The fragrances our customers can't get enough of</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product, index) => (
              <div key={product.id} className="relative">
                <ProductCard product={product} />
                {index === 0 && (
                  <div className="absolute -top-4 -right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                    #1 Best Seller
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="bg-gray-900 py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-bold text-gold-500 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-400">Thousands of satisfied customers worldwide</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "Absolutely in love with my new fragrance. It's elegant, long-lasting, and I get compliments everywhere I go. The packaging is also stunning!",
                name: "Alexandra D.",
                location: "New York, NY",
                rating: 5
              },
              {
                text: "The best perfume I've ever owned. The scent is so unique and sophisticated. Customer service was exceptional too. Will definitely be buying again.",
                name: "John S.",
                location: "Los Angeles, CA", 
                rating: 5
              },
              {
                text: "A truly luxurious experience from start to finish. The packaging, the bottle, and of course, the scent itself are all top-notch. Worth every penny.",
                name: "Maria K.",
                location: "Miami, FL",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gold-500/20 hover:border-gold-500/40 transition-all duration-300">
                <FaQuoteLeft className="text-gold-500 text-2xl mb-4" />
                <p className="italic text-gray-300 mb-6 leading-relaxed">{testimonial.text}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.location}</p>
                  </div>
                  <div className="flex text-gold-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-sm" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Fragrance Family Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-bold text-white mb-4">Shop by Fragrance Family</h2>
            <p className="text-xl text-gray-400">Explore different scent profiles to find your perfect match</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "Floral",
                image: "https://images.prestigeonline.com/wp-content/uploads/sites/3/2022/05/31122737/lsa-hero-2-1600x900.jpeg",
                link: "/shop?fragranceFamily=floral"
              },
              {
                name: "Woody",
                image: "https://www.clivechristian.com/cdn/shop/files/blog-img-vertical-woody-fragrance-family_1000x5000.jpg?v=1668696521",
                link: "/shop?fragranceFamily=woody-aromatic"
              },
              {
                name: "Oriental",
                image: "https://cdn.shopify.com/s/files/1/1234/5794/files/what-i-wish-everyone-knew-about-oriental-fragrance.jpg?v=1562063964",
                link: "/shop?fragranceFamily=oriental-floral"
              },
              {
                name: "Fresh",
                image: "https://perfumesociety.org/wp-content/uploads/2019/06/What-is-fresh-%E2%80%93-fragrance-family-friday-at-The-Perfume-Society-our-suggestion-of-scents-to-try.jpg",
                link: "/shop?fragranceFamily=aquatic-fresh"
              }
            ].map((family, index) => (
              <Link key={index} href={family.link} className="group">
                <div className="relative overflow-hidden rounded-2xl aspect-square">
                  <img 
                    src={family.image} 
                    alt={family.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-serif text-gold-500 font-bold">{family.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Newsletter Section */}
      <section className="bg-gradient-to-br from-gray-900 via-black to-gray-900 py-24 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-serif font-bold text-gold-500 mb-6">Join The Elysian Circle</h2>
            <p className="text-xl text-gray-400 mb-12 leading-relaxed">
              Subscribe to our newsletter for exclusive access to new collections, special offers, 
              fragrance tips, and the latest from the world of Elysian.
            </p>
            
            {isSubscribed ? (
              <div className="bg-green-600/20 border border-green-500/50 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-semibold text-green-400 mb-2">Welcome to the Circle!</h3>
                <p className="text-green-300">Thank you for subscribing. Check your email for a special welcome offer.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-4 justify-center max-w-2xl mx-auto mb-8">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address" 
                  required
                  className="flex-1 px-6 py-4 rounded-xl bg-gray-800/50 text-white border border-gray-700/50 focus:outline-none focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/20 transition-all duration-300" 
                />
                <Button type="submit" variant="primary" className="px-8 py-4 whitespace-nowrap">
                  Join Now
                </Button>
              </form>
            )}
            
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gold-500 rounded-full"></span>
                Exclusive early access
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gold-500 rounded-full"></span>
                Member-only discounts
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gold-500 rounded-full"></span>
                Fragrance insights
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
