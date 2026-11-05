import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createTask, deleteTask, fetchWeeks, updateTask } from '../api/tasks.js';
import CalendarStrip from '../components/CalendarStrip.jsx';
import NewTaskSheet from '../components/NewTaskSheet.jsx';
import SearchBar from '../components/SearchBar.jsx';
import StatCards from '../components/StatCards.jsx';
import TaskRow from '../components/TaskRow.jsx';
import WeeklyProgress from '../components/WeeklyProgress.jsx';
import {
  buildCalendarStrip,
  isSameCalendarDay,
  startOfDay,
  weekKeyFromDateLocal,
} from '../utils/dates.js';

export default function HomePage() {
  const navigate = useNavigate();
  const [weeks, setWeeks] = useState([]);
  const [selectedDay, setSelectedDay] = useState(() => startOfDay(new Date()));
  const [showCreate, setShowCreate] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadWeeks() {
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
  }

  useEffect(() => {
    loadWeeks();
  }, []);

  const weekKey = weekKeyFromDateLocal(selectedDay);
  const currentWeek = weeks.find((w) => w.weekKey === weekKey) || weeks[0] || null;

  const completed = currentWeek?.completedCount || 0;
  const pending = currentWeek?.openCount || 0;
  const total = completed + pending;
  const progress = total ? Math.round((completed / total) * 100) : 0;

  const tasksToday = (currentWeek?.tasks || []).filter((task) =>
    isSameCalendarDay(task.dateTime, selectedDay)
  );

  async function handleCreate(body) {
    await createTask(body);
    setShowCreate(false);
    await loadWeeks();
  }

  async function handleUpdate(body) {
    await updateTask(editTask._id, body);
    setEditTask(null);
    await loadWeeks();
  }

  async function toggleComplete(task) {
    const status = task.status === 'Completed' ? 'In Progress' : 'Completed';
    await updateTask(task._id, { status });
    await loadWeeks();
  }

  return (
    <div className="pb-28">
      <div className="space-y-5 px-4 pt-5">
        <SearchBar readOnly value="" onFocus={() => navigate('/search')} />

        <CalendarStrip
          days={buildCalendarStrip(selectedDay)}
          selected={selectedDay}
          onSelect={setSelectedDay}
        />

        <StatCards completed={completed} pending={pending} />
        <WeeklyProgress percent={progress} />

        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        <section>
          <h2 className="mb-1 font-semibold text-gray-900">Tasks Today</h2>
          {loading && <p className="py-6 text-center text-sm text-gray-400">Loading…</p>}
          {!loading && tasksToday.length === 0 && (
            <p className="py-6 text-center text-sm text-gray-400">No tasks for this day.</p>
          )}
          {tasksToday.map((task) => (
            <TaskRow
              key={task._id}
              task={task}
              onEdit={setEditTask}
              onDelete={async (id) => {
                await deleteTask(id);
                await loadWeeks();
              }}
              onToggleComplete={toggleComplete}
            />
          ))}
        </section>
      </div>

      <button
        type="button"
        onClick={() => setShowCreate(true)}
        className="fixed bottom-8 left-1/2 z-20 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700"
      >
        <Plus className="h-7 w-7" />
      </button>

      <NewTaskSheet
        open={showCreate}
        title="Add New Task"
        onClose={() => setShowCreate(false)}
        onSubmit={handleCreate}
        submitLabel="Create task"
      />

      <NewTaskSheet
        open={!!editTask}
        title="Edit Task"
        initial={editTask}
        onClose={() => setEditTask(null)}
        onSubmit={handleUpdate}
        submitLabel="Save changes"
      />
    </div>
  );
}
