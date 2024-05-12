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
import NewsDetail from '../sections/@dashboard/news/NewsDetail';
import PublicationDetail from '../sections/publication/PublicationDetail';

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
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/list" replace />, index: true },
            { path: 'list', element: <UserList /> },
            { path: 'new', element: <UserCreate /> },
            { path: ':id/edit', element: <UserCreate /> },
            { path: 'profile', element: <ProfileEdit /> },
          ],
        },
        {
          path: 'publication',
          children: [
            { element: <Navigate to="/dashboard/publication/list" replace />, index: true },
            { path: 'list', element: <PublicationList /> },
            { path: 'new', element: <PublicationCreate /> },
            // { path: ':name/edit', element: <UserUpdate /> },
            { path: ':id/edit', element: <PublicationCreate /> },
            { path: ':id/detail', element: <PublicationDetail /> },
          ],
        },
        {
          path: 'research',
          children: [
            { element: <Navigate to="/dashboard/research/list" replace />, index: true },
            { path: 'list', element: <ResearchList /> },
            { path: 'new', element: <ResearchCreate /> },
            { path: ':id/edit', element: <ResearchCreate /> },
            { path: ':id/detail', element: <ResearchDetail /> },
          ],
        },
        {
          path: 'facility',
          children: [
            { element: <Navigate to="/dashboard/facility/list" replace />, index: true },
            { path: 'list', element: <FacilityList /> },
            { path: 'new', element: <FacilityCreate /> },
            { path: ':id/edit', element: <FacilityCreate /> },
            { path: ':id/detail', element: <FacilityDetail /> },
          ],
        },
        {
          path: 'news',
          children: [
            { element: <Navigate to="/dashboard/news/list" replace />, index: true },
            { path: 'list', element: <NewsList /> },
            { path: 'new', element: <NewsCreate /> },
            { path: ':id/edit', element: <NewsCreate /> },
            { path: ':id/detail', element: <NewsDetail /> },
          ],
        },
        {
          path: 'drive',
          children: [
            { element: <Navigate to="/dashboard/drive/list" replace />, index: true },
            { path: 'list', element: <DriveList /> },
            { path: 'new', element: <DriveCreate /> },
            { path: ':id/edit', element: <DriveCreate /> },
            // { path: ':name/edit', element: <UserUpdate /> },
          ],
        },
        {
          path: 'profile',
          children: [
            { element: <Navigate to="/dashboard/profile/list" replace />, index: true },
            { path: 'list', element: <ProfileList /> },
            { path: 'new', element: <ProfileCreate /> },
            { path: ':id/edit', element: <ProfileCreate /> },
            { path: ':id/detail', element: <Professor /> },
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
      children: [
        { element: <HomePage />, index: true },
        {
          path: 'news',
          children: [
            { path: '/news', element: <NewsList /> },
            { path: ':id/detail', element: <NewsDetail /> },
          ],
        },
        {
          path: 'profile',
          children: [
            { path: '/profile', element: <ProfileList /> },
            { path: ':id/detail', element: <Professor /> },
          ],
        },
        // { path: 'people', element: <ProfileList /> },
        {
          path: 'publication',
          children: [
            { path: '/publication', element: <PublicationList /> },
            { path: ':id/detail', element: <PublicationDetail /> },
          ],
        },
        {
          path: 'research',
          children: [
            { path: '/research', element: <ResearchList /> },
            { path: ':id/detail', element: <ResearchDetail /> },
          ],
        },
        {
          path: 'facility',
          children: [
            { path: '/facility', element: <FacilityList /> },
            { path: ':id/detail', element: <FacilityDetail /> },
          ],
        },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
// MAIN
const HomePage = Loadable(lazy(() => import('../pages/Home')));
// DASHBOARD
const PublicationList = Loadable(lazy(() => import('../pages/dashboard/publication/PublictionList')));
const PublicationCreate = Loadable(lazy(() => import('../pages/dashboard/publication/PublictionCreate')));

const ResearchList = Loadable(lazy(() => import('../pages/dashboard/research/ResearchList')));
const ResearchCreate = Loadable(lazy(() => import('../pages/dashboard/research/ResearchCreate')));
const ResearchDetail = Loadable(lazy(() => import('../sections/@dashboard/research/ResearchDetail')));

const FacilityList = Loadable(lazy(() => import('../pages/dashboard/facility/FacilityList')));
const FacilityCreate = Loadable(lazy(() => import('../pages/dashboard/facility/FacilityCreate')));
const FacilityDetail = Loadable(lazy(() => import('../sections/@dashboard/facility/FacilityDetail')));

const NewsList = Loadable(lazy(() => import('../pages/dashboard/news/NewsList')));
const NewsCreate = Loadable(lazy(() => import('../pages/dashboard/news/NewsCreate')));

const DriveList = Loadable(lazy(() => import('../pages/dashboard/driver/DriverList')));
const DriveCreate = Loadable(lazy(() => import('../pages/dashboard/driver/DriverCreate')));

const ProfileList = Loadable(lazy(() => import('../pages/dashboard/profile/ProfileList')));
const ProfileCreate = Loadable(lazy(() => import('../pages/dashboard/profile/ProfileCreate')));

/// / OTHERS
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
const UserList = Loadable(lazy(() => import('../pages/dashboard/user/UserList')));
const UserCreate = Loadable(lazy(() => import('../pages/dashboard/user/UserCreate')));
const ProfileEdit = Loadable(lazy(() => import('../pages/dashboard/profile/ProfileEdit')));
const Professor = Loadable(lazy(() => import('../sections/people/Professor')));
