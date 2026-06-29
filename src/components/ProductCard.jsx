import { Link } from 'react-router-dom';
import { useCart }      from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';

export default function ProductCard({ product }) {
  const { id, category, title, price, rating, image } = product;
  const { addToCart }         = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const favorite = isFavorite(id);

  return (
    <article className="bg-white border border-border-subtle rounded-xl overflow-hidden product-card-hover group p-4 flex flex-col">
      {/* Imagen con botón favorito */}
      <div className="relative">
        <Link to={`/products/${id}`}>
          <div className="aspect-square rounded-lg overflow-hidden bg-surface-container-low mb-4">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-contain mix-blend-multiply p-6 transition-transform group-hover:scale-105"
            />
          </div>
        </Link>
        {/* Botón favorito flotante */}
        <button
          onClick={() => toggleFavorite(product)}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 transition-transform"
          aria-label={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <span
            className="material-symbols-outlined text-lg"
            style={{ fontVariationSettings: favorite ? "'FILL' 1" : "'FILL' 0", color: favorite ? '#ef4444' : '#9ca3af' }}
          >
            favorite
          </span>
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 mb-3">
        <span className="text-[10px] font-bold text-primary tracking-widest uppercase">{category}</span>
        <h3 className="text-label-md text-on-surface line-clamp-2 leading-snug">{title}</h3>
      </div>

      {/* Precio + Rating */}
      <div className="mt-auto flex items-center justify-between mb-4">
        <p className="text-on-surface font-bold text-headline-sm">${price.toFixed(2)}</p>
        <div className="flex items-center text-rating-amber">
          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          <span className="text-label-sm ml-1 text-on-surface-variant">{rating.rate}</span>
        </div>
      </div>

      {/* Botón agregar al carrito */}
      <button
        onClick={() => addToCart(product)}
        className="w-full bg-on-background text-white py-2.5 rounded-lg text-label-md flex items-center justify-center gap-2 hover:bg-on-surface transition-colors"
      >
        <span className="material-symbols-outlined text-lg">shopping_cart</span>
        Add to Cart
      </button>
    </article>
  );
}
