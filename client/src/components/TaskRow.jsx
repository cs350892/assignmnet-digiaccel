import { Check, Pencil, Trash2 } from 'lucide-react';

export default function TaskRow({ task, onEdit, onDelete, onToggleComplete }) {
  const done = task.status === 'Completed';

  return (
    <div className="flex items-center gap-3 border-b border-gray-100 py-3.5 last:border-b-0">
      <button
        type="button"
        onClick={() => onToggleComplete(task)}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${
          done ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 bg-white'
        }`}
      >
        {done && <Check className="h-3 w-3" strokeWidth={3} />}
      </button>

      <p className={`min-w-0 flex-1 text-sm font-medium ${done ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
        {task.title}
      </p>

      <button type="button" onClick={() => onDelete(task._id)} className="text-gray-400 hover:text-gray-600">
        <Trash2 className="h-5 w-5" />
      </button>
      <button type="button" onClick={() => onEdit(task)} className="text-gray-400 hover:text-gray-600">
        <Pencil className="h-5 w-5" />
      </button>
    </div>
  );
}
