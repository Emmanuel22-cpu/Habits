import { useState, useEffect } from "react";
import { habitService } from "../services/habitService";

export function useHabits() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carga inicial al montar
  useEffect(() => {
    habitService
      .getAll()
      .then((data) => setHabits(data))
      .catch(() => setError("No se pudieron cargar los hábitos. Intenta de nuevo."))
      .finally(() => setLoading(false));
  }, []);

  const completeHabit = async (id) => {
    const habit = habits.find((h) => h.id === id);
    if (!habit || habit.completedToday) return;

    setHabits((prev) =>
      prev.map((h) =>
        h.id === id ? { ...h, completedToday: true, streak: h.streak + 1 } : h
      )
    );
    try {
        const updated = await habitService.update(id, {
        completedToday: true,
        streak: habit.streak + 1,
      });
      setHabits((prev) => prev.map((h) => (h.id === id ? updated : h)));
    } catch {
          setHabits((prev) => prev.map((h) => (h.id === id ? habit : h)));
    }
  };
    const createHabit = async (data) => {
    const newHabit = await habitService.create(data);
    setHabits((prev) => [...prev, newHabit]);
    return newHabit;
  };

  const editHabit = async (id, data) => {
    const updated = await habitService.update(id, data);
    setHabits((prev) => prev.map((h) => (h.id === id ? updated : h)));
  };

  const deleteHabit = async (id) => {
    await habitService.delete(id);
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  const resetStreak = async (id) => {
    const updated = await habitService.update(id, {
      streak: 0,
      completedToday: false,
    });
    setHabits((prev) => prev.map((h) => (h.id === id ? updated : h)));
  };

  return {
    habits,
    loading,
    error,
    completeHabit,
    createHabit,
    editHabit,
    deleteHabit,
    resetStreak,
  };
}