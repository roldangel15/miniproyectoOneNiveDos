
import { products } from "../data/products.js";


import React, { useState, useEffect } from 'react';
import { useFetchProducts } from '../hooks/useFetchProducts';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import Loading from './Loading';


export default function ProductGrid() {
  const [sortBy, setSortBy] = useState("Newest");
  //const visibleProducts = products.slice(0, 8);


 const { products, loading, error, fetchProducts, fetchProductsByCategory } = useFetchProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category) {
      fetchProductsByCategory(category);
    } else {
      fetchProducts();
    }
  };

  if (loading && products.length === 0) {
    return <Loading message="Cargando catálogo de productos..." />;
  }

  if (error && products.length === 0) {
    return (
      <div className="text-center py-16 px-8">
        <h2 className="text-3xl text-gray-800 mb-4">😕 Oops! Algo salió mal</h2>
        <p className="text-gray-500 mb-8 text-lg">{error}</p>
        <button
          onClick={fetchProducts}
          className="px-8 py-4 bg-blue-600 text-white rounded-lg text-base font-semibold hover:bg-blue-700 transition-colors"
        >
          🔄 Reintentar
        </button>
      </div>
    );
  }

  


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

{loading && <Loading message="Actualizando productos..." />}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg mb-8 flex justify-between items-center">
          <p className="m-0">{error}</p>
          <button
            onClick={fetchProducts}
            className="bg-red-600 text-white border-none px-4 py-2 rounded-md cursor-pointer font-semibold hover:bg-red-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      )}

      {!loading && filteredProducts.length === 0 ? (
        <div className="text-center py-16 px-8 text-gray-500">
          <h3 className="text-2xl mb-2 text-gray-800">No se encontraron productos</h3>
          <p>Intenta con otros términos de búsqueda</p>
        </div>
      ) : (



      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      )}

      {!loading && filteredProducts.length > 0 && (
        <div className="text-center text-gray-500 text-sm p-4">
          Mostrando {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
        </div>
      )}

      {/* Load more 
      <div className="mt-12 flex flex-col items-center gap-4">
        <button className="px-10 py-3 border border-border-subtle bg-white text-on-surface font-bold rounded-lg hover:bg-surface-container-low transition-all">
          Load More Products
        </button>
        <p className="text-label-sm text-on-surface-variant">
           Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>*/}
    </section>
  );
}