import { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';

const CATEGORIES = [
  { label: 'Electronics', path: '/products/category/electronics', icon: 'devices' },
  { label: 'Jewelry',     path: '/products/category/jewelery',    icon: 'diamond' },
  { label: "Men's",       path: "/products/category/men's%20clothing",   icon: 'checkroom' },
  { label: "Women's",     path: "/products/category/women's%20clothing", icon: 'styler' },
];

/**
 * HeaderMobile
 * Menú hamburguesa para pantallas pequeñas (< lg).
 * Se desliza desde la izquierda con animación suave.
 *
 * Props:
 *   - searchText      : string
 *   - onSearchChange  : fn
 *   - onCartOpen      : fn
 *   - onFavoritesOpen : fn
 *   - cartCount       : number
 */
export default function HeaderMobil({
  searchText,
  onSearchChange,
  onCartOpen,
  onFavoritesOpen,
  cartCount,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Cerrar con Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Bloquear scroll del body cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ── Barra superior mobile ── */}
      <div className="flex items-center justify-between h-16 px-margin-mobile lg:hidden">

        {/* Hamburguesa */}
        <button
          onClick={() => setMenuOpen(true)}
          className="p-2 -ml-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors"
          aria-label="Abrir menú"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        {/* Logo centrado */}
        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 text-xl font-black tracking-tighter text-on-surface flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-primary text-2xl">shopping_bag</span>
          LUXE.
        </Link>

        {/* Acciones derecha */}
        <div className="flex items-center gap-1">
         

          <button
            onClick={onCartOpen}
            className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full relative transition-colors"
            aria-label="Carrito"
          >
            <span className="material-symbols-outlined">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold leading-none">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>
          

        </div>
      </div>

      {/* ── Buscador móvil debajo de la barra ── */}
      <div className="lg:hidden px-margin-mobile pb-3 border-b border-border-subtle">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-surface-container-low border border-border-subtle rounded-full py-2 pl-10 pr-9 text-label-md focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
          />
          {searchText && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Overlay oscuro ── */}
      <div
        className={`fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden
          ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* ── Panel lateral (slide desde la izquierda) ── */}
      <aside
        ref={menuRef}
        className={`fixed top-0 left-0 z-[95] h-full w-72 bg-white shadow-2xl flex flex-col
          transition-transform duration-300 ease-in-out lg:hidden
          ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Menú de navegación"
      >
        {/* Cabecera del panel */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border-subtle">
          <Link
            to="/"
            onClick={closeMenu}
            className="text-xl font-black tracking-tighter text-on-surface flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-primary text-2xl">shopping_bag</span>
            LUXE.
          </Link>
          <button
            onClick={closeMenu}
            className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors"
            aria-label="Cerrar menú"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Sección categorías */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant px-3 mb-3">
            Categorías
          </p>
          <ul className="space-y-1">
            {/* Enlace "Todos" */}
            <li>
              <NavLink
                to="/"
                end
                onClick={closeMenu}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-xl text-label-md font-medium transition-colors
                  ${isActive
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'text-on-surface hover:bg-surface-container-low'}`
                }
              >
                <span className="material-symbols-outlined text-xl">grid_view</span>
                Todos los productos
              </NavLink>
            </li>

            {CATEGORIES.map((cat) => (
              <li key={cat.path}>
                <NavLink
                  to={cat.path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-3 rounded-xl text-label-md font-medium transition-colors
                    ${isActive
                      ? 'bg-primary/10 text-primary font-bold'
                      : 'text-on-surface hover:bg-surface-container-low'}`
                  }
                >
                  <span className="material-symbols-outlined text-xl">{cat.icon}</span>
                  {cat.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer del panel */}
        <div className="px-6 py-5 border-t border-border-subtle space-y-3">
          <button
            onClick={() => { onFavoritesOpen(); closeMenu(); }}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-label-md text-on-surface hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-xl">favorite</span>
            Mis favoritos
          </button>
          <button
            onClick={() => { onCartOpen(); closeMenu(); }}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-label-md text-on-surface hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-xl">shopping_cart</span>
            Mi carrito
            {cartCount > 0 && (
              <span className="ml-auto bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </button>
           

        </div>
      </aside>
    </>
  );
}
