let habits = [
{
    id: "1",
    name: "Meditación",
    description: "Dedica 10 minutos al día para meditar y encontrar paz interior.",
    category: "Personal",
    streak: 5,
    completedToday: false,
    createdAt: new Date ("2026-02-27")
},
{
    id: "2",
    name: "Lectura",
    description: "Leer minimo 20 paginas de un libro.",
    category: "Estudio",
    streak: 12,
    completedToday: true,
    createdAt: new Date ("2026-02-03")
},
{
    id: "3",
    name: "Ejercicio",
    description: "30 minutos de cardio o de entrenamiento de fuerza.",
    category: "Salud",
    streak: 3,
    completedToday: false,
    createdAt: new Date ("2026-02-27")
},
{
    id: "4",
    name: "Tomar agua",
    description: "Beber 8 vasos de agua al día.",
    category: "Salud",
    streak: 20,
    completedToday: true,
    createdAt: new Date ("2026-02-26")
},
{
    id: "5",
    name: "Practicar Inglés",
    description: "Dedicar 15 minutos al día en duolingo o hablando con un amigo en inglés.",
    category: "Personal",
    streak: 10,
    completedToday: false,
    createdAt: new Date ("2026-02-27")
},
];

const delay = (ms = 600) => new Promise((r) => setTimeout(r, ms));

export const habitService = {
  getAll: async () => {
    await delay();
    return [...habits];
    },
      create: async (data) => {
    await delay(300);
    const newHabit = {
      ...data,
      id: Date.now().toString(),
      streak: 0,
      completedToday: false,
      createdAt: new Date(),
    };
    habits = [...habits, newHabit];
    return newHabit;
  },

  update: async (id, data) => {
    await delay(250);
    habits = habits.map((h) => (h.id === id ? { ...h, ...data } : h));
    return habits.find((h) => h.id === id);
  },

  delete: async (id) => {
    await delay(250);
    habits = habits.filter((h) => h.id !== id);
  },
};