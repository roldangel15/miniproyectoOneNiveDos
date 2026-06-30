import { useEffect } from 'react';

const OPTIONS = [
  { value: 'Newest',             label: 'Newest',         icon: 'schedule' },
  { value: 'Price: Low to High', label: 'Price: Low to High', icon: 'trending_up' },
  { value: 'Price: High to Low', label: 'Price: High to Low', icon: 'trending_down' },
  { value: 'Best Rating',        label: 'Best Rating',       icon: 'star' },
];

/**
 * SortSheet
 * Bottom-sheet mobile para elegir el orden de los productos.
 * Reemplaza al <select> de BanerSortBar en pantallas pequeñas.
 *
 * Props:
 *   - open         : boolean
 *   - onClose      : fn
 *   - sortOption   : string  – valor activo
 *   - onSortChange : fn      – callback al elegir una opción
 */
export default function SortSheet({ open, onClose, sortOption, onSortChange }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const handleSelect = (value) => {
    onSortChange(value);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full bg-white rounded-t-2xl shadow-2xl pb-[max(1.5rem,env(safe-area-inset-bottom))] animate-[slideUp_0.25s_ease-out]">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <span className="w-10 h-1.5 bg-border-subtle rounded-full" />
        </div>

        <div className="flex items-center justify-between px-6 pb-4 border-b border-border-subtle">
          <h2 className="text-headline-sm font-bold text-on-surface">Ordenar por</h2>
          <button onClick={onClose} className="p-2 -mr-2 rounded-full hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <ul className="px-3 py-2">
          {OPTIONS.map((opt) => {
            const active = sortOption === opt.value;
            return (
              <li key={opt.value}>
                <button
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-label-md transition-colors
                    ${active ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface hover:bg-surface-container-low'}`}
                >
                  <span className="material-symbols-outlined text-xl">{opt.icon}</span>
                  <span className="flex-1 text-left">{opt.label}</span>
                  {active && (
                    <span className="material-symbols-outlined text-xl text-primary">check</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
