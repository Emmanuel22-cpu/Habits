import { HabitItem } from "./habitItem";
import { EmptyState } from "./estado";

export function HabitList({
  habits, loading, error, hasFilters,
  onComplete, onEdit, onDelete, onResetStreak, onCreateClick,
}) {

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white border border-stone-100 rounded-xl p-5 animate-pulse"
               style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="flex items-center gap-4">
              <div className="w-5 h-5 rounded-full bg-stone-100 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="flex gap-2">
                  <div className="h-4 bg-stone-100 rounded w-32" />
                  <div className="h-4 bg-stone-100 rounded w-16" />
                </div>
                <div className="h-3 bg-stone-100 rounded w-56" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h3 className="font-serif text-xl text-stone-600 mb-2">Algo salió mal</h3>
        <p className="text-sm text-stone-400 font-light max-w-xs">{error}</p>
      </div>
    );
  }

  if (habits.length === 0) {
    return <EmptyState hasFilters={hasFilters} onCreateClick={onCreateClick} />;
  }

  return (
    <div className="flex flex-col gap-3">
      {habits.map((habit, index) => (
        <div key={habit.id} style={{ animationDelay: `${index * 0.05}s` }}
             className="animate-[fadeSlideIn_0.3s_ease_both]">
          <HabitItem
            habit={habit}
            onComplete={onComplete}
            onEdit={onEdit}
            onDelete={onDelete}
            onResetStreak={onResetStreak}
          />
        </div>
      ))}
    </div>
  );
}