const styles = {
  High: 'bg-rose-100 text-rose-700',
  Medium: 'bg-amber-100 text-amber-800',
  Low: 'bg-emerald-100 text-emerald-800',
};

export default function PriorityBadge({ priority }) {
  if (!priority) return null;
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles[priority] || 'bg-slate-100 text-slate-600'}`}
    >
      {priority}
    </span>
  );
}
