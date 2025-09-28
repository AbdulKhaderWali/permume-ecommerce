import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="relative h-screen text-white flex items-center justify-center text-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557175324-636e2d12f5f3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-6xl font-serif font-bold text-gold-500 mb-4">Elysian Perfumes</h1>
          <p className="text-xl mb-8">Discover Your Signature Scent</p>
          <Link href="/shop" className="bg-gold-500 text-black py-3 px-8 rounded-lg hover:bg-gold-600 transition-colors">
            Shop Now
          </Link>
        </div>
      </div>
      </main>
    </div>
  );
}
