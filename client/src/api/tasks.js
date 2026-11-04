const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
}

export function fetchWeeks() {
  return request('/api/tasks/weeks');
}

export function fetchTaskById(id) {
  return request(`/api/tasks/${id}`);
}

export function fetchTasks(params = {}) {
  const qs = new URLSearchParams();
  if (params.q) qs.set('q', params.q);
  if (params.weekKey) qs.set('weekKey', params.weekKey);
  const query = qs.toString();
  return request(`/api/tasks${query ? `?${query}` : ''}`);
}

export function createTask(body) {
  return request('/api/tasks', { method: 'POST', body: JSON.stringify(body) });
}

export function updateTask(id, body) {
  return request(`/api/tasks/${id}`, { method: 'PUT', body: JSON.stringify(body) });
}

export function deleteTask(id) {
  return request(`/api/tasks/${id}`, { method: 'DELETE' });
}
