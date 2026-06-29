import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import { useCart }      from '../contexts/CartContext';

export default function FavoritesDrawer({ open, onClose }) {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <aside className="relative w-full max-w-sm bg-white h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle">
          <h2 className="text-headline-sm font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-red-500" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            Favoritos
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {favorites.length === 0 ? (
            <div className="text-center py-16 text-on-surface-variant">
              <span className="material-symbols-outlined text-5xl mb-3 block">favorite_border</span>
              <p className="text-label-md">Aún no tienes favoritos</p>
              <p className="text-label-sm mt-1">Haz clic en el corazón de cualquier producto.</p>
            </div>
          ) : (
            favorites.map((item) => (
              <div key={item.id} className="flex gap-3 bg-surface-container-low rounded-xl p-3">
                <Link to={`/products/${item.id}`} onClick={onClose}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-contain rounded-lg bg-white p-1 shrink-0"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/products/${item.id}`} onClick={onClose}>
                    <p className="text-label-md text-on-surface line-clamp-2 mb-1 leading-snug hover:text-primary transition-colors">
                      {item.title}
                    </p>
                  </Link>
                  <p className="text-primary font-bold text-label-md">${item.price.toFixed(2)}</p>
                  <button
                    onClick={() => addToCart(item)}
                    className="mt-2 text-label-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-base">shopping_cart</span>
                    Agregar al carrito
                  </button>
                </div>
                <button
                  onClick={() => toggleFavorite(item)}
                  className="p-1 text-red-400 hover:text-red-600 transition-colors self-start"
                  aria-label="Quitar de favoritos"
                >
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    favorite
                  </span>
                </button>
              </div>
            ))
          )}
        </div>
      </aside>
    </div>
  );
}
