"use client";

import ProductCard from "./ProductCard";

export default function ProductListing({ products, loading }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh] w-[80vw] ">
        <div
          className="animate-spin size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <main className="container mx-auto ">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
