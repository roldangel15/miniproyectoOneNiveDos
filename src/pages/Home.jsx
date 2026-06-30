import { useState } from 'react';
import Hero         from '../components/Hero';
import BanerSortBar from '../components/BanerSortBar';
import ProductGrid  from '../components/ProductGrid';
import Loading      from '../components/Loading';
import useFetchProducts from '../hooks/useFetchProducts';

/**
 * Página principal.
 * Muestra Hero + BanerSortBar + ProductGrid.
 * Recibe searchText desde App (via Header).
 */
export default function Home({ searchText }) {
  const [sortOption, setSortOption] = useState('Newest');

  const { filteredProducts, loading, error, retry } = useFetchProducts({
    searchText,
    category: '',
    sortOption,
  });

  return (
    <>
      {/* Hero solo visible en Home */}
      <Hero />

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8">
        <BanerSortBar
          category=""
          sortOption={sortOption}
          onSortChange={setSortOption}
          total={loading ? undefined : filteredProducts.length}
        />

        {loading && <Loading message="Cargando catálogo de productos..." />}

        {error && !loading && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex justify-between items-center">
            <p>{error}</p>
            <button onClick={retry} className="bg-red-600 text-white px-4 py-2 rounded-lg text-label-md hover:bg-red-700 transition-colors">
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && <ProductGrid products={filteredProducts} />}
      </section>
    </>
  );
}
