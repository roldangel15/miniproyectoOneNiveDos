import { useEffect } from 'react';
import { useCart } from '../contexts/CartContext';

export default function CartDrawer({ open, onClose }) {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();

  // Cerrar con Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Evitar scroll del body cuando está abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const total = getTotalPrice();

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <aside className="relative w-full max-w-sm bg-white h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle">
          <h2 className="text-headline-sm font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">shopping_cart</span>
            Carrito
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 text-on-surface-variant">
              <span className="material-symbols-outlined text-5xl mb-3 block">shopping_cart</span>
              <p className="text-label-md">Tu carrito está vacío</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-3 bg-surface-container-low rounded-xl p-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-contain rounded-lg bg-white p-1 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-label-md text-on-surface line-clamp-2 mb-1 leading-snug">{item.title}</p>
                  <p className="text-primary font-bold text-label-md">${item.price.toFixed(2)}</p>

                  {/* Cantidad */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="w-6 h-6 rounded-full border border-border-subtle flex items-center justify-center text-on-surface hover:bg-surface-container-high disabled:opacity-30 transition"
                    >
                      <span className="material-symbols-outlined text-sm">remove</span>
                    </button>
                    <span className="text-label-md font-semibold w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-full border border-border-subtle flex items-center justify-center text-on-surface hover:bg-surface-container-high transition"
                    >
                      <span className="material-symbols-outlined text-sm">add</span>
                    </button>
                  </div>
                </div>

                {/* Eliminar */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-1 text-on-surface-variant hover:text-error transition-colors self-start"
                  aria-label="Eliminar"
                >
                  <span className="material-symbols-outlined text-xl">delete</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer con total */}
        {cartItems.length > 0 && (
          <div className="px-6 py-4 border-t border-border-subtle space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-label-md text-on-surface-variant">Total</span>
              <span className="text-headline-sm font-bold text-on-surface">${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-surface-tint transition-colors">
              Proceder al pago
            </button>
            <button
              onClick={clearCart}
              className="w-full text-label-md text-on-surface-variant hover:text-error transition-colors text-center"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
