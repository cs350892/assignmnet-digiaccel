import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTaskById, updateTask } from '../api/tasks.js';
import TaskForm from '../components/TaskForm.jsx';

export default function EditTaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchTaskById(id);
        setTask(data.task);
      } catch (err) {
        setError(err.message);
      }
    }
    load();
  }, [id]);

  async function handleSave(body) {
    await updateTask(id, body);
    navigate(-1);
  }

  if (error) {
    return <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>;
  }

  if (!task) {
    return <p className="text-center text-sm text-slate-500">Loading task…</p>;
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Edit task</h2>
      <TaskForm
        initial={task}
        onSubmit={handleSave}
        onCancel={() => navigate(-1)}
        submitLabel="Update task"
      />
    </div>
  );
}
