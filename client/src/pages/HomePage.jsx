import { useCallback, useEffect, useState } from 'react';
import {
  createTask,
  deleteTask,
  fetchWeeks,
  updateTask,
} from '../api/tasks.js';
import TaskForm from '../components/TaskForm.jsx';
import WeekCard from '../components/WeekCard.jsx';

export default function HomePage({ onEditTask }) {
  const [weeks, setWeeks] = useState([]);
  const [expandedKey, setExpandedKey] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchWeeks();
      setWeeks(data.weeks);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleCreate(body) {
    await createTask(body);
    setShowForm(false);
    await load();
  }

  async function handleDelete(id) {
    await deleteTask(id);
    await load();
  }

  async function handleStatusChange(id, status) {
    await updateTask(id, { status });
    await load();
  }

  return (
    <div className="space-y-4 pb-24">
      {error && (
        <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>
      )}

      {showForm ? (
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">New task</h2>
          <TaskForm
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
            submitLabel="Save task"
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="w-full rounded-2xl bg-violet-600 py-3.5 font-semibold text-white shadow-md hover:bg-violet-700"
        >
          + Add task
        </button>
      )}

      {loading ? (
        <p className="text-center text-sm text-slate-500">Loading weeks…</p>
      ) : weeks.length === 0 ? (
        <p className="rounded-2xl bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
          No tasks yet. Add your first task to see weekly summaries here.
        </p>
      ) : (
        weeks.map((week) => (
          <WeekCard
            key={week.weekKey}
            week={week}
            expanded={expandedKey === week.weekKey}
            onToggle={(key) => setExpandedKey((prev) => (prev === key ? null : key))}
            onEdit={onEditTask}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        ))
      )}
    </div>
  );
}
