export default function Loading({ message = 'Cargando...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-on-surface-variant">
      <div className="w-10 h-10 border-4 border-border-subtle border-t-primary rounded-full animate-spin" />
      <p className="text-label-md">{message}</p>
    </div>
  );
}
