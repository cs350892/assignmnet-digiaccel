import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTaskById, updateTask } from '../api/tasks.js';
import NewTaskSheet from '../components/NewTaskSheet.jsx';

export default function EditTaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTaskById(id)
      .then((data) => setTask(data.task))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return <p className="mx-4 mt-6 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>;
  }

  if (!task) {
    return <p className="py-12 text-center text-sm text-gray-400">Loading task…</p>;
  }

  return (
    <NewTaskSheet
      open
      title="Edit Task"
      initial={task}
      onClose={() => navigate(-1)}
      onSubmit={async (body) => {
        await updateTask(id, body);
        navigate(-1);
      }}
      submitLabel="Save changes"
    />
  );
}
