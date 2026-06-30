/**
 * BanerSortBar
 * Muestra el título/descripción de la sección actual y
 * el selector de orden. Notifica al padre cuando cambia el orden.
 *
 * Props:
 *   - category    : string  – categoría activa ("" = todos)
 *   - sortOption  : string  – valor actual del select
 *   - onSortChange: fn      – callback cuando cambia el select
 *   - total       : number  – cantidad de productos mostrados
 */
export default function BanerSortBar({ category, sortOption, onSortChange, total }) {
  const displayName = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : '';

  const title       = category ? `${displayName} collection` : 'Trending Now';
  const description = category
    ? `Discover our ${displayName} items`
    : 'Our most popular items this week';

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
      {/* Texto informativo */}
      <div>
        <h2 className="text-headline-md font-headline-md text-on-surface">{title}</h2>
        <p className="text-on-surface-variant text-label-md">
          {description}
          {total !== undefined && (
            <span className="ml-2 text-primary font-semibold">· {total} productos</span>
          )}
        </p>
      </div>

      {/* Selector de orden — solo visible en desktop. En mobile se gestiona
          exclusivamente desde el botón "Explore" del FooterMobile (SortSheet). */}
      <div className="hidden md:flex items-center gap-3">
        <span className="text-label-md text-on-surface-variant hidden sm:block">Ordenar por:</span>
        <div className="relative">
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none bg-white border border-border-subtle rounded-lg py-2.5 pl-4 pr-10 text-label-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none cursor-pointer"
          >
            <option value="Newest">Newest</option>
            <option value="Price: Low to High">Price: Low to High</option>
            <option value="Price: High to Low">Price: High to Low</option>
            <option value="Best Rating">Best Rating</option>
          </select>
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
            expand_more
          </span>
        </div>
      </div>
    </div>
  );
}
