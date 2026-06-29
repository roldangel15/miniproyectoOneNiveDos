import ProductCard from './ProductCard';

/**
 * ProductGrid
 * Solo recibe el arreglo de productos ya filtrados/ordenados y los despliega.
 * Toda la lógica de datos vive en useFetchProducts.
 *
 * Props:
 *   - products: array de objetos producto
 */
export default function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20 text-on-surface-variant">
        <span className="material-symbols-outlined text-5xl mb-4 block">search_off</span>
        <h3 className="text-headline-sm text-on-surface mb-2">Sin resultados</h3>
        <p className="text-label-md">Intenta con otros términos o cambia la categoría.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
