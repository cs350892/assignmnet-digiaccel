import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, onFocus, placeholder = 'Search for a task', readOnly, autoFocus }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
      <Search className="h-5 w-5 shrink-0 text-blue-600" />
      <input
        type="search"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        readOnly={readOnly}
        autoFocus={autoFocus}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-gray-900 outline-none placeholder:text-gray-400"
      />
    </div>
  );
}
