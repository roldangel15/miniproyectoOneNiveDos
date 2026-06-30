import { useParams } from 'react-router-dom';
import BanerSortBar from '../components/BanerSortBar';
import ProductGrid  from '../components/ProductGrid';
import Loading      from '../components/Loading';
import useFetchProducts from '../hooks/useFetchProducts';

/**
 * Página de categoría.
 * searchText y sortOption viven en App (compartidos con Header/Footer).
 */
export default function CategoryPage({ searchText, sortOption, onSortChange }) {
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category);

  const { filteredProducts, loading, error, retry } = useFetchProducts({
    searchText,
    category: decodedCategory,
    sortOption,
  });

  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8">
      <BanerSortBar
        category={decodedCategory}
        sortOption={sortOption}
        onSortChange={onSortChange}
        total={loading ? undefined : filteredProducts.length}
      />

      {loading && <Loading message={`Cargando ${decodedCategory}...`} />}

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
  );
}
