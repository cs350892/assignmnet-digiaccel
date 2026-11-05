import { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import {
  combineDateAndTime,
  formatLongDate,
  toInputDate,
  toInputTime,
} from '../utils/dates.js';

function getInitialValues(task) {
  if (task) {
    return {
      title: task.title,
      description: task.description || '',
      date: toInputDate(task.dateTime),
      startTime: toInputTime(task.dateTime),
      endTime: toInputTime(task.dateTime),
    };
  }

  const today = new Date();
  return {
    title: '',
    description: '',
    date: toInputDate(today.toISOString()),
    startTime: '09:00',
    endTime: '10:00',
  };
}

const fieldClass =
  'w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100';

export default function TaskForm({ initial, onSubmit, submitLabel = 'Save' }) {
  const [form, setForm] = useState(() => getInitialValues(initial));
  const [error, setError] = useState('');

  function setField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
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
      dateTime: combineDateAndTime(form.date, form.startTime),
      status: initial?.status || 'In Progress',
      priority: '',
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-900">Task title</label>
        <input
          className={fieldClass}
          value={form.title}
          onChange={(e) => setField('title', e.target.value)}
          placeholder="Doing Homework"
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-gray-900">Set Time</p>
        <div className="grid grid-cols-2 gap-3">
          <label>
            <span className="mb-1 block text-xs text-gray-400">Start</span>
            <div className="relative">
              <input
                type="time"
                className={`${fieldClass} pr-10`}
                value={form.startTime}
                onChange={(e) => setField('startTime', e.target.value)}
              />
              <Clock className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </label>
          <label>
            <span className="mb-1 block text-xs text-gray-400">Ends</span>
            <div className="relative">
              <input
                type="time"
                className={`${fieldClass} pr-10`}
                value={form.endTime}
                onChange={(e) => setField('endTime', e.target.value)}
              />
              <Clock className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </label>
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-gray-900">Set Date</p>
        <label className="relative block">
          <span className={`${fieldClass} flex items-center justify-between`}>
            {formatLongDate(form.date)}
            <Calendar className="h-5 w-5 text-gray-400" />
          </span>
          <input
            type="date"
            className="absolute inset-0 cursor-pointer opacity-0"
            value={form.date}
            onChange={(e) => setField('date', e.target.value)}
          />
        </label>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-900">Description</label>
        <textarea
          rows={4}
          className={`${fieldClass} resize-none`}
          value={form.description}
          onChange={(e) => setField('description', e.target.value)}
          placeholder="Add Description"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-2xl bg-blue-600 py-4 font-semibold text-white hover:bg-blue-700"
      >
        {submitLabel}
      </button>
    </form>
  );
}
