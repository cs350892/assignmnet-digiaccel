import { useNavigate } from 'react-router-dom';

const STORAGE_KEY = 'digiaccel_onboarding_done';

export function hasCompletedOnboarding() {
  return localStorage.getItem(STORAGE_KEY) === '1';
}

export default function OnboardingPage() {
  const navigate = useNavigate();

  function getStarted() {
    localStorage.setItem(STORAGE_KEY, '1');
    navigate('/', { replace: true });
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="relative flex-[1.1] bg-blue-600">
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="flex flex-1 flex-col px-6 pb-10 pt-2">
        <h1 className="text-2xl font-bold text-gray-900">Manage What To Do</h1>
        <p className="mt-3 text-gray-500">
          The best way to manage what you have to do, don&apos;t forget your plans
        </p>
        <button
          type="button"
          onClick={getStarted}
          className="mt-auto w-full rounded-2xl bg-blue-600 py-4 font-semibold text-white hover:bg-blue-700"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
