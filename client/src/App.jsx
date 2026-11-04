import { useNavigate, useRoutes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import EditTaskPage from './pages/EditTaskPage.jsx';

function Shell({ children, active }) {
  const navigate = useNavigate();

  return (
    <div className="mx-auto min-h-screen max-w-md bg-gradient-to-b from-violet-50 to-slate-50">
      <header className="sticky top-0 z-10 border-b border-white/60 bg-white/80 px-4 py-4 backdrop-blur">
        <h1 className="text-xl font-bold text-slate-900">My Tasks</h1>
        <p className="text-xs text-slate-500">Weekly overview & reminders</p>
      </header>

      <main className="px-4 py-4">{children}</main>

      <nav className="fixed bottom-0 left-0 right-0 mx-auto flex max-w-md border-t border-slate-200 bg-white px-6 py-3 shadow-[0_-4px_20px_rgba(15,23,42,0.06)]">
        <button
          type="button"
          onClick={() => navigate('/')}
          className={`flex-1 text-sm font-semibold ${active === 'home' ? 'text-violet-600' : 'text-slate-400'}`}
        >
          Home
        </button>
        <button
          type="button"
          onClick={() => navigate('/search')}
          className={`flex-1 text-sm font-semibold ${active === 'search' ? 'text-violet-600' : 'text-slate-400'}`}
        >
          Search
        </button>
      </nav>
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();

  const element = useRoutes([
    {
      path: '/',
      element: (
        <Shell active="home">
          <HomePage onEditTask={(task) => navigate(`/tasks/${task._id}/edit`)} />
        </Shell>
      ),
    },
    {
      path: '/search',
      element: (
        <Shell active="search">
          <SearchPage onEditTask={(task) => navigate(`/tasks/${task._id}/edit`)} />
        </Shell>
      ),
    },
    {
      path: '/tasks/:id/edit',
      element: (
        <Shell active="home">
          <EditTaskPage />
        </Shell>
      ),
    },
  ]);

  return element;
}
