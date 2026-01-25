import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminCoursesPage from './pages/AdminCoursesPage';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <HomePage />
  },
  {
    name: 'Courses',
    path: '/courses',
    element: <CoursesPage />
  },
  {
    name: 'About',
    path: '/about',
    element: <AboutPage />
  },
  {
    name: 'Contact',
    path: '/contact',
    element: <ContactPage />
  },
  {
    name: 'Login',
    path: '/login',
    element: <LoginPage />,
    visible: false
  },
  {
    name: 'Admin Dashboard',
    path: '/admin',
    element: <AdminDashboard />,
    visible: false
  },
  {
    name: 'Admin Courses',
    path: '/admin/courses',
    element: <AdminCoursesPage />,
    visible: false
  }
];

export default routes;
