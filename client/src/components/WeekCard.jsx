import TaskItem from './TaskItem.jsx';
import { formatWeekRange } from '../utils/dates.js';

export default function WeekCard({
  week,
  expanded,
  onToggle,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => onToggle(week.weekKey)}
        className="flex w-full items-center justify-between gap-3 p-4 text-left"
      >
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {formatWeekRange(week.weekStart, week.weekEnd)}
          </p>
          <p className="mt-1 text-xs text-slate-500">Tap to {expanded ? 'collapse' : 'view tasks'}</p>
        </div>
        <div className="flex gap-2 text-center">
          <div className="min-w-[72px] rounded-xl bg-violet-50 px-3 py-2">
            <p className="text-lg font-bold text-violet-700">{week.openCount}</p>
            <p className="text-[10px] uppercase tracking-wide text-violet-600">Open</p>
          </div>
          <div className="min-w-[72px] rounded-xl bg-emerald-50 px-3 py-2">
            <p className="text-lg font-bold text-emerald-700">{week.completedCount}</p>
            <p className="text-[10px] uppercase tracking-wide text-emerald-600">Done</p>
          </div>
        </div>
      </button>

      {expanded && (
        <div className="space-y-3 border-t border-slate-100 bg-slate-50/80 p-4">
          {week.tasks.length === 0 ? (
            <p className="text-center text-sm text-slate-500">No tasks this week.</p>
          ) : (
            week.tasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
              />
            ))
          )}
        </div>
      )}
    </section>
  );
}
