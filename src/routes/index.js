import { lazy, Suspense } from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
// components
import LoadingScreen from '../components/LoadingScreen';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
import DashboardLayout from '../layouts/dashboard';
import { PATH_AFTER_LOGIN } from './paths';
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
      ],
    },
    // Dashboard
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        {
          element: <Navigate to={PATH_AFTER_LOGIN} replace />,
          index: true,
        },
        {
          path: 'user',
          children: [
            {
              element: <Navigate to="/dashboard/user/list" replace />,
              index: true,
            },
            { path: 'list', element: <UserList /> },
            { path: 'new', element: <UserCreate /> },
            { path: ':name/edit', element: <UserUpdate /> },
          ],
        },
      ],
    },
    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'auth', element: <Login /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [{ element: <HomePage />, index: true }],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
// MAIN
const HomePage = Loadable(lazy(() => import('../pages/Home')));
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
const UserList = Loadable(lazy(() => import('../pages/dashboard/user/UserList')));
const UserCreate = Loadable(lazy(() => import('../pages/dashboard/user/UserCreate')));
const UserUpdate = Loadable(lazy(() => import('../pages/dashboard/user/UserUpdate')));
