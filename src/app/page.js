import Link from 'next/link';
import { perfumes } from '@/data/perfumes';
import ProductCard from '@/components/products/ProductCard';

export default function HomePage() {
  const featuredPerfumes = perfumes.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] text-white flex items-center justify-center text-center" style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2020/04/19/01/15/perfume-5061479_1280.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 p-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gold-500 mb-4">Elysian Perfumes</h1>
          <p className="text-lg md:text-xl mb-8">Discover Your Signature Scent</p>
          <Link href="/shop" className="bg-gold-500 text-black py-3 px-8 rounded-lg hover:bg-gold-600 transition-colors text-lg font-semibold">
            Explore The Collection
          </Link>
        </div>
      </div>

      {/* Featured Collection Section */}
      <div className="py-16 bg-black">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-serif font-bold text-white mb-12">Featured Collection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-4">
            {featuredPerfumes.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* Brand Story Section */}
      <div className="bg-gray-900 py-20 text-white">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center px-4">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-serif font-bold text-gold-500 mb-6">The Art of Perfumery</h2>
            <p className="text-lg leading-relaxed mb-6">
              At Elysian, we believe that a fragrance is more than just a scent—it's an expression of identity, a memory, a work of art. Our perfumes are crafted with the finest ingredients sourced from around the world, blended with passion and precision.
            </p>
            <Link href="/about" className="text-gold-500 hover:underline font-semibold">
              Learn More About Us
            </Link>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1585399009939-f1f5b2a7c8a3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Perfumery" className="rounded-lg shadow-xl" />
          </div>
        </div>
      </div>

      {/* Discover Your Scent Section */}
      <div className="py-20 bg-black">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-serif font-bold text-white mb-12">Discover Your Scent</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-gray-900 rounded-lg shadow-lg">
              <h3 className="text-2xl font-serif text-gold-500 mb-4">For Him</h3>
              <p className="mb-4">Bold, charismatic, and sophisticated fragrances for the modern man.</p>
              <Link href="/shop?category=men" className="font-semibold text-white hover:text-gold-500">Shop Now &rarr;</Link>
            </div>
            <div className="p-8 bg-gray-900 rounded-lg shadow-lg">
              <h3 className="text-2xl font-serif text-gold-500 mb-4">For Her</h3>
              <p className="mb-4">Elegant, radiant, and timeless scents that capture the essence of femininity.</p>
              <Link href="/shop?category=women" className="font-semibold text-white hover:text-gold-500">Shop Now &rarr;</Link>
            </div>
            <div className="p-8 bg-gray-900 rounded-lg shadow-lg">
              <h3 className="text-2xl font-serif text-gold-500 mb-4">Unisex</h3>
              <p className="mb-4">Versatile and captivating fragrances designed to be shared and loved by all.</p>
              <Link href="/shop?category=unisex" className="font-semibold text-white hover:text-gold-500">Shop Now &rarr;</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-900 py-20 text-white">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-serif font-bold text-gold-500 mb-12">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 border border-gold-500 rounded-lg">
              <p className="italic">"Absolutely in love with my new fragrance. It's elegant, long-lasting, and I get compliments everywhere I go."</p>
              <p className="mt-4 font-semibold">- Alexandra D.</p>
            </div>
            <div className="p-8 border border-gold-500 rounded-lg">
              <p className="italic">"The best perfume I've ever owned. The scent is so unique and sophisticated. Will definitely be buying again."</p>
              <p className="mt-4 font-semibold">- John S.</p>
            </div>
            <div className="p-8 border border-gold-500 rounded-lg">
              <p className="italic">"A truly luxurious experience from start to finish. The packaging, the bottle, and of course, the scent itself are all top-notch."</p>
              <p className="mt-4 font-semibold">- Maria K.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Shop by Note Section */}
      <div className="py-20 bg-black">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-serif font-bold text-white mb-12">Shop by Fragrance Family</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Link href="/shop?note=floral" className="group">
              <div className="overflow-hidden rounded-lg">
                <img src="https://images.unsplash.com/photo-1562690868-60bbe7293936?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Floral" className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-serif text-gold-500 mt-4">Floral</h3>
            </Link>
            <Link href="/shop?note=woody" className="group">
              <div className="overflow-hidden rounded-lg">
                <img src="https://images.unsplash.com/photo-1612294037333-23b6334153e0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Woody" className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-serif text-gold-500 mt-4">Woody</h3>
            </Link>
            <Link href="/shop?note=oriental" className="group">
              <div className="overflow-hidden rounded-lg">
                <img src="https://images.unsplash.com/photo-1559191285-7a2f3a435f5e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Oriental" className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-serif text-gold-500 mt-4">Oriental</h3>
            </Link>
            <Link href="/shop?note=fresh" className="group">
              <div className="overflow-hidden rounded-lg">
                <img src="https://images.unsplash.com/photo-1517224792281-b36a084c3c65?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Fresh" className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-serif text-gold-500 mt-4">Fresh</h3>
            </Link>
          </div>
        </div>
      </div>

      {/* Best Sellers Section */}
      <div className="py-16 bg-gray-900">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-serif font-bold text-white mb-12">Our Best Sellers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 px-4">
            {perfumes.slice(3, 7).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* The Elysian Experience Section */}
      <div className="bg-black py-20 text-white">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center px-4">
          <div>
            <img src="https://images.unsplash.com/photo-1622055139359-5c6cf1558069?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Luxury Experience" className="rounded-lg shadow-xl" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-serif font-bold text-gold-500 mb-6">The Elysian Experience</h2>
            <p className="text-lg leading-relaxed mb-6">
              From the moment you unbox our creations, you are part of a story of elegance and artistry. Each bottle is a testament to our commitment to quality, a symbol of luxury that you can hold.
            </p>
            <Link href="/experience" className="text-gold-500 hover:underline font-semibold">
              Discover the Difference
            </Link>
          </div>
        </div>
      </div>

      {/* Gifting Section */}
      <div className="bg-gray-900 py-20 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-gold-500 mb-6">The Perfect Gift</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Find a memorable gift for someone special. Our fragrances are perfect for any occasion, beautifully packaged and ready to delight.
          </p>
          <Link href="/gifting" className="bg-gold-500 text-black py-3 px-8 rounded-lg hover:bg-gold-600 transition-colors text-lg font-semibold">
            Shop Gifts
          </Link>
        </div>
      </div>

      {/* From Our Journal Section */}
      <div className="py-20 bg-black">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-serif font-bold text-white mb-12">From Our Journal</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-gray-900 rounded-lg shadow-lg text-left">
              <h3 className="text-2xl font-serif text-gold-500 mb-4">The Language of Scent</h3>
              <p className="mb-4">Exploring how different notes can evoke memories and emotions.</p>
              <Link href="/journal/language-of-scent" className="font-semibold text-white hover:text-gold-500">Read More &rarr;</Link>
            </div>
            <div className="p-8 bg-gray-900 rounded-lg shadow-lg text-left">
              <h3 className="text-2xl font-serif text-gold-500 mb-4">A Guide to Layering</h3>
              <p className="mb-4">Learn how to combine fragrances to create your unique signature scent.</p>
              <Link href="/journal/guide-to-layering" className="font-semibold text-white hover:text-gold-500">Read More &rarr;</Link>
            </div>
            <div className="p-8 bg-gray-900 rounded-lg shadow-lg text-left">
              <h3 className="text-2xl font-serif text-gold-500 mb-4">New Arrivals: The Solstice Collection</h3>
              <p className="mb-4">Discover our latest collection, inspired by the changing seasons.</p>
              <Link href="/journal/new-arrivals" className="font-semibold text-white hover:text-gold-500">Read More &rarr;</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Subscription Section */}
      <div className="bg-gray-900 py-20 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-gold-500 mb-6">Join The Elysian Circle</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter for exclusive access to new collections, special offers, and the world of Elysian.
          </p>
          <form className="flex flex-col md:flex-row justify-center max-w-lg mx-auto">
            <input type="email" placeholder="Your email address" className="w-full md:w-auto flex-grow px-4 py-3 mb-2 md:mb-0 md:mr-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-gold-500" />
            <button type="submit" className="bg-gold-500 text-black py-3 px-8 rounded-lg hover:bg-gold-600 transition-colors font-semibold">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
