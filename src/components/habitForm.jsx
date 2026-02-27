import { useState } from "react";
import { CATEGORIES } from "../helpers/habitUtils";

const INITIAL_FORM = { name: "", description: "", category: "" };

const validate = ({ name, description, category }) => {
  const errors = {};
  if (!name.trim()) errors.name = "El nombre es obligatorio";
  if (!description.trim()) errors.description = "La descripción es obligatoria";
  else if (description.trim().length < 8)
    errors.description = "Mínimo 8 caracteres";
  if (!category) errors.category = "Selecciona una categoría";
  return errors;
};

export function HabitForm({ initialData, onSave, onClose }) {
  const isEditing = Boolean(initialData);

  const [form, setForm] = useState(
    initialData
      ? { name: initialData.name, description: initialData.description, category: initialData.category }
      : INITIAL_FORM
  );
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async () => {
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSaving(true);
    try {
      await onSave(form);
      onClose();
    } catch {
      setErrors({ general: "Error al guardar. Intenta de nuevo." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4
                 bg-stone-900/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8
                      animate-[modalUp_0.25s_ease]">

        {/* Header */}
        <div className="flex items-start justify-between mb-7">
          <h2 className="font-serif text-2xl text-stone-800">
            {isEditing ? "Editar hábito" : "Nuevo hábito"}
          </h2>
          <button
            onClick={onClose}
            className="text-stone-300 hover:text-stone-500 transition-colors text-2xl leading-none"
          >
            x
          </button>
        </div>

        {/* Error general */}
        {errors.general && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {errors.general}
          </div>
        )}

        {/* nombre */}
        <div className="mb-5">
          <label className="block text-xs font-medium uppercase tracking-wider text-stone-500 mb-1.5">
            Nombre <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Ej: Lectura diaria"
            className={`w-full px-4 py-2.5 border rounded-lg text-sm text-stone-700 bg-stone-50
                        focus:outline-none focus:bg-white transition-colors duration-200
                        ${errors.name ? "border-red-300" : "border-stone-200 focus:border-stone-400"}`}
          />
          {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
        </div>

        {/* Descripción */}
        <div className="mb-5">
          <label className="block text-xs font-medium uppercase tracking-wider text-stone-500 mb-1.5">
            Descripción <span className="text-red-400">*</span>
          </label>
          <textarea
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Describe en qué consiste el hábito..."
            rows={3}
            className={`w-full px-4 py-2.5 border rounded-lg text-sm text-stone-700 bg-stone-50
                        focus:outline-none focus:bg-white transition-colors duration-200 resize-none
                        ${errors.description ? "border-red-300" : "border-stone-200 focus:border-stone-400"}`}
          />
          <div className="flex justify-between mt-1.5">
            {errors.description
              ? <p className="text-xs text-red-500">{errors.description}</p>
              : <span />
            }
            <span className={`text-xs ${form.description.length < 8 ? "text-stone-300" : "text-stone-400"}`}>
              {form.description.length} chars
            </span>
          </div>
        </div>

        {/* categoría */}
        <div className="mb-7">
          <label className="block text-xs font-medium uppercase tracking-wider text-stone-500 mb-1.5">
            Categoría <span className="text-red-400">*</span>
          </label>
          <select
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className={`w-full px-4 py-2.5 border rounded-lg text-sm text-stone-700 bg-stone-50
                        focus:outline-none focus:bg-white transition-colors duration-200 cursor-pointer
                        ${errors.category ? "border-red-300" : "border-stone-200 focus:border-stone-400"}`}
          >
            <option value="">Seleccionar categoría...</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className="mt-1.5 text-xs text-red-500">{errors.category}</p>}
        </div>

        {/* Acciones */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg border border-stone-200 text-stone-500 text-sm
                       hover:bg-stone-50 transition-colors duration-200"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-5 py-2.5 rounded-lg bg-stone-800 text-stone-100 text-sm font-medium
                       hover:bg-stone-900 transition-colors duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Guardando..." : isEditing ? "Guardar cambios" : "Crear hábito"}
          </button>
        </div>
      </div>
    </div>
  );
}