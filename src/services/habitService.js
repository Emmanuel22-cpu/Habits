const BASE_URL = "http://localhost:3001/habits";

export const habitService = {
  getAll: async () => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Error al obtener los hábitos");
    return res.json();
  },

  create: async (data) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        completedToday: false,
        createdAt: new Date().toISOString(),
      }),
    });
    if (!res.ok) throw new Error("Error al crear el hábito");
    return res.json();
  },

  update: async (id, data) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al actualizar el hábito");
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Error al eliminar el hábito");
  },
};