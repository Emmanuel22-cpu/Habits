import { useState, useEffect } from "react";
import { STATUS_FILTERS } from "../helpers/habitUtils";

export function FilterBar({ search, setSearch, filter, setFilter, availableCategories }) {
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!search) {
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => setIsSearching(false), 600);
    return () => clearTimeout(timer);
  }, [search]);

  const allFilters = [...STATUS_FILTERS, ...availableCategories];

  return (
    <div className="flex flex-col gap-3 mb-6">
      {/* Búsqueda */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm pointer-events-none">
          {String.fromCodePoint(0x1F50D)}
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar hábito..."
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-stone-200 rounded-lg
                     text-sm text-stone-700 placeholder-stone-300
                     focus:outline-none focus:border-stone-400 transition-colors duration-200"
        />

        {/* Botón limpiar */}
        {search && !isSearching && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-300
                       hover:text-stone-500 transition-colors text-xl leading-none"
          >
            x
          </button>
        )}
      </div>

      {/* Indicador de búsqueda */}
      {isSearching && (
        <div className="flex items-center gap-2 px-3 py-2 bg-stone-100 border border-stone-200
                        rounded-lg transition-all duration-200">

          <div className="w-3.5 h-3.5 border-2 border-stone-300 border-t-stone-600
                          rounded-full animate-spin flex-shrink-0" />
          <span className="text-xs text-stone-500 font-medium">
            Buscando
            <span className="font-semibold text-stone-700"> "{search}"</span> 
          </span>
        </div>
      )}

      {/* Tabs de filtro */}
      <div className="flex gap-2 flex-wrap">
        {allFilters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200
              ${filter === f
                ? "bg-stone-800 text-stone-100 border-stone-800"
                : "bg-white text-stone-500 border-stone-200 hover:border-stone-400"
              }`}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}