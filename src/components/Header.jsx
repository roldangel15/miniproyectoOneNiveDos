import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart }       from '../contexts/CartContext';
import CartDrawer        from './CartDrawer';
import FavoritesDrawer   from './FavoritesDrawer';
import HeaderMobile      from './HeaderMobile';

const CATEGORIES = [
  { label: 'Electronics', path: '/products/category/electronics' },
  { label: 'Jewelry',     path: '/products/category/jewelery' },
  { label: "Men's",       path: "/products/category/men's%20clothing" },
  { label: "Women's",     path: "/products/category/women's%20clothing" },
];

export default function Header({ searchText, onSearchChange }) {
  const { getTotalItems } = useCart();
  const [cartOpen, setCartOpen]           = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);

  const totalItems = getTotalItems();

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-border-subtle">

        {/* ── Desktop (lg y mayor) ── */}
        <div className="hidden lg:flex max-w-container-max mx-auto px-margin-desktop h-16 items-center justify-between gap-4">

          {/* Logo + Nav */}
          <div className="flex items-center gap-8 shrink-0">
            <Link to="/" className="text-2xl font-black tracking-tighter text-on-surface flex items-center gap-1">
              <span className="material-symbols-outlined text-primary text-3xl">shopping_bag</span>
              LUXE.
            </Link>
            <nav className="flex items-center gap-6">
              {CATEGORIES.map((cat) => (
                <NavLink
                  key={cat.path}
                  to={cat.path}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-label-md font-bold text-primary whitespace-nowrap'
                      : 'text-label-md text-on-surface-variant hover:text-primary transition-colors whitespace-nowrap'
                  }
                >
                  {cat.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Buscador + Acciones */}
          <div className="flex items-center gap-3 flex-1 justify-end">
            <div className="relative w-full max-w-sm">
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

            <button
              onClick={() => setFavoritesOpen(true)}
              className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors"
              aria-label="Favoritos"
            >
              <span className="material-symbols-outlined">favorite</span>
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full relative transition-colors"
              aria-label="Carrito"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>
             <button className="rounded-full border-2 border-surface-container-high overflow-hidden w-8 h-8"> 
              <img alt="Profile" className="w-full h-full object-cover" 
                src="/img/rolando.png" /> 
            </button>
          </div>
        </div>

        {/* ── Mobile (menor a lg) — delegado a HeaderMobile ── */}
        <HeaderMobile
          searchText={searchText}
          onSearchChange={onSearchChange}
          onCartOpen={() => setCartOpen(true)}
          onFavoritesOpen={() => setFavoritesOpen(true)}
          cartCount={totalItems}
        />
      </header>

      {/* Drawers compartidos entre desktop y mobile */}
      <CartDrawer      open={cartOpen}      onClose={() => setCartOpen(false)} />
      <FavoritesDrawer open={favoritesOpen} onClose={() => setFavoritesOpen(false)} />
    </>
  );
}
