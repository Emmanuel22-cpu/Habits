import { useState, useEffect } from "react";
import { habitService } from "../services/habitService";

export function useHabits() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    habitService
      .getAll()
      .then((data) => setHabits(data))
      .catch(() => setError("No se pudieron cargar los hábitos. Intenta de nuevo."))
      .finally(() => setLoading(false));
  }, []);

  const completeHabit = async (id) => {
    const habit = habits.find((h) => h.id === id);
    if (!habit) return;

    const newValue = !habit.completedToday;

    setHabits((prev) =>
      prev.map((h) => h.id === id ? { ...h, completedToday: newValue } : h)
    );

    try {
      const updated = await habitService.update(id, { completedToday: newValue });
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

  return {
    habits,
    loading,
    error,
    completeHabit,
    createHabit,
    editHabit,
    deleteHabit,
  };
}