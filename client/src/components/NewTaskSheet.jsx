import { X } from 'lucide-react';
import TaskForm from './TaskForm.jsx';

export default function NewTaskSheet({ open, title, initial, onClose, onSubmit, submitLabel }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button type="button" className="absolute inset-0 bg-black/40" aria-label="Close" onClick={onClose} />
      <div className="relative z-10 max-h-[92vh] w-full max-w-[390px] overflow-y-auto rounded-t-3xl bg-white px-5 pb-8 pt-5">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <button type="button" onClick={onClose} className="rounded-full p-1 text-gray-400 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        <TaskForm initial={initial} onSubmit={onSubmit} submitLabel={submitLabel} />
      </div>
    </div>
  );
}
