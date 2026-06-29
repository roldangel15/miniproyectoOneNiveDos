import { NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useFavorites } from '../contexts/FavoritesContext';

/**
 * FooterMobil
 * Barra de navegación fija en la parte inferior, solo visible en mobile (< md).
 *
 * Props:
 *   - onFavoritesOpen : fn — abre el drawer de favoritos
 */
export default function FooterMobil({ onFavoritesOpen }) {
  const { favorites } = useFavorites();
  const favCount = favorites.length;

  const navItemBase =
    'flex flex-col items-center justify-center gap-0.5 transition-colors min-w-0 flex-1 py-1';
  const activeClass  = 'text-primary';
  const defaultClass = 'text-on-surface-variant hover:text-primary';

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

  const categories = [
    { label: 'Jewelry', path: '/products/category/jewelery', img: '/wishlist.svg' },
    { label: 'Men\'s', path: '/products/category/men%27s%20clothing', img: '/profile.svg' },
    { label: 'Women\'s', path: '/products/category/women%27s%20clothing', img: '/percha.svg' },
  ];

  const support = [
    'Help Center',
    'Shipping Policy',
    'Returns & Refunds',
    'Order Tracking',
  ];

  const legal = ['Terms of Service', 'Privacy Policy', 'Cookies'];








  return (
    <footer className="bg-white border-t border-border-subtle pt-16 pb-8 px-margin-mobile md:px-margin-desktop md:hidden">
<div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <a href="#" className="text-2xl font-black tracking-tighter text-on-surface">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-primary text-3xl">shopping_bag</span> LUXE.
              </span>
            </a>
            <p className="text-on-surface-variant text-label-md max-w-xs">
              Your one-stop destination for premium lifestyle products, from jewelry to electronics. Quality guaranteed.
            </p>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant">share</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant">alternate_email</span>
              </button>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-on-surface mb-6 uppercase tracking-wider text-label-sm">
              Categories
            </h4>
            <div className="flex flex-row items-center justify-center gap-8 bg-[#f0f2f5] p-6">
              {categories.map((category) => (
                <div key={category.path}>
                  <NavLink to={category.path} className="block">
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm transition-transform hover:scale-105">
                        <img src={category.img} alt={category.label} className="h-8 w-8 object-contain" />
                      </div>
                      <span className="text-xs font-semibold text-black capitalize tracking-wide">
                        {category.label}
                      </span>
                    </div>
                  </NavLink>
                </div>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-on-surface mb-6 uppercase tracking-wider text-label-sm">
              Support
            </h4>
            <ul className="space-y-4">
              {support.map((item) => (
                <li key={item}>
                  <a href="#" className="text-on-surface-variant hover:text-primary transition-colors text-label-md">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-on-surface mb-6 uppercase tracking-wider text-label-sm">
              Newsletter
            </h4>
            <p className="text-on-surface-variant text-label-md mb-4">
              Get the latest updates on new arrivals and sales.
            </p>
            <div className="space-y-3">
              <input
                className="w-full bg-surface-container-low border-none rounded-lg py-3 px-4 text-label-md focus:ring-1 focus:ring-primary"
                type="email"
                placeholder="Your email address"
              />
              <button className="w-full bg-primary hover:bg-surface-tint text-white py-3 rounded-lg font-bold transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border-subtle pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-label-sm text-on-surface-variant">
            © 2024 Luxe Store. Powered by FakeStore API.
          </p>
          <div className="flex gap-6">
            {legal.map((item) => (
              <a key={item} href="#" className="text-label-sm text-on-surface-variant hover:text-on-surface">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-border-subtle shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
      aria-label="Navegación principal"
    >
      <div className="flex items-center justify-around px-2 h-16">

        {/* Home */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${navItemBase} ${isActive ? activeClass : defaultClass}`
          }
        >
          {({ isActive }) => (
            <>
              <span
                className="material-symbols-outlined text-[22px]"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                home
              </span>
              <span className="text-[9px] font-bold tracking-wide uppercase">Home</span>
            </>
          )}
        </NavLink>

        {/* Electronics (Explore) */}
        <NavLink
          to="/products/category/electronics"
          className={({ isActive }) =>
            `${navItemBase} ${isActive ? activeClass : defaultClass}`
          }
        >
          {({ isActive }) => (
            <>
              <span
                className="material-symbols-outlined text-[22px]"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                explore
              </span>
              <span className="text-[9px] font-bold tracking-wide uppercase">Explore</span>
            </>
          )}
        </NavLink>

        {/* Favoritos */}
        <button
          onClick={onFavoritesOpen}
          className={`${navItemBase} relative ${defaultClass}`}
          aria-label="Abrir favoritos"
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={{ fontVariationSettings: favCount > 0 ? "'FILL' 1" : "'FILL' 0",
                     color: favCount > 0 ? '#ef4444' : undefined }}
          >
            favorite
          </span>
          {favCount > 0 && (
            <span className="absolute top-0 right-[18%] bg-red-500 text-white text-[8px] min-w-[14px] h-[14px] flex items-center justify-center rounded-full font-bold px-0.5">
              {favCount > 99 ? '99+' : favCount}
            </span>
          )}
          <span className="text-[9px] font-bold tracking-wide uppercase">Wishlist</span>
        </button>

        {/* Perfil */}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `${navItemBase} ${isActive ? activeClass : defaultClass}`
          }
        >
          <div className="w-7 h-7 rounded-full border-2 border-border-subtle overflow-hidden bg-surface-container-low">
            <img
              src="/img/rolando.png"
              alt="Perfil"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback si la imagen no existe
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML =
                  '<span class="material-symbols-outlined text-[18px] flex items-center justify-center w-full h-full">person</span>';
              }}
            />
          </div>
          <span className="text-[9px] font-bold tracking-wide uppercase">Profile</span>
        </NavLink>

      </div>
    </nav>
    </footer>
  );
}
