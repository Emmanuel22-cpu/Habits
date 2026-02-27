import {
  getCategoryTextColor,
  getCategoryBgColor,
  getCategoryBorderColor,
  formatCreatedAt,
} from "../helpers/habitUtils";

import { Pencil, Trash2 } from "lucide-react";

export function HabitItem({ habit, onComplete, onEdit, onDelete }) {
  return (
    <div
      className={`bg-white border rounded-xl p-5 transition-all duration-200
        hover:shadow-md hover:border-stone-300
        ${
          habit.completedToday
            ? "bg-stone-50 border-stone-100"
            : "border-stone-200"
        }`}
    >
      <div className="flex items-start gap-4">

        <button
          onClick={() => onComplete(habit.id)}
          className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center
            transition-all duration-300
            ${
              habit.completedToday
                ? "bg-emerald-500 border-emerald-500 text-white hover:bg-red-400 hover:border-red-400"
                : "border-stone-300 hover:border-emerald-400"
            }`}
          title={habit.completedToday ? "Desmarcar" : "Marcar como hecho"}
        >
          {habit.completedToday && (
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>

        {/* Contenido */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span
              className={`font-serif text-base font-semibold
                ${
                  habit.completedToday
                    ? "text-stone-400 line-through decoration-stone-300"
                    : "text-stone-800"
                }`}
            >
              {habit.name}
            </span>

            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium border
                ${getCategoryBgColor(habit.category)}
                ${getCategoryTextColor(habit.category)}
                ${getCategoryBorderColor(habit.category)}`}
            >
              {habit.category}
            </span>
          </div>

          <p className="text-xs text-stone-400 font-light truncate">
            {habit.description}
          </p>
          <p className="text-xs text-stone-300 mt-1.5">
            Desde {formatCreatedAt(habit.createdAt)}
          </p>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-2">
          <ActionButton
            onClick={() => onEdit(habit)}
            title="Editar"
            icon={<Pencil size={16} />}
            success
          />

          <ActionButton
            onClick={() => onDelete(habit.id)}
            title="Eliminar"
            icon={<Trash2 size={16} />}
            danger
          />
        </div>
      </div>
    </div>
  );
}

function ActionButton({ onClick, title, icon, success = false, danger = false }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all duration-200
        ${
          danger
            ? "border-stone-200 text-stone-400 hover:bg-red-50 hover:text-red-500 hover:border-red-200"
            : success
            ? "border-stone-200 text-stone-400 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
            : "border-stone-200 text-stone-400 hover:bg-stone-100 hover:text-stone-600"
        }`}
    >
      {icon}
    </button>
  );
}