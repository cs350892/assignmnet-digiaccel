import { formatCalendarDay, isSameCalendarDay } from '../utils/dates.js';

export default function CalendarStrip({ days, selected, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {days.map((day) => {
        const active = isSameCalendarDay(day, selected);
        const { weekday, dayNum } = formatCalendarDay(day);

        return (
          <button
            key={day.toISOString()}
            type="button"
            onClick={() => onSelect(day)}
            className="flex min-w-[52px] flex-col items-center gap-1 py-1"
          >
            <span className={`text-xs font-medium ${active ? 'text-blue-600' : 'text-gray-400'}`}>{weekday}</span>
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                active ? 'bg-blue-600 text-white' : 'text-gray-900'
              }`}
            >
              {dayNum}
            </span>
            {active && <span className="h-1 w-1 rounded-full bg-blue-600" />}
          </button>
        );
      })}
    </div>
  );
}
