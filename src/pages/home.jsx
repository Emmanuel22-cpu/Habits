import { useState, useMemo } from "react";
import { useHabits } from "../hooks/useHabits";
import { HabitList } from "../components/habitList";
import { HabitForm } from "../components/habitForm";
import { FilterBar } from "../components/filterBar";
import { filterHabits, getHabitStats, CATEGORIES } from "../helpers/habitUtils";

export default function Home() {
  const { habits, loading, error, completeHabit, createHabit, editHabit, deleteHabit } = useHabits();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todos");
  const [modal, setModal] = useState(null);

  const filteredHabits = useMemo(() => filterHabits(habits, search, filter), [habits, search, filter]);
  const stats = useMemo(() => getHabitStats(habits), [habits]);
  const availableCategories = useMemo(
    () => CATEGORIES.filter((cat) => habits.some((h) => h.category === cat)),
    [habits]
  );

  const hasFilters = search.trim() !== "" || filter !== "Todos";

  const handleSave = async (formData) => {
    if (modal === "new") await createHabit(formData);
    else await editHabit(modal.id, formData);
  };

  const today = new Date().toLocaleDateString("es-CO", {
    weekday: "long", day: "numeric", month: "long",
  });
  const todayFormatted = today.charAt(0).toUpperCase() + today.slice(1);

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-2xl mx-auto px-4 pb-20">

        {/* HEADER */}
        <header className="pt-12 pb-8 border-b border-stone-200 mb-8">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h1 className="font-serif text-4xl font-semibold text-stone-900 tracking-tight">
                Mis Hábitos
              </h1>
              <p className="text-sm text-stone-400 font-light mt-1.5">{todayFormatted}</p>
            </div>

            {!loading && !error && habits.length > 0 && (
              <div className="text-right">
                <div className="font-serif text-3xl font-semibold text-stone-800 leading-none">
                  {stats.completedToday}<span className="text-stone-300">/{stats.total}</span>
                </div>
                <div className="text-xs text-stone-400 uppercase tracking-widest mt-1">Hoy</div>
              </div>
            )}
          </div>

          {/* Barra de progreso */}
          {!loading && !error && habits.length > 0 && (
            <div className="mt-6">
              <div className="flex justify-between text-xs text-stone-400 mb-1.5">
                <span>{stats.completedToday} completados</span>
                <span>{stats.pending} pendientes</span>
              </div>
              <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                  style={{ width: stats.total > 0 ? `${(stats.completedToday / stats.total) * 100}%` : "0%" }}
                />
              </div>
            </div>
          )}
        </header>

        {/* BARRA DE ACCIONES */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-stone-400">
            {!loading && `${filteredHabits.length} hábito${filteredHabits.length !== 1 ? "s" : ""}`}
          </span>
          <button
            onClick={() => setModal("new")}
            className="flex items-center gap-2 px-4 py-2 bg-stone-800 text-stone-100
                       rounded-lg text-sm font-medium hover:bg-stone-900
                       transition-colors duration-200 active:scale-95"
          >
            <span className="text-base leading-none">+</span>
            Nuevo hábito
          </button>
        </div>

        {/* FILTROS */}
        <FilterBar
          search={search} setSearch={setSearch}
          filter={filter} setFilter={setFilter}
          availableCategories={availableCategories}
        />

        {/* LISTA */}
        <HabitList
          habits={filteredHabits}
          loading={loading}
          error={error}
          hasFilters={hasFilters}
          onComplete={completeHabit}
          onEdit={setModal}
          onDelete={deleteHabit}
          onCreateClick={() => setModal("new")}
        />
      </div>

      {/* MODAL */}
      {modal && (
        <HabitForm
          initialData={modal === "new" ? null : modal}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}