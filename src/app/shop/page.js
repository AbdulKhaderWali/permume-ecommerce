import ProductList from '@/components/products/ProductList';

const ShopPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-serif font-bold text-center mb-8 text-white">Our Collection</h1>
      <ProductList />
    </div>
  );
};

export default ShopPage;
