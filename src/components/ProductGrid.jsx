import ProductCard from "./ProductCard";
import { products } from "../data/products.js";
import { useState } from "react";

export default function ProductGrid() {
  const [sortBy, setSortBy] = useState("Newest");
  const visibleProducts = products.slice(0, 8);

  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-headline-md font-headline-md text-on-surface">
            Trending Now
          </h2>
          <p className="text-on-surface-variant text-label-md">
            Our most popular items this week
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2.5 rounded-lg border border-border-subtle hover:bg-white transition-all flex items-center gap-2 text-label-md">
            <span className="material-symbols-outlined text-xl">
              filter_list
            </span>
          </button>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-border-subtle rounded-lg py-2.5 pl-4 pr-10 text-label-md focus:ring-primary/20 focus:border-primary outline-none"
            >
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Best Rating</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
              expand_more
            </span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load more */}
      <div className="mt-12 flex flex-col items-center gap-4">
        <button className="px-10 py-3 border border-border-subtle bg-white text-on-surface font-bold rounded-lg hover:bg-surface-container-low transition-all">
          Load More Products
        </button>
        <p className="text-label-sm text-on-surface-variant">
          Showing {visibleProducts.length} of {products.length} products
        </p>
      </div>
    </section>
  );
}