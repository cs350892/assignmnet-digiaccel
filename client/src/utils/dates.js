export function formatWeekRange(weekStart, weekEnd) {
  const opts = { month: 'short', day: 'numeric' };
  const start = new Date(weekStart).toLocaleDateString(undefined, opts);
  const end = new Date(weekEnd).toLocaleDateString(undefined, opts);
  return `${start} – ${end}`;
}

export function formatDateTime(value) {
  return new Date(value).toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function toInputDateTimeLocal(iso) {
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function fromInputDateTimeLocal(value) {
  return new Date(value).toISOString();
}
