import { useEffect, useState } from 'react';
import { deleteTask, fetchTasks, updateTask } from '../api/tasks.js';
import TaskItem from '../components/TaskItem.jsx';

export default function SearchPage({ onEditTask }) {
  const [query, setQuery] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setTasks([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await fetchTasks({ q: trimmed });
        setTasks(data.tasks);
        setError('');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  async function handleDelete(id) {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  }

  async function handleStatusChange(id, status) {
    await updateTask(id, { status });
    setTasks((prev) => prev.map((t) => (t._id === id ? { ...t, status } : t)));
  }

  return (
    <div className="space-y-4 pb-24">
      <label className="block">
        <span className="sr-only">Search tasks</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title or description…"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 shadow-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
        />
      </label>

      {error && (
        <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>
      )}

      {loading && <p className="text-center text-sm text-slate-500">Searching…</p>}

      {!loading && query.trim() && tasks.length === 0 && (
        <p className="text-center text-sm text-slate-500">No tasks match your search.</p>
      )}

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onEdit={onEditTask}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
}
