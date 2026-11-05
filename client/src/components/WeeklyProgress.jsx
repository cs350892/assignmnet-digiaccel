export default function WeeklyProgress({ percent }) {
  const value = Math.min(100, Math.max(0, percent));

  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">Weekly Progress</h2>
        <span className="text-sm font-semibold text-blue-600">{value}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-blue-50">
        <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${value}%` }} />
      </div>
    </section>
  );
}
