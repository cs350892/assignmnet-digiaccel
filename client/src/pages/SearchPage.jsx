import { useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { deleteTask, fetchTasks, updateTask } from '../api/tasks.js';
import NewTaskSheet from '../components/NewTaskSheet.jsx';
import SearchBar from '../components/SearchBar.jsx';
import TaskRow from '../components/TaskRow.jsx';

export default function SearchPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') || '');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setTasks([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await fetchTasks({ q });
        setTasks(data.tasks);
        setError('');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  async function saveEdit(body) {
    await updateTask(editTask._id, body);
    setEditTask(null);
    const data = await fetchTasks({ q: query.trim() });
    setTasks(data.tasks);
  }

  return (
    <div className="min-h-screen bg-white pb-8">
      <div className="flex items-center gap-2 px-4 pt-5">
        <button type="button" onClick={() => navigate(-1)} className="rounded-full p-2 hover:bg-gray-100">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div className="min-w-0 flex-1">
          <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} autoFocus />
        </div>
      </div>

      <div className="mt-4 px-4">
        {error && <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        {loading && <p className="text-center text-sm text-gray-400">Searching…</p>}
        {!loading && query.trim() && tasks.length === 0 && (
          <p className="text-center text-sm text-gray-400">No tasks match your search.</p>
        )}

        {tasks.map((task) => (
          <TaskRow
            key={task._id}
            task={task}
            onEdit={setEditTask}
            onDelete={async (id) => {
              await deleteTask(id);
              setTasks((prev) => prev.filter((t) => t._id !== id));
            }}
            onToggleComplete={async (t) => {
              const status = t.status === 'Completed' ? 'In Progress' : 'Completed';
              await updateTask(t._id, { status });
              setTasks((prev) => prev.map((item) => (item._id === t._id ? { ...item, status } : item)));
            }}
          />
        ))}
      </div>

      <NewTaskSheet
        open={!!editTask}
        title="Edit Task"
        initial={editTask}
        onClose={() => setEditTask(null)}
        onSubmit={saveEdit}
        submitLabel="Save changes"
      />
    </div>
  );
}
