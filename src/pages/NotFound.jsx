import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-on-surface-variant px-8 text-center">
      <span className="material-symbols-outlined text-7xl mb-4 text-border-subtle">search_off</span>
      <h1 className="text-headline-md font-bold text-on-surface mb-2">Página no encontrada</h1>
      <p className="text-label-md mb-8">La ruta que buscas no existe.</p>
      <Link to="/" className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-surface-tint transition-colors">
        Volver al inicio
      </Link>
    </div>
  );
}
