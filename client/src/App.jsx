import { Navigate, useRoutes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import EditTaskPage from './pages/EditTaskPage.jsx';
import OnboardingPage, { hasCompletedOnboarding } from './pages/OnboardingPage.jsx';

function Layout({ children }) {
  return <div className="mx-auto min-h-screen max-w-[390px] bg-white">{children}</div>;
}

function RequireOnboarding({ children }) {
  if (!hasCompletedOnboarding()) {
    return <Navigate to="/onboarding" replace />;
  }
  return children;
}

export default function App() {
  return useRoutes([
    {
      path: '/onboarding',
      element: (
        <Layout>
          <OnboardingPage />
        </Layout>
      ),
    },
    {
      path: '/',
      element: (
        <RequireOnboarding>
          <Layout>
            <HomePage />
          </Layout>
        </RequireOnboarding>
      ),
    },
    {
      path: '/search',
      element: (
        <RequireOnboarding>
          <Layout>
            <SearchPage />
          </Layout>
        </RequireOnboarding>
      ),
    },
    {
      path: '/tasks/:id/edit',
      element: (
        <RequireOnboarding>
          <Layout>
            <EditTaskPage />
          </Layout>
        </RequireOnboarding>
      ),
    },
  ]);
}
