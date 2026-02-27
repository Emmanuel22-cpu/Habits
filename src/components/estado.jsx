export function EmptyState({ hasFilters, onCreateClick }) {
  if (hasFilters) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-5xl mb-4">🔎</div>
        <h3 className="font-serif text-xl text-stone-600 mb-2">
          Sin resultados
        </h3>
        <p className="text-sm text-stone-400 font-light max-w-xs">
          No encontramos hábitos con ese filtro o búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="text-5xl mb-4">🌱</div>
      <h3 className="font-serif text-xl text-stone-600 mb-2">
        Aún no tienes hábitos creados
      </h3>
      <p className="text-sm text-stone-400 font-light mb-6 max-w-xs">
        Los pequeños hábitos diarios construyen grandes transformaciones.
      </p>
      <button
        onClick={onCreateClick}
        className="px-5 py-2.5 bg-stone-800 text-stone-100 rounded-lg text-sm
                   font-medium hover:bg-stone-900 transition-colors duration-200"
      >
        + Crear mi primer hábito
      </button>
    </div>
  );
}