export const CATEGORY_TEXT_COLOR = {
  Salud: "text-emerald-700",
  Estudio: "text-sky-700",
  Productividad: "text-amber-700",
  Personal: "text-purple-700",
};

export const CATEGORY_BG_COLOR = {
  Salud: "bg-emerald-50",
  Estudio: "bg-sky-50",
  Productividad: "bg-amber-50",
  Personal: "bg-purple-50",
};

export const CATEGORY_BORDER_COLOR = {
  Salud: "border-emerald-200",
  Estudio: "border-sky-200",
  Productividad: "border-amber-200",
  Personal: "border-purple-200",
};

export const CATEGORIES = ["Salud", "Estudio", "Productividad", "Personal"];
export const STATUS_FILTERS = ["Todos", "Completados", "Pendientes"];

export const getCategoryTextColor = (cat) =>
  CATEGORY_TEXT_COLOR[cat] ?? "text-stone-600";

export const getCategoryBgColor = (cat) =>
  CATEGORY_BG_COLOR[cat] ?? "bg-stone-100";

export const getCategoryBorderColor = (cat) =>
  CATEGORY_BORDER_COLOR[cat] ?? "border-stone-200";

export const filterHabits = (habits, search, filter) => {
  return habits.filter((habit) => {
    const matchesSearch = habit.name
      .toLowerCase()
      .includes(search.toLowerCase().trim());

    let matchesFilter = true;
    if (filter === "Completados") matchesFilter = habit.completedToday;
    else if (filter === "Pendientes") matchesFilter = !habit.completedToday;
    else if (filter !== "Todos") matchesFilter = habit.category === filter;

    return matchesSearch && matchesFilter;
  });
};

export const getHabitStats = (habits) => ({
  total: habits.length,
  completedToday: habits.filter((h) => h.completedToday).length,
  pending: habits.filter((h) => !h.completedToday).length,
});

export const formatCreatedAt = (date) =>
  new Date(date).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });