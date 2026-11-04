import { useRef, useState } from 'react';
import PriorityBadge from './PriorityBadge.jsx';
import { formatDateTime } from '../utils/dates.js';

export default function TaskItem({ task, onEdit, onDelete, onStatusChange }) {
  const [offsetX, setOffsetX] = useState(0);
  const startX = useRef(0);
  const dragging = useRef(false);

  function onTouchStart(e) {
    startX.current = e.touches[0].clientX;
    dragging.current = true;
  }

  function onTouchMove(e) {
    if (!dragging.current) return;
    const diff = e.touches[0].clientX - startX.current;
    if (diff < 0) setOffsetX(Math.max(diff, -88));
  }

  function onTouchEnd() {
    dragging.current = false;
    if (offsetX < -48) {
      setOffsetX(-88);
    } else {
      setOffsetX(0);
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div className="absolute inset-y-0 right-0 flex w-[88px] items-center justify-center bg-rose-500">
        <button
          type="button"
          onClick={() => onDelete(task._id)}
          className="text-sm font-semibold text-white"
        >
          Delete
        </button>
      </div>

      <article
        className="relative rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-transform"
        style={{ transform: `translateX(${offsetX}px)` }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3
              className={`font-semibold text-slate-900 ${task.status === 'Completed' ? 'line-through text-slate-400' : ''}`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className="mt-1 text-sm text-slate-500">{task.description}</p>
            )}
            <p className="mt-2 text-xs text-slate-400">{formatDateTime(task.dateTime)}</p>
          </div>
          <PriorityBadge priority={task.priority} />
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task._id, e.target.value)}
            className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-medium text-slate-700"
          >
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="rounded-lg bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(task._id)}
            className="hidden rounded-lg bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 sm:inline"
          >
            Delete
          </button>
        </div>
      </article>
    </div>
  );
}
