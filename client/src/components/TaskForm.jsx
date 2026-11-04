import { useState } from 'react';
import { fromInputDateTimeLocal, toInputDateTimeLocal } from '../utils/dates.js';

const empty = () => ({
  title: '',
  description: '',
  dateTime: toInputDateTimeLocal(new Date().toISOString()),
  priority: '',
  status: 'In Progress',
});

export default function TaskForm({ initial, onSubmit, onCancel, submitLabel = 'Save' }) {
  const [form, setForm] = useState(() =>
    initial
      ? {
          title: initial.title,
          description: initial.description || '',
          dateTime: toInputDateTimeLocal(initial.dateTime),
          priority: initial.priority || '',
          status: initial.status || 'In Progress',
        }
      : empty()
  );
  const [error, setError] = useState('');

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('Title is required');
      return;
    }
    setError('');
    await onSubmit({
      title: form.title.trim(),
      description: form.description.trim(),
      dateTime: fromInputDateTimeLocal(form.dateTime),
      priority: form.priority,
      status: form.status,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>
      )}

      <label className="block text-sm font-medium text-slate-700">
        Title *
        <input
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-slate-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
          value={form.title}
          onChange={(e) => update('title', e.target.value)}
          placeholder="What needs to be done?"
        />
      </label>

      <label className="block text-sm font-medium text-slate-700">
        Description
        <textarea
          rows={3}
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-slate-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          placeholder="Add details (optional)"
        />
      </label>

      <label className="block text-sm font-medium text-slate-700">
        Date & time *
        <input
          type="datetime-local"
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-slate-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
          value={form.dateTime}
          onChange={(e) => update('dateTime', e.target.value)}
        />
      </label>

      <label className="block text-sm font-medium text-slate-700">
        Priority
        <select
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-slate-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
          value={form.priority}
          onChange={(e) => update('priority', e.target.value)}
        >
          <option value="">None</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </label>

      <label className="block text-sm font-medium text-slate-700">
        Status
        <select
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-slate-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
          value={form.status}
          onChange={(e) => update('status', e.target.value)}
        >
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </label>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 rounded-xl bg-violet-600 py-3 font-semibold text-white shadow-sm hover:bg-violet-700"
        >
          {submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-200 px-4 py-3 font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
