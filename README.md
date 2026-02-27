# Mis Hábitos

App para registrar y hacer seguimiento a hábitos diarios. Permite crear, editar, eliminar y marcar hábitos como completados, con búsqueda, filtros por categoría y persistencia de datos mediante una API REST simulada con json-server.



## Estructura del proyecto

```
src/
├── components/
│   ├── estado.jsx       # Estado vacío (sin hábitos / sin resultados)
│   ├── filterBar.jsx        # Búsqueda + filtros por estado y categoría
│   ├── habitForm.jsx        # Modal de crear/editar con validación
│   ├── habitItem.jsx        # Tarjeta individual de un hábito
│   └── habitList.jsx        # Lista con estados loading/error/empty
├── helpers/
│   └── habitUtils.js        # Funciones puras: filtrar, colores, estadísticas
├── hooks/
│   └── useHabits.js         # Lógica de negocio y estado global de hábitos
├── pages/
│   └── home.jsx             # Página principal, tiene todos los componentes
├── services/
│   └── habitService.js      # Capa de acceso a datos (fetch a la API)
├── App.jsx
├── main.jsx
└── index.css
db.json                      # Base de datos de json-server
```

---

## Instalación y configuración

### Requisitos previos

- Node.js 18+
- npm 9+

### 1. Clona el repositorio

```bash
git clone https://github.com/Emmanuel22-cpu/Habits.git
cd habits
```

### 2. Instala las dependencias

```bash
 - Primero debes instalar npm i
 - Luego instalas npm install -D json-server
 - Luego instalas npm install lucide-react
 - Y por ulitmo debes instalar esto npm install react-magic-motion
```

### 3. Verifica que el archivo `db.json` esté en la raíz del proyecto

El archivo `db.json` contiene los datos iniciales de la app. Debe estar junto al `package.json`.



## Cómo correr el proyecto

Necesitas **dos terminales** corriendo al mismo tiempo:

**Terminal 1 — API (json-server):**
```bash
npm run api
```
Levanta la API REST en `http://localhost:3001`

**Terminal 2 — App (Vite):**
```bash
npm run dev
```
Levanta la app en `http://localhost:5173`


## Stack tecnológico


``
 React 18 -
 Vite -
 Tailwind CSS v4 -
 json-server 



##  Funcionalidades

-  Crear hábitos con validación de formulario
-  Editar hábitos existentes
-  Eliminar hábitos
-  Marcar/desmarcar hábitos como completados
-  Búsqueda en tiempo real por nombre
-  Filtros por estado (Todos / Completados / Pendientes)
-  Filtros por categoría (Salud / Estudio / Productividad / Personal)
-  Estados de loading, error y empty state
-  Persistencia de datos con json-server
