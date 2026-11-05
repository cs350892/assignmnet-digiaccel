import { CircleCheck, CircleX } from 'lucide-react';

export default function StatCards({ completed, pending }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <article className="rounded-2xl bg-blue-50 px-4 py-4">
        <div className="flex items-center gap-2 text-blue-600">
          <CircleCheck className="h-5 w-5" />
          <span className="text-xs text-gray-600">Task Complete</span>
        </div>
        <p className="mt-2 text-3xl font-bold text-gray-900">{String(completed).padStart(2, '0')}</p>
        <p className="text-xs text-gray-400">This Week</p>
      </article>

      <article className="rounded-2xl bg-pink-50 px-4 py-4">
        <div className="flex items-center gap-2 text-red-500">
          <CircleX className="h-5 w-5" />
          <span className="text-xs text-gray-600">Task Pending</span>
        </div>
        <p className="mt-2 text-3xl font-bold text-gray-900">{String(pending).padStart(2, '0')}</p>
        <p className="text-xs text-gray-400">This Week</p>
      </article>
    </div>
  );
}
