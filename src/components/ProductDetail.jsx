import { useNavigate } from 'react-router-dom';
import { useCart }      from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import Loading from './Loading';

export default function ProductDetail({ product, loading, error }) {
  const navigate = useNavigate();
  const { addToCart }                    = useCart();
  const { toggleFavorite, isFavorite }   = useFavorites();

  if (loading) return <Loading message="Cargando producto..." />;

  if (error || (!product && !loading)) {
    return (
      <div className="max-w-2xl mx-auto px-8 text-center py-20">
        <button onClick={() => navigate(-1)} className="text-primary hover:underline mb-8 block">← Volver</button>
        <div className="bg-red-50 border border-red-200 rounded-xl p-8">
          <h2 className="text-headline-sm font-bold text-on-surface mb-2">Producto no encontrado</h2>
          <p className="text-on-surface-variant text-label-md mb-6">{error || 'Sin datos disponibles.'}</p>
          <button onClick={() => navigate('/')} className="px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-surface-tint transition-colors">
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const favorite = isFavorite(product.id);

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
      <button onClick={() => navigate(-1)} className="text-primary hover:underline mb-6 flex items-center gap-1 text-label-md">
        <span className="material-symbols-outlined text-lg">arrow_back</span> Volver
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-border-subtle">
        {/* Imagen */}
        <div className="flex items-center justify-center bg-surface-container-low rounded-xl p-10">
          <img src={product.image} alt={product.title} className="max-h-80 object-contain" />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">{product.category}</span>
          <h1 className="text-headline-md font-headline-md text-on-surface mb-4 leading-tight">{product.title}</h1>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-on-surface">${product.price.toFixed(2)}</span>
            <span className="flex items-center gap-1 text-rating-amber">
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="text-label-md text-on-surface-variant">{product.rating.rate} ({product.rating.count})</span>
            </span>
          </div>

          <p className="text-label-md text-on-surface-variant leading-relaxed mb-8">{product.description}</p>

          <div className="mt-auto flex gap-3 flex-wrap">
            <button
              onClick={() => addToCart(product)}
              className="flex-1 min-w-[160px] bg-primary text-white py-3 rounded-lg font-bold hover:bg-surface-tint transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
              Añadir al carrito
            </button>
            <button
              onClick={() => toggleFavorite(product)}
              className={`p-3 rounded-lg border transition-colors ${favorite ? 'border-red-300 bg-red-50 text-red-500' : 'border-border-subtle text-on-surface-variant hover:border-red-300 hover:text-red-400'}`}
              aria-label={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: favorite ? "'FILL' 1" : "'FILL' 0" }}>
                favorite
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
